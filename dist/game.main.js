"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[757],{

/***/ 417:
/***/ (() => {



function Game() {
  let gameOver;
  const player = Player();
  const ai = Player();
  let currentPlayer;
  let opponent;

  function switchPlayer() {
    this.currentPlayer = currentPlayer === player ? ai : player;
    this.opponent = opponent === ai ? player : ai;
  }

  function playRound(pair) {
    opponent.gameboard.receiveAttack(pair);
    this.switchPlayer();
    this.gameOver = opponent.gameboard.shipsPlaced.length === 0;
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

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (Game)));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(417));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5tYWluLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFrQzs7QUFFbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzRUFBZSxvREFBSSxJQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10b3AvLi9zcmMvZ2FtZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9tb2RlbHNcIjtcblxuZnVuY3Rpb24gR2FtZSgpIHtcbiAgbGV0IGdhbWVPdmVyO1xuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcbiAgY29uc3QgYWkgPSBQbGF5ZXIoKTtcbiAgbGV0IGN1cnJlbnRQbGF5ZXI7XG4gIGxldCBvcHBvbmVudDtcblxuICBmdW5jdGlvbiBzd2l0Y2hQbGF5ZXIoKSB7XG4gICAgdGhpcy5jdXJyZW50UGxheWVyID0gY3VycmVudFBsYXllciA9PT0gcGxheWVyID8gYWkgOiBwbGF5ZXI7XG4gICAgdGhpcy5vcHBvbmVudCA9IG9wcG9uZW50ID09PSBhaSA/IHBsYXllciA6IGFpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxheVJvdW5kKHBhaXIpIHtcbiAgICBvcHBvbmVudC5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhwYWlyKTtcbiAgICB0aGlzLnN3aXRjaFBsYXllcigpO1xuICAgIHRoaXMuZ2FtZU92ZXIgPSBvcHBvbmVudC5nYW1lYm9hcmQuc2hpcHNQbGFjZWQubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBjdXJyZW50UGxheWVyID0gcGxheWVyO1xuICAgIG9wcG9uZW50ID0gYWk7XG4gICAgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgfVxuXG4gIGluaXQoKTtcblxuICByZXR1cm4ge1xuICAgIHBsYXllcixcbiAgICBhaSxcbiAgICBvcHBvbmVudCxcbiAgICBjdXJyZW50UGxheWVyLFxuICAgIHN3aXRjaFBsYXllcixcbiAgICBwbGF5Um91bmQsXG4gICAgZ2FtZU92ZXIsXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=