const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

function handleClick(e) {
    const index = e.target.getAttribute('data-index');
    if (board[index] !== '' || !gameActive) return;
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (!board.includes('')) {
        statusText.textContent = 'Draw!';
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'Y' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winConditions.some(condition => {
        return condition.every(i => board[i] === currentPlayer);
    });
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
