import { Ship, Point } from "./src/models";

const ship = Ship([Point(0, 0), Point(0, 1), Point(0, 2)]);

test("Ship model with length exists", () => {
  expect(ship).toHaveProperty("length", 3);
  expect(ship).toHaveProperty("coordinateList", [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ]);
});

describe("function hit updates timesHit", () => {
  test("timesHit updates when hit function is called for first time", () => {
    expect(ship.hit()).toBe(1);
  });

  test("timesHit updates as usual", () => {
    // second hit from setup
    expect(ship.hit()).toBe(2);
  });
});

describe("isSunk reports true or false", () => {
  test("isSunk reports false when timesHit is under length", () => {
    expect(ship.isSunk()).toBeFalsy();
  });

  test("isSunk reports true when timesHit is at least equal to length", () => {
    // third hit from setup
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});
