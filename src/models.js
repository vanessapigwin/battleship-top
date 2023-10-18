function Ship(coordinateList) {
  let timesHit;
  const { length } = coordinateList;

  function hit() {
    if (!timesHit) {
      timesHit = 1;
    } else {
      timesHit += 1;
    }
    return timesHit;
  }

  function isSunk() {
    return timesHit >= length;
  }

  return { coordinateList, length, timesHit, hit, isSunk };
}

function Point(x, y) {
  return { x, y };
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

  function canPlace(point) {
    if (
      occupiedCells.length > 0 &&
      occupiedCells.some(
        (content) => content.x === point.x && content.y === point.y
      )
    )
      return false;
    return true;
  }

  function place(coords) {
    const shipCoords = [];
    coords.forEach((pair) => {
      const point = Point(...pair);
      if (
        point.x >= bounds.x_min &&
        point.x <= bounds.x_max &&
        point.y >= bounds.y_min &&
        point.y <= bounds.y_max &&
        canPlace(point)
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
    const attackPoint = Point(...pair);
    attackedCells.push(attackPoint);
  }

  return { shipsPlaced, attackedCells, place, receiveAttack };
}

export { Point, Ship, GameBoard };
