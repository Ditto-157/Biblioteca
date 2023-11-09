var itemsPerPage = 5;

function fillTable(page, livros) {
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;
    var tableBody = document.getElementById("table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    console.log(livros)
    for (var i = startIndex; i < endIndex; i++) {
        if (!livros[i]) {
            var row = tableBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = livros[i].titulo;
            cell2.innerHTML = livros[i].autor;
            cell3.innerHTML = livros[i].assuntos;
        }
    }
}

function setupPagination() {
    var totalItems = data.length;
    var totalPages = Math.ceil(totalItems / itemsPerPage);
    var pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (var i = 1; i <= totalPages; i++) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#";
        a.innerHTML = i;

        a.onclick = (function(page){
            return function() {
                fillTable(page);
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
    
    const tbody = document.getElementById('table-livros');

    livros.forEach(livro => {
        const row = document.createElement('tr');
        const tituloCell = document.createElement('td');
        const autorCell = document.createElement('td');
        const assuntoCell = document.createElement('td');
    
        tituloCell.textContent = livro.titulo;
        autorCell.textContent = livro.autor;
        assuntoCell.textContent = livro.assuntos;
    
        row.appendChild(tituloCell);
        row.appendChild(autorCell);
        row.appendChild(assuntoCell);
        
        tbody.appendChild(row);
        
    });
    fillTable(1, livros);
    setupPagination();
});


