console.log(process.env);

const url = 'https://apibiblioteca.2.ie-1.fl0.io/user'
const flash = document.getElementById('flash-message');
const input_RG = document.getElementById('input-RG');
const RGPattern = /^[0-9]{10}-[0-9]{1}$/;

function checkRGPAttern() {
    return RGPattern.test(input_RG.value);
}

function showFlash(text) {
    flash.textContent = text;
    flash.classList.remove('d-none');
}

function hideFlash() {
    flash.classList.add('d-none');
}
function checkIfUserExist() {
    hideFlash();
    if (!checkRGPAttern()) {
        return showFlash('O campo RG deve estar no padrão: 1234567890-0');
    }
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            key: 'f1563cb61eaf857ce3042c12cd94e774', 
            RG: input_RG.value
        })
    })

    .then((response) => response.json())
    .then ((data) => {
        console.log(data);
        if (data.message) {
            showFlash('Usuário não registrado.');
        } else {
            if (!data.valido) {
                return showFlash('Usuário aguardando análise dos dados.')
            }
            let user = data;
            let user_keys = Object.keys(user);
            let user_values = Object.values(user);
            for (let i = 0; i < user_keys.length; i++) {
                console.log(user_keys[i], user_values[i])
                sessionStorage.setItem(user_keys[i], user_values[i])
            }
            history.pushState(null, null, '/paginas/home_logado.html');
            window.location.reload();
        }
    });

}