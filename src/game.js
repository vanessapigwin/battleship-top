import { Player } from "./models";

function Game() {
  let gameOver;
  const player = Player();
  const ai = Player();
  let currentPlayer;
  let opponent;

  function switchPlayer() {
    this.currentPlayer = currentPlayer === player ? ai : player;
    this.opponent = opponent === ai ? player : ai;
  }

  function playRound(pair) {
    opponent.gameboard.receiveAttack(pair);
    this.switchPlayer();
    this.gameOver = opponent.gameboard.shipsPlaced.length === 0;
  }

  function init() {
    currentPlayer = player;
    opponent = ai;
    gameOver = false;
  }

  init();

  return {
    player,
    ai,
    opponent,
    currentPlayer,
    switchPlayer,
    playRound,
    gameOver,
  };
}

export default Game;
