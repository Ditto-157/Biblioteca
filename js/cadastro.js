const form = document.getElementById('cadastro-form');
const flash = document.getElementById('flash-message');
const cadastro1 = document.getElementById('cadastro1');
const cadastro2 = document.getElementById('cadastro2');
const cadastro3 = document.getElementById('cadastro3');

const RGPattern = /^[0-9]{10}-[0-9]{1}$/;
const cepPattern = /^[0-9]{5}-[0-9]{3}$/;
const telPattern = /^[0-9]{2} [[0-9]{8,9}$/;

console.log(form.elements['nome'].value);

function showFlash(text) {
    flash.textContent = text;
    flash.classList.remove('d-none');
}

function hideFlash() {
    flash.classList.add('d-none');
}

function changePage(current_page, next_page) {
    hideFlash()
    let page = null;
    if (current_page === 1) {
        page = cadastro1;
    } else if (current_page === 2) {
        page = cadastro2;
    } else if (current_page === 3) {
        page = cadastro3;
    }

    for (let i = 0; i < page.children.length; i++) {
        let item = page.children.item(i);
        if (item.tagName == 'INPUT' && item.required && item.value === "") {
            return showFlash('Preencha o campo ' + item.placeholder + '!');
        }
        if (item.name === 'RG') {
            if (!RGPattern.test(item.value)) {
                return showFlash('O campo RG deve estar no padrão: 1234567890-0');
            }
        }
        if (item.name === 'CEP') {
            if (!cepPattern.test(item.value)) {
                return showFlash('O campo CEP deve estar no padrão: 12345-678');
            }
        }
        if (item.name === 'tel_pessoal' || (item.name === 'tel_profissional' && item.value !== "")) {
            if (!telPattern.test(item.value)) {
                return showFlash('Telefones devem estar no padrão: 12 34567890 ou 12 345678910');
            }
        }
        if (item.name === 'email') {
            if (!item.value.match('@')) {
                return showFlash('O campo Email deve estar no padrão: exemplo@deemail');
            }
        }
    }

    cadastro1.style.display = 'none';
    cadastro2.style.display = 'none';
    cadastro3.style.display = 'none';

    if (next_page === 1) {
        cadastro1.style.display = 'block';
    } else if (next_page === 2) {
        cadastro2.style.display = 'block';
    } else if (next_page === 3) {
        cadastro3.style.display = 'block';
    }
    
}

function sendData() {
    console.log(form.elements);
    
    var hidden = document.getElementById('api-key');
    hidden.value = 'f1563cb61eaf857ce3042c12cd94e774';
    
}
