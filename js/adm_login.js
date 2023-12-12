const login = document.getElementById('login');
const password = document.getElementById('password');
const flash = document.getElementById('flash-message');
const showButton = document.getElementById('show_password');
var loading = document.getElementById('loading-livros');

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('login-button').click();
    }
})

function showPassword() {
    if (showButton.innerHTML.match('Mostrar')) {
        showButton.innerHTML = 'Esconder senha';
        password.type = 'text';
    } else {
        showButton.innerHTML = 'Mostrar senha';
        password.type = 'password';
    }
}

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
    loading.style.display = 'flex';
    fetch('https://bibliotecamilagres-503s.onrender.com/admin/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: 'f1563cb61eaf857ce3042c12cd94e774',
            login: login.value.replace(' ', ''),
            password: password.value
        })
    })

    .then((response) => response.json())

    .then(data => {
        loading.style.display = 'none';
        if (!data.token) {
            return showFlash('Login ou senha inválidos')
        }
        localStorage.clear();
        localStorage.setItem('token', data.token);
        let newUrl = window.location.href.replace('/login', '/');
        window.location.replace(newUrl);
    });
}