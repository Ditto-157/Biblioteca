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
        let tokenDate = new Date(localStorage.getItem('tokenCheckDate'));
        console.log(today.getTime(), tokenDate.getTime(), today.getTime() <= tokenDate.getTime())

        if (tokenDate.getTime() < today.getTime()) {
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
        } else {
            container.classList.remove('invisible');
            loading.style.display = "none";
            return 0;
        }
        
    }
}
checkIfAdminIsLogged();