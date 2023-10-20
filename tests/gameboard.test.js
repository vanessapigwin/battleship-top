import { GameBoard } from "../src/models";

const gameboard = GameBoard();

describe("coordinates create a ship on gameboard", () => {
  test("given coordinates are valid points", () => {
    const coords = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    gameboard.place(coords);
    expect(gameboard.shipsPlaced.length).toBe(1);
  });

  test("out of bound point will not be added", () => {
    const coords = [
      [-1, -1],
      [-1, -2],
    ];
    gameboard.place(coords);
    expect(gameboard.shipsPlaced.length).toBe(1);
  });

  test("overlapping ship will not be added", () => {
    const coords = [
      [0, 0],
      [1, 0],
      [2, 0],
    ];
    gameboard.place(coords);
    expect(gameboard.shipsPlaced.length).toBe(1);
  });
});

describe("receive attack", () => {
  test("store missed attack", () => {
    const attackCoord = [10, 10];
    gameboard.receiveAttack(attackCoord);
    expect(gameboard.attackedCells.length).toBe(1);
  });

  test("attack hits and triggers hit func", () => {
    const attackCoord = [0, 0];
    const ship = gameboard.shipsPlaced[0];
    const spy = jest.spyOn(ship, "hit");
    gameboard.receiveAttack(attackCoord);
    expect(gameboard.attackedCells.length).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  test("attack point should be unique", () => {
    const attackCoord = [0, 0];
    gameboard.receiveAttack(attackCoord);
    expect(gameboard.attackedCells.length).not.toBe(3);
  });

  test("sinking of ship is reflected", () => {
    gameboard.receiveAttack([0, 1]);
    gameboard.receiveAttack([0, 2]);
    expect(gameboard.shipsPlaced).toHaveLength(0);
  });
});

test("get random point", () => {
  expect(gameboard.randomAttackPoint()).toEqual({
    x: expect.any(Number),
    y: expect.any(Number),
  });
});
