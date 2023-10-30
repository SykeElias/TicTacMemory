const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
/*Diese Liste von Zahlen definiert, welche Kombinationen von markierten Feldern
die einen Gewinn ergeben*/
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-win-message-text]')
let circleTurn

/*Das muss immer zuerst laufen, wenn die Seite geöffnet wird,
sonst funktioniert das Spiel nicht.*/
startGame()

/*Der Neustart-Knopf liegt im Hintergrund und wartet darauf,
dass das Board 'true' anzeigt.*/
restartButton.addEventListener('click', startGame)


/*Hier ist die Behandlung eines beendeten Spiels. Dieser Code setzt das Spiel zurück,
indem er das Spiel löscht und das Spiel neu gestartet wird*/
function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}


/*Diese Funktion lässt das Spiel zwischen X und O wechseln*/
function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    }   else if(isDraw()) {
        endGame(true)
    }   else {
        swapTurns()
        setBoardHoverClass()
    }
}

/*Hier wird festgelegt, welcher Text angezeigt wird, je nachdem, wer gewonnen hat
und/oder wenn es ein Unentschieden ist*/
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} Hat Gewonnen!`
    }
    winningMessageElement.classList.add('show')
}

/*Die folgenden vier Funktionen helfen anderen Teilen des Programms, das zu holen oder
zu berechnen, was getan werden muss, je nachdem, was auf dem Board passiert*/
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }   else {
        board.classList.add(X_CLASS)
    }
}

/*Diese Funktion sorgt dafür, dass das Programm immer mit der Liste der Ziffern am Anfang prüft,
um zu sehen, ob ein Spieler gewonnen hat*/

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}