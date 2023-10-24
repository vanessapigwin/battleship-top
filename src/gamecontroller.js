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

export default createBoardUI;
