var loading = document.getElementById("loading");
var loadingLivros = document.getElementById("loading-livros");
var container = document.getElementById("container");

container.classList.add('invisible')
loading.style.display = "flex";

function checkIfAdminIsLogged() {
    console.log(localStorage.getItem('token'), !localStorage.getItem('token'))
    console.log(localStorage.getItem('tokenCheckDate'))
    if (!localStorage.getItem('token')) {
        let lastPart = window.location.href.split('/');
        lastPart = lastPart[lastPart.length - 1];
        window.location.replace(window.location.href.replace(lastPart, 'admin/login'))
    } else {
        let today = new Date();
        if (today.getDate().getTime() <= (new Date(localStorage.getItem('tokenCheckDate'))).getDate().getTime()) {
            container.classList.remove('invisible');
            loading.style.display = "none";
            return 0;
        }
        fetch('https://bibliotecamilagres-503s.onrender.com/admin/check', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            }
        });
    }
}
checkIfAdminIsLogged();