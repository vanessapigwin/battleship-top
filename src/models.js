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
          shipsPlaced.splice(0, 1);
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

export { Point, Ship, GameBoard, Player };
