"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[826,261,742],{

/***/ 259:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createBoardUI);


/***/ }),

/***/ 138:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _placecontroller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(824);





/***/ }),

/***/ 824:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports SHIP_LIST, placementStatus */
/* harmony import */ var _gamecontroller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(259);


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

const placementBoard = (0,_gamecontroller__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)("#placeships");
const placementButton = document.querySelector(".gameboard > button");
const modal = document.querySelector(".gameboard");

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
  } else {
    updateMsgDisplay();
  }
}

placementBoard.addEventListener("pointerover", highlightShip);
placementBoard.addEventListener("click", updateAdded);
placementButton.addEventListener("click", updateOrientation);
modal.addEventListener(
  "animationend",
  (e) => {
    if (e.type === "animationend") {
      modal.remove();
      document.querySelector(".main-game").classList.remove("hidden");
    }
  },
  false
);

updateMsgDisplay();




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(138));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQ0FBZ0M7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxhQUFhLEVBQUM7Ozs7Ozs7OztBQ3JCUjtBQUNLO0FBQ3FDOzs7Ozs7Ozs7O0FDRmxCOztBQUU3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsdUJBQXVCLG9FQUFhO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLDZDQUE2Qyw0QkFBNEI7QUFDekU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsU0FBUztBQUNuQjtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLFlBQVk7QUFDOUI7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx5Q0FBeUMsSUFBSTtBQUM3QyxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsSUFBSTtBQUMvQyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRXNDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10b3AvLi9zcmMvZ2FtZWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10b3AvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10b3AvLi9zcmMvcGxhY2Vjb250cm9sbGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJPQVJEX0hFSUdIVCA9IDEwO1xuY29uc3QgQk9BUkRfV0lEVEggPSAxMDtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmRVSShpZCkge1xuICAvKlxuICAgIGNyZWF0ZXMgbiB4IG4gZ3JpZCBpbnNpZGUgYW55IGVsZW1lbnQgd2l0aCBpZC4gcmV0dXJucyB0aGUgcGFyZW50IGVsZW1lbnQgd2l0aFxuICAgIGlkID0gaWQuXG4gICAgKi9cbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBCT0FSRF9IRUlHSFQgKiBCT0FSRF9XSURUSDsgaSArPSAxKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgZGl2LmRhdGFzZXQuaWR4ID0gaTtcbiAgICBib2FyZC5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuY29uc3QgZW5lbXlNb3ZlQm9hcmQgPSBjcmVhdGVCb2FyZFVJKFwiI2VuZW15LWJvYXJkXCIpO1xuY29uc3QgcGxheWVyTW92ZUJvYXJkID0gY3JlYXRlQm9hcmRVSShcIiNwbGF5ZXItYm9hcmRcIik7XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJvYXJkVUk7XG4iLCJpbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xuaW1wb3J0IEdhbWUgZnJvbSBcIi4vZ2FtZVwiO1xuaW1wb3J0IHsgcGxhY2VtZW50U3RhdHVzLCBTSElQX0xJU1QgfSBmcm9tIFwiLi9wbGFjZWNvbnRyb2xsZXJcIjtcbiIsImltcG9ydCBjcmVhdGVCb2FyZFVJIGZyb20gXCIuL2dhbWVjb250cm9sbGVyXCI7XG5cbmNvbnN0IFNISVBfTElTVCA9IHtcbiAgMDoge1xuICAgIHRpdGxlOiBcImNhcnJpZXJcIixcbiAgICBsZW5ndGg6IDUsXG4gIH0sXG4gIDE6IHtcbiAgICB0aXRsZTogXCJiYXR0bGVzaGlwXCIsXG4gICAgbGVuZ3RoOiA0LFxuICB9LFxuICAyOiB7XG4gICAgdGl0bGU6IFwic3VibWFyaW5lXCIsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICAzOiB7XG4gICAgdGl0bGU6IFwiZGVzdHJveWVyXCIsXG4gICAgbGVuZ3RoOiAzLFxuICB9LFxuICA0OiB7XG4gICAgdGl0bGU6IFwicGF0cm9sXCIsXG4gICAgbGVuZ3RoOiAyLFxuICB9LFxufTtcblxuY29uc3QgcGxhY2VtZW50Qm9hcmQgPSBjcmVhdGVCb2FyZFVJKFwiI3BsYWNlc2hpcHNcIik7XG5jb25zdCBwbGFjZW1lbnRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZCA+IGJ1dHRvblwiKTtcbmNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmRcIik7XG5cbi8qXG5wbGFjZW1lbnRTdGF0dXMgb2JqZWN0IHVzZWQgdG8gdHJhY2sgaW1tZWRpYXRlIGNoYW5nZXMgdG8gdGhlIHBsYWNlbWVudCBVSSwgaW5jbHVkaW5nXG5zaGlwIGN1cnJlbnRseSBiZWluZyBwbGFjZWQsIG9yaWVudGF0aW9uLCBjb29yZGluYXRlcyBhcyBoaWdobGlnaHRlZCwgY2VsbHMgYWxyZWFkeVxub2NjdXBpZWQgYW5kIHNldCBvZiBjb29yZGluYXRlcyB0byBiZSB1c2VkIGFzIHBsYXllcidzIHNoaXAgY29vcmRpbmF0ZXNcbiovXG5jb25zdCBwbGFjZW1lbnRTdGF0dXMgPSB7XG4gIHNoaXBJZHg6IDAsXG4gIG9yaWVudGF0aW9uOiBcInZlcnRpY2FsXCIsXG4gIGhpZ2hsaWdodGVkQ29vcmRzOiB1bmRlZmluZWQsXG4gIG9jY3VwaWVkQ2VsbHM6IFtdLFxuICBkYXRhUG9pbnRzOiBbXSxcbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZU1zZ0Rpc3BsYXkoKSB7XG4gIC8qXG4gIGNsZWFycyB0ZXh0IGNvbnRlbnQgb2YgbWVzc2FnZSBib3hlcyBzaG93aW5nIHNoaXAgbmFtZSBhbmQgb3JpZW50YXRpb24gYW5kXG4gIHVwZGF0ZXMgY29udGVudCB3aXRoIHRoZSBsYXRlc3Qgc2hpcCBuYW1lIGFuZCBvcmllbnRhdGlvbi5cbiAgKi9cbiAgY29uc3QgbWFpbk1zZ0VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZCA+ICNwbGFjZXNoaXAtc3RhdHVzXCIpO1xuICBjb25zdCBzdWJNc2dFbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmQgPiAub3JpZW50YXRpb25cIik7XG4gIGlmIChwbGFjZW1lbnRTdGF0dXMuc2hpcElkeCA8IE9iamVjdC5rZXlzKFNISVBfTElTVCkubGVuZ3RoKSB7XG4gICAgbWFpbk1zZ0VsZW0udGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciAke1xuICAgICAgU0hJUF9MSVNUW3BsYWNlbWVudFN0YXR1cy5zaGlwSWR4XS50aXRsZVxuICAgIH1gO1xuICAgIHN1Yk1zZ0VsZW0udGV4dENvbnRlbnQgPSBgT3JpZW50YXRpb246ICR7cGxhY2VtZW50U3RhdHVzLm9yaWVudGF0aW9ufWA7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlT3JpZW50YXRpb24oKSB7XG4gIHBsYWNlbWVudFN0YXR1cy5vcmllbnRhdGlvbiA9XG4gICAgcGxhY2VtZW50U3RhdHVzLm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIgPyBcImhvcml6b250YWxcIiA6IFwidmVydGljYWxcIjtcbiAgdXBkYXRlTXNnRGlzcGxheSgpO1xufVxuXG5mdW5jdGlvbiBoaWdobGlnaHRTaGlwKGUpIHtcbiAgLypcbiAgaGlnaGxpZ2h0cyBjZWxscyBiYXNlZCBvbiBjdXJyZW50IHNoaXAgbmFtZSAoYW5kIGxlbmd0aCksIGFuZCBnZXRzIGNvb3JkaW5hdGVzXG4gIG9mIHNhaWQgaGlnaGxpZ2h0ZWQgY2VsbHMgZGVwZW5kaW5nIG9uIHN0YXRlIG9mIG9yaWVudGF0aW9uLiB0aGUgY29vZGluYXRlcyBhcmUgXG4gIGZpbHRlcmVkIG91dCBpZiBvdXQgb2YgYm91bmRzXG4gICovXG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBTSElQX0xJU1RbcGxhY2VtZW50U3RhdHVzLnNoaXBJZHhdO1xuICBjb25zdCB4ID0gZS50YXJnZXQuZGF0YXNldC5pZHggJSAxMDtcbiAgY29uc3QgeSA9IE1hdGguZmxvb3IoZS50YXJnZXQuZGF0YXNldC5pZHggLyAxMCk7XG5cbiAgY29uc3QgdGVtcENvb3JkcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHBsYWNlbWVudFN0YXR1cy5vcmllbnRhdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XG4gICAgICB0ZW1wQ29vcmRzLnB1c2goW3gsIHkgKyBpXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRlbXBDb29yZHMucHVzaChbeCArIGksIHldKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb29yZHMgPSB0ZW1wQ29vcmRzLmZpbHRlcihcbiAgICAocG9pbnQpID0+IHBvaW50WzBdID49IDAgJiYgcG9pbnRbMF0gPCAxMCAmJiBwb2ludFsxXSA+PSAwICYmIHBvaW50WzFdIDwgMTBcbiAgKTtcbiAgcGxhY2VtZW50U3RhdHVzLmhpZ2hsaWdodGVkQ29vcmRzID0gY29vcmRzO1xuICBjb25zdCBzZWxlY3RvckluZGljZXMgPSBjb29yZHMubWFwKChwb2ludCkgPT4gcG9pbnRbMF0gKyBwb2ludFsxXSAqIDEwKTtcblxuICBjb25zdCBjZWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjcGxhY2VzaGlwcyA+IC5jZWxsXCIpO1xuICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKTtcbiAgfSk7XG4gIHNlbGVjdG9ySW5kaWNlcy5mb3JFYWNoKChpZHgpID0+IHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZHg9XCIke2lkeH1cIl1gKS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUFkZGVkKCkge1xuICAvKlxuICBjaGVja3MgaWYgY3VycmVudGx5IGhpZ2hsaWdodGVkIGNvb3JkaW5hdGVzIGNsYXNoIHdpdGggZXhpc3RpbmcgcG9pbnRzIG9uXG4gIHRoZSBib2FyZC4gSWYgbm8gY2xhc2hlcyBhcmUgZGV0ZWN0ZWQgYW5kIHRoZSBoaWdobGlnaHRlZCBjb29yZGluYXRlc1xuICBhcmUgd2l0aGluIGJvdW5kcywgdGhlIHNldCBvZiBjb29yZGluYXRlcyBhcmUgbm90ZWQgdG8gbGlzdCBvZiBhbHJlYWR5XG4gIHBsYWNlZCBwb2ludHMgYW5kIGFsc28gYWRkZWQgaW50byBhIGxpc3Qgb2Ygc2hpcCBjb29yZGluYXRlcy4gVGhpcyBtZXRob2RcbiAgaXMgYWN0aXZlIHVudGlsIGFsbCB0aGUgc2hpcHMgYXJlIHBsYWNlZCBhbmQgdGhlIG1haW4gVUkgb2YgdGhlIGdhbWUgaXMgbG9hZGVkLlxuICAqL1xuICBjb25zdCBoYXNDbGFzaGVzID0gcGxhY2VtZW50U3RhdHVzLmhpZ2hsaWdodGVkQ29vcmRzLnNvbWUoKHBhaXIpID0+XG4gICAgcGxhY2VtZW50U3RhdHVzLm9jY3VwaWVkQ2VsbHMuc29tZShcbiAgICAgIChwKSA9PiBwWzBdID09PSBwYWlyWzBdICYmIHBbMV0gPT09IHBhaXJbMV1cbiAgICApXG4gICk7XG4gIGlmIChcbiAgICAhaGFzQ2xhc2hlcyAmJlxuICAgIHBsYWNlbWVudFN0YXR1cy5oaWdobGlnaHRlZENvb3Jkcy5sZW5ndGggPT09XG4gICAgICBTSElQX0xJU1RbcGxhY2VtZW50U3RhdHVzLnNoaXBJZHhdLmxlbmd0aCAmJlxuICAgIHBsYWNlbWVudFN0YXR1cy5kYXRhUG9pbnRzLmxlbmd0aCA8IE9iamVjdC5rZXlzKFNISVBfTElTVCkubGVuZ3RoXG4gICkge1xuICAgIHBsYWNlbWVudFN0YXR1cy5vY2N1cGllZENlbGxzID0gcGxhY2VtZW50U3RhdHVzLm9jY3VwaWVkQ2VsbHMuY29uY2F0KFxuICAgICAgcGxhY2VtZW50U3RhdHVzLmhpZ2hsaWdodGVkQ29vcmRzXG4gICAgKTtcbiAgICBwbGFjZW1lbnRTdGF0dXMuZGF0YVBvaW50cy5wdXNoKHBsYWNlbWVudFN0YXR1cy5oaWdobGlnaHRlZENvb3Jkcyk7XG4gICAgcGxhY2VtZW50U3RhdHVzLnNoaXBJZHggKz0gMTtcblxuICAgIC8vIHVwZGF0ZSBvZiB1aVxuICAgIGNvbnN0IGluZGljZXMgPSBwbGFjZW1lbnRTdGF0dXMuaGlnaGxpZ2h0ZWRDb29yZHMubWFwKFxuICAgICAgKHBvaW50KSA9PiBwb2ludFswXSArIHBvaW50WzFdICogMTBcbiAgICApO1xuICAgIGluZGljZXMuZm9yRWFjaCgoaWR4KSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZHg9XCIke2lkeH1cIl1gKS5jbGFzc0xpc3QuYWRkKFwib2NjdXBpZWRcIik7XG4gICAgfSk7XG4gIH1cbiAgLy8gY29uZGl0aW9uIHRvIGV4aXRcbiAgaWYgKHBsYWNlbWVudFN0YXR1cy5zaGlwSWR4ID09PSBPYmplY3Qua2V5cyhTSElQX0xJU1QpLmxlbmd0aCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxcIikuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgfSBlbHNlIHtcbiAgICB1cGRhdGVNc2dEaXNwbGF5KCk7XG4gIH1cbn1cblxucGxhY2VtZW50Qm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJvdmVyXCIsIGhpZ2hsaWdodFNoaXApO1xucGxhY2VtZW50Qm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHVwZGF0ZUFkZGVkKTtcbnBsYWNlbWVudEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdXBkYXRlT3JpZW50YXRpb24pO1xubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgXCJhbmltYXRpb25lbmRcIixcbiAgKGUpID0+IHtcbiAgICBpZiAoZS50eXBlID09PSBcImFuaW1hdGlvbmVuZFwiKSB7XG4gICAgICBtb2RhbC5yZW1vdmUoKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1nYW1lXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgfVxuICB9LFxuICBmYWxzZVxuKTtcblxudXBkYXRlTXNnRGlzcGxheSgpO1xuXG5leHBvcnQgeyBTSElQX0xJU1QsIHBsYWNlbWVudFN0YXR1cyB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9