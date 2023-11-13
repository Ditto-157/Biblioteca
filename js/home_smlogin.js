const pesquisarLivros = document.getElementById('pesquisa');
const livrosRows = document.getElementById('table-livros');
const url = 'https://apibiblioteca.2.ie-1.fl0.io/books';
const data = { key: 'f1563cb61eaf857ce3042c12cd94e774'};
const tableBody = document.getElementById("table").getElementsByTagName("tbody")[0]
const itemsPerPage = 24;


function search() {
        const termoPesquisa = pesquisarLivros.value.trim().toLowerCase();
        
        if (termoPesquisa === '') {
            return changeTablePage(1);
        }
    
        for (let i = 0; i < livrosRows.children.length; i++) {
            row = livrosRows.getElementsByTagName('tr').item(i);
            const titulo = row.children.item(0).textContent.toLowerCase();
    
            const correspondeTermo = titulo.includes(termoPesquisa);
    
            if (correspondeTermo) {
                row.style.display = 'table-row';
            } else {
                row.style.display = 'none';
            }
        };
}

pesquisarLivros.addEventListener('input', search);
document.getElementById('btn-pesquisar').addEventListener('click', search);

function changeTablePage(page) {
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    for (let i = 0; i < tableBody.children.length; i ++) {
        row = tableBody.children.item(i);
        if (i >= startIndex && i < endIndex) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    }
}

function setupPagination(livros) {
    var totalItems = livros.length;
    var totalPages = Math.ceil(totalItems / itemsPerPage);
    var pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (var i = 1; i <= totalPages; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        li.classList.add("page-item");
        a.classList.add("page-link");
        a.href = "#";
        a.innerHTML = i;

        a.onclick = (function(page){
            return function() {
                changeTablePage(page, livros);
            };
        })(i);
        li.appendChild(a);
        pagination.appendChild(li);
    }
}

function preencherDrop(dropdownId, dados) {
    const dropdown = document.getElementById(dropdownId);

    var menu = dropdown.querySelector('.dropdown-menu');
    menu.innerHTML = '';

    const todosItem = document.createElement('li');
    todosItem.classList.add('dropdown-item');
    todosItem.dataset.value = '';
    todosItem.textContent = `Todos os ${dropdownId === 'autorDrop' ? 'autores' : 'assuntos'}`;
    todosItem.addEventListener('click', () => {changeTablePage(1);})
    menu.appendChild(todosItem);
    
    dados.forEach(dado => {
        const item = document.createElement('li');
        item.classList.add('dropdown-item');
        item.dataset.value = dado;
        item.textContent = dado;
        item.addEventListener('click', () => {
            for (let i = 0; i < livrosRows.children.length; i++) {
                row = livrosRows.getElementsByTagName('tr').item(i);
                let autor = row.children.item(1).textContent;
                let assuntos = row.children.item(2).textContent;
                
                let correspondeTermo = false;
                if (dropdownId === 'autorDrop') {
                    correspondeTermo = autor === dado;
                } else {
                    correspondeTermo = assuntos === dado;
                }
        
                if (correspondeTermo) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            };
        })

        dropdown.querySelector('.dropdown-menu').appendChild(item);
    });

}
fetch(url, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})

.then((response) => response.json())

.then(data => {
    const livros = Object.values(data);
    for (let i = 0; i < livros.length; i ++){
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3); 
        cell1.innerHTML = livros[i].titulo;
        cell2.innerHTML = livros[i].autor;
        cell3.innerHTML = livros[i].assuntos;
        cell4.innerHTML = "<a href='login.html'><button class='btn btn-success'> Solicitar Empréstimo </button></a>";
    }
    changeTablePage(1);
    setupPagination(livros);

    let autores = livros.map((livro) => livro.autor);
    let assuntos = livros.map((livro) => livro.assuntos);
    preencherDrop('autorDrop', autores);
    preencherDrop('assuntoDrop', assuntos);
    tableBody.dispatchEvent(new FocusEvent('focus'));
});
