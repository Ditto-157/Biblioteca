const pesquisarLivros = document.getElementById('pesquisa');
const livrosRows = document.getElementById('table-livros');
const url = 'https://apibiblioteca.2.ie-1.fl0.io/';
const baseData = { key: 'f1563cb61eaf857ce3042c12cd94e774' };
const tableBody = document.getElementById("table-livros");
const modalExcluir = document.getElementById("modalExcluir");
const modalTitle = document.getElementById("modalTitleId");
const formDados = document.getElementById('form-dados');
const buttons = document.getElementById('div-buttons');
const flash = document.getElementById('flash-message');
var pages = [];
var current_page = null;

const fieldLabels = {
    "titulo": "Título",
    "autor": "Autor",
    "estante": "Estante",
    "prateleira": "Prateleira",
    "editora": "Editora",
    "edicao": "Edição",
    "CDD": "CDD",
    "assuntos": "Assuntos",
    "n": "Quantidade"
}

pesquisarLivros.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchByTitle();
    }
});

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

function sendNewBookData() {
    var formData = new FormData(formDados);
    
    for (let i = 0; i < formDados.children.length; i++) {
        let child = formDados.children.item(i);
        if (child.value === "") {
            return alert('Preencha todos os campos corretamente!')
        }
    }

    formData.set('key', 'f1563cb61eaf857ce3042c12cd94e774');
    fetch(url + 'book/new', {
        method: "POST",
        body: formData
    })

    .then((response) => response.text())

    .then(data => {
        window.location.reload();
    });
}

function queryBook(query) {
    removeAllRows();
    query['key'] = baseData.key;
    fetch(url + "books/search", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query)
    })
    .then((response) => response.json())
    .then(data => {
        if (data.length === 0) {
            return alert('Nenhum livro encontrado!')
        }
        let keys = Object.keys(query);
        let ids = Object.keys(data);
        let livros = Object.values(data).sort((book) => {
            
            let search = query[keys[0]].toLowerCase();
            let bookValue = book[keys[0]].toLowerCase();
            return bookValue === search ? 1 : -1;
        }).reverse();
        for (let i = 0; i < livros.length; i++) {
            insertRow(ids[i], livros[i]);
        }
    });
}

function newBook() {
    for (let i = 0; i < formDados.children.length; i++) {
        let child = formDados.children.item(i);
        if (child.id.match('input_')) {
            child.value = '';
        }   
    }
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

function insertRow(id, livro) {
    var row = tableBody.insertRow();
    row.setAttribute('data-bs-toggle', 'modal');
    row.setAttribute('data-bs-target', '#modalId');
    row.addEventListener('click', (event) => {
        event.preventDefault();
        modalTitle.innerHTML = 'Editar livro';
        formDados.book_id = id;
        for (let i = 0; i < formDados.children.length; i ++) {
            item = formDados.children.item(i);
            for (let key of Object.keys(fieldLabels)) {
                if (!item.name){
                    break;
                }
                if (item.name === key) {
                    if (key === 'n') {
                        item.value = livro.copies.length;
                    } else {
                        item.value = livro[key];
                    }
                    break;
                }
            }
        }
    });
    modalTitle.innerHTML = 'Editar livro';
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    cell1.innerHTML = livro.titulo;
    cell2.innerHTML = livro.autor;
    cell3.innerHTML = livro.assuntos;
    cell4.innerHTML = livro.CDD;
    cell5.innerHTML = livro.estante;
    cell6.innerHTML = livro.prateleira;
    cell7.innerHTML = livro.copies.length;
    cell8.innerHTML = `
    <button class='btn btn-danger' data-bs-toggle='modal' data-bs-target='#modalExcluir' onclick="modalExcluir.book_id = ` + id + `;"> Excluir registro </button>
    `;
}

function searchByTitle() {
    const termoPesquisa = pesquisarLivros.value.trim().toLowerCase();

    if (termoPesquisa === '') {
        return changeTablePage(1);
    }

    queryBook({
        titulo: termoPesquisa
    });
}

function changeTablePage(page) {
    removeAllRows();
    var page = page;
    if (pages.includes(page)) {
        let start = ((page - 1) * 24);
        for (let i = 0; i < tableBody.children.length; i ++) {
            let item = tableBody.children.item(i);
            if (i < start + 24 && i >= start ) {
                item.style.display = 'table-row';
            }
        }
    } else {
        fetch(url + "books/page", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: baseData.key,
                page: page
            })
        })
        .then((response) => response.json())
        .then(data => {
            let ids = Object.keys(data);
            let livros = Object.values(data);
            for (let i = 0; i < livros.length; i++) {
                insertRow(ids[i], livros[i]);
            }
            pages.push(page);
        });
    }
}

function deleteBook(form=false) {
    fetch(url + "book/delete", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: baseData.key,
            book_id: form ? formDados.book_id.toString() : modalExcluir.book_id.toString()
        })
    })
    .then(response => response.json())
    .then(data => {
        window.location.reload();
    });
}

function setupPagination() {
    fetch(url + "books/length", {
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

function preencherDrop(drop_id) {
    var dropField = null;
    let all_text = null;
    switch (drop_id) {
        case 'autorDrop':
            dropField = 'autor';
            all_text = 'os autores';
            break;
        case 'assuntoDrop':
            dropField = 'assuntos';
            all_text = 'os assuntos';
            break;
        case 'estanteDrop':
            dropField = 'estante';
            all_text = 'as estantes';
            break;
        case 'prateleiraDrop':
            dropField = 'prateleira';
            all_text = 'as prateleiras';
            break;
        default: 
            break;
    }

    fetch(url + "books/field_values", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: baseData.key,
            field: dropField
        })
    })
    .then(response => response.json())
    .then(data => {
        const dropdown = document.getElementById(drop_id);

        var menu = dropdown.querySelector('.dropdown-menu');
        menu.innerHTML = '';

        const todosItem = document.createElement('li');
        todosItem.classList.add('dropdown-item');
        todosItem.dataset.value = '';
        todosItem.textContent = 'Todos ' + all_text;
        todosItem.addEventListener('click', () => {changeTablePage(1);});
        menu.appendChild(todosItem);

        let looked = [];

        data.values.forEach(value => {
            if (looked.includes(value)) {
                return;
            }
            looked.push(value);
            const item = document.createElement('li');
            item.classList.add('dropdown-item');
            item.dataset.value = value;
            item.textContent = value;
            let query = {}
            query[dropField] = value;
            item.addEventListener('click', () => {
                queryBook(query);
            })

            dropdown.querySelector('.dropdown-menu').appendChild(item);
        });
    });
}

function logout() {
    sessionStorage.clear();
    window.location.reload();
}


changeTablePage(1);
setupPagination();
preencherDrop('autorDrop');
preencherDrop('assuntoDrop');
preencherDrop('estanteDrop');
preencherDrop('prateleiraDrop');
//tableBody.dispatchEvent(new FocusEvent('focus'));
