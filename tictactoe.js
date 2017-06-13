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

const possibleWins = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['1', '4', '7'], ['2', '5', '8'],
['3','6','9'], ['1','5','9'], ['3','5','7']];

function checkMove(location, player, callback) {
  let result = true;
  let locations = Object.keys(board);
  function checkChar() {
    if (!locations.includes(location)) {
      result = 'UH-OH! You must select a space 1 - 9! Please select again.';
    }
  }
  function checkSpace() {
    if (board[location] === 'X' || board[location] === 'O') {
      result = 'UH-OH! That space is already taken! Please select again.';
    }
  }
  checkChar();
  checkSpace();
  callback(result);
}

function checkWinner(player, callback) {
  let bool = false;
  for (let i = 0; i < possibleWins.length; i++) {
    let combo = possibleWins[i].map(loc => board[loc]);
    JSON.stringify(combo) === JSON.stringify([player, player, player]) ? bool = true : null;
  }
  callback(bool);
};

function makeMove(player) {
  prompt.start();
  const askMove = ['Where would you like to move, Player ' + player + '?'];
  prompt.get(askMove, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log('Player ' + player + ' has selected location ' + result[askMove]);
    checkMove(result[askMove], player, (response) => {
      if (response === true) {
        markBoard(result[askMove], player);
        checkWinner(player, (res) => {
          if (res === false) {
            printBoard();
            changeTurns(player);
            makeMove(currentPlayer);
          } else {
            printBoard();
            console.log('Congratulations! Player ' + player + ' wins!!!');
          }
        })
      } else {
        console.log(response);
        printBoard();
        makeMove(player);
      }
    })
  });
};

printBoard();
makeMove('X');
