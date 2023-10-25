"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[854,484],{

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
/******/ var __webpack_exports__ = (__webpack_exec__(148));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2V1aS5tYWluLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0NBQWdDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLElBQUksb0JBQW9CLElBQUk7QUFDeEQ7QUFDQSxPQUFPO0FBQ1AsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxxREFBcUQsSUFBSTtBQUN6RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxREFBcUQsUUFBUTtBQUM3RDtBQUNBO0FBQ0E7QUFDQTs7QUFTRTs7Ozs7Ozs7Ozs7OztBQ3JFdUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSx1QkFBdUIsZ0VBQWE7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw2Q0FBNkMsNEJBQTRCO0FBQ3pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EseUNBQXlDLElBQUk7QUFDN0MsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLElBQUk7QUFDL0MsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVzQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAtdG9wLy4vc3JjL2dhbWV1aS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRvcC8uL3NyYy9wbGFjZXVpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJPQVJEX0hFSUdIVCA9IDEwO1xuY29uc3QgQk9BUkRfV0lEVEggPSAxMDtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmRVSShpZCkge1xuICAvKlxuICAgIGNyZWF0ZXMgbiB4IG4gZ3JpZCBpbnNpZGUgYW55IGVsZW1lbnQgd2l0aCBpZC4gcmV0dXJucyB0aGUgcGFyZW50IGVsZW1lbnQgd2l0aFxuICAgIGlkID0gaWQuXG4gICAgKi9cbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBCT0FSRF9IRUlHSFQgKiBCT0FSRF9XSURUSDsgaSArPSAxKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgZGl2LmRhdGFzZXQuaWR4ID0gaTtcbiAgICBib2FyZC5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuY29uc3QgZW5lbXlNb3ZlQm9hcmQgPSBjcmVhdGVCb2FyZFVJKFwiI2VuZW15LWJvYXJkXCIpO1xuY29uc3QgcGxheWVyTW92ZUJvYXJkID0gY3JlYXRlQm9hcmRVSShcIiNwbGF5ZXItYm9hcmRcIik7XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcE9uQm9hcmRVSShhcnIsIGlkKSB7XG4gIGFyci5mb3JFYWNoKChzaGlwQ29vcmRzKSA9PiB7XG4gICAgc2hpcENvb3Jkc1xuICAgICAgLm1hcCgocG9pbnQpID0+IHBvaW50WzBdICsgcG9pbnRbMV0gKiAxMClcbiAgICAgIC5mb3JFYWNoKChpZHgpID0+IHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgJHtpZH0gPiAuY2VsbFtkYXRhLWlkeD1cIiR7aWR4fVwiXWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUGxheWVyTW92ZXNVSShlLCBzaGlwSGl0KSB7XG4gIGlmICghc2hpcEhpdCkge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICB9IGVsc2UgaWYgKHNoaXBIaXQpIHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUVuZW15TW92ZXNVSSh4LCB5LCBwbGF5ZXJTaGlwSGl0KSB7XG4gIGxldCBjbGFzc05hbWU7XG4gIGNvbnN0IGlkeCA9IHggKyB5ICogMTA7XG4gIGlmICghcGxheWVyU2hpcEhpdCkge1xuICAgIGNsYXNzTmFtZSA9IFwibWlzc1wiO1xuICB9IGVsc2Uge1xuICAgIGNsYXNzTmFtZSA9IFwiaGl0XCI7XG4gIH1cbiAgZW5lbXlNb3ZlQm9hcmRcbiAgICAucXVlcnlTZWxlY3RvcihgI2VuZW15LWJvYXJkID4gLmNlbGxbZGF0YS1pZHg9XCIke2lkeH1cIl1gKVxuICAgIC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGdhbWVPdmVyU2NyZWVuKHdpbm5lcikge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFsZXJ0XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2lubXNnXCIpLnRleHRDb250ZW50ID0gYCR7d2lubmVyfSB3aW5zIWA7XG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWxlcnQtY29udGVudCA+IGJ1dHRvblwiKVxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpKTtcbn1cblxuZXhwb3J0IHtcbiAgcGxheWVyTW92ZUJvYXJkLFxuICBwbGFjZVNoaXBPbkJvYXJkVUksXG4gIHVwZGF0ZVBsYXllck1vdmVzVUksXG4gIHVwZGF0ZUVuZW15TW92ZXNVSSxcbiAgY3JlYXRlQm9hcmRVSSxcbiAgZ2FtZU92ZXJTY3JlZW4sXG59O1xuIiwiaW1wb3J0IHsgY3JlYXRlQm9hcmRVSSB9IGZyb20gXCIuL2dhbWV1aVwiO1xuXG5jb25zdCBTSElQX0xJU1QgPSB7XG4gIDA6IHtcbiAgICB0aXRsZTogXCJjYXJyaWVyXCIsXG4gICAgbGVuZ3RoOiA1LFxuICB9LFxuICAxOiB7XG4gICAgdGl0bGU6IFwiYmF0dGxlc2hpcFwiLFxuICAgIGxlbmd0aDogNCxcbiAgfSxcbiAgMjoge1xuICAgIHRpdGxlOiBcInN1Ym1hcmluZVwiLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAgMzoge1xuICAgIHRpdGxlOiBcImRlc3Ryb3llclwiLFxuICAgIGxlbmd0aDogMyxcbiAgfSxcbiAgNDoge1xuICAgIHRpdGxlOiBcInBhdHJvbFwiLFxuICAgIGxlbmd0aDogMixcbiAgfSxcbn07XG5cbmNvbnN0IHBsYWNlbWVudEJvYXJkID0gY3JlYXRlQm9hcmRVSShcIiNwbGFjZXNoaXBzXCIpO1xuY29uc3QgcGxhY2VtZW50QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmQgPiBidXR0b25cIik7XG5jb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb3JtXCIpO1xuXG4vKlxucGxhY2VtZW50U3RhdHVzIG9iamVjdCB1c2VkIHRvIHRyYWNrIGltbWVkaWF0ZSBjaGFuZ2VzIHRvIHRoZSBwbGFjZW1lbnQgVUksIGluY2x1ZGluZ1xuc2hpcCBjdXJyZW50bHkgYmVpbmcgcGxhY2VkLCBvcmllbnRhdGlvbiwgY29vcmRpbmF0ZXMgYXMgaGlnaGxpZ2h0ZWQsIGNlbGxzIGFscmVhZHlcbm9jY3VwaWVkIGFuZCBzZXQgb2YgY29vcmRpbmF0ZXMgdG8gYmUgdXNlZCBhcyBwbGF5ZXIncyBzaGlwIGNvb3JkaW5hdGVzXG4qL1xuY29uc3QgcGxhY2VtZW50U3RhdHVzID0ge1xuICBzaGlwSWR4OiAwLFxuICBvcmllbnRhdGlvbjogXCJ2ZXJ0aWNhbFwiLFxuICBoaWdobGlnaHRlZENvb3JkczogdW5kZWZpbmVkLFxuICBvY2N1cGllZENlbGxzOiBbXSxcbiAgZGF0YVBvaW50czogW10sXG4gIHBsYXllck5hbWU6IHVuZGVmaW5lZCxcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZU1zZ0Rpc3BsYXkoKSB7XG4gIC8qXG4gIGNsZWFycyB0ZXh0IGNvbnRlbnQgb2YgbWVzc2FnZSBib3hlcyBzaG93aW5nIHNoaXAgbmFtZSBhbmQgb3JpZW50YXRpb24gYW5kXG4gIHVwZGF0ZXMgY29udGVudCB3aXRoIHRoZSBsYXRlc3Qgc2hpcCBuYW1lIGFuZCBvcmllbnRhdGlvbi5cbiAgKi9cbiAgY29uc3QgbWFpbk1zZ0VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZCA+ICNwbGFjZXNoaXAtc3RhdHVzXCIpO1xuICBjb25zdCBzdWJNc2dFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmQgPiAub3JpZW50YXRpb25cIik7XG4gIGlmIChwbGFjZW1lbnRTdGF0dXMuc2hpcElkeCA8IE9iamVjdC5rZXlzKFNISVBfTElTVCkubGVuZ3RoKSB7XG4gICAgbWFpbk1zZ0VsZW0udGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke1xuICAgICAgU0hJUF9MSVNUW3BsYWNlbWVudFN0YXR1cy5zaGlwSWR4XS50aXRsZVxuICAgIH1gO1xuICAgIHN1Yk1zZ0VsZW0udGV4dENvbnRlbnQgPSBgT3JpZW50YXRpb246ICR7cGxhY2VtZW50U3RhdHVzLm9yaWVudGF0aW9ufWA7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlT3JpZW50YXRpb24oKSB7XG4gIHBsYWNlbWVudFN0YXR1cy5vcmllbnRhdGlvbiA9XG4gICAgcGxhY2VtZW50U3RhdHVzLm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgdXBkYXRlTXNnRGlzcGxheSgpO1xufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRTaGlwKGUpIHtcbiAgLypcbiAgaGlnaGxpZ2h0cyBjZWxscyBiYXNlZCBvbiBjdXJyZW50IHNoaXAgbmFtZSAoYW5kIGxlbmd0aCksIGFuZCBnZXRzIGNvb3JkaW5hdGVzXG4gIG9mIHNhaWQgaGlnaGxpZ2h0ZWQgY2VsbHMgZGVwZW5kaW5nIG9uIHN0YXRlIG9mIG9yaWVudGF0aW9uLiB0aGUgY29vZGluYXRlcyBhcmUgXG4gIGZpbHRlcmVkIG91dCBpZiBvdXQgb2YgYm91bmRzXG4gICovXG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBTSElQX0xJU1RbcGxhY2VtZW50U3RhdHVzLnNoaXBJZHhdO1xuICBjb25zdCB4ID0gZS50YXJnZXQuZGF0YXNldC5pZHggJSAxMDtcbiAgY29uc3QgeSA9IE1hdGguZmxvb3IoZS50YXJnZXQuZGF0YXNldC5pZHggLyAxMCk7XG5cbiAgY29uc3QgdGVtcENvb3JkcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHBsYWNlbWVudFN0YXR1cy5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICB0ZW1wQ29vcmRzLnB1c2goW3gsIHkgKyBpXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXBDb29yZHMucHVzaChbeCArIGksIHldKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb29yZHMgPSB0ZW1wQ29vcmRzLmZpbHRlcihcbiAgICAocG9pbnQpID0+IHBvaW50WzBdID49IDAgJiYgcG9pbnRbMF0gPCAxMCAmJiBwb2ludFsxXSA+PSAwICYmIHBvaW50WzFdIDwgMTBcbiAgKTtcbiAgcGxhY2VtZW50U3RhdHVzLmhpZ2hsaWdodGVkQ29vcmRzID0gY29vcmRzO1xuICBjb25zdCBzZWxlY3RvckluZGljZXMgPSBjb29yZHMubWFwKChwb2ludCkgPT4gcG9pbnRbMF0gKyBwb2ludFsxXSAqIDEwKTtcblxuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcGxhY2VzaGlwcyA+IC5jZWxsXCIpO1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKTtcbiAgfSk7XG4gIHNlbGVjdG9ySW5kaWNlcy5mb3JFYWNoKChpZHgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZHg9XCIke2lkeH1cIl1gKS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFkZGVkKCkge1xuICAvKlxuICBjaGVja3MgaWYgY3VycmVudGx5IGhpZ2hsaWdodGVkIGNvb3JkaW5hdGVzIGNsYXNoIHdpdGggZXhpc3RpbmcgcG9pbnRzIG9uXG4gIHRoZSBib2FyZC4gSWYgbm8gY2xhc2hlcyBhcmUgZGV0ZWN0ZWQgYW5kIHRoZSBoaWdobGlnaHRlZCBjb29yZGluYXRlc1xuICBhcmUgd2l0aGluIGJvdW5kcywgdGhlIHNldCBvZiBjb29yZGluYXRlcyBhcmUgbm90ZWQgdG8gbGlzdCBvZiBhbHJlYWR5XG4gIHBsYWNlZCBwb2ludHMgYW5kIGFsc28gYWRkZWQgaW50byBhIGxpc3Qgb2Ygc2hpcCBjb29yZGluYXRlcy4gVGhpcyBtZXRob2RcbiAgaXMgYWN0aXZlIHVudGlsIGFsbCB0aGUgc2hpcHMgYXJlIHBsYWNlZCBhbmQgdGhlIG1haW4gVUkgb2YgdGhlIGdhbWUgaXMgbG9hZGVkLlxuICAqL1xuICBjb25zdCBoYXNDbGFzaGVzID0gcGxhY2VtZW50U3RhdHVzLmhpZ2hsaWdodGVkQ29vcmRzLnNvbWUoKHBhaXIpID0+XG4gICAgcGxhY2VtZW50U3RhdHVzLm9jY3VwaWVkQ2VsbHMuc29tZShcbiAgICAgIChwKSA9PiBwWzBdID09PSBwYWlyWzBdICYmIHBbMV0gPT09IHBhaXJbMV1cbiAgICApXG4gICk7XG4gIGlmIChcbiAgICAhaGFzQ2xhc2hlcyAmJlxuICAgIHBsYWNlbWVudFN0YXR1cy5oaWdobGlnaHRlZENvb3Jkcy5sZW5ndGggPT09XG4gICAgICBTSElQX0xJU1RbcGxhY2VtZW50U3RhdHVzLnNoaXBJZHhdLmxlbmd0aCAmJlxuICAgIHBsYWNlbWVudFN0YXR1cy5kYXRhUG9pbnRzLmxlbmd0aCA8IE9iamVjdC5rZXlzKFNISVBfTElTVCkubGVuZ3RoXG4gICkge1xuICAgIHBsYWNlbWVudFN0YXR1cy5vY2N1cGllZENlbGxzID0gcGxhY2VtZW50U3RhdHVzLm9jY3VwaWVkQ2VsbHMuY29uY2F0KFxuICAgICAgcGxhY2VtZW50U3RhdHVzLmhpZ2hsaWdodGVkQ29vcmRzXG4gICAgKTtcbiAgICBwbGFjZW1lbnRTdGF0dXMuZGF0YVBvaW50cy5wdXNoKHBsYWNlbWVudFN0YXR1cy5oaWdobGlnaHRlZENvb3Jkcyk7XG4gICAgcGxhY2VtZW50U3RhdHVzLnNoaXBJZHggKz0gMTtcblxuICAgIC8vIHVwZGF0ZSBvZiB1aVxuICAgIGNvbnN0IGluZGljZXMgPSBwbGFjZW1lbnRTdGF0dXMuaGlnaGxpZ2h0ZWRDb29yZHMubWFwKFxuICAgICAgKHBvaW50KSA9PiBwb2ludFswXSArIHBvaW50WzFdICogMTBcbiAgICApO1xuICAgIGluZGljZXMuZm9yRWFjaCgoaWR4KSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZHg9XCIke2lkeH1cIl1gKS5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIik7XG4gICAgfSk7XG4gIH1cblxuICAvLyBjb25kaXRpb24gdG8gZXhpdFxuICBpZiAocGxhY2VtZW50U3RhdHVzLnNoaXBJZHggPT09IE9iamVjdC5rZXlzKFNISVBfTElTVCkubGVuZ3RoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgIGZvcm0ucmVxdWVzdFN1Ym1pdCgpO1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZU1zZ0Rpc3BsYXkoKTtcbiAgfVxufVxuXG5wbGFjZW1lbnRCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm92ZXJcIiwgaGlnaGxpZ2h0U2hpcCk7XG5wbGFjZW1lbnRCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdXBkYXRlQWRkZWQpO1xucGxhY2VtZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB1cGRhdGVPcmllbnRhdGlvbik7XG5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBwbGFjZW1lbnRTdGF0dXMucGxheWVyTmFtZSA9IGZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0XCIpLnZhbHVlO1xufSk7XG5cbnVwZGF0ZU1zZ0Rpc3BsYXkoKTtcblxuZXhwb3J0IHsgU0hJUF9MSVNULCBwbGFjZW1lbnRTdGF0dXMgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==