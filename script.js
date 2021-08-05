const rulesButton = document.getElementById('rules');
const rules = document.querySelector('.rules');
const ruleCloseButton = document.querySelector('.rules__exit');
const startGameButton = document.getElementById('startGame');
const startingPage = document.querySelector('.section_telaInicial');
const gameScreen = document.getElementById('gameScreen');
const btnMinus = document.getElementById('btnMinus');
const btnPlus = document.getElementById('btnPlus');
const gameLevelDisplay = document.querySelector('.selectDiscos > span');
const starterPin = document.getElementById('starterPin');
const selectPin = document.querySelectorAll('.selectPin');
const fatherPins = document.getElementById('father_pins')
const winningScreen = document.querySelector('.winning-screen')
const backToMenu = document.getElementById('backToMenu');
const nextLevel = document.getElementById('nextLevel')
const sectionContadorDeJogadas = document.getElementById('sectionContador')
const contadorDeJogadas = document.getElementById('contador_jogadas')
const contador = document.getElementById('contador')
const timerShow = document.getElementById('timer')
const levelTitle = document.getElementById('gameTitle')
const timeElapsedDisplay = document.getElementById('timeElapsed')
const movesDoneDisplay = document.getElementById('movesDone')



let currentDisk = undefined;
let counterClicks = 0
let sizeDiskOrigin = 0
let sizeDiskDestination = 0
let contadorJogadas = 0
let victory = false

let minutes = 0;
let seconds = 0;

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
    let height = (numberOfDisks * 18) + 20 + 'px';

    for (let i = 0; i < selectPin.length; i++) {
        selectPin[i].style.height = height;
        selectPin[i].innerHTML = "";
    };
};

const createDisks = (diskAmount) => {

    for (let i = diskAmount; i > 0; i--) {
        let disc = document.createElement('div');

        disc.classList.add('disk', `disk${i}`);
        starterPin.appendChild(disc);
    };
};

const createTitle = (level) => {
    levelTitle.innerText = `Nível ${level}`
}

const startGame = () => {
    victory = false;
    nextLevel.disabled = false
    nextLevel.classList.remove("disabled")
    contadorJogadas = 0;
    contador.innerText = 0;
    createTitle(gameLevel)
    setPinsHeight(gameLevel);
    createDisks(gameLevel);
    setTimeout(timer(), 400)
}

startGameButton.addEventListener('click', () => {
    hideSection(startingPage);
    startGame()
    timerShow.innerText = '00:00'
    setTimeout(showSection(gameScreen), 400);
    setTimeout(showSection(sectionContadorDeJogadas), 400);
});

for (let i = 0; i < 3; i++){
    selectPin[i].addEventListener('click', (event) => {
        // vou dar a primeira clicada
    
    let pinSelect = event.target
    
    if (event.target.lastElementChild !== null){
        // verifica o primeiro click
        counterClicks = 1
    }

    if (counterClicks === 0){
        // força o primeiro click
        alert('Sua jogada consiste em selecionar uma torre vazia para selecionar o disco. Tente selecionar uma torre com discos para fazer o movimento.')
    }else{
        // entra no primeiro click
        if (currentDisk === undefined){
            currentDisk = event.target.lastElementChild
            sizeDiskOrigin = currentDisk.clientWidth
            counterClicks += 1
            currentDisk.classList.add('diskColorRed')
        }else{
            // verificar o segundo click, se a torre está vazia ou se o filho é maior ou menor
            if (pinSelect.lastChild !== null){
                sizeDiskDestination = event.target.lastElementChild
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
                contadorJogadas++
                contador.innerText = contadorJogadas
                
            }
        }
    }
    })
}

const timer = () => {
    const timerCount = setInterval(counter, 1000)
    seconds = 0;
    minutes = 0;

    function counter() {
        if (victory === true) {
            clearInterval(timerCount)
        }
        if (seconds === 59) {
            seconds = 0;
            minutes++;
        } else {
            seconds++
        }
        let secondsString = seconds.toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false})
        let minutesString = minutes.toLocaleString('pt-BR', {minimumIntegerDigits: 2, useGrouping:false})
        timerShow.innerText = minutesString + ':' + secondsString  
    }
}


// ESSA PARTE DE BAIXO ESTAVA DANDO BUG NO SOLTAR DO CLICK
// QUANDO ARRASTAVA E SOLTAVA EM OUTRO LUGAR

/* fatherPins.addEventListener('click', (event) => {
    // vou dar a primeira clicada

    let pinSelect = event.target




    if (event.target.lastElementChild !== null) {
        // verifica o primeiro click
        counterClicks = 1
    }
    if (counterClicks === 0) {
        // força o primeiro click
        alert('Sua jogada consiste em selecionar uma torre vazia para selecionar o disco. Tente selecionar uma torre com discos para fazer o movimento.')
    } else {
        // entra no primeiro click


        if (event.target.classList.contains('selectPin') !== false) {
            if (currentDisk === undefined) {
                currentDisk = event.target.lastElementChild
                sizeDiskOrigin = currentDisk.clientWidth
                counterClicks += 1
                currentDisk.classList.add('diskColorRed')
            } else {transition: 1s; alert('Jogada Inválida! Sua jogada consiste em posicionar um disco maior sobre um disco menor.')
                    }

                }
                if (currentDisk !== undefined) {
                    currentDisk.classList.remove('diskColorRed')
                    pinSelect.appendChild(currentDisk)
                    currentDisk = undefined
                    counterClicks = 0
                }
            }
        }
        else{
            currentDisk = undefined
            counterClicks = 0
            pinSelect = ''
            console.log('arrastou')
        }
    }


}) */

const showResults = () => {
    timeElapsedDisplay.innerText = timerShow.innerText;
    movesDoneDisplay.innerText = contadorJogadas;
    };

const winningCondition = (evt) => {
    const target = evt.target

    if (target !== starterPin && target.childElementCount === gameLevel) {
        if (gameLevel === 7) {
            nextLevel.disabled = true
            nextLevel.classList.add("disabled")
        }

        victory = true
        showSection(winningScreen)
        hideSection(gameScreen)
        hideSection(sectionContadorDeJogadas)
        showResults()
    }
}

fatherPins.addEventListener('click', winningCondition)

const resetToStartingPage = () => {
    gameLevel = 1;
    gameLevelDisplay.innerText = gameLevel;
    hideSection(winningScreen)
    showSection(startingPage)
}
backToMenu.addEventListener('click', resetToStartingPage);

const goToNextLevel = () => {
    gameLevel++;
    startGame()
    timerShow.innerText = '00:00'
    hideSection(winningScreen);
    showSection(gameScreen);
    showSection(sectionContadorDeJogadas);

};
nextLevel.addEventListener('click', goToNextLevel);

