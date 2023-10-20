import { Game } from "../src/game";

const game = Game();

describe("Components present", () => {
  test("currentPlayer is defined", () => {
    expect(game).toEqual(
      expect.objectContaining({ currentPlayer: expect.anything() })
    );
  });
});

describe("switch player method changes player", () => {
  test("switch player changes currentPlayer", () => {
    const current = game.currentPlayer;
    game.switchPlayer();
    expect(game.currentPlayer).not.toBe(current);
  });
});

describe("game over", () => {
  test("game over is initialized", () => {
    expect(game).toHaveProperty("gameOver", undefined);
  });
});
