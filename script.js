const board = document.querySelector('.board');
const resetBtn = document.getElementById('resetBtn');
const turnInfo = document.getElementById('turnInfo');

const rows = 6;
const cols = 7;
const player1 = 'Red' ;
const player2 = 'Yellow';
let currentPlayer = player1;
let gameOver = false;
let boardState = Array(rows).fill().map(() => Array(cols).fill(null));

// Create board cells
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}

function handleCellClick(event) {
    const col = parseInt(event.target.dataset.col);
    const row = getNextEmptyRow(col);

    if (row === null || gameOver) return;

    boardState[row][col] = currentPlayer;
    event.target.style.backgroundColor = currentPlayer;

    if (checkForWin(row, col, currentPlayer)) {
        gameOver = true;
        alert(`Player ${currentPlayer} wins!`);
        return;
    }

    if (checkForTie()) {
        gameOver = true;
        alert('It\'s a tie!');
        return;
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateTurnInfo();
}

function getNextEmptyRow(col) {
    for (let row = rows - 1; row >= 0; row--) {
        if (boardState[row][col] === null) {
            return row;
        }
    }
    return null;
}

function checkForWin(row, col, player) {
    // Check horizontal
    let count = 0;
    for (let c = 0; c < cols; c++) {
        if (boardState[row][c] === player) {
            count++;
        } else {
            count = 0;
        }
        if (count === 4) {
            return true;
        }
    }

    // Check vertical
    count = 0;
    for (let r = 0; r < rows; r++) {
        if (boardState[r][col] === player) {
            count++;
        } else {
            count = 0;
        }
        if (count === 4) {
            return true;
        }
    }

    // Check diagonal (top-left to bottom-right)
    count = 0;
    let r = row, c = col;
    while (r >= 0 && c >= 0) {
        r--;
        c--;
    }
    r++;
    c++;
    while (r < rows && c < cols) {
        if (boardState[r][c] === player) {
            count++;
        } else {
            count = 0;
        }
        if (count === 4) {
            return true;
        }
        r++;
        c++;
    }

    // Check diagonal (top-right to bottom-left)
    count = 0;
    r = row, c = col;
    while (r >= 0 && c < cols) {
        r--;
        c++;
    }
    r++;
    c--;
    while (r < rows && c >= 0) {
        if (boardState[r][c] === player) {
            count++;
        } else {
            count = 0;
        }
        if (count === 4) {
            return true;
        }
        r++;
        c--;
    }

    return false;
}

function checkForTie() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (boardState[row][col] === null) {
                return false;
            }
        }
    }
    return true;
}

function updateTurnInfo() {
    turnInfo.textContent = `Current Player: ${currentPlayer}`;
}

resetBtn.addEventListener('click', resetGame);

function resetGame() {
    boardState = Array(rows).fill().map(() => Array(cols).fill(null));
    currentPlayer = player1;
    gameOver = false;

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#ddd';
    });

    updateTurnInfo();
}

updateTurnInfo();