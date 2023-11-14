if (!sessionStorage.getItem('RG')) {
    history.pushState(null, null, '/paginas/login.html');
    window.location.reload();
}

const divDados = document.getElementById('dados');
const formDados = document.getElementById('form-dados');
const buttons = document.getElementById('div-buttons');
const url = 'https://apibiblioteca.2.ie-1.fl0.io/user'
const flash = document.getElementById('flash-message');

const fieldLabels = {
    nome: 'Nome',
    RG: 'RG',
    email: 'Email',
    CEP: 'CEP',
    local_nascimento: 'Local de nascimento',
    data_nascimento: 'Data de nascimento',
    residencia: 'Residência',
    tel_pessoal: 'Telefone Pessoal',
    escola: 'Escola',
    curso_serie: 'Curso/Série',
    profissao: 'Profissão',
    tel_profissional: 'Telefone profissional'
}

const keys = Object.keys(fieldLabels);
const values = Object.values(fieldLabels);

for (let i = 0; i < keys.length; i ++) {
    let value = sessionStorage.getItem(keys[i]);
    if (value === '') {
        value = 'Não informado';
    }

    let label = document.createElement('label');
    label.textContent = values[i] + ':';
    label.setAttribute('for', 'value_' + values[i]);
    divDados.appendChild(label);

    let text = document.createElement('text');
    text.textContent = value;
    text.id = 'value_' + values[i];
    divDados.appendChild(text);
    
    divDados.innerHTML += '<br>';

    label = document.createElement('label');
    label.textContent = values[i] + ':';
    label.setAttribute('for', 'input_' + values[i]);
    formDados.appendChild(label);
    
    formDados.innerHTML += '<br>';

    let input = document.createElement('input');
    input.classList.add('form-control');
    input.setAttribute('value', value);
    input.id = 'input_' + values[i];
    formDados.appendChild(input);

    
    //divDados.innerHTML = divDados.innerHTML + '<label for="valor_' + key + '">' + key + ': </label> <br> <br>';
}
formDados.innerHTML += '<br>';

formDados.innerHTML += `
<div class='d-flex justify-content-around'>
    <input type='submit' value='Salvar' class="btn btn-primary btn-success">
    <br>
    <button class="btn btn-primary btn-danger" onclick='closeEditMode()'>Cancelar</button>
</div>
`

formDados.addEventListener('submit', (event) => {
    event.preventDefault();

    if (event.submitter.innerHTML.match('Cancelar')) {
        return closeEditMode();
    }
})

function showFlash(text) {
    flash.textContent = text;
    flash.classList.remove('d-none');
}

function hideFlash() {
    flash.classList.add('d-none');
}

function openEditMode() {
    divDados.style.display = 'none';
    buttons.classList.add('d-none');
    formDados.style.display = 'block';
}

function closeEditMode() {
    divDados.style.display = 'block';
    buttons.classList.remove('d-none');
    formDados.style.display = 'none';
}

