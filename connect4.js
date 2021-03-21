/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

class Player{
  constructor(id, color){
    this.color = color;
    this.id = id;
  }
}

class Game{
  // got some help with calling functions in the constructor: https://stackoverflow.com/questions/3526916/javascript-class-call-method-when-object-initialized
  findSpotForCol(column){
    for(let row = this.height - 1; row >= 0; row--){
      if(!this.board[row][column]){
        return row;
      }
    }
    return null;
  }

  placeInTable(row, column){
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currPlayer.id}`);
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (row + 2);
  
    const spot = document.getElementById(`row${row}-column${column}`);
    spot.append(piece);
  }

  endGame(msg){
    alert(msg);
  }

  _win(cells){
    return cells.every(
      ([row, column]) =>
        row >= 0 &&
        row < this.height &&
        column >= 0 &&
        column < this.width &&
        this.board[row][column] === this.currPlayer.id
    );
  }
  checkForWin(){
    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
      const horiz = [[row, column], [row, column + 1], [row, column + 2], [row, column + 3]];
      const vert = [[row, column], [row + 1, column], [row + 2, column], [row + 3, column]];
      const diagDR = [[row, column], [row + 1, column + 1], [row + 2, column + 2], [row + 3, column + 3]];
      const diagDL = [[row, column], [row + 1, column - 1], [row + 2, column - 2], [row + 3, column - 3]];
      if (this._win(horiz) || this._win(vert) || this._win(diagDR) || this._win(diagDL)) {
        return true;
      }
    }
  }
}

handleStart(){
  document.getElementById('column-top').addEventListener('click', (evt) =>
  {if(!this.checkForWin()){
    const column = evt.target.id;
    const row = this.findSpotForCol(column);
    if(row === null){
      return;
    }
    this.board[row][column] = this.currPlayer.id;
    this.placeInTable(row, column);
  
    if(this.checkForWin()){
      return this.endGame(`Player ${this.currPlayer.id} won!`);
    }
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
    this.currPlayer = this.currPlayer === this.p1 ? this.p2 : this.p1;}
  else{
    return this.endGame(`Player ${this.currPlayer.id} already won!`)
  }})
}

makeBoard(){
  for(let row = 0; row < this.height; row++){
    this.board.push(Array.from({length: this.width}));
  }
}
makeHtmlBoard(){
  const htmlBoard = document.getElementById('board');

  const top = document.createElement('tr');
  top.setAttribute('id', 'column-top');

  for(let column = 0; column < this.width; column++){
    const headCell = document.createElement('td');
    headCell.setAttribute('id', `${column}`);
    top.append(headCell);
  }
  htmlBoard.append(top);
  
  for(let row = 0; row < this.height; row++){
    const currRow = document.createElement('tr');
    for(let column = 0; column < this.width; column++){
      const cell = document.createElement('td');
      cell.setAttribute('id', `row${row}-column${column}`);
      currRow.append(cell);
    }
    htmlBoard.append(currRow);
  }
  let game = document.getElementById('game');
  let startGameBtn = document.createElement('button');
    
  startGameBtn.addEventListener('click', ()  =>
  //https://stackoverflow.com/questions/742623/deleting-objects-in-javascript Got help regarding delete from here.
  {if(this.gameStart){
    this.board = [];
    document.getElementById('board').innerHTML = '';
    startGameBtn.remove();
    let newGame = new Game(this.width, this.height);
    newGame.handleStart();
  }
  else{
    this.gameStart = true;
    this.handleStart();
  }
})
startGameBtn.innerText = "Start Game!"
game.append(startGameBtn);
}

constructor(width, height){
  this.gameStart = false;
  this.p1 = new Player(1, document.querySelector('#p1-color').value);
  this.p2 = new Player(2, document.querySelector('#p2-color').value);
  this.currPlayer = this.p1;
  this.width = width;
  this.height = height;
  this.board = [];    
  this.makeBoard();
  this.makeHtmlBoard();
}
}
document.querySelector('#color').addEventListener('submit', function(evt){
  evt.preventDefault();
  if(document.querySelector('#p1-color').value === document.querySelector('#p2-color').value){
    alert(`Player colors match. Select different colors.`);
  }
  else{
    new Game(6, 7);
  }
})
