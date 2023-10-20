"use strict";
(self["webpackChunkbattleship_top"] = self["webpackChunkbattleship_top"] || []).push([[196],{

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
/******/ var __webpack_exports__ = (__webpack_exec__(283));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLm1haW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLFNBQVM7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix3QkFBd0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFMEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRvcC8uL3NyYy9tb2RlbHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICByZXR1cm4geyB4LCB5IH07XG59XG5cbmZ1bmN0aW9uIHBvaW50SW5MaXN0KGxpc3QsIHBvaW50KSB7XG4gIC8vIGEgdXRpbGl0eSBmdW5jdGlvbiB0byBjaGVjayBpZiBsaXN0IG9mIHBvaW50cyBjb250YWluIGEgY2VydGFpbiBwb2ludFxuICByZXR1cm4gKFxuICAgIGxpc3QubGVuZ3RoID4gMCAmJlxuICAgIGxpc3Quc29tZSgoY29udGVudCkgPT4gY29udGVudC54ID09PSBwb2ludC54ICYmIGNvbnRlbnQueSA9PT0gcG9pbnQueSlcbiAgKTtcbn1cblxuZnVuY3Rpb24gU2hpcChjb29yZGluYXRlTGlzdCkge1xuICBsZXQgdGltZXNIaXQ7XG4gIGNvbnN0IHsgbGVuZ3RoIH0gPSBjb29yZGluYXRlTGlzdDtcblxuICBmdW5jdGlvbiBoaXQoKSB7XG4gICAgaWYgKCF0aGlzLnRpbWVzSGl0KSB7XG4gICAgICB0aGlzLnRpbWVzSGl0ID0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aW1lc0hpdCArPSAxO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy50aW1lc0hpdCA+PSBsZW5ndGg7XG4gIH1cblxuICByZXR1cm4geyBjb29yZGluYXRlTGlzdCwgbGVuZ3RoLCB0aW1lc0hpdCwgaGl0LCBpc1N1bmsgfTtcbn1cblxuZnVuY3Rpb24gR2FtZUJvYXJkKCkge1xuICBjb25zdCBzaGlwc1BsYWNlZCA9IFtdO1xuICBjb25zdCBvY2N1cGllZENlbGxzID0gW107XG4gIGNvbnN0IGF0dGFja2VkQ2VsbHMgPSBbXTtcbiAgY29uc3QgYm91bmRzID0ge1xuICAgIHhfbWluOiAwLFxuICAgIHhfbWF4OiAxMCxcbiAgICB5X21pbjogMCxcbiAgICB5X21heDogMTAsXG4gIH07XG5cbiAgZnVuY3Rpb24gaGFzU2hpcChwb2ludCkge1xuICAgIC8qXG4gICAgQ2hlY2tzIGlmIHBvaW50IG9iamVjdCBjYW4gYmUgcGxhY2VkIG9uIHRoZSBnYW1lYm9hcmQuIFxuICAgIElmIGFub3RoZXIgc2hpcCBvY2N1cGllcyB0aGUgY2VsbCwgcmV0dXJuIGZhbHNlXG4gICAgaW5wdXQ6IFBvaW50IG9iamVjdFxuICAgIHJldHVybjogYm9vbGVhblxuICAgICovXG4gICAgcmV0dXJuIHBvaW50SW5MaXN0KG9jY3VwaWVkQ2VsbHMsIHBvaW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYWNlKGNvb3Jkcykge1xuICAgIC8qXG4gICAgUGxhY2VzIHNoaXAgb24gdGhlIGdhbWVib2FyZCBvbmx5IGlmIHRoZSBzaGlwIGRvZXMgbm90IGNvbGxpZGUgd2l0aFxuICAgIG90aGVyIGV4aXN0aW5nIHNoaXBzIG9uIHRoZSBib2FyZC5cbiAgICBpbnB1dDogbGlzdCBvZiBjb29yZGluYXRlcyBbaW50LCBpbnRdXG4gICAgKi9cbiAgICBjb25zdCBzaGlwQ29vcmRzID0gW107XG4gICAgY29vcmRzLmZvckVhY2goKHBhaXIpID0+IHtcbiAgICAgIGNvbnN0IHBvaW50ID0gUG9pbnQocGFpclswXSwgcGFpclsxXSk7XG4gICAgICBpZiAoXG4gICAgICAgIHBvaW50LnggPj0gYm91bmRzLnhfbWluICYmXG4gICAgICAgIHBvaW50LnggPD0gYm91bmRzLnhfbWF4ICYmXG4gICAgICAgIHBvaW50LnkgPj0gYm91bmRzLnlfbWluICYmXG4gICAgICAgIHBvaW50LnkgPD0gYm91bmRzLnlfbWF4ICYmXG4gICAgICAgICFoYXNTaGlwKHBvaW50KVxuICAgICAgKVxuICAgICAgICBzaGlwQ29vcmRzLnB1c2gocG9pbnQpO1xuICAgIH0pO1xuXG4gICAgaWYgKHNoaXBDb29yZHMubGVuZ3RoID09PSBjb29yZHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBzaGlwID0gU2hpcChzaGlwQ29vcmRzKTtcbiAgICAgIHNoaXBzUGxhY2VkLnB1c2goc2hpcCk7XG4gICAgICBzaGlwQ29vcmRzLmZvckVhY2goKHBvaW50KSA9PiBvY2N1cGllZENlbGxzLnB1c2gocG9pbnQpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHBhaXIpIHtcbiAgICAvKlxuICAgIFJlY2VpdmVzIGEgcGFpciBvZiBpbnQgY29vcmRpbmF0ZXMuIFBvaW50IHJlY29yZCBpcyBtYWRlIGFuZCBzdG9yZWQgdG8gYXZvaWQgXG4gICAgcmVzZWxlY3Rpb24gb2YgYWxyZWFkeSBhdHRhY2tlZCBwb2ludCwgcmVnYXJkbGVzcyBvZiBoaXQgb3IgbWlzcy4gSWYgdGhlIHBvaW50XG4gICAgaGl0cyBhIGNvb3JkaW5hdGUgb24gYSBsaXN0ZWQgc2hpcCAoZnJvbSBzaGlwc1BsYWNlZCBsaXN0KSwgdGhlIGhpdCBmdW5jdGlvblxuICAgIGZyb20gdGhlIHNoaXAgb2JqZWN0IGlzIHRyaWdnZXJlZFxuICAgIGlucHV0OiBwYWlyIG9mIGNvb3JkaW5hdGVzXG4gICAgb3V0cHV0OiBib29sZWFuIChpZiBhdHRhY2sgd2FzIHJlY2VpdmVkKVxuICAgICovXG4gICAgY29uc3QgYXR0YWNrUG9pbnQgPSBQb2ludCguLi5wYWlyKTtcbiAgICBpZiAocG9pbnRJbkxpc3QoYXR0YWNrZWRDZWxscywgYXR0YWNrUG9pbnQpKSByZXR1cm4gZmFsc2U7XG4gICAgYXR0YWNrZWRDZWxscy5wdXNoKGF0dGFja1BvaW50KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzUGxhY2VkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzaGlwQ29vcmRzID0gc2hpcHNQbGFjZWRbaV0uY29vcmRpbmF0ZUxpc3Q7XG4gICAgICBpZiAocG9pbnRJbkxpc3Qoc2hpcENvb3JkcywgYXR0YWNrUG9pbnQpKSB7XG4gICAgICAgIHNoaXBzUGxhY2VkW2ldLmhpdCgpO1xuICAgICAgICBpZiAoc2hpcHNQbGFjZWRbaV0uaXNTdW5rKCkpIHtcbiAgICAgICAgICBzaGlwc1BsYWNlZC5zcGxpY2UoMCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFuZG9tQXR0YWNrUG9pbnQoKSB7XG4gICAgLypcbiAgICBnZXQgcmFuZG9tIG51bWJlcnMgdG8gbWFrZSBhIHBvaW50LCByZXR1cm5zIHRoZSByYW5kb20gcG9pbnQgaWYgbm90XG4gICAgcHJlc2VudCBpbiBsaXN0IG9mIHByZXZpb3VzbHkgYXR0YWNrZWQgcG9pbnRzLCBvdGhlcndpc2UgY2FsbCB0aGUgZnVuY3Rpb25cbiAgICBhZ2FpbiBhbmQgcmV0dXJuIGEgbmV3IHBvaW50XG4gICAgcmV0dXJuOiBwb2ludCBvYmplY3RcbiAgICAqL1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBib3VuZHMueF9tYXggKyAxKTtcbiAgICBjb25zdCB5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYm91bmRzLnlfbWF4ICsgMSk7XG4gICAgY29uc3QgcG9pbnQgPSBQb2ludCh4LCB5KTtcbiAgICBpZiAoIXBvaW50SW5MaXN0KGF0dGFja2VkQ2VsbHMsIHBvaW50KSkgcmV0dXJuIHBvaW50O1xuXG4gICAgY29uc3QgbmV3UG9pbnQgPSByYW5kb21BdHRhY2tQb2ludCgpO1xuICAgIHJldHVybiBuZXdQb2ludDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2hpcHNQbGFjZWQsXG4gICAgYXR0YWNrZWRDZWxscyxcbiAgICBwbGFjZSxcbiAgICByZWNlaXZlQXR0YWNrLFxuICAgIHJhbmRvbUF0dGFja1BvaW50LFxuICB9O1xufVxuXG5mdW5jdGlvbiBQbGF5ZXIobmFtZSkge1xuICBsZXQgaXNXaW5uZXI7XG4gIGNvbnN0IGdhbWVib2FyZCA9IEdhbWVCb2FyZCgpO1xuICBmdW5jdGlvbiBzZXROYW1lKHN0cmluZykge1xuICAgIHRoaXMubmFtZSA9IHN0cmluZztcbiAgfVxuICByZXR1cm4geyBuYW1lLCBpc1dpbm5lciwgc2V0TmFtZSwgZ2FtZWJvYXJkIH07XG59XG5cbmV4cG9ydCB7IFBvaW50LCBTaGlwLCBHYW1lQm9hcmQsIFBsYXllciB9O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9