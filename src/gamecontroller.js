import { placementStatus } from "./placecontroller";

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

const modal = document.querySelector(".gameboard");
const enemyMoveBoard = createBoardUI("#enemy-board");
const playerMoveBoard = createBoardUI("#player-board");

modal.addEventListener("animationend", () => {
  modal.remove();
  document.querySelector(".main-game").classList.remove("hidden");
  placementStatus.dataPoints.forEach((shipCoords) => {
    const indices = shipCoords.map((point) => point[0] + point[1] * 10);
    indices.forEach((idx) => {
      document
        .querySelector(`#enemy-board > .cell[data-idx="${idx}"]`)
        .classList.add("occupied");
    });
  });
});

export default createBoardUI;
