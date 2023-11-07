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
        assuntoCell.textContent = livro.assunto;
    
        row.appendChild(tituloCell);
        row.appendChild(autorCell);
        row.appendChild(assuntoCell);
        
        tbody.appendChild(row);
        console.log(tbody);
    
    });
});

