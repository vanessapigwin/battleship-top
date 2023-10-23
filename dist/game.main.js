"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[757,196],{

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ 283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J5: () => (/* binding */ Player)
/* harmony export */ });
/* unused harmony exports Point, Ship, GameBoard */
const BOARD_SIZE = 10;

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
    x_max: BOARD_SIZE,
    y_min: 0,
    y_max: BOARD_SIZE,
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
    }
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
    if (pointInList(attackedCells, attackPoint)) return false;
    attackedCells.push(attackPoint);
    for (let i = 0; i < shipsPlaced.length; i += 1) {
      const shipCoords = shipsPlaced[i].coordinateList;
      if (pointInList(shipCoords, attackPoint)) {
        shipsPlaced[i].hit();
        if (shipsPlaced[i].isSunk()) {
          shipsPlaced.splice(0, 1);
        }
        break;
      }
    }
    return true;
  }

  function randomAttackPoint() {
    /*
    get random numbers to make a point, returns the random point if not
    present in list of previously attacked points, otherwise call the function
    again and return a new point
    return: point object
    */
    const x = Math.floor(Math.random() * bounds.x_max + 1);
    const y = Math.floor(Math.random() * bounds.y_max + 1);
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




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(417));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5tYWluLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7QUFDQSxpQkFBaUIseURBQU07QUFDdkIsYUFBYSx5REFBTTtBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7Ozs7OztBQ3ZDcEI7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVUsU0FBUzs7QUFFbkI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHdCQUF3QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRTBDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10b3AvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRvcC8uL3NyYy9tb2RlbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vbW9kZWxzXCI7XG5cbmZ1bmN0aW9uIEdhbWUoKSB7XG4gIGxldCBnYW1lT3ZlcjtcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKCk7XG4gIGNvbnN0IGFpID0gUGxheWVyKCk7XG4gIGxldCBjdXJyZW50UGxheWVyO1xuICBsZXQgb3Bwb25lbnQ7XG5cbiAgZnVuY3Rpb24gc3dpdGNoUGxheWVyKCkge1xuICAgIHRoaXMuY3VycmVudFBsYXllciA9IGN1cnJlbnRQbGF5ZXIgPT09IHBsYXllciA/IGFpIDogcGxheWVyO1xuICAgIHRoaXMub3Bwb25lbnQgPSBvcHBvbmVudCA9PT0gYWkgPyBwbGF5ZXIgOiBhaTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYXlSb3VuZChwYWlyKSB7XG4gICAgb3Bwb25lbnQuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socGFpcik7XG4gICAgdGhpcy5zd2l0Y2hQbGF5ZXIoKTtcbiAgICB0aGlzLmdhbWVPdmVyID0gb3Bwb25lbnQuZ2FtZWJvYXJkLnNoaXBzUGxhY2VkLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY3VycmVudFBsYXllciA9IHBsYXllcjtcbiAgICBvcHBvbmVudCA9IGFpO1xuICAgIGdhbWVPdmVyID0gZmFsc2U7XG4gIH1cblxuICBpbml0KCk7XG5cbiAgcmV0dXJuIHtcbiAgICBwbGF5ZXIsXG4gICAgYWksXG4gICAgb3Bwb25lbnQsXG4gICAgY3VycmVudFBsYXllcixcbiAgICBzd2l0Y2hQbGF5ZXIsXG4gICAgcGxheVJvdW5kLFxuICAgIGdhbWVPdmVyLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xuIiwiY29uc3QgQk9BUkRfU0laRSA9IDEwO1xuXG5mdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gIHJldHVybiB7IHgsIHkgfTtcbn1cblxuZnVuY3Rpb24gcG9pbnRJbkxpc3QobGlzdCwgcG9pbnQpIHtcbiAgLy8gYSB1dGlsaXR5IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIGxpc3Qgb2YgcG9pbnRzIGNvbnRhaW4gYSBjZXJ0YWluIHBvaW50XG4gIHJldHVybiAoXG4gICAgbGlzdC5sZW5ndGggPiAwICYmXG4gICAgbGlzdC5zb21lKChjb250ZW50KSA9PiBjb250ZW50LnggPT09IHBvaW50LnggJiYgY29udGVudC55ID09PSBwb2ludC55KVxuICApO1xufVxuXG5mdW5jdGlvbiBTaGlwKGNvb3JkaW5hdGVMaXN0KSB7XG4gIGxldCB0aW1lc0hpdDtcbiAgY29uc3QgeyBsZW5ndGggfSA9IGNvb3JkaW5hdGVMaXN0O1xuXG4gIGZ1bmN0aW9uIGhpdCgpIHtcbiAgICBpZiAoIXRoaXMudGltZXNIaXQpIHtcbiAgICAgIHRoaXMudGltZXNIaXQgPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVzSGl0ICs9IDE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLnRpbWVzSGl0ID49IGxlbmd0aDtcbiAgfVxuXG4gIHJldHVybiB7IGNvb3JkaW5hdGVMaXN0LCBsZW5ndGgsIHRpbWVzSGl0LCBoaXQsIGlzU3VuayB9O1xufVxuXG5mdW5jdGlvbiBHYW1lQm9hcmQoKSB7XG4gIGNvbnN0IHNoaXBzUGxhY2VkID0gW107XG4gIGNvbnN0IG9jY3VwaWVkQ2VsbHMgPSBbXTtcbiAgY29uc3QgYXR0YWNrZWRDZWxscyA9IFtdO1xuICBjb25zdCBib3VuZHMgPSB7XG4gICAgeF9taW46IDAsXG4gICAgeF9tYXg6IEJPQVJEX1NJWkUsXG4gICAgeV9taW46IDAsXG4gICAgeV9tYXg6IEJPQVJEX1NJWkUsXG4gIH07XG5cbiAgZnVuY3Rpb24gaGFzU2hpcChwb2ludCkge1xuICAgIC8qXG4gICAgQ2hlY2tzIGlmIHBvaW50IG9iamVjdCBjYW4gYmUgcGxhY2VkIG9uIHRoZSBnYW1lYm9hcmQuIFxuICAgIElmIGFub3RoZXIgc2hpcCBvY2N1cGllcyB0aGUgY2VsbCwgcmV0dXJuIGZhbHNlXG4gICAgaW5wdXQ6IFBvaW50IG9iamVjdFxuICAgIHJldHVybjogYm9vbGVhblxuICAgICovXG4gICAgcmV0dXJuIHBvaW50SW5MaXN0KG9jY3VwaWVkQ2VsbHMsIHBvaW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlKGNvb3Jkcykge1xuICAgIC8qXG4gICAgUGxhY2VzIHNoaXAgb24gdGhlIGdhbWVib2FyZCBvbmx5IGlmIHRoZSBzaGlwIGRvZXMgbm90IGNvbGxpZGUgd2l0aFxuICAgIG90aGVyIGV4aXN0aW5nIHNoaXBzIG9uIHRoZSBib2FyZC5cbiAgICBpbnB1dDogbGlzdCBvZiBjb29yZGluYXRlcyBbaW50LCBpbnRdXG4gICAgKi9cbiAgICBjb25zdCBzaGlwQ29vcmRzID0gW107XG4gICAgY29vcmRzLmZvckVhY2goKHBhaXIpID0+IHtcbiAgICAgIGNvbnN0IHBvaW50ID0gUG9pbnQocGFpclswXSwgcGFpclsxXSk7XG4gICAgICBpZiAoXG4gICAgICAgIHBvaW50LnggPj0gYm91bmRzLnhfbWluICYmXG4gICAgICAgIHBvaW50LnggPD0gYm91bmRzLnhfbWF4ICYmXG4gICAgICAgIHBvaW50LnkgPj0gYm91bmRzLnlfbWluICYmXG4gICAgICAgIHBvaW50LnkgPD0gYm91bmRzLnlfbWF4ICYmXG4gICAgICAgICFoYXNTaGlwKHBvaW50KVxuICAgICAgKVxuICAgICAgICBzaGlwQ29vcmRzLnB1c2gocG9pbnQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHNoaXBDb29yZHMubGVuZ3RoID09PSBjb29yZHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBzaGlwID0gU2hpcChzaGlwQ29vcmRzKTtcbiAgICAgIHNoaXBzUGxhY2VkLnB1c2goc2hpcCk7XG4gICAgICBzaGlwQ29vcmRzLmZvckVhY2goKHBvaW50KSA9PiBvY2N1cGllZENlbGxzLnB1c2gocG9pbnQpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHBhaXIpIHtcbiAgICAvKlxuICAgIFJlY2VpdmVzIGEgcGFpciBvZiBpbnQgY29vcmRpbmF0ZXMuIFBvaW50IHJlY29yZCBpcyBtYWRlIGFuZCBzdG9yZWQgdG8gYXZvaWQgXG4gICAgcmVzZWxlY3Rpb24gb2YgYWxyZWFkeSBhdHRhY2tlZCBwb2ludCwgcmVnYXJkbGVzcyBvZiBoaXQgb3IgbWlzcy4gSWYgdGhlIHBvaW50XG4gICAgaGl0cyBhIGNvb3JkaW5hdGUgb24gYSBsaXN0ZWQgc2hpcCAoZnJvbSBzaGlwc1BsYWNlZCBsaXN0KSwgdGhlIGhpdCBmdW5jdGlvblxuICAgIGZyb20gdGhlIHNoaXAgb2JqZWN0IGlzIHRyaWdnZXJlZFxuICAgIGlucHV0OiBwYWlyIG9mIGNvb3JkaW5hdGVzXG4gICAgb3V0cHV0OiBib29sZWFuIChpZiBhdHRhY2sgd2FzIHJlY2VpdmVkKVxuICAgICovXG4gICAgY29uc3QgYXR0YWNrUG9pbnQgPSBQb2ludCguLi5wYWlyKTtcbiAgICBpZiAocG9pbnRJbkxpc3QoYXR0YWNrZWRDZWxscywgYXR0YWNrUG9pbnQpKSByZXR1cm4gZmFsc2U7XG4gICAgYXR0YWNrZWRDZWxscy5wdXNoKGF0dGFja1BvaW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzUGxhY2VkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzaGlwQ29vcmRzID0gc2hpcHNQbGFjZWRbaV0uY29vcmRpbmF0ZUxpc3Q7XG4gICAgICBpZiAocG9pbnRJbkxpc3Qoc2hpcENvb3JkcywgYXR0YWNrUG9pbnQpKSB7XG4gICAgICAgIHNoaXBzUGxhY2VkW2ldLmhpdCgpO1xuICAgICAgICBpZiAoc2hpcHNQbGFjZWRbaV0uaXNTdW5rKCkpIHtcbiAgICAgICAgICBzaGlwc1BsYWNlZC5zcGxpY2UoMCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFuZG9tQXR0YWNrUG9pbnQoKSB7XG4gICAgLypcbiAgICBnZXQgcmFuZG9tIG51bWJlcnMgdG8gbWFrZSBhIHBvaW50LCByZXR1cm5zIHRoZSByYW5kb20gcG9pbnQgaWYgbm90XG4gICAgcHJlc2VudCBpbiBsaXN0IG9mIHByZXZpb3VzbHkgYXR0YWNrZWQgcG9pbnRzLCBvdGhlcndpc2UgY2FsbCB0aGUgZnVuY3Rpb25cbiAgICBhZ2FpbiBhbmQgcmV0dXJuIGEgbmV3IHBvaW50XG4gICAgcmV0dXJuOiBwb2ludCBvYmplY3RcbiAgICAqL1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib3VuZHMueF9tYXggKyAxKTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm91bmRzLnlfbWF4ICsgMSk7XG4gICAgY29uc3QgcG9pbnQgPSBQb2ludCh4LCB5KTtcbiAgICBpZiAoIXBvaW50SW5MaXN0KGF0dGFja2VkQ2VsbHMsIHBvaW50KSkgcmV0dXJuIHBvaW50O1xuXG4gICAgY29uc3QgbmV3UG9pbnQgPSByYW5kb21BdHRhY2tQb2ludCgpO1xuICAgIHJldHVybiBuZXdQb2ludDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYm91bmRzLFxuICAgIHNoaXBzUGxhY2VkLFxuICAgIGF0dGFja2VkQ2VsbHMsXG4gICAgcGxhY2UsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICByYW5kb21BdHRhY2tQb2ludCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gUGxheWVyKG5hbWUpIHtcbiAgbGV0IGlzV2lubmVyO1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgZnVuY3Rpb24gc2V0TmFtZShzdHJpbmcpIHtcbiAgICB0aGlzLm5hbWUgPSBzdHJpbmc7XG4gIH1cbiAgcmV0dXJuIHsgbmFtZSwgaXNXaW5uZXIsIHNldE5hbWUsIGdhbWVib2FyZCB9O1xufVxuXG5leHBvcnQgeyBQb2ludCwgU2hpcCwgR2FtZUJvYXJkLCBQbGF5ZXIgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==