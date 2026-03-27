
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Textos originais
const h3Original = document.getElementById('title2').innerText;
const pOriginal = document.getElementById('sobre_mim').innerText;

// Foto pessoal original
const fotoOriginal = document.getElementById('minhaFoto').src;

// Lista original
const listaOriginal = document.getElementById('lista').innerHTML;

// Cor original do body
const bodyOriginal = document.body.style.backgroundColor;

// Cores originais dos cards
const cardsOriginal = [...document.querySelectorAll('.card, .card_right, .card_right_rick')]
    .map(card => card.style.backgroundColor);


// CONTADOR ATUALIZACOES
let contador = localStorage.getItem("contadorPerfil");

if (contador == null) {
    contador = 0;
    localStorage.setItem("contadorPerfil", 0);
}


// ---------------


// DARK MODE
let switchBtn = document.getElementById('checkNativeSwitch')
switchBtn.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode');
})


// MUDAR IMAGEM
let changeImg = document.getElementById('mudar-img')
changeImg.addEventListener('click', function () {

    let imgWindows = document.getElementById('img-window')
    let img_text = document.getElementById('img-text')
    if (
        imgWindows.getAttribute('src') == "https://www.adrenaline.com.br/wp-content/uploads/2023/06/windows-xp-2.jpg") {
        img_text.innerText = 'Windows Outono'

        imgWindows.setAttribute('src', "https://wallpapers.com/images/hd/4k-fall-v4vmc20bp5mwtdaq.jpg");

    } else {
        imgWindows.setAttribute('src', "https://www.adrenaline.com.br/wp-content/uploads/2023/06/windows-xp-2.jpg");
        img_text.innerText = 'Windows XP';
    }

})

// MUDAR TEMA


let themeBtn = document.getElementById('mudarTema')
themeBtn.addEventListener('click', function () {

    function corAleatoria() {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        return `rgb(${r}, ${g}, ${b})`;
    }

    let cor = corAleatoria();
    let cor2 = corAleatoria()

    let cards = document.querySelectorAll('.card');
    for (let element of cards) {
        element.style.backgroundColor = cor
        element.style.color = cor2
    }
})

// ----------''-------------

// ADICIONAR NOVO HOBBY

let addHobby = document.getElementById('add-Hobby')

addHobby.addEventListener('click', function () {
    let novoHobby = prompt('Que hobby queres adicionar?')
    let myLi = document.createElement('li')
    myLi.innerText = novoHobby

    // console.log(novoHobby)

    let myUl = document.querySelector('ul')
    myUl.appendChild(myLi)
}

);

// --------''---------------

// ^FORMULARIO


let form = document.querySelector('form')

form.addEventListener('submit', function (event) {
    event.preventDefault()

    let data = new FormData(this);

    let nome = data.get('nome');
    document.getElementById('title2').innerText = nome;

    let sobreMim = data.get('apresentacao')
    document.getElementById('sobre_mim').innerText = sobreMim;

    let cor = data.get('cor')
    document.querySelector('.card').style.backgroundColor = cor;

    let foto = data.get('foto')
    let img = document.querySelector('.card-img-top');
    img.src = URL.createObjectURL(foto);

    let msg = document.createElement('p');
    msg.innerText = 'Formulário submetido com sucesso!';
    form.appendChild(msg);

    this.reset();
    
})

// CONTADOR
let contadorAtual = Number(localStorage.getItem("contadorPerfil"));
contadorAtual++;
localStorage.setItem("contadorPerfil", contadorAtual);

document.getElementById("contador_atualizacao").innerText =
    `Perfil atualizado ${contadorAtual} vezes.`;


// ------''---------

// EVENTO TECLADO

document.addEventListener('keydown', function (event) {
    console.log(event.key);
    if (event.key == 'Enter') {

        prompt('De certeza que terminsate o exercicio?')
    }

})

// -----''----------

// API

document.getElementById('rick-').addEventListener('click', function () {
    fetch('https://rickandmortyapi.com/api/character')
        .then((response) => response.json())
        .then((data) => {
            console.log(data.results)

            let random = Math.floor(Math.random() * data.results.length);
            let character = data.results[random];

            let cartao = document.getElementById('personagem')


            let img = document.createElement('img')
            img.src = character.image;
            img.style.width = '150px';
            img.style.borderRadius = '10px';


            cartao.appendChild(img);
        })

})

// BOTAO RESET

document.getElementById("resetar").addEventListener('click', resetar);

function resetar() {
    // TEXTOS
    document.getElementById('title2').innerText = h3Original;
    document.getElementById('sobre_mim').innerText = pOriginal;

    // MINHA FOTO
    document.getElementById('minhaFoto').src = fotoOriginal;

    // HOBBIES
    document.getElementById('lista').innerHTML = listaOriginal;

    // COR
    document.body.classList.remove("dark-mode");
    document.body.style.backgroundColor = bodyOriginal;

    // CORES DOS CARDS
    document.querySelectorAll('.card, .card_right, .card_right_rick')
        .forEach((card, i) => {
            card.style.backgroundColor = cardsOriginal[i];
            card.style.color = ""; // remove cor do texto
        });

    //API
    document.getElementById('personagem').innerHTML = "";
}


