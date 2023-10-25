"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[826,196,854,484,757],{

/***/ 417:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(283);


function Game() {
  let gameOver;
  const player = (0,_models__WEBPACK_IMPORTED_MODULE_0__/* .Player */ .J5)();
  const ai = (0,_models__WEBPACK_IMPORTED_MODULE_0__/* .Player */ .J5)();
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ 10:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J$: () => (/* binding */ createBoardUI),
/* harmony export */   SL: () => (/* binding */ gameOverScreen),
/* harmony export */   bH: () => (/* binding */ placeShipOnBoardUI),
/* harmony export */   hO: () => (/* binding */ playerMoveBoard),
/* harmony export */   hi: () => (/* binding */ updateEnemyMovesUI),
/* harmony export */   oV: () => (/* binding */ updatePlayerMovesUI)
/* harmony export */ });
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




/***/ }),

/***/ 138:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(417);
/* harmony import */ var _placeui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(148);
/* harmony import */ var _gameui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);





const game = (0,_game__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z)();
const modal = document.querySelector(".gameboard");

function randomChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

modal.addEventListener("animationend", () => {
  modal.remove();
  document.querySelector(".main-game").classList.remove("hidden");
  // transfer player ships on board's UI
  (0,_gameui__WEBPACK_IMPORTED_MODULE_1__/* .placeShipOnBoardUI */ .bH)(_placeui__WEBPACK_IMPORTED_MODULE_0__/* .placementStatus */ .T.dataPoints, "#enemy-board");
  // place player ships on game element
  _placeui__WEBPACK_IMPORTED_MODULE_0__/* .placementStatus */ .T.dataPoints.forEach((shipCoords) => {
    game.player.gameboard.place(shipCoords);
  });

  // update names
  if (_placeui__WEBPACK_IMPORTED_MODULE_0__/* .placementStatus */ .T.playerName) {
    game.player.setName(_placeui__WEBPACK_IMPORTED_MODULE_0__/* .placementStatus */ .T.playerName);
  } else {
    game.player.setName("Player");
  }
  game.ai.setName("AI");

  // AI places ships on game element
  let placed = 0;
  while (placed < Object.keys(_placeui__WEBPACK_IMPORTED_MODULE_0__/* .SHIP_LIST */ .D).length) {
    const arr = [];
    const orientation = randomChoice(["horizontal", "vertical"]);
    const x = Math.floor(Math.random() * game.player.gameboard.bounds.x_max);
    const y = Math.floor(Math.random() * game.player.gameboard.bounds.y_max);
    for (let i = 0; i < _placeui__WEBPACK_IMPORTED_MODULE_0__/* .SHIP_LIST */ .D[placed].length; i += 1) {
      if (orientation === "vertical") {
        arr.push([x, y + i]);
      } else {
        arr.push([x + i, y]);
      }
    }
    const isPlacedSuccess = game.ai.gameboard.place(arr);
    if (isPlacedSuccess) {
      placed += 1;
    }
  }
});

_gameui__WEBPACK_IMPORTED_MODULE_1__/* .playerMoveBoard */ .hO.addEventListener("click", (e) => {
  const x = e.target.dataset.idx % 10;
  const y = Math.floor(e.target.dataset.idx / 10);
  if (!game.gameOver) {
    const enemyShipHit = game.playRound([x, y]);
    (0,_gameui__WEBPACK_IMPORTED_MODULE_1__/* .updatePlayerMovesUI */ .oV)(e, enemyShipHit);
  }
  if (!game.gameOver) {
    const aiMove = game.player.gameboard.randomAttackPoint();
    const playerShipHit = game.playRound([aiMove.x, aiMove.y]);
    (0,_gameui__WEBPACK_IMPORTED_MODULE_1__/* .updateEnemyMovesUI */ .hi)(aiMove.x, aiMove.y, playerShipHit);
  }
  if (game.gameOver) {
    (0,_gameui__WEBPACK_IMPORTED_MODULE_1__/* .gameOverScreen */ .SL)(game.opponent.name);
  }
});


/***/ }),

/***/ 283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J5: () => (/* binding */ Player)
/* harmony export */ });
/* unused harmony exports Point, Ship, GameBoard */
const BOARD_MAX_IDX = 9;

function Point(x, y) {
  return { x, y };
}

function pointInList(list, point) {
  // a utility function to check if list of points contain a certain point
  return (
    list.length > 0 &&
    list.some((content) => content.x === point.x && content.y === point.y)
  );
}

function Ship(coordinateList) {
  let timesHit;
  const { length } = coordinateList;

  function hit() {
    if (!this.timesHit) {
      this.timesHit = 1;
    } else {
      this.timesHit += 1;
    }
  }

  function isSunk() {
    return this.timesHit >= length;
  }

  return { coordinateList, length, timesHit, hit, isSunk };
}

function GameBoard() {
  const shipsPlaced = [];
  const occupiedCells = [];
  const attackedCells = [];
  const bounds = {
    x_min: 0,
    x_max: BOARD_MAX_IDX,
    y_min: 0,
    y_max: BOARD_MAX_IDX,
  };

  function hasShip(point) {
    /*
    Checks if point object can be placed on the gameboard. 
    If another ship occupies the cell, return false
    input: Point object
    return: boolean
    */
    return pointInList(occupiedCells, point);
  }

  function place(coords) {
    /*
    Places ship on the gameboard only if the ship does not collide with
    other existing ships on the board.
    input: list of coordinates [int, int]
    */
    const shipCoords = [];
    coords.forEach((pair) => {
      const point = Point(pair[0], pair[1]);
      if (
        point.x >= bounds.x_min &&
        point.x <= bounds.x_max &&
        point.y >= bounds.y_min &&
        point.y <= bounds.y_max &&
        !hasShip(point)
      )
        shipCoords.push(point);
    });

    if (shipCoords.length === coords.length) {
      const ship = Ship(shipCoords);
      shipsPlaced.push(ship);
      shipCoords.forEach((point) => occupiedCells.push(point));
      return true;
    }
    return false;
  }

  function receiveAttack(pair) {
    /*
    Receives a pair of int coordinates. Point record is made and stored to avoid 
    reselection of already attacked point, regardless of hit or miss. If the point
    hits a coordinate on a listed ship (from shipsPlaced list), the hit function
    from the ship object is triggered
    input: pair of coordinates
    output: boolean (if attack was received)
    */
    const attackPoint = Point(...pair);
    if (pointInList(attackedCells, attackPoint)) return undefined;
    attackedCells.push(attackPoint);
    for (let i = 0; i < shipsPlaced.length; i += 1) {
      const shipCoords = shipsPlaced[i].coordinateList;
      if (pointInList(shipCoords, attackPoint)) {
        shipsPlaced[i].hit();
        if (shipsPlaced[i].isSunk()) {
          shipsPlaced.splice(i, 1);
        }
        break;
      }
    }
    return pointInList(occupiedCells, attackPoint);
  }

  function randomAttackPoint() {
    /*
    get random numbers to make a point, returns the random point if not
    present in list of previously attacked points, otherwise call the function
    again and return a new point
    return: point object
    */
    const x = Math.floor(Math.random() * bounds.x_max);
    const y = Math.floor(Math.random() * bounds.y_max);
    const point = Point(x, y);
    if (!pointInList(attackedCells, point)) return point;

    const newPoint = randomAttackPoint();
    return newPoint;
  }

  return {
    bounds,
    shipsPlaced,
    attackedCells,
    place,
    receiveAttack,
    randomAttackPoint,
  };
}

function Player(name) {
  let isWinner;
  const gameboard = GameBoard();
  function setName(string) {
    this.name = string;
  }
  return { name, isWinner, setName, gameboard };
}




/***/ }),

/***/ 148:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ SHIP_LIST),
/* harmony export */   T: () => (/* binding */ placementStatus)
/* harmony export */ });
/* harmony import */ var _gameui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


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

const placementBoard = (0,_gameui__WEBPACK_IMPORTED_MODULE_0__/* .createBoardUI */ .J$)("#placeships");
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




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(138));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWtDOztBQUVsQztBQUNBO0FBQ0EsaUJBQWlCLHlEQUFNO0FBQ3ZCLGFBQWEseURBQU07QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0NwQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQ0FBZ0M7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsSUFBSSxvQkFBb0IsSUFBSTtBQUN4RDtBQUNBLE9BQU87QUFDUCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxJQUFJO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFEQUFxRCxRQUFRO0FBQzdEO0FBQ0E7QUFDQTtBQUNBOztBQVNFOzs7Ozs7Ozs7OztBQ3JFbUI7QUFDSztBQUM2QjtBQU9yQzs7QUFFbEIsYUFBYSwwREFBSTtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLHFFQUFrQixDQUFDLDhEQUFlO0FBQ3BDO0FBQ0EsRUFBRSw4REFBZTtBQUNqQjtBQUNBLEdBQUc7O0FBRUg7QUFDQSxNQUFNLDhEQUFlO0FBQ3JCLHdCQUF3Qiw4REFBZTtBQUN2QyxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEIsd0RBQVM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsSUFBSSx3REFBUyxpQkFBaUI7QUFDbEQ7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCw4REFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxzRUFBbUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHFFQUFrQjtBQUN0QjtBQUNBO0FBQ0EsSUFBSSxpRUFBYztBQUNsQjtBQUNBLENBQUM7Ozs7Ozs7Ozs7OztBQ3hFRDs7QUFFQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxTQUFTOztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdCQUF3QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRTBDOzs7Ozs7Ozs7Ozs7O0FDOUlEOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsdUJBQXVCLGdFQUFhO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsNkNBQTZDLDRCQUE0QjtBQUN6RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxTQUFTO0FBQ25CO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHlDQUF5QyxJQUFJO0FBQzdDLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxJQUFJO0FBQy9DLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFc0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRvcC8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdG9wLy4vc3JjL2dhbWV1aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRvcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRvcC8uL3NyYy9tb2RlbHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10b3AvLi9zcmMvcGxhY2V1aS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9tb2RlbHNcIjtcblxuZnVuY3Rpb24gR2FtZSgpIHtcbiAgbGV0IGdhbWVPdmVyO1xuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcbiAgY29uc3QgYWkgPSBQbGF5ZXIoKTtcbiAgbGV0IGN1cnJlbnRQbGF5ZXI7XG4gIGxldCBvcHBvbmVudDtcblxuICBmdW5jdGlvbiBzd2l0Y2hQbGF5ZXIoKSB7XG4gICAgY29uc3QgY3VyID0gdGhpcy5jdXJyZW50UGxheWVyO1xuICAgIHRoaXMuY3VycmVudFBsYXllciA9IHRoaXMub3Bwb25lbnQ7XG4gICAgdGhpcy5vcHBvbmVudCA9IGN1cjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYXlSb3VuZChwYWlyKSB7XG4gICAgY29uc3QgaGl0TWFkZSA9IHRoaXMub3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socGFpcik7XG4gICAgaWYgKGhpdE1hZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zd2l0Y2hQbGF5ZXIoKTtcbiAgICAgIHRoaXMuZ2FtZU92ZXIgPVxuICAgICAgICB0aGlzLm9wcG9uZW50LmdhbWVib2FyZC5zaGlwc1BsYWNlZC5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgdGhpcy5jdXJyZW50UGxheWVyLmdhbWVib2FyZC5zaGlwc1BsYWNlZC5sZW5ndGggPT09IDA7XG4gICAgfVxuICAgIHJldHVybiBoaXRNYWRlO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBjdXJyZW50UGxheWVyID0gcGxheWVyO1xuICAgIG9wcG9uZW50ID0gYWk7XG4gICAgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgfVxuXG4gIGluaXQoKTtcblxuICByZXR1cm4ge1xuICAgIHBsYXllcixcbiAgICBhaSxcbiAgICBvcHBvbmVudCxcbiAgICBjdXJyZW50UGxheWVyLFxuICAgIHN3aXRjaFBsYXllcixcbiAgICBwbGF5Um91bmQsXG4gICAgZ2FtZU92ZXIsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJjb25zdCBCT0FSRF9IRUlHSFQgPSAxMDtcbmNvbnN0IEJPQVJEX1dJRFRIID0gMTA7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkVUkoaWQpIHtcbiAgLypcbiAgICBjcmVhdGVzIG4geCBuIGdyaWQgaW5zaWRlIGFueSBlbGVtZW50IHdpdGggaWQuIHJldHVybnMgdGhlIHBhcmVudCBlbGVtZW50IHdpdGhcbiAgICBpZCA9IGlkLlxuICAgICovXG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfSEVJR0hUICogQk9BUkRfV0lEVEg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgIGRpdi5kYXRhc2V0LmlkeCA9IGk7XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmNvbnN0IGVuZW15TW92ZUJvYXJkID0gY3JlYXRlQm9hcmRVSShcIiNlbmVteS1ib2FyZFwiKTtcbmNvbnN0IHBsYXllck1vdmVCb2FyZCA9IGNyZWF0ZUJvYXJkVUkoXCIjcGxheWVyLWJvYXJkXCIpO1xuXG5mdW5jdGlvbiBwbGFjZVNoaXBPbkJvYXJkVUkoYXJyLCBpZCkge1xuICBhcnIuZm9yRWFjaCgoc2hpcENvb3JkcykgPT4ge1xuICAgIHNoaXBDb29yZHNcbiAgICAgIC5tYXAoKHBvaW50KSA9PiBwb2ludFswXSArIHBvaW50WzFdICogMTApXG4gICAgICAuZm9yRWFjaCgoaWR4KSA9PiB7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoYCR7aWR9ID4gLmNlbGxbZGF0YS1pZHg9XCIke2lkeH1cIl1gKVxuICAgICAgICAgIC5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIik7XG4gICAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVBsYXllck1vdmVzVUkoZSwgc2hpcEhpdCkge1xuICBpZiAoIXNoaXBIaXQpIHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgfSBlbHNlIGlmIChzaGlwSGl0KSB7XG4gICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVFbmVteU1vdmVzVUkoeCwgeSwgcGxheWVyU2hpcEhpdCkge1xuICBsZXQgY2xhc3NOYW1lO1xuICBjb25zdCBpZHggPSB4ICsgeSAqIDEwO1xuICBpZiAoIXBsYXllclNoaXBIaXQpIHtcbiAgICBjbGFzc05hbWUgPSBcIm1pc3NcIjtcbiAgfSBlbHNlIHtcbiAgICBjbGFzc05hbWUgPSBcImhpdFwiO1xuICB9XG4gIGVuZW15TW92ZUJvYXJkXG4gICAgLnF1ZXJ5U2VsZWN0b3IoYCNlbmVteS1ib2FyZCA+IC5jZWxsW2RhdGEtaWR4PVwiJHtpZHh9XCJdYClcbiAgICAuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xufVxuXG5mdW5jdGlvbiBnYW1lT3ZlclNjcmVlbih3aW5uZXIpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hbGVydFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dpbm1zZ1wiKS50ZXh0Q29udGVudCA9IGAke3dpbm5lcn0gd2lucyFgO1xuICBkb2N1bWVudFxuICAgIC5xdWVyeVNlbGVjdG9yKFwiLmFsZXJ0LWNvbnRlbnQgPiBidXR0b25cIilcbiAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKSk7XG59XG5cbmV4cG9ydCB7XG4gIHBsYXllck1vdmVCb2FyZCxcbiAgcGxhY2VTaGlwT25Cb2FyZFVJLFxuICB1cGRhdGVQbGF5ZXJNb3Zlc1VJLFxuICB1cGRhdGVFbmVteU1vdmVzVUksXG4gIGNyZWF0ZUJvYXJkVUksXG4gIGdhbWVPdmVyU2NyZWVuLFxufTtcbiIsImltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lXCI7XG5pbXBvcnQgeyBTSElQX0xJU1QsIHBsYWNlbWVudFN0YXR1cyB9IGZyb20gXCIuL3BsYWNldWlcIjtcbmltcG9ydCB7XG4gIHBsYXllck1vdmVCb2FyZCxcbiAgcGxhY2VTaGlwT25Cb2FyZFVJLFxuICB1cGRhdGVQbGF5ZXJNb3Zlc1VJLFxuICB1cGRhdGVFbmVteU1vdmVzVUksXG4gIGdhbWVPdmVyU2NyZWVuLFxufSBmcm9tIFwiLi9nYW1ldWlcIjtcblxuY29uc3QgZ2FtZSA9IEdhbWUoKTtcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIik7XG5cbmZ1bmN0aW9uIHJhbmRvbUNob2ljZShhcnIpIHtcbiAgcmV0dXJuIGFycltNYXRoLmZsb29yKGFyci5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKV07XG59XG5cbm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIiwgKCkgPT4ge1xuICBtb2RhbC5yZW1vdmUoKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWdhbWVcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgLy8gdHJhbnNmZXIgcGxheWVyIHNoaXBzIG9uIGJvYXJkJ3MgVUlcbiAgcGxhY2VTaGlwT25Cb2FyZFVJKHBsYWNlbWVudFN0YXR1cy5kYXRhUG9pbnRzLCBcIiNlbmVteS1ib2FyZFwiKTtcbiAgLy8gcGxhY2UgcGxheWVyIHNoaXBzIG9uIGdhbWUgZWxlbWVudFxuICBwbGFjZW1lbnRTdGF0dXMuZGF0YVBvaW50cy5mb3JFYWNoKChzaGlwQ29vcmRzKSA9PiB7XG4gICAgZ2FtZS5wbGF5ZXIuZ2FtZWJvYXJkLnBsYWNlKHNoaXBDb29yZHMpO1xuICB9KTtcblxuICAvLyB1cGRhdGUgbmFtZXNcbiAgaWYgKHBsYWNlbWVudFN0YXR1cy5wbGF5ZXJOYW1lKSB7XG4gICAgZ2FtZS5wbGF5ZXIuc2V0TmFtZShwbGFjZW1lbnRTdGF0dXMucGxheWVyTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZ2FtZS5wbGF5ZXIuc2V0TmFtZShcIlBsYXllclwiKTtcbiAgfVxuICBnYW1lLmFpLnNldE5hbWUoXCJBSVwiKTtcblxuICAvLyBBSSBwbGFjZXMgc2hpcHMgb24gZ2FtZSBlbGVtZW50XG4gIGxldCBwbGFjZWQgPSAwO1xuICB3aGlsZSAocGxhY2VkIDwgT2JqZWN0LmtleXMoU0hJUF9MSVNUKS5sZW5ndGgpIHtcbiAgICBjb25zdCBhcnIgPSBbXTtcbiAgICBjb25zdCBvcmllbnRhdGlvbiA9IHJhbmRvbUNob2ljZShbXCJob3Jpem9udGFsXCIsIFwidmVydGljYWxcIl0pO1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBnYW1lLnBsYXllci5nYW1lYm9hcmQuYm91bmRzLnhfbWF4KTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZ2FtZS5wbGF5ZXIuZ2FtZWJvYXJkLmJvdW5kcy55X21heCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTSElQX0xJU1RbcGxhY2VkXS5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgICAgYXJyLnB1c2goW3gsIHkgKyBpXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcnIucHVzaChbeCArIGksIHldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgaXNQbGFjZWRTdWNjZXNzID0gZ2FtZS5haS5nYW1lYm9hcmQucGxhY2UoYXJyKTtcbiAgICBpZiAoaXNQbGFjZWRTdWNjZXNzKSB7XG4gICAgICBwbGFjZWQgKz0gMTtcbiAgICB9XG4gIH1cbn0pO1xuXG5wbGF5ZXJNb3ZlQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnN0IHggPSBlLnRhcmdldC5kYXRhc2V0LmlkeCAlIDEwO1xuICBjb25zdCB5ID0gTWF0aC5mbG9vcihlLnRhcmdldC5kYXRhc2V0LmlkeCAvIDEwKTtcbiAgaWYgKCFnYW1lLmdhbWVPdmVyKSB7XG4gICAgY29uc3QgZW5lbXlTaGlwSGl0ID0gZ2FtZS5wbGF5Um91bmQoW3gsIHldKTtcbiAgICB1cGRhdGVQbGF5ZXJNb3Zlc1VJKGUsIGVuZW15U2hpcEhpdCk7XG4gIH1cbiAgaWYgKCFnYW1lLmdhbWVPdmVyKSB7XG4gICAgY29uc3QgYWlNb3ZlID0gZ2FtZS5wbGF5ZXIuZ2FtZWJvYXJkLnJhbmRvbUF0dGFja1BvaW50KCk7XG4gICAgY29uc3QgcGxheWVyU2hpcEhpdCA9IGdhbWUucGxheVJvdW5kKFthaU1vdmUueCwgYWlNb3ZlLnldKTtcbiAgICB1cGRhdGVFbmVteU1vdmVzVUkoYWlNb3ZlLngsIGFpTW92ZS55LCBwbGF5ZXJTaGlwSGl0KTtcbiAgfVxuICBpZiAoZ2FtZS5nYW1lT3Zlcikge1xuICAgIGdhbWVPdmVyU2NyZWVuKGdhbWUub3Bwb25lbnQubmFtZSk7XG4gIH1cbn0pO1xuIiwiY29uc3QgQk9BUkRfTUFYX0lEWCA9IDk7XG5cbmZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcbiAgcmV0dXJuIHsgeCwgeSB9O1xufVxuXG5mdW5jdGlvbiBwb2ludEluTGlzdChsaXN0LCBwb2ludCkge1xuICAvLyBhIHV0aWxpdHkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgbGlzdCBvZiBwb2ludHMgY29udGFpbiBhIGNlcnRhaW4gcG9pbnRcbiAgcmV0dXJuIChcbiAgICBsaXN0Lmxlbmd0aCA+IDAgJiZcbiAgICBsaXN0LnNvbWUoKGNvbnRlbnQpID0+IGNvbnRlbnQueCA9PT0gcG9pbnQueCAmJiBjb250ZW50LnkgPT09IHBvaW50LnkpXG4gICk7XG59XG5cbmZ1bmN0aW9uIFNoaXAoY29vcmRpbmF0ZUxpc3QpIHtcbiAgbGV0IHRpbWVzSGl0O1xuICBjb25zdCB7IGxlbmd0aCB9ID0gY29vcmRpbmF0ZUxpc3Q7XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIGlmICghdGhpcy50aW1lc0hpdCkge1xuICAgICAgdGhpcy50aW1lc0hpdCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGltZXNIaXQgKz0gMTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMudGltZXNIaXQgPj0gbGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZUxpc3QsIGxlbmd0aCwgdGltZXNIaXQsIGhpdCwgaXNTdW5rIH07XG59XG5cbmZ1bmN0aW9uIEdhbWVCb2FyZCgpIHtcbiAgY29uc3Qgc2hpcHNQbGFjZWQgPSBbXTtcbiAgY29uc3Qgb2NjdXBpZWRDZWxscyA9IFtdO1xuICBjb25zdCBhdHRhY2tlZENlbGxzID0gW107XG4gIGNvbnN0IGJvdW5kcyA9IHtcbiAgICB4X21pbjogMCxcbiAgICB4X21heDogQk9BUkRfTUFYX0lEWCxcbiAgICB5X21pbjogMCxcbiAgICB5X21heDogQk9BUkRfTUFYX0lEWCxcbiAgfTtcblxuICBmdW5jdGlvbiBoYXNTaGlwKHBvaW50KSB7XG4gICAgLypcbiAgICBDaGVja3MgaWYgcG9pbnQgb2JqZWN0IGNhbiBiZSBwbGFjZWQgb24gdGhlIGdhbWVib2FyZC4gXG4gICAgSWYgYW5vdGhlciBzaGlwIG9jY3VwaWVzIHRoZSBjZWxsLCByZXR1cm4gZmFsc2VcbiAgICBpbnB1dDogUG9pbnQgb2JqZWN0XG4gICAgcmV0dXJuOiBib29sZWFuXG4gICAgKi9cbiAgICByZXR1cm4gcG9pbnRJbkxpc3Qob2NjdXBpZWRDZWxscywgcG9pbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2UoY29vcmRzKSB7XG4gICAgLypcbiAgICBQbGFjZXMgc2hpcCBvbiB0aGUgZ2FtZWJvYXJkIG9ubHkgaWYgdGhlIHNoaXAgZG9lcyBub3QgY29sbGlkZSB3aXRoXG4gICAgb3RoZXIgZXhpc3Rpbmcgc2hpcHMgb24gdGhlIGJvYXJkLlxuICAgIGlucHV0OiBsaXN0IG9mIGNvb3JkaW5hdGVzIFtpbnQsIGludF1cbiAgICAqL1xuICAgIGNvbnN0IHNoaXBDb29yZHMgPSBbXTtcbiAgICBjb29yZHMuZm9yRWFjaCgocGFpcikgPT4ge1xuICAgICAgY29uc3QgcG9pbnQgPSBQb2ludChwYWlyWzBdLCBwYWlyWzFdKTtcbiAgICAgIGlmIChcbiAgICAgICAgcG9pbnQueCA+PSBib3VuZHMueF9taW4gJiZcbiAgICAgICAgcG9pbnQueCA8PSBib3VuZHMueF9tYXggJiZcbiAgICAgICAgcG9pbnQueSA+PSBib3VuZHMueV9taW4gJiZcbiAgICAgICAgcG9pbnQueSA8PSBib3VuZHMueV9tYXggJiZcbiAgICAgICAgIWhhc1NoaXAocG9pbnQpXG4gICAgICApXG4gICAgICAgIHNoaXBDb29yZHMucHVzaChwb2ludCk7XG4gICAgfSk7XG5cbiAgICBpZiAoc2hpcENvb3Jkcy5sZW5ndGggPT09IGNvb3Jkcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBTaGlwKHNoaXBDb29yZHMpO1xuICAgICAgc2hpcHNQbGFjZWQucHVzaChzaGlwKTtcbiAgICAgIHNoaXBDb29yZHMuZm9yRWFjaCgocG9pbnQpID0+IG9jY3VwaWVkQ2VsbHMucHVzaChwb2ludCkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2socGFpcikge1xuICAgIC8qXG4gICAgUmVjZWl2ZXMgYSBwYWlyIG9mIGludCBjb29yZGluYXRlcy4gUG9pbnQgcmVjb3JkIGlzIG1hZGUgYW5kIHN0b3JlZCB0byBhdm9pZCBcbiAgICByZXNlbGVjdGlvbiBvZiBhbHJlYWR5IGF0dGFja2VkIHBvaW50LCByZWdhcmRsZXNzIG9mIGhpdCBvciBtaXNzLiBJZiB0aGUgcG9pbnRcbiAgICBoaXRzIGEgY29vcmRpbmF0ZSBvbiBhIGxpc3RlZCBzaGlwIChmcm9tIHNoaXBzUGxhY2VkIGxpc3QpLCB0aGUgaGl0IGZ1bmN0aW9uXG4gICAgZnJvbSB0aGUgc2hpcCBvYmplY3QgaXMgdHJpZ2dlcmVkXG4gICAgaW5wdXQ6IHBhaXIgb2YgY29vcmRpbmF0ZXNcbiAgICBvdXRwdXQ6IGJvb2xlYW4gKGlmIGF0dGFjayB3YXMgcmVjZWl2ZWQpXG4gICAgKi9cbiAgICBjb25zdCBhdHRhY2tQb2ludCA9IFBvaW50KC4uLnBhaXIpO1xuICAgIGlmIChwb2ludEluTGlzdChhdHRhY2tlZENlbGxzLCBhdHRhY2tQb2ludCkpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgYXR0YWNrZWRDZWxscy5wdXNoKGF0dGFja1BvaW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzUGxhY2VkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzaGlwQ29vcmRzID0gc2hpcHNQbGFjZWRbaV0uY29vcmRpbmF0ZUxpc3Q7XG4gICAgICBpZiAocG9pbnRJbkxpc3Qoc2hpcENvb3JkcywgYXR0YWNrUG9pbnQpKSB7XG4gICAgICAgIHNoaXBzUGxhY2VkW2ldLmhpdCgpO1xuICAgICAgICBpZiAoc2hpcHNQbGFjZWRbaV0uaXNTdW5rKCkpIHtcbiAgICAgICAgICBzaGlwc1BsYWNlZC5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwb2ludEluTGlzdChvY2N1cGllZENlbGxzLCBhdHRhY2tQb2ludCk7XG4gIH1cblxuICBmdW5jdGlvbiByYW5kb21BdHRhY2tQb2ludCgpIHtcbiAgICAvKlxuICAgIGdldCByYW5kb20gbnVtYmVycyB0byBtYWtlIGEgcG9pbnQsIHJldHVybnMgdGhlIHJhbmRvbSBwb2ludCBpZiBub3RcbiAgICBwcmVzZW50IGluIGxpc3Qgb2YgcHJldmlvdXNseSBhdHRhY2tlZCBwb2ludHMsIG90aGVyd2lzZSBjYWxsIHRoZSBmdW5jdGlvblxuICAgIGFnYWluIGFuZCByZXR1cm4gYSBuZXcgcG9pbnRcbiAgICByZXR1cm46IHBvaW50IG9iamVjdFxuICAgICovXG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvdW5kcy54X21heCk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvdW5kcy55X21heCk7XG4gICAgY29uc3QgcG9pbnQgPSBQb2ludCh4LCB5KTtcbiAgICBpZiAoIXBvaW50SW5MaXN0KGF0dGFja2VkQ2VsbHMsIHBvaW50KSkgcmV0dXJuIHBvaW50O1xuXG4gICAgY29uc3QgbmV3UG9pbnQgPSByYW5kb21BdHRhY2tQb2ludCgpO1xuICAgIHJldHVybiBuZXdQb2ludDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYm91bmRzLFxuICAgIHNoaXBzUGxhY2VkLFxuICAgIGF0dGFja2VkQ2VsbHMsXG4gICAgcGxhY2UsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICByYW5kb21BdHRhY2tQb2ludCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gUGxheWVyKG5hbWUpIHtcbiAgbGV0IGlzV2lubmVyO1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgZnVuY3Rpb24gc2V0TmFtZShzdHJpbmcpIHtcbiAgICB0aGlzLm5hbWUgPSBzdHJpbmc7XG4gIH1cbiAgcmV0dXJuIHsgbmFtZSwgaXNXaW5uZXIsIHNldE5hbWUsIGdhbWVib2FyZCB9O1xufVxuXG5leHBvcnQgeyBQb2ludCwgU2hpcCwgR2FtZUJvYXJkLCBQbGF5ZXIgfTtcbiIsImltcG9ydCB7IGNyZWF0ZUJvYXJkVUkgfSBmcm9tIFwiLi9nYW1ldWlcIjtcblxuY29uc3QgU0hJUF9MSVNUID0ge1xuICAwOiB7XG4gICAgdGl0bGU6IFwiY2FycmllclwiLFxuICAgIGxlbmd0aDogNSxcbiAgfSxcbiAgMToge1xuICAgIHRpdGxlOiBcImJhdHRsZXNoaXBcIixcbiAgICBsZW5ndGg6IDQsXG4gIH0sXG4gIDI6IHtcbiAgICB0aXRsZTogXCJzdWJtYXJpbmVcIixcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIDM6IHtcbiAgICB0aXRsZTogXCJkZXN0cm95ZXJcIixcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIDQ6IHtcbiAgICB0aXRsZTogXCJwYXRyb2xcIixcbiAgICBsZW5ndGg6IDIsXG4gIH0sXG59O1xuXG5jb25zdCBwbGFjZW1lbnRCb2FyZCA9IGNyZWF0ZUJvYXJkVUkoXCIjcGxhY2VzaGlwc1wiKTtcbmNvbnN0IHBsYWNlbWVudEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkID4gYnV0dG9uXCIpO1xuY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZm9ybVwiKTtcblxuLypcbnBsYWNlbWVudFN0YXR1cyBvYmplY3QgdXNlZCB0byB0cmFjayBpbW1lZGlhdGUgY2hhbmdlcyB0byB0aGUgcGxhY2VtZW50IFVJLCBpbmNsdWRpbmdcbnNoaXAgY3VycmVudGx5IGJlaW5nIHBsYWNlZCwgb3JpZW50YXRpb24sIGNvb3JkaW5hdGVzIGFzIGhpZ2hsaWdodGVkLCBjZWxscyBhbHJlYWR5XG5vY2N1cGllZCBhbmQgc2V0IG9mIGNvb3JkaW5hdGVzIHRvIGJlIHVzZWQgYXMgcGxheWVyJ3Mgc2hpcCBjb29yZGluYXRlc1xuKi9cbmNvbnN0IHBsYWNlbWVudFN0YXR1cyA9IHtcbiAgc2hpcElkeDogMCxcbiAgb3JpZW50YXRpb246IFwidmVydGljYWxcIixcbiAgaGlnaGxpZ2h0ZWRDb29yZHM6IHVuZGVmaW5lZCxcbiAgb2NjdXBpZWRDZWxsczogW10sXG4gIGRhdGFQb2ludHM6IFtdLFxuICBwbGF5ZXJOYW1lOiB1bmRlZmluZWQsXG59O1xuXG5mdW5jdGlvbiB1cGRhdGVNc2dEaXNwbGF5KCkge1xuICAvKlxuICBjbGVhcnMgdGV4dCBjb250ZW50IG9mIG1lc3NhZ2UgYm94ZXMgc2hvd2luZyBzaGlwIG5hbWUgYW5kIG9yaWVudGF0aW9uIGFuZFxuICB1cGRhdGVzIGNvbnRlbnQgd2l0aCB0aGUgbGF0ZXN0IHNoaXAgbmFtZSBhbmQgb3JpZW50YXRpb24uXG4gICovXG4gIGNvbnN0IG1haW5Nc2dFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmQgPiAjcGxhY2VzaGlwLXN0YXR1c1wiKTtcbiAgY29uc3Qgc3ViTXNnRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkID4gLm9yaWVudGF0aW9uXCIpO1xuICBpZiAocGxhY2VtZW50U3RhdHVzLnNoaXBJZHggPCBPYmplY3Qua2V5cyhTSElQX0xJU1QpLmxlbmd0aCkge1xuICAgIG1haW5Nc2dFbGVtLnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgJHtcbiAgICAgIFNISVBfTElTVFtwbGFjZW1lbnRTdGF0dXMuc2hpcElkeF0udGl0bGVcbiAgICB9YDtcbiAgICBzdWJNc2dFbGVtLnRleHRDb250ZW50ID0gYE9yaWVudGF0aW9uOiAke3BsYWNlbWVudFN0YXR1cy5vcmllbnRhdGlvbn1gO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZU9yaWVudGF0aW9uKCkge1xuICBwbGFjZW1lbnRTdGF0dXMub3JpZW50YXRpb24gPVxuICAgIHBsYWNlbWVudFN0YXR1cy5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiID8gXCJob3Jpem9udGFsXCIgOiBcInZlcnRpY2FsXCI7XG4gIHVwZGF0ZU1zZ0Rpc3BsYXkoKTtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0U2hpcChlKSB7XG4gIC8qXG4gIGhpZ2hsaWdodHMgY2VsbHMgYmFzZWQgb24gY3VycmVudCBzaGlwIG5hbWUgKGFuZCBsZW5ndGgpLCBhbmQgZ2V0cyBjb29yZGluYXRlc1xuICBvZiBzYWlkIGhpZ2hsaWdodGVkIGNlbGxzIGRlcGVuZGluZyBvbiBzdGF0ZSBvZiBvcmllbnRhdGlvbi4gdGhlIGNvb2RpbmF0ZXMgYXJlIFxuICBmaWx0ZXJlZCBvdXQgaWYgb3V0IG9mIGJvdW5kc1xuICAqL1xuICBjb25zdCB7IGxlbmd0aCB9ID0gU0hJUF9MSVNUW3BsYWNlbWVudFN0YXR1cy5zaGlwSWR4XTtcbiAgY29uc3QgeCA9IGUudGFyZ2V0LmRhdGFzZXQuaWR4ICUgMTA7XG4gIGNvbnN0IHkgPSBNYXRoLmZsb29yKGUudGFyZ2V0LmRhdGFzZXQuaWR4IC8gMTApO1xuXG4gIGNvbnN0IHRlbXBDb29yZHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChwbGFjZW1lbnRTdGF0dXMub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIikge1xuICAgICAgdGVtcENvb3Jkcy5wdXNoKFt4LCB5ICsgaV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wQ29vcmRzLnB1c2goW3ggKyBpLCB5XSk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29vcmRzID0gdGVtcENvb3Jkcy5maWx0ZXIoXG4gICAgKHBvaW50KSA9PiBwb2ludFswXSA+PSAwICYmIHBvaW50WzBdIDwgMTAgJiYgcG9pbnRbMV0gPj0gMCAmJiBwb2ludFsxXSA8IDEwXG4gICk7XG4gIHBsYWNlbWVudFN0YXR1cy5oaWdobGlnaHRlZENvb3JkcyA9IGNvb3JkcztcbiAgY29uc3Qgc2VsZWN0b3JJbmRpY2VzID0gY29vcmRzLm1hcCgocG9pbnQpID0+IHBvaW50WzBdICsgcG9pbnRbMV0gKiAxMCk7XG5cbiAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3BsYWNlc2hpcHMgPiAuY2VsbFwiKTtcbiAgY2VsbHMuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIik7XG4gIH0pO1xuICBzZWxlY3RvckluZGljZXMuZm9yRWFjaCgoaWR4KSA9PiB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWR4PVwiJHtpZHh9XCJdYCkuY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVBZGRlZCgpIHtcbiAgLypcbiAgY2hlY2tzIGlmIGN1cnJlbnRseSBoaWdobGlnaHRlZCBjb29yZGluYXRlcyBjbGFzaCB3aXRoIGV4aXN0aW5nIHBvaW50cyBvblxuICB0aGUgYm9hcmQuIElmIG5vIGNsYXNoZXMgYXJlIGRldGVjdGVkIGFuZCB0aGUgaGlnaGxpZ2h0ZWQgY29vcmRpbmF0ZXNcbiAgYXJlIHdpdGhpbiBib3VuZHMsIHRoZSBzZXQgb2YgY29vcmRpbmF0ZXMgYXJlIG5vdGVkIHRvIGxpc3Qgb2YgYWxyZWFkeVxuICBwbGFjZWQgcG9pbnRzIGFuZCBhbHNvIGFkZGVkIGludG8gYSBsaXN0IG9mIHNoaXAgY29vcmRpbmF0ZXMuIFRoaXMgbWV0aG9kXG4gIGlzIGFjdGl2ZSB1bnRpbCBhbGwgdGhlIHNoaXBzIGFyZSBwbGFjZWQgYW5kIHRoZSBtYWluIFVJIG9mIHRoZSBnYW1lIGlzIGxvYWRlZC5cbiAgKi9cbiAgY29uc3QgaGFzQ2xhc2hlcyA9IHBsYWNlbWVudFN0YXR1cy5oaWdobGlnaHRlZENvb3Jkcy5zb21lKChwYWlyKSA9PlxuICAgIHBsYWNlbWVudFN0YXR1cy5vY2N1cGllZENlbGxzLnNvbWUoXG4gICAgICAocCkgPT4gcFswXSA9PT0gcGFpclswXSAmJiBwWzFdID09PSBwYWlyWzFdXG4gICAgKVxuICApO1xuICBpZiAoXG4gICAgIWhhc0NsYXNoZXMgJiZcbiAgICBwbGFjZW1lbnRTdGF0dXMuaGlnaGxpZ2h0ZWRDb29yZHMubGVuZ3RoID09PVxuICAgICAgU0hJUF9MSVNUW3BsYWNlbWVudFN0YXR1cy5zaGlwSWR4XS5sZW5ndGggJiZcbiAgICBwbGFjZW1lbnRTdGF0dXMuZGF0YVBvaW50cy5sZW5ndGggPCBPYmplY3Qua2V5cyhTSElQX0xJU1QpLmxlbmd0aFxuICApIHtcbiAgICBwbGFjZW1lbnRTdGF0dXMub2NjdXBpZWRDZWxscyA9IHBsYWNlbWVudFN0YXR1cy5vY2N1cGllZENlbGxzLmNvbmNhdChcbiAgICAgIHBsYWNlbWVudFN0YXR1cy5oaWdobGlnaHRlZENvb3Jkc1xuICAgICk7XG4gICAgcGxhY2VtZW50U3RhdHVzLmRhdGFQb2ludHMucHVzaChwbGFjZW1lbnRTdGF0dXMuaGlnaGxpZ2h0ZWRDb29yZHMpO1xuICAgIHBsYWNlbWVudFN0YXR1cy5zaGlwSWR4ICs9IDE7XG5cbiAgICAvLyB1cGRhdGUgb2YgdWlcbiAgICBjb25zdCBpbmRpY2VzID0gcGxhY2VtZW50U3RhdHVzLmhpZ2hsaWdodGVkQ29vcmRzLm1hcChcbiAgICAgIChwb2ludCkgPT4gcG9pbnRbMF0gKyBwb2ludFsxXSAqIDEwXG4gICAgKTtcbiAgICBpbmRpY2VzLmZvckVhY2goKGlkeCkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtaWR4PVwiJHtpZHh9XCJdYCkuY2xhc3NMaXN0LmFkZChcIm9jY3VwaWVkXCIpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gY29uZGl0aW9uIHRvIGV4aXRcbiAgaWYgKHBsYWNlbWVudFN0YXR1cy5zaGlwSWR4ID09PSBPYmplY3Qua2V5cyhTSElQX0xJU1QpLmxlbmd0aCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICBmb3JtLnJlcXVlc3RTdWJtaXQoKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVNc2dEaXNwbGF5KCk7XG4gIH1cbn1cblxucGxhY2VtZW50Qm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJvdmVyXCIsIGhpZ2hsaWdodFNoaXApO1xucGxhY2VtZW50Qm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHVwZGF0ZUFkZGVkKTtcbnBsYWNlbWVudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdXBkYXRlT3JpZW50YXRpb24pO1xuZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgcGxhY2VtZW50U3RhdHVzLnBsYXllck5hbWUgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKS52YWx1ZTtcbn0pO1xuXG51cGRhdGVNc2dEaXNwbGF5KCk7XG5cbmV4cG9ydCB7IFNISVBfTElTVCwgcGxhY2VtZW50U3RhdHVzIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=