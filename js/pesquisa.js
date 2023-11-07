const pesquisa = document.getElementById('pesquisa');
const livroRows = document.querySelectorAll('.livroRow');

pesquisa.addEventListener('input', function () {
    const searchTerm = pesquisa.value.trim().toLowerCase();

    livroRows.forEach(row => {
        const titulo = row.querySelector('td:nth-child(1)').textContent.toLocaleLowerCase();
        const autor = row.querySelector('td:nth-child(2)').textContent.toLocaleLowerCase();

        if (titulo.includes(searchTerm) || autor.includes(searchTerm)) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
    });
