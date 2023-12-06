var loading = document.getElementById("loading");
var loadingLivros = document.getElementById("loading-livros");
var container = document.getElementById("container");

container.classList.add('invisible')
loading.style.display = "flex";

function checkIfAdminIsLogged() {
    if (!localStorage.getItem('token')) {
        let lastPart = window.location.href.split('/');
        lastPart = lastPart[lastPart.length - 1];
        window.location.replace(window.location.href.replace(lastPart, 'admin/login'))
    } else {
        let today = new Date();
        if (today.getDate() <= (new Date(localStorage.getItem('tokenCheckDate'))).getDate()) {
            container.classList.remove('invisible');
            loading.style.display = "none";
            return 0;
        }
        fetch('https://apibiblioteca.2.ie-1.fl0.io/admin/check', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: 'f1563cb61eaf857ce3042c12cd94e774',
                token: localStorage.getItem('token')
            })
        })
        .then((response) => response.json())
    
        .then(data => {
            if (!data.message) {
                let lastPart = window.location.href.split('/');
                lastPart = lastPart[lastPart.length - 1];
                window.location.replace(window.location.href.replace(lastPart, 'admin/login'))
            } else {
                container.classList.remove('invisible');
                loading.style.display = "none";
                localStorage.setItem('tokenCheckDate', (new Date()).toISOString())
            }
        });
    }
}
checkIfAdminIsLogged();