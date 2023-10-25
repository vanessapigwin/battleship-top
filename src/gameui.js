const BOARD_HEIGHT = 10;
const BOARD_WIDTH = 10;

function createBoardUI(id) {
  /*
    creates n x n grid inside any element with id. returns the parent element with
    id = id.
    */
  const board = document.querySelector(id);
  for (let i = 0; i < BOARD_HEIGHT * BOARD_WIDTH; i += 1) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.idx = i;
    board.appendChild(div);
  }
  return board;
}

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

function gameOverScreen(winner) {
  document.querySelector(".alert").classList.remove("hidden");
  document.querySelector("#winmsg").textContent = `${winner} wins!`;
  document
    .querySelector(".alert-content > button")
    .addEventListener("click", () => window.location.reload());
}

export {
  playerMoveBoard,
  placeShipOnBoardUI,
  updatePlayerMovesUI,
  updateEnemyMovesUI,
  createBoardUI,
  gameOverScreen,
};
