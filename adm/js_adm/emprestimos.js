const url = 'https://apibiblioteca.2.ie-1.fl0.io/';
const baseData = {key: 'f1563cb61eaf857ce3042c12cd94e774'};
const tableBody = document.getElementById("table-emprestimos");

fetch(url + "lendings", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(baseData)
})

    .then((response) => response.json())

    .then(data => {
        const emprestimos = Object.values(data);
        console.log(emprestimos);
        for (let i = 0; i < emprestimos.length; i++) {
            fetch(url + "book", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key: baseData.key,
                    book_id: emprestimos[i].livro
                })
            })
            .then((response) => response.json())
            .then(data => {
                let row = tableBody.insertRow();
                row.setAttribute('data-bs-toggle', 'modal');
                row.setAttribute('data-bs-target', '#modalEmprestimo');
                let cell1 = row.insertCell(0);
                let cell2 = row.insertCell(1);
                let cell3 = row.insertCell(2);
                cell1.innerHTML = emprestimos[i].leitor;
                cell2.innerHTML = data.titulo;
                console.log(emprestimos[i].data_emprestimo)
                let parts = emprestimos[i].data_emprestimo.match(/(\d+)\/(\d+)\/(\d+).+ (\d+):(\d+):(\d+)/);
                let first_date = Date.parse(parts[3], parts[2] - 1, parts[1], parts[4], parts[5], parts[6]);
                let today = Date.parse(new Date());
                cell3.innerHTML = Math.floor(
                    (today - first_date)/(1000 * 60 * 60 * 24)
                );
            })
        }
    });