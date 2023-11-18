const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const newGameButton = document.getElementById('new-game-button');
const winnerText = document.getElementById('winner-text');
const playerXScore = document.getElementById('player-x-score');
const playerOScore = document.getElementById('player-o-score');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerXPoints = 0;
let playerOPoints = 0;

function handleCellClick(event) {
  
  const cell = event.target;
  const cellIndex = cell.id;

  if (gameBoard[cellIndex] === '' && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.style.color = currentPlayer === 'X' ? 'blue' : 'red';
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    const winner = checkWinner();
    if (winner) {
      if (winner === 'X') {
        playerXPoints++;
      } else if (winner === 'O') {
        playerOPoints++;
      }
      playerXScore.textContent = `Player X: ${playerXPoints}`;
      playerOScore.textContent = `Player O: ${playerOPoints}`;

      winnerText.textContent = `${winner} wins!`;
      gameActive = false;
    }
  }
}

function checkWinner() {
    const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  if (gameBoard.includes('')) {
    return null; // Game still ongoing
  }

  return 'Draw';
}

function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  winnerText.textContent = '';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = '#333';
  });
}

function newGame() {
  playerXPoints = 0;
  playerOPoints = 0;
  playerXScore.textContent = 'Player X: 0';
  playerOScore.textContent = 'Player O: 0';
  resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
newGameButton.addEventListener('click', newGame);
