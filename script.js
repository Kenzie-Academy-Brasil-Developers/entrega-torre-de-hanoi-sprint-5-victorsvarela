const rulesButton = document.getElementById('rules');
const rules = document.querySelector('.rules');
const ruleCloseButton = document.querySelector('.rules__exit');
const startGameButton = document.getElementById('startGame');
const startingPage = document.querySelector('.section_telaInicial');
const gameScreen = document.getElementById('gameScreen');
const btnMinus = document.getElementById('btnMinus');
const btnPlus = document.getElementById('btnPlus');
const gameLevelDisplay = document.querySelector('.selectDiscos > span');
const towerPins = document.querySelectorAll('.tower__pins > div');
const starterPin = document.getElementById('starterPin');
const selectPin = document.querySelectorAll('.selectPin');
const fatherPins = document.getElementById('father_pins')
const winningScreen = document.querySelector('.winning-screen')
const backToMenu = document.getElementById('backToMenu');
const nextLevel = document.getElementById('nextLevel')



let currentDisk = undefined;
let counterClicks = 0
let sizeDiskOrigin = 0
let sizeDiskDestination = 0


const hideSection = (section) => {
    section.classList.add('hidden');
    setTimeout(() => {
        section.classList.add('none');
    }, 900);  
};
const showSection = (section) => {
    section.classList.remove('none');
    setTimeout(() => {
        section.classList.remove('hidden')
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
    let height = (numberOfDisks * 18) + 20 + 'px'

    for (let i = 0; i < towerPins.length; i++) {
        towerPins[i].style.height = height
    }
}

const createDisks = (diskAmount) => {
    starterPin.innerHTML = ""

    for (let i = diskAmount; i > 0; i--) {
        let disc = document.createElement('div');
        disc.classList.add('disk' ,`disk${i}`);
        starterPin.appendChild(disc);
    }
}

startGameButton.addEventListener('click', () => {
    hideSection(startingPage)
    setPinsHeight(gameLevel)
    createDisks(gameLevel)
    setTimeout(showSection(gameScreen), 400)
})



const checkFirstClick = () => {
    
}

/* for (let i = 0; i < 3; i++){
    selectPin[i].addEventListener('click', (event) => {
        console.log(event.currentTarget)
    })
} */

fatherPins.addEventListener('click', (event) => {
    // vou dar a primeira clicada
    
    let pinSelect = event.target
    

    if (event.currentTarget.firstElementChild !== null){
        // verifica o primeiro click
        counterClicks = 1
    }
    if (counterClicks === 0){
        // força o primeiro click
        alert('Sua jogada consiste em selecionar uma torre vazia para selecionar o disco. Tente selecionar uma torre com discos para fazer o movimento.')
    }else{
        // entra no primeiro click
        
        if (currentDisk === undefined){
            currentDisk = event.target.firstElementChild
            sizeDiskOrigin = currentDisk.clientWidth
            counterClicks += 1
            currentDisk.classList.add('diskColorRed')
        }else{
            // verificar o segundo click, se a torre está vazia ou se o filho é maior ou menor
            if (pinSelect.firstChild !== null){
                sizeDiskDestination = event.target.firstElementChild
                sizeDiskDestination = sizeDiskDestination.clientWidth
                if (sizeDiskOrigin > sizeDiskDestination){
                    currentDisk.classList.remove('diskColorRed')
                    currentDisk = undefined
                    alert('Jogada Inválida! Sua jogada consiste em posicionar um disco maior sobre um disco menor.')
                }
                
            }
            if (currentDisk !== undefined){
                currentDisk.classList.remove('diskColorRed')
                pinSelect.appendChild(currentDisk)
                currentDisk = undefined
                counterClicks = 0
            }
        }
    }
    
    
})



const winningCondition = (evt) => {
    const target = evt.target

    if (target !== starterPin && target.childElementCount === gameLevel){
     showSection(winningScreen)
     hideSection(gameScreen)
    }
}

//fatherPins.addEventListener('click', winningCondition)


const resetToStartingPage = () => {
    gameLevel = 1;;
    gameLevelDisplay.innerText = gameLevel;
    hideSection(winningScreen)
    showSection(startingPage)
}
backToMenu.addEventListener('click', resetToStartingPage)

const goToNextLevel = () => {
    gameLevel++
    hideSection(winningScreen)
    setPinsHeight(gameLevel)
    createDisks(gameLevel)
    showSection(gameScreen)
}
nextLevel.addEventListener('click', goToNextLevel)
// zerar a variável counterClicks para 0 e currentDisk para undefined
