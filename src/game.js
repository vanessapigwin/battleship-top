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
    const hitMade = this.opponent.gameboard.receiveAttack(pair);
    if (hitMade !== undefined) {
      this.switchPlayer();
      this.gameOver =
        this.opponent.gameboard.shipsPlaced.length === 0 ||
        this.currentPlayer.gameboard.shipsPlaced.length === 0;
    }
    return hitMade;
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
