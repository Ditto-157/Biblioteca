var loading = document.getElementById("loading");
var container = document.getElementById("container");

container.classList.add('invisible')
loading.style.display = "flex";

function checkIfAdminIsLogged() {
    if (!sessionStorage.getItem('token')) {
        let lastPart = window.location.href.split('/');
        lastPart = lastPart[lastPart.length - 1];
        window.location.replace(window.location.href.replace(lastPart, 'admin/login'))
    } else {
        fetch('https://apibiblioteca.2.ie-1.fl0.io/admin/check', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                key: 'f1563cb61eaf857ce3042c12cd94e774',
                token: sessionStorage.getItem('token')
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