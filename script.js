const rulesButton = document.getElementById('rules');
const rules = document.querySelector('.rules');
const ruleCloseButton = document.querySelector('.rules__exit');
const startGameButton = document.getElementById('startGame');
const telaInicial = document.querySelector('.section_telaInicial');
const gameScreen = document.getElementById('gameScreen');
const btnMinus = document.getElementById('btnMinus');
const btnPlus = document.getElementById('btnPlus');
const gameLevelDisplay = document.querySelector('.selectDiscos > span');
const towerPins = document.querySelectorAll('.tower__pins > div');
const starterPin = document.getElementById('starterPin');
const selectPin = document.querySelectorAll('.selectPin');
const fatherPins = document.getElementById('father_pins')

let currentDisk = undefined;
let counterClicks = 0
let tamCurrentDisk = 0


const hideSection = (section) => {
    section.classList.toggle('hidden');
    setTimeout(() => {
        section.classList.toggle('none');
    }, 900);  
};
const showSection = (section) => {
    section.classList.toggle('none');
    setTimeout(() => {
        section.classList.toggle('hidden')
    }, 100);
};

let gameLevel = 1;


btnMinus.addEventListener('click', () => {
    if (gameLevel > 1) {
        gameLevel--
    }
    gameLevelDisplay.innerText = gameLevel
})

btnPlus.addEventListener('click', () => {
    if (gameLevel < 7) {
        gameLevel++
    }
    gameLevelDisplay.innerText = gameLevel
})

rulesButton.addEventListener('click', () => {
    showSection(rules)
});

ruleCloseButton.addEventListener('click', () => {
    hideSection(rules)
});

const setPinsHeight = (numberOfDisks) => {
    let height = (numberOfDisks * 20) + 20 + 'px'
    for (let i = 0; i < towerPins.length; i++) {
        towerPins[i].style.height = height
    }
}

const createDisks = (diskAmount) => {
    for (let i = 1; i <= diskAmount; i++) {
        let disc = document.createElement('div');
        disc.classList.add('disk' ,`disk${i}`);
        starterPin.appendChild(disc);
    }
}

startGameButton.addEventListener('click', () => {
    hideSection(telaInicial)
    setPinsHeight(gameLevel)
    createDisks(gameLevel)
    setTimeout(showSection(gameScreen), 400)
})

fatherPins.addEventListener('click', (event) => {
    // vou dar a primeira clicada
    
    let pinSelect = event.currentTarget
    
    console.log(pinSelect)
    
    // vou conferir se a torre não está vazia
    if (event.target.firstElementChild !== null){
        counterClicks = 1
    }
    if(counterClicks === 0){
        console.log('Você não pode selecionar uma coluna vazia.')
    }
    // se não estiver vazia, pego o primeiro elemento da torre
    else{
        // vou para o segundo clique
        // confiro se a torre do segundo clique está vazia
        if (currentDisk === undefined){
            currentDisk = event.target.firstElementChild
            tamCurrentDisk = currentDisk.clientWidth
            counterClicks += 1

            //vou trocar a cor do disco que peguei para eu saber que aquele disco está na minha mão
            currentDisk.classList.add('diskColorRed')
        }else{
            if (pinSelect.firstElementChild !== null){
                pinSelect.appendChild(currentDisk)
                counterClicks = 0
                currentDisk = undefined
            }
        }
        // se não estiver vazia, confiro se o tamanho do disco que está lá é maior que o disco atual


    }
    

})







// zerar a variável counterClicks para 0 e currentDisk para undefined
