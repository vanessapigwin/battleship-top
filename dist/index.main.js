"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[826,196,757],{

/***/ 417:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(283);


function Game() {
  let currentPlayer;
  let gameOver;
  const player = (0,_models__WEBPACK_IMPORTED_MODULE_0__/* .Player */ .J5)();
  const ai = (0,_models__WEBPACK_IMPORTED_MODULE_0__/* .Player */ .J5)();

  (() => {
    currentPlayer = player;
  })();

  function switchPlayer() {
    this.currentPlayer = currentPlayer === player ? ai : player;
  }

  return { player, ai, currentPlayer, switchPlayer, gameOver };
}




/***/ }),

/***/ 138:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(417);


const game = (0,_game__WEBPACK_IMPORTED_MODULE_0__/* .Game */ .l)();
game.player.setName("Winwin");

game.player.gameboard.place([
  [0, 0],
  [0, 1],
  [0, 2],
]);
game.ai.gameboard.place([
  [0, 0],
  [0, 1],
  [0, 2],
]);

const gameOverCheck =
  game.player.gameboard.shipsPlaced.length === 0 ||
  game.ai.gameboard.shipsPlaced.length === 0;

console.log(gameOverCheck);


/***/ }),

/***/ 283:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J5: () => (/* binding */ Player)
/* harmony export */ });
/* unused harmony exports Point, Ship, GameBoard */
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
    x_max: 10,
    y_min: 0,
    y_max: 10,
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
/******/ var __webpack_exports__ = (__webpack_exec__(138));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgubWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWtDOztBQUVsQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUIseURBQU07QUFDdkIsYUFBYSx5REFBTTs7QUFFbkI7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFZ0I7Ozs7Ozs7OztBQ25CYzs7QUFFOUIsYUFBYSxvREFBSTtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxTQUFTOztBQUVuQjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isd0JBQXdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRTBDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10b3AvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRvcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRvcC8uL3NyYy9tb2RlbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vbW9kZWxzXCI7XG5cbmZ1bmN0aW9uIEdhbWUoKSB7XG4gIGxldCBjdXJyZW50UGxheWVyO1xuICBsZXQgZ2FtZU92ZXI7XG4gIGNvbnN0IHBsYXllciA9IFBsYXllcigpO1xuICBjb25zdCBhaSA9IFBsYXllcigpO1xuXG4gICgoKSA9PiB7XG4gICAgY3VycmVudFBsYXllciA9IHBsYXllcjtcbiAgfSkoKTtcblxuICBmdW5jdGlvbiBzd2l0Y2hQbGF5ZXIoKSB7XG4gICAgdGhpcy5jdXJyZW50UGxheWVyID0gY3VycmVudFBsYXllciA9PT0gcGxheWVyID8gYWkgOiBwbGF5ZXI7XG4gIH1cblxuICByZXR1cm4geyBwbGF5ZXIsIGFpLCBjdXJyZW50UGxheWVyLCBzd2l0Y2hQbGF5ZXIsIGdhbWVPdmVyIH07XG59XG5cbmV4cG9ydCB7IEdhbWUgfTtcbiIsImltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmNvbnN0IGdhbWUgPSBHYW1lKCk7XG5nYW1lLnBsYXllci5zZXROYW1lKFwiV2lud2luXCIpO1xuXG5nYW1lLnBsYXllci5nYW1lYm9hcmQucGxhY2UoW1xuICBbMCwgMF0sXG4gIFswLCAxXSxcbiAgWzAsIDJdLFxuXSk7XG5nYW1lLmFpLmdhbWVib2FyZC5wbGFjZShbXG4gIFswLCAwXSxcbiAgWzAsIDFdLFxuICBbMCwgMl0sXG5dKTtcblxuY29uc3QgZ2FtZU92ZXJDaGVjayA9XG4gIGdhbWUucGxheWVyLmdhbWVib2FyZC5zaGlwc1BsYWNlZC5sZW5ndGggPT09IDAgfHxcbiAgZ2FtZS5haS5nYW1lYm9hcmQuc2hpcHNQbGFjZWQubGVuZ3RoID09PSAwO1xuXG5jb25zb2xlLmxvZyhnYW1lT3ZlckNoZWNrKTtcbiIsImZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcbiAgcmV0dXJuIHsgeCwgeSB9O1xufVxuXG5mdW5jdGlvbiBwb2ludEluTGlzdChsaXN0LCBwb2ludCkge1xuICAvLyBhIHV0aWxpdHkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgbGlzdCBvZiBwb2ludHMgY29udGFpbiBhIGNlcnRhaW4gcG9pbnRcbiAgcmV0dXJuIChcbiAgICBsaXN0Lmxlbmd0aCA+IDAgJiZcbiAgICBsaXN0LnNvbWUoKGNvbnRlbnQpID0+IGNvbnRlbnQueCA9PT0gcG9pbnQueCAmJiBjb250ZW50LnkgPT09IHBvaW50LnkpXG4gICk7XG59XG5cbmZ1bmN0aW9uIFNoaXAoY29vcmRpbmF0ZUxpc3QpIHtcbiAgbGV0IHRpbWVzSGl0O1xuICBjb25zdCB7IGxlbmd0aCB9ID0gY29vcmRpbmF0ZUxpc3Q7XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIGlmICghdGhpcy50aW1lc0hpdCkge1xuICAgICAgdGhpcy50aW1lc0hpdCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGltZXNIaXQgKz0gMTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMudGltZXNIaXQgPj0gbGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZUxpc3QsIGxlbmd0aCwgdGltZXNIaXQsIGhpdCwgaXNTdW5rIH07XG59XG5cbmZ1bmN0aW9uIEdhbWVCb2FyZCgpIHtcbiAgY29uc3Qgc2hpcHNQbGFjZWQgPSBbXTtcbiAgY29uc3Qgb2NjdXBpZWRDZWxscyA9IFtdO1xuICBjb25zdCBhdHRhY2tlZENlbGxzID0gW107XG4gIGNvbnN0IGJvdW5kcyA9IHtcbiAgICB4X21pbjogMCxcbiAgICB4X21heDogMTAsXG4gICAgeV9taW46IDAsXG4gICAgeV9tYXg6IDEwLFxuICB9O1xuXG4gIGZ1bmN0aW9uIGhhc1NoaXAocG9pbnQpIHtcbiAgICAvKlxuICAgIENoZWNrcyBpZiBwb2ludCBvYmplY3QgY2FuIGJlIHBsYWNlZCBvbiB0aGUgZ2FtZWJvYXJkLiBcbiAgICBJZiBhbm90aGVyIHNoaXAgb2NjdXBpZXMgdGhlIGNlbGwsIHJldHVybiBmYWxzZVxuICAgIGlucHV0OiBQb2ludCBvYmplY3RcbiAgICByZXR1cm46IGJvb2xlYW5cbiAgICAqL1xuICAgIHJldHVybiBwb2ludEluTGlzdChvY2N1cGllZENlbGxzLCBwb2ludCk7XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZShjb29yZHMpIHtcbiAgICAvKlxuICAgIFBsYWNlcyBzaGlwIG9uIHRoZSBnYW1lYm9hcmQgb25seSBpZiB0aGUgc2hpcCBkb2VzIG5vdCBjb2xsaWRlIHdpdGhcbiAgICBvdGhlciBleGlzdGluZyBzaGlwcyBvbiB0aGUgYm9hcmQuXG4gICAgaW5wdXQ6IGxpc3Qgb2YgY29vcmRpbmF0ZXMgW2ludCwgaW50XVxuICAgICovXG4gICAgY29uc3Qgc2hpcENvb3JkcyA9IFtdO1xuICAgIGNvb3Jkcy5mb3JFYWNoKChwYWlyKSA9PiB7XG4gICAgICBjb25zdCBwb2ludCA9IFBvaW50KHBhaXJbMF0sIHBhaXJbMV0pO1xuICAgICAgaWYgKFxuICAgICAgICBwb2ludC54ID49IGJvdW5kcy54X21pbiAmJlxuICAgICAgICBwb2ludC54IDw9IGJvdW5kcy54X21heCAmJlxuICAgICAgICBwb2ludC55ID49IGJvdW5kcy55X21pbiAmJlxuICAgICAgICBwb2ludC55IDw9IGJvdW5kcy55X21heCAmJlxuICAgICAgICAhaGFzU2hpcChwb2ludClcbiAgICAgIClcbiAgICAgICAgc2hpcENvb3Jkcy5wdXNoKHBvaW50KTtcbiAgICB9KTtcblxuICAgIGlmIChzaGlwQ29vcmRzLmxlbmd0aCA9PT0gY29vcmRzLmxlbmd0aCkge1xuICAgICAgY29uc3Qgc2hpcCA9IFNoaXAoc2hpcENvb3Jkcyk7XG4gICAgICBzaGlwc1BsYWNlZC5wdXNoKHNoaXApO1xuICAgICAgc2hpcENvb3Jkcy5mb3JFYWNoKChwb2ludCkgPT4gb2NjdXBpZWRDZWxscy5wdXNoKHBvaW50KSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVjZWl2ZUF0dGFjayhwYWlyKSB7XG4gICAgLypcbiAgICBSZWNlaXZlcyBhIHBhaXIgb2YgaW50IGNvb3JkaW5hdGVzLiBQb2ludCByZWNvcmQgaXMgbWFkZSBhbmQgc3RvcmVkIHRvIGF2b2lkIFxuICAgIHJlc2VsZWN0aW9uIG9mIGFscmVhZHkgYXR0YWNrZWQgcG9pbnQsIHJlZ2FyZGxlc3Mgb2YgaGl0IG9yIG1pc3MuIElmIHRoZSBwb2ludFxuICAgIGhpdHMgYSBjb29yZGluYXRlIG9uIGEgbGlzdGVkIHNoaXAgKGZyb20gc2hpcHNQbGFjZWQgbGlzdCksIHRoZSBoaXQgZnVuY3Rpb25cbiAgICBmcm9tIHRoZSBzaGlwIG9iamVjdCBpcyB0cmlnZ2VyZWRcbiAgICBpbnB1dDogcGFpciBvZiBjb29yZGluYXRlc1xuICAgIG91dHB1dDogYm9vbGVhbiAoaWYgYXR0YWNrIHdhcyByZWNlaXZlZClcbiAgICAqL1xuICAgIGNvbnN0IGF0dGFja1BvaW50ID0gUG9pbnQoLi4ucGFpcik7XG4gICAgaWYgKHBvaW50SW5MaXN0KGF0dGFja2VkQ2VsbHMsIGF0dGFja1BvaW50KSkgcmV0dXJuIGZhbHNlO1xuICAgIGF0dGFja2VkQ2VsbHMucHVzaChhdHRhY2tQb2ludCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwc1BsYWNlZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc2hpcENvb3JkcyA9IHNoaXBzUGxhY2VkW2ldLmNvb3JkaW5hdGVMaXN0O1xuICAgICAgaWYgKHBvaW50SW5MaXN0KHNoaXBDb29yZHMsIGF0dGFja1BvaW50KSkge1xuICAgICAgICBzaGlwc1BsYWNlZFtpXS5oaXQoKTtcbiAgICAgICAgaWYgKHNoaXBzUGxhY2VkW2ldLmlzU3VuaygpKSB7XG4gICAgICAgICAgc2hpcHNQbGFjZWQuc3BsaWNlKDAsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbUF0dGFja1BvaW50KCkge1xuICAgIC8qXG4gICAgZ2V0IHJhbmRvbSBudW1iZXJzIHRvIG1ha2UgYSBwb2ludCwgcmV0dXJucyB0aGUgcmFuZG9tIHBvaW50IGlmIG5vdFxuICAgIHByZXNlbnQgaW4gbGlzdCBvZiBwcmV2aW91c2x5IGF0dGFja2VkIHBvaW50cywgb3RoZXJ3aXNlIGNhbGwgdGhlIGZ1bmN0aW9uXG4gICAgYWdhaW4gYW5kIHJldHVybiBhIG5ldyBwb2ludFxuICAgIHJldHVybjogcG9pbnQgb2JqZWN0XG4gICAgKi9cbiAgICBjb25zdCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm91bmRzLnhfbWF4ICsgMSk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvdW5kcy55X21heCArIDEpO1xuICAgIGNvbnN0IHBvaW50ID0gUG9pbnQoeCwgeSk7XG4gICAgaWYgKCFwb2ludEluTGlzdChhdHRhY2tlZENlbGxzLCBwb2ludCkpIHJldHVybiBwb2ludDtcblxuICAgIGNvbnN0IG5ld1BvaW50ID0gcmFuZG9tQXR0YWNrUG9pbnQoKTtcbiAgICByZXR1cm4gbmV3UG9pbnQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNoaXBzUGxhY2VkLFxuICAgIGF0dGFja2VkQ2VsbHMsXG4gICAgcGxhY2UsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICByYW5kb21BdHRhY2tQb2ludCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gUGxheWVyKG5hbWUpIHtcbiAgbGV0IGlzV2lubmVyO1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgZnVuY3Rpb24gc2V0TmFtZShzdHJpbmcpIHtcbiAgICB0aGlzLm5hbWUgPSBzdHJpbmc7XG4gIH1cbiAgcmV0dXJuIHsgbmFtZSwgaXNXaW5uZXIsIHNldE5hbWUsIGdhbWVib2FyZCB9O1xufVxuXG5leHBvcnQgeyBQb2ludCwgU2hpcCwgR2FtZUJvYXJkLCBQbGF5ZXIgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==