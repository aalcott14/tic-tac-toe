var prompt = require("prompt");

let currentPlayer;

let board = {
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9'
};

function changeTurns(player) {
  if (player === 'X') {
    currentPlayer = 'O'
  } else if (player === 'O') {
    currentPlayer = 'X';
  }
}

function markBoard(position, player) {
    board[position] = player;
}

function printBoard() {
  console.log('\n' +
  ' ' + board[1] + ' | ' + board[2] + ' | ' + board[3] + '\n' +
  ' ---------\n' +
  ' ' + board[4] + ' | ' + board[5] + ' | ' + board[6] + '\n' +
  ' ---------\n' +
  ' ' + board[7] + ' | ' + board[8] + ' | ' + board[9] + '\n');
}

function makeMove(player) {
  prompt.start();
  const askMove = ['Where would you like to move, Player ' + player + '?'];
  prompt.get(askMove, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('Player ' + player + ' has selected location ' + result[askMove]);
    markBoard(result[askMove], player);
    printBoard();
    changeTurns(player);
    makeMove(currentPlayer);
  });
};

printBoard();
makeMove('X');

// console.log('Game started: \n' +
//     ' 1 | 2 | 3 \n' +
//     ' --------- \n' +
//     ' 4 | 5 | 6 \n' +
//     ' --------- \n' +
//     ' 7 | 8 | 9 \n');
