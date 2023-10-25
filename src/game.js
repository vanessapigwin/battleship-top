import { Player } from "./models";

function Game() {
  let gameOver;
  const player = Player();
  const ai = Player();
  let currentPlayer;
  let opponent;

  function switchPlayer() {
    const cur = this.currentPlayer;
    this.currentPlayer = this.opponent;
    this.opponent = cur;
  }

  function playRound(pair) {
    if (this.opponent.gameboard.receiveAttack(pair) !== undefined) {
      this.switchPlayer();
    }
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
