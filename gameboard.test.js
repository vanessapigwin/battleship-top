import { GameBoard } from "./src/models";

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

describe("receive attack, nothing hit", () => {
  test("store missed attack", () => {
    const attackCoord = [10, 10];
    gameboard.receiveAttack(attackCoord);
    expect(gameboard.attackedCells.length).toBe(1);
  });

  test.skip("attack hits and triggers hit ship", () => {
    const attackCoord = [0, 0];
    gameboard.receiveAttack(attackCoord);
  });
});
