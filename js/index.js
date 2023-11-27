const pesquisarLivros = document.getElementById('pesquisa');
const livrosRows = document.getElementById('table-livros');
const url = 'https://apibiblioteca.2.ie-1.fl0.io/';
const tableBody = document.getElementById("table-livros");
const footer = document.getElementById("footer");
const flash = document.getElementById('flash-message');
var pages = [];
var current_page = null;
const changingPage = false;

pesquisarLivros.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchByTitle();
    }
});

function queryBook(query) {
    removeAllRows();
    query['key'] = 'f1563cb61eaf857ce3042c12cd94e774';
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
            return bookValue === search ? -1 : 1;
        });
        for (let i = 0; i < livros.length; i++) {
            insertRow(ids[i], livros[i]);
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

function foooterAbsolute() {
    if (footer.style.position === 'absolute' && window.innerHeight < document.body.scrollHeight) {
        footer.style.position = 'relative';
    };
}

function removeAllRows() {
    footer.style.position = 'absolute';
    for (let i = 0; i < tableBody.children.length; i ++) {
        let item = tableBody.children.item(i);
        item.style.display = 'none';
    };
}

function insertRow(id, livro) {
    foooterAbsolute();
    var row = tableBody.insertRow();
    let link = livro.titulo + " " + livro.autor;
    row.addEventListener('click', () => {
        window.open(`https://www.google.com/search?q=${link.replace(' ', '+')}`, "_blank");
    })
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = livro.titulo;
    cell2.innerHTML = livro.autor;
    cell3.innerHTML = livro.assuntos;
    cell4.innerHTML = livro.edicao;
    cell5.innerHTML = livro.editora;
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
    if (changingPage) {
        return false;
    }
    changingPage = true;
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
                key: 'f1563cb61eaf857ce3042c12cd94e774',
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
            changingPage = false;
        });
    }
    foooterAbsolute();
}

function setupPagination() {
    fetch(url + "books/length", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({key: 'f1563cb61eaf857ce3042c12cd94e774'})
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
        default: 
            break;
    }

    fetch(url + "books/field_values", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: 'f1563cb61eaf857ce3042c12cd94e774',
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


changeTablePage(1);
setupPagination();
preencherDrop('autorDrop');
preencherDrop('assuntoDrop');