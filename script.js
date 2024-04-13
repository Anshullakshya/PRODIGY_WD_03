// Constants for the game
const X_CLASS = 'X';
const O_CLASS = 'O';
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// DOM elements
const cellElements = document.querySelectorAll('.cell');
const restartButton = document.querySelector('#restartButton');
const messageElement = document.querySelector('#message');

// Game state
let currentClass = X_CLASS;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Initialize game
function initializeGame() {
    cellElements.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    messageElement.innerText = 'Tic Tac Toe';
    currentClass = X_CLASS;
    boardState = ['', '', '', '', '', '', '', '', ''];
}

initializeGame();

// Handle cell click
function handleClick(event) {
    const cell = event.target;
    const cellIndex = cell.id;

    if (boardState[cellIndex] === '') {
        placeMark(cell, cellIndex);
        if (checkWin()) {
            endGame(false);
        } else if (checkDraw()) {
            endGame(true);
        } else {
            switchPlayer();
        }
    }
}

// Place mark in cell
function placeMark(cell, cellIndex) {
    cell.innerText = currentClass;
    boardState[cellIndex] = currentClass;
}

// Check if the game has been won
function checkWin() {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentClass;
        });
    });
}

// Check if the game is a draw
function checkDraw() {
    return boardState.every(cell => cell !== '');
}

// End the game
function endGame(draw) {
    if (draw) {
        messageElement.innerText = "It's a draw!";
    } else {
        messageElement.innerText = `Player ${currentClass} wins!`;
    }
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

// Switch player
function switchPlayer() {
    currentClass = currentClass === X_CLASS ? O_CLASS : X_CLASS;
}

// Restart game
restartButton.addEventListener('click', initializeGame);
