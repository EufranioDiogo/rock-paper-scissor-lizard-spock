let score = 0;
const controlPanelOfGame = document.querySelector('.control-panel-of-game');
const pickedPanel = document.querySelector('.picked-panel');
const robotLastPossibleChoice = 5;
/*
1 - Paper
2 - Scissor
3 - Rock
*/

const mappingDecisionToButton = {
    '1': 'paper-button',
    '2': 'scissor-button',
    '3': 'rock-button',
    '4': 'spock-button',
    '5': 'lizard-button',
    '6': 'undefined'
}

function generateRobotChoose() {
    const number = (Math.floor(Math.random() * robotLastPossibleChoice + 1));
    console.log(number)
    return number;
}

function resolveDecisions(userChoose, robotChoose) {
    if (userChoose == 1) {
        if (robotChoose == 1) {
            return 0;
        } else if (robotChoose == 2) {
            return -1;
        } else if (robotChoose == 3) {
            return 1;
        } else if (robotChoose == 4) {
            return 1;
        } else {
            return -1;
        }
    } else if (userChoose == 2) {
        if (robotChoose == 1) {
            return 1;
        } else if (robotChoose == 2) {
            return 0;
        } else if (robotChoose == 3) {
            return -1;
        } else if (robotChoose == 4) {
            return -1;
        } else {
            return 1;
        }
    } else if (userChoose == 3) {
        if (robotChoose == 1) {
            return -1;
        } else if (robotChoose == 2) {
            return 1;
        } else if (robotChoose == 3){
            return 0;
        } else if (robotChoose == 4) {
            return -1;
        } else {
            return 1;
        }
    } else if (userChoose == 4) {
        if (robotChoose == 1) {
            return -1;
        } else if (robotChoose == 2) {
            return 1;
        } else if (robotChoose == 3){
            return 1;
        } else if (robotChoose == 4) {
            return 0;
        } else {
            return -1;
        }
    } else if (userChoose == 5) {
        if (robotChoose == 1) {
            return 1;
        } else if (robotChoose == 2) {
            return -1;
        } else if (robotChoose == 3){
            return -1;
        } else if (robotChoose == 4) {
            return 1;
        } else {
            return 0;
        }
    }
}

function drawIlustrationOfDecisions(userChoose, robotChoose) {
    const humanSide = document.querySelector('.human-picked-panel .game-button');
    const houseSide = document.querySelector('.house-picked-panel .game-button');
    const classToDeleteHuman = humanSide.classList[humanSide.classList.length - 1];
    const classToDeleteHouse = houseSide.classList[houseSide.classList.length - 1]

    humanSide.classList.remove(classToDeleteHuman);
    houseSide.classList.remove(classToDeleteHouse);

    humanSide.classList.add(mappingDecisionToButton[userChoose]);
    houseSide.classList.add(mappingDecisionToButton[robotChoose]);
}

function updateScore(result) {
    if (result == -1) {
        score--;
    } else if (result == 1) {
        score++;
    }
    document.querySelector('.score-board--point').innerText = score;
}

function winEffect(result) {
    if (result == -1) {
        document.querySelector('.house-picked-panel .game-button').classList.add('game-button-active');

        setTimeout(() => {
            document.querySelector('.house-picked-panel .game-button').classList.remove('game-button-active');
        }, 1500);
    } else if (result == 1) {
        document.querySelector('.human-picked-panel .game-button').classList.add('game-button-active');

        setTimeout(() => {
            document.querySelector('.human-picked-panel .game-button').classList.remove('game-button-active');
        }, 1500);
    }
}

function makeChoice(event) {
    const userChoose = event.target.value;
    
    controlPanelOfGame.style.display = 'none';
    pickedPanel.style.display = 'flex';

    setTimeout(() => {
        const robotChoose = generateRobotChoose();

        drawIlustrationOfDecisions(userChoose, robotChoose);
        const result = resolveDecisions(userChoose, robotChoose);
        updateScore(result);
        winEffect(result);
        resultStatus(result);
    }, 3000)
    drawIlustrationOfDecisions(userChoose, '6');
}


document.querySelectorAll('.control-panel-of-game .game-button').forEach(element => {
    element.addEventListener('click', makeChoice);
});

document.querySelector('.play-again-button').addEventListener('click', () => {
    pickedPanel.style.display = 'none';
    controlPanelOfGame.style.display = 'grid';
    document.querySelector('.result-text').innerText = "???";
    drawIlustrationOfDecisions('6', '6');
});

document.querySelector('.close-rules-modal-button').addEventListener('click', (event) => {
    document.querySelector('.rules-model-fixed').style.opacity = '0';
    setTimeout(() => {
        document.querySelector('.rules-model-fixed').style.display = 'none'; 
    }, 1100);
})

document.querySelector('.rules-button').addEventListener('click', (event) => {
    document.querySelector('.rules-model-fixed').style.display = 'flex'; 
    document.querySelector('.rules-model-fixed').style.opacity = '1';
})

function resultStatus(result) {
    if (result == 1) {
        document.querySelector('.result-text').innerText = "You Win";
    } else if (result == -1) {
        document.querySelector('.result-text').innerText = "You Lose";
    } else {
        document.querySelector('.result-text').innerText = "Tie";
    }
}
