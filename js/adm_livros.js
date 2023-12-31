const pesquisarLivros = document.getElementById('pesquisa');
const tableBody = document.getElementById("table-livros");
const modalExcluir = document.getElementById("modalExcluir");
const modalTitle = document.getElementById("modalTitleId");
const modalSearch = document.getElementById("search-modal-button");
const formDados = document.getElementById('form-dados');
const buttons = document.getElementById('div-buttons');
const flash = document.getElementById('flash-message');
const footer = document.getElementById("footer");
var loadingLivros = document.getElementById('loading-livros');
let changingPage = false;
var pages = [];
var current_page = null;
window.queryNumber = 0;

const fieldLabels = {
    "titulo": "Título",
    "autor": "Autor",
    "editora": "Editora",
    "edicao": "Edição",
    "CDD": "CDD",
    "quantidade": "Quantidade",
    "estante": "Estante",
    "prateleira": "Prateleira",
    "assuntos": "Assuntos",
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
    if (keys[i] === 'quantidade') {
        input.setAttribute('type', 'number');
        input.setAttribute('min', '1');
        input.setAttribute('value', '1');
    }
    input.classList.add('form-control');
    input.id = 'input_' + keys[i];
    formDados.appendChild(input);
}

function search() {
    let link = '"';
    for (let field of ['titulo', 'autor', 'editora']) {
        if (document.getElementById('input_' + field).value === '-') {
            continue;
        }
        link += document.getElementById('input_' + field).value + (field === 'titulo' ? '" ' : ' ')
    }
    window.open(`https://www.google.com/search?q=${link.replace(' ', '+')}`, "_blank")
}

function queryBook(query) {
    loadingLivros.style.display = 'flex';
    removeAllRows();
    fetch("https://bibliotecamilagres-503s.onrender.com/books/search", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query)
    })
        .then((response) => response.json())
        .then(data => {
            loadingLivros.style.display = 'none';
            if (Object.keys(data).length === 0) {
                alert('Nenhum livro encontrado!');
                return changeTablePage(1);
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
            window.queryNumber = livros.length;
            foooterAbsolute();
        });
}

function newBook() {
    modalTitle.innerHTML = 'Novo livro';
    modalSearch.style.display = 'none';
    for (let i = 0; i < formDados.children.length; i++) {
        let child = formDados.children.item(i);
        if (child.id.match('input_')) {
            if (child.id === 'input_quantidade') {
                child.value = 1;
                continue;
            }
            child.value = '';
        }
    }
}

function foooterAbsolute() {
    if (footer.style.position === 'absolute' && window.innerHeight < document.body.scrollHeight + footer.scrollHeight) {
        footer.style.position = 'relative';
    };
}

function showFlash(text) {
    flash.textContent = text;
    flash.classList.remove('d-none');
}

function hideFlash() {
    flash.classList.add('d-none');
}


function removeAllRows() {
    window.scrollTo(-100, -100);
    footer.style.position = 'absolute';
    for (let i = 0; i < window.queryNumber; i++) {
        let item = tableBody.children.item(tableBody.children.length - i - 1);
        if (!item) {
            item.remove();
        }
    }
    window.queryNumber = 0;
    for (let i = 0; i < tableBody.children.length; i++) {
        var item = tableBody.children.item(i);
        item.style.display = 'none';
    };
}

function insertRow(id, livro) {
    foooterAbsolute();
    var row = tableBody.insertRow();
    row.setAttribute('data-bs-toggle', 'modal');
    row.setAttribute('data-bs-target', '#modalId');
    row.addEventListener('click', (event) => {
        event.preventDefault();
        modalTitle.innerHTML = 'Editar livro';
        modalSearch.style.display = 'flex';
        window.book_id = id;
        for (let i = 0; i < formDados.children.length; i++) {
            item = formDados.children.item(i);
            for (let key of Object.keys(fieldLabels)) {
                if (!item.name) {
                    break;
                }
                if (item.name === key) {
                    item.value = livro[key];
                    break;
                }
            }
        }
    });
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    var cell10 = row.insertCell(9);
    cell1.innerHTML = livro.titulo;
    cell2.innerHTML = livro.autor;
    cell3.innerHTML = livro.editora;
    cell4.innerHTML = livro.edicao;
    cell5.innerHTML = livro.assuntos;
    cell6.innerHTML = livro.CDD;
    cell7.innerHTML = livro.estante;
    cell8.innerHTML = livro.prateleira;
    cell9.innerHTML = livro.quantidade;
    cell10.innerHTML = `
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

function loadData() {
    loadingLivros.style.display = 'flex';
    fetch("https://bibliotecamilagres-503s.onrender.com/get/data", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'livros.xlsx';
            document.body.appendChild(a);
            a.click();

            // Limpar o elemento <a> após o download
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 0);
            loadingLivros.style.display = 'none';
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
        for (let i = 0; i < tableBody.children.length; i++) {
            let item = tableBody.children.item(i);
            if (i < start + 24 && i >= start) {
                item.style.display = 'table-row';
            }
        }
        changingPage = false;
        foooterAbsolute();
    } else {
        loadingLivros.style.display = 'flex';
        fetch("https://bibliotecamilagres-503s.onrender.com/books/page", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
                loadingLivros.style.display = 'none';
                foooterAbsolute();
            });
    }
}

function modalButton() {
    document.getElementById('closeModalId').click();
    var formData = new FormData(formDados);

    for (let i = 0; i < formDados.children.length; i++) {
        let child = formDados.children.item(i);
        if (child.value === "") {
            return alert('Preencha todos os campos corretamente!')
        }
    }
    formData.set('token', localStorage.getItem('token'));
    formData.set('book_id', window.book_id);

    var data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    })

    if (modalTitle.innerHTML.match('Editar')) {
        fetch('https://bibliotecamilagres-503s.onrender.com/book/update', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

            .then((response) => response.text())

            .then(data => {
                removeAllRows();
                loadingLivros.style.display = 'flex';
                window.location.reload();
            });
        return 0
    }

    fetch('https://bibliotecamilagres-503s.onrender.com/book/new', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

        .then((response) => response.text())

        .then(data => {
            removeAllRows();
            loadingLivros.style.display = 'flex';
            window.location.reload();
        });

}

function deleteBook() {
    fetch("https://bibliotecamilagres-503s.onrender.com/book/delete", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: localStorage.getItem('token'),
            book_id: window.book_id
        })
    })
        .then(response => response.json())
        .then(data => {
            window.location.reload();
        });
}

function setupPagination() {
    fetch("https://bibliotecamilagres-503s.onrender.com/books/length", {
        method: "POST"
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
        case 'editoraDrop':
            dropField = 'editora';
            all_text = 'as editoras';
            break;
        case 'CDDDrop':
            dropField = 'CDD';
            all_text = 'os CDDS';
            break;
        default:
            break;
    }

    fetch("https://bibliotecamilagres-503s.onrender.com/books/field_values", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
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
            todosItem.addEventListener('click', () => { changeTablePage(1); });
            menu.appendChild(todosItem);

            let dataValues = data.values;
            dataValues.sort();

            let looked = [];

            dataValues.forEach(value => {
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
    localStorage.clear();
    let lastPart = window.location.href.split('/');
    lastPart = lastPart[lastPart.length - 1];
    window.location.replace(window.location.href.replace(lastPart, 'admin/login'))
}


changeTablePage(1);
setupPagination();
preencherDrop('autorDrop');
preencherDrop('assuntoDrop');
preencherDrop('estanteDrop');
preencherDrop('prateleiraDrop');
preencherDrop('editoraDrop');
preencherDrop('CDDDrop');
//tableBody.dispatchEvent(new FocusEvent('focus'));

