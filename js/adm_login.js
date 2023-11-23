
const login = document.getElementById('login');
const password = document.getElementById('password');
const url = 'https://apibiblioteca.2.ie-1.fl0.io/';
const flash = document.getElementById('flash-message');

function showFlash(text) {
    flash.textContent = text;
    flash.classList.remove('d-none');
}

function hideFlash() {
    flash.classList.add('d-none');
}

function checkLogin() {
    hideFlash();
    if (login.value === '' || password.value === '') {
        return showFlash('Preencha todos os campos!');
    }
    fetch(url + 'admin/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: 'f1563cb61eaf857ce3042c12cd94e774',
            login: login.value,
            password: password.value
        })
    })

    .then((response) => response.json())

    .then(data => {
        if (!data.token) {
            return showFlash('Login ou senha inválidos')
        }
        sessionStorage.clear();
        sessionStorage.setItem('token', data.token);
        let newUrl = window.location.href.replace('/login', '/');
        window.location.replace(newUrl);
    });
}