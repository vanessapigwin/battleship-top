"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[484],{

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




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(10));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZXVpLm1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQ0FBZ0M7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsSUFBSSxvQkFBb0IsSUFBSTtBQUN4RDtBQUNBLE9BQU87QUFDUCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxJQUFJO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFEQUFxRCxRQUFRO0FBQzdEO0FBQ0E7QUFDQTtBQUNBOztBQVNFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10b3AvLi9zcmMvZ2FtZXVpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IEJPQVJEX0hFSUdIVCA9IDEwO1xuY29uc3QgQk9BUkRfV0lEVEggPSAxMDtcblxuZnVuY3Rpb24gY3JlYXRlQm9hcmRVSShpZCkge1xuICAvKlxuICAgIGNyZWF0ZXMgbiB4IG4gZ3JpZCBpbnNpZGUgYW55IGVsZW1lbnQgd2l0aCBpZC4gcmV0dXJucyB0aGUgcGFyZW50IGVsZW1lbnQgd2l0aFxuICAgIGlkID0gaWQuXG4gICAgKi9cbiAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBCT0FSRF9IRUlHSFQgKiBCT0FSRF9XSURUSDsgaSArPSAxKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZChcImNlbGxcIik7XG4gICAgZGl2LmRhdGFzZXQuaWR4ID0gaTtcbiAgICBib2FyZC5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn1cblxuY29uc3QgZW5lbXlNb3ZlQm9hcmQgPSBjcmVhdGVCb2FyZFVJKFwiI2VuZW15LWJvYXJkXCIpO1xuY29uc3QgcGxheWVyTW92ZUJvYXJkID0gY3JlYXRlQm9hcmRVSShcIiNwbGF5ZXItYm9hcmRcIik7XG5cbmZ1bmN0aW9uIHBsYWNlU2hpcE9uQm9hcmRVSShhcnIsIGlkKSB7XG4gIGFyci5mb3JFYWNoKChzaGlwQ29vcmRzKSA9PiB7XG4gICAgc2hpcENvb3Jkc1xuICAgICAgLm1hcCgocG9pbnQpID0+IHBvaW50WzBdICsgcG9pbnRbMV0gKiAxMClcbiAgICAgIC5mb3JFYWNoKChpZHgpID0+IHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAucXVlcnlTZWxlY3RvcihgJHtpZH0gPiAuY2VsbFtkYXRhLWlkeD1cIiR7aWR4fVwiXWApXG4gICAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJvY2N1cGllZFwiKTtcbiAgICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUGxheWVyTW92ZXNVSShlLCBzaGlwSGl0KSB7XG4gIGlmICghc2hpcEhpdCkge1xuICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xuICB9IGVsc2UgaWYgKHNoaXBIaXQpIHtcbiAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUVuZW15TW92ZXNVSSh4LCB5LCBwbGF5ZXJTaGlwSGl0KSB7XG4gIGxldCBjbGFzc05hbWU7XG4gIGNvbnN0IGlkeCA9IHggKyB5ICogMTA7XG4gIGlmICghcGxheWVyU2hpcEhpdCkge1xuICAgIGNsYXNzTmFtZSA9IFwibWlzc1wiO1xuICB9IGVsc2Uge1xuICAgIGNsYXNzTmFtZSA9IFwiaGl0XCI7XG4gIH1cbiAgZW5lbXlNb3ZlQm9hcmRcbiAgICAucXVlcnlTZWxlY3RvcihgI2VuZW15LWJvYXJkID4gLmNlbGxbZGF0YS1pZHg9XCIke2lkeH1cIl1gKVxuICAgIC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGdhbWVPdmVyU2NyZWVuKHdpbm5lcikge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFsZXJ0XCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2lubXNnXCIpLnRleHRDb250ZW50ID0gYCR7d2lubmVyfSB3aW5zIWA7XG4gIGRvY3VtZW50XG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuYWxlcnQtY29udGVudCA+IGJ1dHRvblwiKVxuICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpKTtcbn1cblxuZXhwb3J0IHtcbiAgcGxheWVyTW92ZUJvYXJkLFxuICBwbGFjZVNoaXBPbkJvYXJkVUksXG4gIHVwZGF0ZVBsYXllck1vdmVzVUksXG4gIHVwZGF0ZUVuZW15TW92ZXNVSSxcbiAgY3JlYXRlQm9hcmRVSSxcbiAgZ2FtZU92ZXJTY3JlZW4sXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9