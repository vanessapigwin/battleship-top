"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[196],{

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




/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__(283));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLm1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOztBQUVBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLFNBQVM7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isd0JBQXdCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFMEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRvcC8uL3NyYy9tb2RlbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQk9BUkRfTUFYX0lEWCA9IDk7XG5cbmZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcbiAgcmV0dXJuIHsgeCwgeSB9O1xufVxuXG5mdW5jdGlvbiBwb2ludEluTGlzdChsaXN0LCBwb2ludCkge1xuICAvLyBhIHV0aWxpdHkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgbGlzdCBvZiBwb2ludHMgY29udGFpbiBhIGNlcnRhaW4gcG9pbnRcbiAgcmV0dXJuIChcbiAgICBsaXN0Lmxlbmd0aCA+IDAgJiZcbiAgICBsaXN0LnNvbWUoKGNvbnRlbnQpID0+IGNvbnRlbnQueCA9PT0gcG9pbnQueCAmJiBjb250ZW50LnkgPT09IHBvaW50LnkpXG4gICk7XG59XG5cbmZ1bmN0aW9uIFNoaXAoY29vcmRpbmF0ZUxpc3QpIHtcbiAgbGV0IHRpbWVzSGl0O1xuICBjb25zdCB7IGxlbmd0aCB9ID0gY29vcmRpbmF0ZUxpc3Q7XG5cbiAgZnVuY3Rpb24gaGl0KCkge1xuICAgIGlmICghdGhpcy50aW1lc0hpdCkge1xuICAgICAgdGhpcy50aW1lc0hpdCA9IDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGltZXNIaXQgKz0gMTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMudGltZXNIaXQgPj0gbGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIHsgY29vcmRpbmF0ZUxpc3QsIGxlbmd0aCwgdGltZXNIaXQsIGhpdCwgaXNTdW5rIH07XG59XG5cbmZ1bmN0aW9uIEdhbWVCb2FyZCgpIHtcbiAgY29uc3Qgc2hpcHNQbGFjZWQgPSBbXTtcbiAgY29uc3Qgb2NjdXBpZWRDZWxscyA9IFtdO1xuICBjb25zdCBhdHRhY2tlZENlbGxzID0gW107XG4gIGNvbnN0IGJvdW5kcyA9IHtcbiAgICB4X21pbjogMCxcbiAgICB4X21heDogQk9BUkRfTUFYX0lEWCxcbiAgICB5X21pbjogMCxcbiAgICB5X21heDogQk9BUkRfTUFYX0lEWCxcbiAgfTtcblxuICBmdW5jdGlvbiBoYXNTaGlwKHBvaW50KSB7XG4gICAgLypcbiAgICBDaGVja3MgaWYgcG9pbnQgb2JqZWN0IGNhbiBiZSBwbGFjZWQgb24gdGhlIGdhbWVib2FyZC4gXG4gICAgSWYgYW5vdGhlciBzaGlwIG9jY3VwaWVzIHRoZSBjZWxsLCByZXR1cm4gZmFsc2VcbiAgICBpbnB1dDogUG9pbnQgb2JqZWN0XG4gICAgcmV0dXJuOiBib29sZWFuXG4gICAgKi9cbiAgICByZXR1cm4gcG9pbnRJbkxpc3Qob2NjdXBpZWRDZWxscywgcG9pbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2UoY29vcmRzKSB7XG4gICAgLypcbiAgICBQbGFjZXMgc2hpcCBvbiB0aGUgZ2FtZWJvYXJkIG9ubHkgaWYgdGhlIHNoaXAgZG9lcyBub3QgY29sbGlkZSB3aXRoXG4gICAgb3RoZXIgZXhpc3Rpbmcgc2hpcHMgb24gdGhlIGJvYXJkLlxuICAgIGlucHV0OiBsaXN0IG9mIGNvb3JkaW5hdGVzIFtpbnQsIGludF1cbiAgICAqL1xuICAgIGNvbnN0IHNoaXBDb29yZHMgPSBbXTtcbiAgICBjb29yZHMuZm9yRWFjaCgocGFpcikgPT4ge1xuICAgICAgY29uc3QgcG9pbnQgPSBQb2ludChwYWlyWzBdLCBwYWlyWzFdKTtcbiAgICAgIGlmIChcbiAgICAgICAgcG9pbnQueCA+PSBib3VuZHMueF9taW4gJiZcbiAgICAgICAgcG9pbnQueCA8PSBib3VuZHMueF9tYXggJiZcbiAgICAgICAgcG9pbnQueSA+PSBib3VuZHMueV9taW4gJiZcbiAgICAgICAgcG9pbnQueSA8PSBib3VuZHMueV9tYXggJiZcbiAgICAgICAgIWhhc1NoaXAocG9pbnQpXG4gICAgICApXG4gICAgICAgIHNoaXBDb29yZHMucHVzaChwb2ludCk7XG4gICAgfSk7XG5cbiAgICBpZiAoc2hpcENvb3Jkcy5sZW5ndGggPT09IGNvb3Jkcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBTaGlwKHNoaXBDb29yZHMpO1xuICAgICAgc2hpcHNQbGFjZWQucHVzaChzaGlwKTtcbiAgICAgIHNoaXBDb29yZHMuZm9yRWFjaCgocG9pbnQpID0+IG9jY3VwaWVkQ2VsbHMucHVzaChwb2ludCkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2socGFpcikge1xuICAgIC8qXG4gICAgUmVjZWl2ZXMgYSBwYWlyIG9mIGludCBjb29yZGluYXRlcy4gUG9pbnQgcmVjb3JkIGlzIG1hZGUgYW5kIHN0b3JlZCB0byBhdm9pZCBcbiAgICByZXNlbGVjdGlvbiBvZiBhbHJlYWR5IGF0dGFja2VkIHBvaW50LCByZWdhcmRsZXNzIG9mIGhpdCBvciBtaXNzLiBJZiB0aGUgcG9pbnRcbiAgICBoaXRzIGEgY29vcmRpbmF0ZSBvbiBhIGxpc3RlZCBzaGlwIChmcm9tIHNoaXBzUGxhY2VkIGxpc3QpLCB0aGUgaGl0IGZ1bmN0aW9uXG4gICAgZnJvbSB0aGUgc2hpcCBvYmplY3QgaXMgdHJpZ2dlcmVkXG4gICAgaW5wdXQ6IHBhaXIgb2YgY29vcmRpbmF0ZXNcbiAgICBvdXRwdXQ6IGJvb2xlYW4gKGlmIGF0dGFjayB3YXMgcmVjZWl2ZWQpXG4gICAgKi9cbiAgICBjb25zdCBhdHRhY2tQb2ludCA9IFBvaW50KC4uLnBhaXIpO1xuICAgIGlmIChwb2ludEluTGlzdChhdHRhY2tlZENlbGxzLCBhdHRhY2tQb2ludCkpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgYXR0YWNrZWRDZWxscy5wdXNoKGF0dGFja1BvaW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzUGxhY2VkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzaGlwQ29vcmRzID0gc2hpcHNQbGFjZWRbaV0uY29vcmRpbmF0ZUxpc3Q7XG4gICAgICBpZiAocG9pbnRJbkxpc3Qoc2hpcENvb3JkcywgYXR0YWNrUG9pbnQpKSB7XG4gICAgICAgIHNoaXBzUGxhY2VkW2ldLmhpdCgpO1xuICAgICAgICBpZiAoc2hpcHNQbGFjZWRbaV0uaXNTdW5rKCkpIHtcbiAgICAgICAgICBzaGlwc1BsYWNlZC5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwb2ludEluTGlzdChvY2N1cGllZENlbGxzLCBhdHRhY2tQb2ludCk7XG4gIH1cblxuICBmdW5jdGlvbiByYW5kb21BdHRhY2tQb2ludCgpIHtcbiAgICAvKlxuICAgIGdldCByYW5kb20gbnVtYmVycyB0byBtYWtlIGEgcG9pbnQsIHJldHVybnMgdGhlIHJhbmRvbSBwb2ludCBpZiBub3RcbiAgICBwcmVzZW50IGluIGxpc3Qgb2YgcHJldmlvdXNseSBhdHRhY2tlZCBwb2ludHMsIG90aGVyd2lzZSBjYWxsIHRoZSBmdW5jdGlvblxuICAgIGFnYWluIGFuZCByZXR1cm4gYSBuZXcgcG9pbnRcbiAgICByZXR1cm46IHBvaW50IG9iamVjdFxuICAgICovXG4gICAgY29uc3QgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvdW5kcy54X21heCk7XG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGJvdW5kcy55X21heCk7XG4gICAgY29uc3QgcG9pbnQgPSBQb2ludCh4LCB5KTtcbiAgICBpZiAoIXBvaW50SW5MaXN0KGF0dGFja2VkQ2VsbHMsIHBvaW50KSkgcmV0dXJuIHBvaW50O1xuXG4gICAgY29uc3QgbmV3UG9pbnQgPSByYW5kb21BdHRhY2tQb2ludCgpO1xuICAgIHJldHVybiBuZXdQb2ludDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYm91bmRzLFxuICAgIHNoaXBzUGxhY2VkLFxuICAgIGF0dGFja2VkQ2VsbHMsXG4gICAgcGxhY2UsXG4gICAgcmVjZWl2ZUF0dGFjayxcbiAgICByYW5kb21BdHRhY2tQb2ludCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gUGxheWVyKG5hbWUpIHtcbiAgbGV0IGlzV2lubmVyO1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgZnVuY3Rpb24gc2V0TmFtZShzdHJpbmcpIHtcbiAgICB0aGlzLm5hbWUgPSBzdHJpbmc7XG4gIH1cbiAgcmV0dXJuIHsgbmFtZSwgaXNXaW5uZXIsIHNldE5hbWUsIGdhbWVib2FyZCB9O1xufVxuXG5leHBvcnQgeyBQb2ludCwgU2hpcCwgR2FtZUJvYXJkLCBQbGF5ZXIgfTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==