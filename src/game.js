import { Player } from "./models";

function Game() {
  let currentPlayer;
  let gameOver;
  const player = Player();
  const ai = Player();

  (() => {
    currentPlayer = player;
  })();

  function switchPlayer() {
    this.currentPlayer = currentPlayer === player ? ai : player;
  }

  return { player, currentPlayer, switchPlayer, gameOver };
}

export { Game };
