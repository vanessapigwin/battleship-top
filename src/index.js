import "./style.css";
import Game from "./game";
import { SHIP_LIST, placementStatus } from "./placecontroller";
import {
  enemyMoveBoard,
  playerMoveBoard,
  placeShipOnBoardUI,
} from "./gamecontroller";

const game = Game();
const modal = document.querySelector(".gameboard");

function randomChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

modal.addEventListener("animationend", () => {
  modal.remove();
  document.querySelector(".main-game").classList.remove("hidden");
  // transfer player ships on board's UI
  placeShipOnBoardUI(placementStatus.dataPoints, "#enemy-board");
  // place player ships on game element
  placementStatus.dataPoints.forEach((shipCoords) => {
    game.player.gameboard.place(shipCoords);
  });

  // update names
  if (placementStatus.playerName) {
    game.player.setName(placementStatus.playerName);
  } else {
    game.player.setName("Player");
  }

  // AI places ships on game element
  let placed = 0;
  const temp = [];
  while (placed < Object.keys(SHIP_LIST).length) {
    const arr = [];
    const orientation = randomChoice(["horizontal", "vertical"]);
    const x = Math.floor(Math.random() * game.player.gameboard.bounds.x_max);
    const y = Math.floor(Math.random() * game.player.gameboard.bounds.y_max);
    for (let i = 0; i < SHIP_LIST[placed].length; i += 1) {
      if (orientation === "vertical") {
        arr.push([x, y + i]);
      } else {
        arr.push([x + i, y]);
      }
    }
    const isPlacedSuccess = game.ai.gameboard.place(arr);
    if (isPlacedSuccess) {
      placed += 1;
      temp.push(arr);
    }
  }
  placeShipOnBoardUI(temp, "#player-board");
});

playerMoveBoard.addEventListener("click", (e) => {
  const x = e.target.dataset.idx % 10;
  const y = Math.floor(e.target.dataset.idx / 10);
  if (game.gameOver) {
    alert(`${game.currentPlayer.name} wins!`);
  }
  if (!game.gameOver) {
    const shipHit = game.opponent.gameboard.receiveAttack([x, y]);
    // player uses x and y to make a move on enemy board
    // update player move UI depending on hit
  }
  if (!game.gameOver) {
    // ai selects random attack from player board
    // update enemy move UI depending on hit
  }
});
