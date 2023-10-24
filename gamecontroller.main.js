"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[742],{

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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(259));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZWNvbnRyb2xsZXIubWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQ0FBZ0M7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpRUFBZSxhQUFhLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRvcC8uL3NyYy9nYW1lY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCT0FSRF9IRUlHSFQgPSAxMDtcbmNvbnN0IEJPQVJEX1dJRFRIID0gMTA7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvYXJkVUkoaWQpIHtcbiAgLypcbiAgICBjcmVhdGVzIG4geCBuIGdyaWQgaW5zaWRlIGFueSBlbGVtZW50IHdpdGggaWQuIHJldHVybnMgdGhlIHBhcmVudCBlbGVtZW50IHdpdGhcbiAgICBpZCA9IGlkLlxuICAgICovXG4gIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpZCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQk9BUkRfSEVJR0hUICogQk9BUkRfV0lEVEg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoXCJjZWxsXCIpO1xuICAgIGRpdi5kYXRhc2V0LmlkeCA9IGk7XG4gICAgYm9hcmQuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59XG5cbmNvbnN0IGVuZW15TW92ZUJvYXJkID0gY3JlYXRlQm9hcmRVSShcIiNlbmVteS1ib2FyZFwiKTtcbmNvbnN0IHBsYXllck1vdmVCb2FyZCA9IGNyZWF0ZUJvYXJkVUkoXCIjcGxheWVyLWJvYXJkXCIpO1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVCb2FyZFVJO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9