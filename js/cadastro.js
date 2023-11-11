const form = document.getElementById('cadastro-form');
const flash = document.getElementById('flash-message');
const cadastro1 = document.getElementById('cadastro1');
const cadastro2 = document.getElementById('cadastro2');
const cadastro3 = document.getElementById('cadastro3');

const RGPattern = /^[0-9]{10}-[0-9]{1}$/;
const cepPattern = /^[0-9]{5}-[0-9]{3}$/;
const telPattern = /^[0-9]{2} [[0-9]{8,9}$/;

function showFlash(text) {
    flash.textContent = text;
    flash.classList.remove('d-none');
}

function hideFlash() {
    flash.classList.add('d-none');
}

function changeToBackPage(back_page) {
    cadastro1.style.display = 'none';
    cadastro2.style.display = 'none';
    cadastro3.style.display = 'none';

    if (back_page === 1) {
        cadastro1.style.display = 'block';
    } else if (back_page === 2) {
        cadastro2.style.display = 'block';
    } else if (back_page === 3) {
        cadastro3.style.display = 'block';
    }
}

function changeToNextPage(current_page, next_page) {
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

form.addEventListener('submit', (event) => {
    console.log('On send data');

    event.preventDefault();

    if (!event.submitter.value.match("Finalizar")) {
        return false;
    }
    
    var url = "http://10.0.0.109:8080/user/new";

    var formData = new FormData(form);
    
    console.log(formData.get('RG_frente').type)

    if (
        !formData.get('RG_frente').type.startsWith('image/') 
        || !formData.get('comprovante').type.startsWith('image/') 
        || !formData.get('RG_verso').type.startsWith('image/')
    ) {
        return showFlash('Selecione uma imagem!');
    } 

    formData.set('key', 'f1563cb61eaf857ce3042c12cd94e774');
    fetch(url, {
        method: "POST",
        body: formData
    })
    
    .then((response) => response.text())
    
    .then(data => {
        alert('data loaded');
        console.log(data);
    });
    

})
    


    /*
    
    */

