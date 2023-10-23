const BOARD_HEIGHT = 10;
const BOARD_WIDTH = 10;
const SHIP_LIST = {
  Carrier: 5,
  Battleship: 4,
  Submarine: 3,
  Destroyer: 3,
  Patrol: 2,
};
const placementStatus = {
  currentShip: "Carrier",
  orientation: "vertical",
  selectedCoords: undefined,
};

function updateMsgDisplay() {
  const elem = document.querySelector(".gameboard > .orientation");
  elem.textContent = `Orientation: ${placementStatus.orientation}`;
}

function updateOrientation() {
  placementStatus.orientation =
    placementStatus.orientation === "vertical" ? "horizontal" : "vertical";
  updateMsgDisplay();
}

function createBoardUI(id) {
  const board = document.querySelector(id);
  for (let i = 0; i < BOARD_HEIGHT * BOARD_WIDTH; i += 1) {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.idx = i;
    board.appendChild(div);
  }
  return board;
}

function updateHovered(indices) {
  const cells = document.querySelectorAll("#placeships > .cell");
  cells.forEach((cell) => {
    cell.classList.remove("hovered");
  });

  indices.forEach((idx) => {
    document.querySelector(`[data-idx="${idx}"]`).classList.add("hovered");
  });
}

function updateAdded() {
  const indices = placementStatus.selectedCoords.map(
    (point) => point[0] + point[1] * 10
  );
  indices.forEach((idx) => {
    document.querySelector(`[data-idx="${idx}"]`).classList.add("occupied");
  });
}

function highlightShip(e) {
  const length = SHIP_LIST[placementStatus.currentShip];
  const x = e.target.dataset.idx % 10;
  const y = Math.floor(e.target.dataset.idx / 10);

  const tempCoords = [];
  for (let i = 0; i < length; i += 1) {
    if (placementStatus.orientation === "vertical") {
      tempCoords.push([x, y + i]);
    } else {
      tempCoords.push([x + i, y]);
    }
  }

  const coords = tempCoords.filter(
    (point) => point[0] >= 0 && point[0] < 10 && point[1] >= 0 && point[1] < 10
  );
  placementStatus.selectedCoords = coords;
  const selectorIndices = coords.map((point) => point[0] + point[1] * 10);
  updateHovered(selectorIndices);
}

const placementBoard = createBoardUI("#placeships");
placementBoard.addEventListener("pointerover", highlightShip);
placementBoard.addEventListener("click", updateAdded);
document
  .querySelector(".gameboard > button")
  .addEventListener("click", updateOrientation);

updateMsgDisplay();

export { SHIP_LIST, placementStatus };
