var itemsPerPage = 24;

function fillTable(page, livros) {
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var tableBody = document.getElementById("table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    for (var i = startIndex; i < endIndex; i++) {
        if (i < livros.length) {
            var row = tableBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3); 
            cell1.innerHTML = livros[i].titulo;
            cell2.innerHTML = livros[i].autor;
            cell3.innerHTML = livros[i].assuntos;
            cell4.innerHTML = "<a href='login.html'><button class='btn btn-success'>  Solicitar Empréstimo </button></a>";
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
                fillTable(page, livros);
            };
        })(i);
        li.appendChild(a);
        pagination.appendChild(li);
    }
}


const url = 'https://apibiblioteca.2.ie-1.fl0.io/books'
const data = { key: 'f1563cb61eaf857ce3042c12cd94e774'};

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
    fillTable(1, livros);
    setupPagination(livros);

    let autores = livros.map((livro) => livro.autor);
    let assuntos = livros.map((livro) => livro.assuntos);
    preencherDrop('autorDrop', autores);
    preencherDrop('assuntoDrop', assuntos);
});

function preencherDrop(dropdownId, dados) {
    const dropdown = document.getElementById(dropdownId);

    dropdown.querySelector('.dropdown-menu').innerHTML = '';

    const todosItem = document.createElement('li');
    todosItem.classList.add('dropdown-item');
    todosItem.dataset.value = '';
    todosItem.textContent = `Todos os ${dropdownId === 'autorDrop' ? 'Autores' : 'Assunto'}`;

    document.querySelector('.dropdown-menu').appendChild(todosItem);
    
    
    dados.forEach(dado => {
        const item = document.createElement('li');
        item.classList.add('dropdown-item');
        item.dataset.value = dado;
        item.textContent = dado;

        dropdown.querySelector('.dropdown-menu').appendChild(item);
    });

}

