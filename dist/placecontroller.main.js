"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[261,742],{

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
/******/ var __webpack_exports__ = (__webpack_exec__(824));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhY2Vjb250cm9sbGVyLm1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsZ0NBQWdDO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUVBQWUsYUFBYSxFQUFDOzs7Ozs7Ozs7O0FDckJnQjs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLHVCQUF1QixvRUFBYTtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw2Q0FBNkMsNEJBQTRCO0FBQ3pFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFNBQVM7QUFDbkI7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EseUNBQXlDLElBQUk7QUFDN0MsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLElBQUk7QUFDL0MsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVzQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAtdG9wLy4vc3JjL2dhbWVjb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdG9wLy4vc3JjL3BsYWNlY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCT0FSRF9IRUlHSFQgPSAxMDtcbmNvbnN0IEJPQVJEX1dJRFRIID0gMTA7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkVUkoaWQpIHtcbiAgLypcbiAgICBjcmVhdGVzIG4geCBuIGdyaWQgaW5zaWRlIGFueSBlbGVtZW50IHdpdGggaWQuIHJldHVybnMgdGhlIHBhcmVudCBlbGVtZW50IHdpdGhcbiAgICBpZCA9IGlkLlxuICAgICovXG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfSEVJR0hUICogQk9BUkRfV0lEVEg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgIGRpdi5kYXRhc2V0LmlkeCA9IGk7XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmNvbnN0IGVuZW15TW92ZUJvYXJkID0gY3JlYXRlQm9hcmRVSShcIiNlbmVteS1ib2FyZFwiKTtcbmNvbnN0IHBsYXllck1vdmVCb2FyZCA9IGNyZWF0ZUJvYXJkVUkoXCIjcGxheWVyLWJvYXJkXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCb2FyZFVJO1xuIiwiaW1wb3J0IGNyZWF0ZUJvYXJkVUkgZnJvbSBcIi4vZ2FtZWNvbnRyb2xsZXJcIjtcblxuY29uc3QgU0hJUF9MSVNUID0ge1xuICAwOiB7XG4gICAgdGl0bGU6IFwiY2FycmllclwiLFxuICAgIGxlbmd0aDogNSxcbiAgfSxcbiAgMToge1xuICAgIHRpdGxlOiBcImJhdHRsZXNoaXBcIixcbiAgICBsZW5ndGg6IDQsXG4gIH0sXG4gIDI6IHtcbiAgICB0aXRsZTogXCJzdWJtYXJpbmVcIixcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIDM6IHtcbiAgICB0aXRsZTogXCJkZXN0cm95ZXJcIixcbiAgICBsZW5ndGg6IDMsXG4gIH0sXG4gIDQ6IHtcbiAgICB0aXRsZTogXCJwYXRyb2xcIixcbiAgICBsZW5ndGg6IDIsXG4gIH0sXG59O1xuXG5jb25zdCBwbGFjZW1lbnRCb2FyZCA9IGNyZWF0ZUJvYXJkVUkoXCIjcGxhY2VzaGlwc1wiKTtcbmNvbnN0IHBsYWNlbWVudEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkID4gYnV0dG9uXCIpO1xuY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZFwiKTtcblxuLypcbnBsYWNlbWVudFN0YXR1cyBvYmplY3QgdXNlZCB0byB0cmFjayBpbW1lZGlhdGUgY2hhbmdlcyB0byB0aGUgcGxhY2VtZW50IFVJLCBpbmNsdWRpbmdcbnNoaXAgY3VycmVudGx5IGJlaW5nIHBsYWNlZCwgb3JpZW50YXRpb24sIGNvb3JkaW5hdGVzIGFzIGhpZ2hsaWdodGVkLCBjZWxscyBhbHJlYWR5XG5vY2N1cGllZCBhbmQgc2V0IG9mIGNvb3JkaW5hdGVzIHRvIGJlIHVzZWQgYXMgcGxheWVyJ3Mgc2hpcCBjb29yZGluYXRlc1xuKi9cbmNvbnN0IHBsYWNlbWVudFN0YXR1cyA9IHtcbiAgc2hpcElkeDogMCxcbiAgb3JpZW50YXRpb246IFwidmVydGljYWxcIixcbiAgaGlnaGxpZ2h0ZWRDb29yZHM6IHVuZGVmaW5lZCxcbiAgb2NjdXBpZWRDZWxsczogW10sXG4gIGRhdGFQb2ludHM6IFtdLFxufTtcblxuZnVuY3Rpb24gdXBkYXRlTXNnRGlzcGxheSgpIHtcbiAgLypcbiAgY2xlYXJzIHRleHQgY29udGVudCBvZiBtZXNzYWdlIGJveGVzIHNob3dpbmcgc2hpcCBuYW1lIGFuZCBvcmllbnRhdGlvbiBhbmRcbiAgdXBkYXRlcyBjb250ZW50IHdpdGggdGhlIGxhdGVzdCBzaGlwIG5hbWUgYW5kIG9yaWVudGF0aW9uLlxuICAqL1xuICBjb25zdCBtYWluTXNnRWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkID4gI3BsYWNlc2hpcC1zdGF0dXNcIik7XG4gIGNvbnN0IHN1Yk1zZ0VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZCA+IC5vcmllbnRhdGlvblwiKTtcbiAgaWYgKHBsYWNlbWVudFN0YXR1cy5zaGlwSWR4IDwgT2JqZWN0LmtleXMoU0hJUF9MSVNUKS5sZW5ndGgpIHtcbiAgICBtYWluTXNnRWxlbS50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyICR7XG4gICAgICBTSElQX0xJU1RbcGxhY2VtZW50U3RhdHVzLnNoaXBJZHhdLnRpdGxlXG4gICAgfWA7XG4gICAgc3ViTXNnRWxlbS50ZXh0Q29udGVudCA9IGBPcmllbnRhdGlvbjogJHtwbGFjZW1lbnRTdGF0dXMub3JpZW50YXRpb259YDtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVPcmllbnRhdGlvbigpIHtcbiAgcGxhY2VtZW50U3RhdHVzLm9yaWVudGF0aW9uID1cbiAgICBwbGFjZW1lbnRTdGF0dXMub3JpZW50YXRpb24gPT09IFwidmVydGljYWxcIiA/IFwiaG9yaXpvbnRhbFwiIDogXCJ2ZXJ0aWNhbFwiO1xuICB1cGRhdGVNc2dEaXNwbGF5KCk7XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodFNoaXAoZSkge1xuICAvKlxuICBoaWdobGlnaHRzIGNlbGxzIGJhc2VkIG9uIGN1cnJlbnQgc2hpcCBuYW1lIChhbmQgbGVuZ3RoKSwgYW5kIGdldHMgY29vcmRpbmF0ZXNcbiAgb2Ygc2FpZCBoaWdobGlnaHRlZCBjZWxscyBkZXBlbmRpbmcgb24gc3RhdGUgb2Ygb3JpZW50YXRpb24uIHRoZSBjb29kaW5hdGVzIGFyZSBcbiAgZmlsdGVyZWQgb3V0IGlmIG91dCBvZiBib3VuZHNcbiAgKi9cbiAgY29uc3QgeyBsZW5ndGggfSA9IFNISVBfTElTVFtwbGFjZW1lbnRTdGF0dXMuc2hpcElkeF07XG4gIGNvbnN0IHggPSBlLnRhcmdldC5kYXRhc2V0LmlkeCAlIDEwO1xuICBjb25zdCB5ID0gTWF0aC5mbG9vcihlLnRhcmdldC5kYXRhc2V0LmlkeCAvIDEwKTtcblxuICBjb25zdCB0ZW1wQ29vcmRzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAocGxhY2VtZW50U3RhdHVzLm9yaWVudGF0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIHRlbXBDb29yZHMucHVzaChbeCwgeSArIGldKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGVtcENvb3Jkcy5wdXNoKFt4ICsgaSwgeV0pO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvb3JkcyA9IHRlbXBDb29yZHMuZmlsdGVyKFxuICAgIChwb2ludCkgPT4gcG9pbnRbMF0gPj0gMCAmJiBwb2ludFswXSA8IDEwICYmIHBvaW50WzFdID49IDAgJiYgcG9pbnRbMV0gPCAxMFxuICApO1xuICBwbGFjZW1lbnRTdGF0dXMuaGlnaGxpZ2h0ZWRDb29yZHMgPSBjb29yZHM7XG4gIGNvbnN0IHNlbGVjdG9ySW5kaWNlcyA9IGNvb3Jkcy5tYXAoKHBvaW50KSA9PiBwb2ludFswXSArIHBvaW50WzFdICogMTApO1xuXG4gIGNvbnN0IGNlbGxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNwbGFjZXNoaXBzID4gLmNlbGxcIik7XG4gIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpO1xuICB9KTtcbiAgc2VsZWN0b3JJbmRpY2VzLmZvckVhY2goKGlkeCkgPT4ge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkeD1cIiR7aWR4fVwiXWApLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQWRkZWQoKSB7XG4gIC8qXG4gIGNoZWNrcyBpZiBjdXJyZW50bHkgaGlnaGxpZ2h0ZWQgY29vcmRpbmF0ZXMgY2xhc2ggd2l0aCBleGlzdGluZyBwb2ludHMgb25cbiAgdGhlIGJvYXJkLiBJZiBubyBjbGFzaGVzIGFyZSBkZXRlY3RlZCBhbmQgdGhlIGhpZ2hsaWdodGVkIGNvb3JkaW5hdGVzXG4gIGFyZSB3aXRoaW4gYm91bmRzLCB0aGUgc2V0IG9mIGNvb3JkaW5hdGVzIGFyZSBub3RlZCB0byBsaXN0IG9mIGFscmVhZHlcbiAgcGxhY2VkIHBvaW50cyBhbmQgYWxzbyBhZGRlZCBpbnRvIGEgbGlzdCBvZiBzaGlwIGNvb3JkaW5hdGVzLiBUaGlzIG1ldGhvZFxuICBpcyBhY3RpdmUgdW50aWwgYWxsIHRoZSBzaGlwcyBhcmUgcGxhY2VkIGFuZCB0aGUgbWFpbiBVSSBvZiB0aGUgZ2FtZSBpcyBsb2FkZWQuXG4gICovXG4gIGNvbnN0IGhhc0NsYXNoZXMgPSBwbGFjZW1lbnRTdGF0dXMuaGlnaGxpZ2h0ZWRDb29yZHMuc29tZSgocGFpcikgPT5cbiAgICBwbGFjZW1lbnRTdGF0dXMub2NjdXBpZWRDZWxscy5zb21lKFxuICAgICAgKHApID0+IHBbMF0gPT09IHBhaXJbMF0gJiYgcFsxXSA9PT0gcGFpclsxXVxuICAgIClcbiAgKTtcbiAgaWYgKFxuICAgICFoYXNDbGFzaGVzICYmXG4gICAgcGxhY2VtZW50U3RhdHVzLmhpZ2hsaWdodGVkQ29vcmRzLmxlbmd0aCA9PT1cbiAgICAgIFNISVBfTElTVFtwbGFjZW1lbnRTdGF0dXMuc2hpcElkeF0ubGVuZ3RoICYmXG4gICAgcGxhY2VtZW50U3RhdHVzLmRhdGFQb2ludHMubGVuZ3RoIDwgT2JqZWN0LmtleXMoU0hJUF9MSVNUKS5sZW5ndGhcbiAgKSB7XG4gICAgcGxhY2VtZW50U3RhdHVzLm9jY3VwaWVkQ2VsbHMgPSBwbGFjZW1lbnRTdGF0dXMub2NjdXBpZWRDZWxscy5jb25jYXQoXG4gICAgICBwbGFjZW1lbnRTdGF0dXMuaGlnaGxpZ2h0ZWRDb29yZHNcbiAgICApO1xuICAgIHBsYWNlbWVudFN0YXR1cy5kYXRhUG9pbnRzLnB1c2gocGxhY2VtZW50U3RhdHVzLmhpZ2hsaWdodGVkQ29vcmRzKTtcbiAgICBwbGFjZW1lbnRTdGF0dXMuc2hpcElkeCArPSAxO1xuXG4gICAgLy8gdXBkYXRlIG9mIHVpXG4gICAgY29uc3QgaW5kaWNlcyA9IHBsYWNlbWVudFN0YXR1cy5oaWdobGlnaHRlZENvb3Jkcy5tYXAoXG4gICAgICAocG9pbnQpID0+IHBvaW50WzBdICsgcG9pbnRbMV0gKiAxMFxuICAgICk7XG4gICAgaW5kaWNlcy5mb3JFYWNoKChpZHgpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkeD1cIiR7aWR4fVwiXWApLmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgICB9KTtcbiAgfVxuICAvLyBjb25kaXRpb24gdG8gZXhpdFxuICBpZiAocGxhY2VtZW50U3RhdHVzLnNoaXBJZHggPT09IE9iamVjdC5rZXlzKFNISVBfTElTVCkubGVuZ3RoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbFwiKS5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICB9IGVsc2Uge1xuICAgIHVwZGF0ZU1zZ0Rpc3BsYXkoKTtcbiAgfVxufVxuXG5wbGFjZW1lbnRCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm92ZXJcIiwgaGlnaGxpZ2h0U2hpcCk7XG5wbGFjZW1lbnRCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdXBkYXRlQWRkZWQpO1xucGxhY2VtZW50QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB1cGRhdGVPcmllbnRhdGlvbik7XG5tb2RhbC5hZGRFdmVudExpc3RlbmVyKFxuICBcImFuaW1hdGlvbmVuZFwiLFxuICAoZSkgPT4ge1xuICAgIGlmIChlLnR5cGUgPT09IFwiYW5pbWF0aW9uZW5kXCIpIHtcbiAgICAgIG1vZGFsLnJlbW92ZSgpO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLWdhbWVcIikuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcbiAgICB9XG4gIH0sXG4gIGZhbHNlXG4pO1xuXG51cGRhdGVNc2dEaXNwbGF5KCk7XG5cbmV4cG9ydCB7IFNISVBfTElTVCwgcGxhY2VtZW50U3RhdHVzIH07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=