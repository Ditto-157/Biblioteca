const pesquisarLeitores = document.getElementById('pesquisa');
const modalBody = document.getElementById('modal-body');
const url = 'https://apibiblioteca.2.ie-1.fl0.io/';
const baseData = { key: 'f1563cb61eaf857ce3042c12cd94e774' };
const tableBody = document.getElementById("table-cadastros");
const flash = document.getElementById('flash-message');
var pages = [];
var current_page = null;

pesquisarLeitores.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchByName();
    }
});

const fieldLabels = {
    "nome": "Nome",
    "RG": "RG",
    "email": "Email",
    "data_nascimento": "Data de nascimento",
    "local_nascimento": "Local Nascimento",
    "residencia": "Residência",
    "CEP": "CEP",
    "tel_pessoal": "Telefone pessoal",
    "tel_profissional": "Telefone profissional",
    "profissao": "Profissão",
    "escola": "Escola",
    "curso_serie": "Curso/Série",
    "data_cadastro": "Data de cadastro",
    "livro": "Livro atual"
}
/*
const keys = Object.keys(fieldLabels);
const values = Object.values(fieldLabels);

for (let i = 0; i < keys.length; i++) {
    label = document.createElement('label');
    label.textContent = values[i] + ':';
    label.setAttribute('for', 'input_' + values[i]);
    formDados.appendChild(label);

    formDados.innerHTML += '<br>';

    let input = document.createElement('input');
    input.setAttribute('name', keys[i])
    if (keys[i] === 'n') {
        input.setAttribute('type', 'number');
        input.setAttribute('min', '1');
    }
    input.classList.add('form-control');
    input.id = 'input_' + keys[i];
    formDados.appendChild(input);
}
*/

function queryBook(query) {
    removeAllRows();
    query['key'] = baseData.key;
    fetch(url + "users/search", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query)
    })
    .then((response) => response.json())
    .then(data => {
        let keys = Object.keys(query);
        let ids = Object.keys(data);
        let users = Object.values(data).sort((user) => {
            
            let search = query[keys[0]].toLowerCase();
            let bookValue = user[keys[0]].toLowerCase();
            return bookValue === search ? 1 : -1;
        }).reverse();
        for (let i = 0; i < users.length; i++) {
            insertRow(ids[i], users[i]);
        }
    });
}

function showFlash(text) {
    flash.textContent = text;
    flash.classList.remove('d-none');
}

function hideFlash() {
    flash.classList.add('d-none');
}

function removeAllRows() {
    for (let i = 0; i < tableBody.children.length; i ++) {
        let item = tableBody.children.item(i);
        item.style.display = 'none';
    };
}

function insertRow(id, user) {
    var row = tableBody.insertRow();
    row.setAttribute('data-bs-toggle', 'modal');
    row.setAttribute('data-bs-target', '#modalUser');
    row.addEventListener('click', (event) => {
        modalBody.innerHTML = '';
        for (let key of Object.keys(fieldLabels)) {
            let value = (user[key] === '' ? 'Não informado' : user[key]);
            if (value === false) {
                value = 'Sem livro';
            } else if (key === 'email') {
                value = '<a class="especial-link" href="mailto:' + user[key] + '">' + user[key] + '</a>'
            }
            modalBody.innerHTML += '<p><b>' + fieldLabels[key] + '</b>: ' + value  + '</p>';
        }
    });
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(2);
    cell1.innerHTML = user.nome;
    cell2.innerHTML = user.RG;
    cell3.innerHTML = user.data_cadastro;
    cell4.innerHTML = user.livro ? user.livro : "Sem livro"
}

function searchByName() {
    const termoPesquisa = pesquisarLeitores.value.trim().toLowerCase();

    if (termoPesquisa === '') {
        return changeTablePage(1);
    }

    queryBook({
        nome: termoPesquisa
    });
}

function changeTablePage(page) {
    if (current_page === page) {
        return 0;
    }
    removeAllRows();
    var page = page;
    if (pages.includes(page)) {
        let start = ((page - 1) * 24);
        for (let i = start; i < tableBody.children.length && i <= start + 24; i ++) {
            tableBody.children.item(i).style.display = 'table-row';
        }
    } else {
        fetch(url + "users/page", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: baseData.key,
                page: page,
                type: 'invalid'
            })
        })
        .then((response) => response.json())
        .then(data => {
            let ids = Object.keys(data);
            let users = Object.values(data);
            console.log(users);
            for (let i = 0; i < users.length; i++) {
                insertRow(ids[i], users[i]);
            }
            pages.push(page);
        });
    }
    current_page = page;
}

function setupPagination() {
    fetch(url + "users/length", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(baseData)
    })
    .then(response => response.json())
    .then(data => {
        totalItems = data.len;
        var totalPages = Math.ceil(totalItems / 24);
        var pagination = document.getElementById("pagination");
        pagination.innerHTML = "";

        for (var i = 1; i <= totalPages; i++) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            li.classList.add("page-item");
            a.classList.add("page-link");
            a.innerHTML = i;

            a.onclick = (function (page) {
                return function () {
                    changeTablePage(page);
                };
            })(i);
            li.appendChild(a);
            pagination.appendChild(li);
        }
    });
}

changeTablePage(1);
setupPagination();

