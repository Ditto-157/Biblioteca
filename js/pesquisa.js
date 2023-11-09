const pesquisarLivros = document.getElementById('pesquisa');
const livrosRows = document.getElementById('table-livros');

pesquisarLivros.addEventListener('input', () => {
    const termoPesquisa = pesquisarLivros.value.trim().toLowerCase();

    for (let i = 0; i < livrosRows.children.length; i++) {
        row = livrosRows.getElementsByTagName('tr').item(i);
        const titulo = row.textContent.toLowerCase();
        const autor = row.textContent.toLowerCase();
        const assuntos = row.textContent.toLowerCase();

        const correspondeTermo = titulo.includes(termoPesquisa) || autor.includes(termoPesquisa) || assuntos.includes(termoPesquisa);

        if (correspondeTermo) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    };
});
