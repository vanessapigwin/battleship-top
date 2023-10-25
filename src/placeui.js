const BOARD_HEIGHT = 10;
const BOARD_WIDTH = 10;

const SHIP_LIST = {
  0: {
    title: "carrier",
    length: 5,
  },
  1: {
    title: "battleship",
    length: 4,
  },
  2: {
    title: "submarine",
    length: 3,
  },
  3: {
    title: "destroyer",
    length: 3,
  },
  4: {
    title: "patrol",
    length: 2,
  },
};

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

const placementBoard = createBoardUI("#placeships");
const placementButton = document.querySelector(".gameboard > button");
const form = document.querySelector("#form");

/*
placementStatus object used to track immediate changes to the placement UI, including
ship currently being placed, orientation, coordinates as highlighted, cells already
occupied and set of coordinates to be used as player's ship coordinates
*/
const placementStatus = {
  shipIdx: 0,
  orientation: "vertical",
  highlightedCoords: undefined,
  occupiedCells: [],
  dataPoints: [],
  playerName: undefined,
};

function updateMsgDisplay() {
  /*
  clears text content of message boxes showing ship name and orientation and
  updates content with the latest ship name and orientation.
  */
  const mainMsgElem = document.querySelector(".gameboard > #placeship-status");
  const subMsgElem = document.querySelector(".gameboard > .orientation");
  if (placementStatus.shipIdx < Object.keys(SHIP_LIST).length) {
    mainMsgElem.textContent = `Place your ${
      SHIP_LIST[placementStatus.shipIdx].title
    }`;
    subMsgElem.textContent = `Orientation: ${placementStatus.orientation}`;
  }
}

function updateOrientation() {
  placementStatus.orientation =
    placementStatus.orientation === "vertical" ? "horizontal" : "vertical";
  updateMsgDisplay();
}

function highlightShip(e) {
  /*
  highlights cells based on current ship name (and length), and gets coordinates
  of said highlighted cells depending on state of orientation. the coodinates are 
  filtered out if out of bounds
  */
  const { length } = SHIP_LIST[placementStatus.shipIdx];
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
  placementStatus.highlightedCoords = coords;
  const selectorIndices = coords.map((point) => point[0] + point[1] * 10);

  const cells = document.querySelectorAll("#placeships > .cell");
  cells.forEach((cell) => {
    cell.classList.remove("hovered");
  });
  selectorIndices.forEach((idx) => {
    document.querySelector(`[data-idx="${idx}"]`).classList.add("hovered");
  });
}

function updateAdded() {
  /*
  checks if currently highlighted coordinates clash with existing points on
  the board. If no clashes are detected and the highlighted coordinates
  are within bounds, the set of coordinates are noted to list of already
  placed points and also added into a list of ship coordinates. This method
  is active until all the ships are placed and the main UI of the game is loaded.
  */
  const hasClashes = placementStatus.highlightedCoords.some((pair) =>
    placementStatus.occupiedCells.some(
      (p) => p[0] === pair[0] && p[1] === pair[1]
    )
  );
  if (
    !hasClashes &&
    placementStatus.highlightedCoords.length ===
      SHIP_LIST[placementStatus.shipIdx].length &&
    placementStatus.dataPoints.length < Object.keys(SHIP_LIST).length
  ) {
    placementStatus.occupiedCells = placementStatus.occupiedCells.concat(
      placementStatus.highlightedCoords
    );
    placementStatus.dataPoints.push(placementStatus.highlightedCoords);
    placementStatus.shipIdx += 1;

    // update of ui
    const indices = placementStatus.highlightedCoords.map(
      (point) => point[0] + point[1] * 10
    );
    indices.forEach((idx) => {
      document.querySelector(`[data-idx="${idx}"]`).classList.add("occupied");
    });
  }

  // condition to exit
  if (placementStatus.shipIdx === Object.keys(SHIP_LIST).length) {
    document.querySelector(".modal").classList.add("hidden");
    form.requestSubmit();
  } else {
    updateMsgDisplay();
  }
}

placementBoard.addEventListener("pointerover", highlightShip);
placementBoard.addEventListener("click", updateAdded);
placementButton.addEventListener("click", updateOrientation);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  placementStatus.playerName = form.querySelector("input").value;
});

updateMsgDisplay();

export { SHIP_LIST, placementStatus, createBoardUI };
