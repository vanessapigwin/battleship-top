import { createBoardUI } from "./placeui";

const enemyMoveBoard = createBoardUI("#enemy-board");
const playerMoveBoard = createBoardUI("#player-board");

function placeShipOnBoardUI(arr, id) {
  arr.forEach((shipCoords) => {
    shipCoords
      .map((point) => point[0] + point[1] * 10)
      .forEach((idx) => {
        document
          .querySelector(`${id} > .cell[data-idx="${idx}"]`)
          .classList.add("occupied");
      });
  });
}

function updatePlayerMovesUI(e, shipHit) {
  if (!shipHit) {
    e.target.classList.add("miss");
  } else if (shipHit) {
    e.target.classList.add("hit");
  }
}

function updateEnemyMovesUI(x, y, playerShipHit) {
  let className;
  const idx = x + y * 10;
  if (!playerShipHit) {
    className = "miss";
  } else {
    className = "hit";
  }
  enemyMoveBoard
    .querySelector(`#enemy-board > .cell[data-idx="${idx}"]`)
    .classList.add(className);
}

export {
  playerMoveBoard,
  placeShipOnBoardUI,
  updatePlayerMovesUI,
  updateEnemyMovesUI,
};
