import { Game } from "../src/game";

const game = Game();

describe("Components present", () => {
  test("currentPlayer, player and ai are defined", () => {
    expect(game.player).toBeDefined();
    expect(game.ai).toBeDefined();
    expect(game.currentPlayer).toBeDefined();
    expect(game.opponent).toBeDefined();
  });
});

test("game over is initialized", () => {
  expect(game).toHaveProperty("gameOver", false);
});

describe("switch player method changes player", () => {
  test("switch player changes currentPlayer", () => {
    game.player.setName("human");
    game.ai.setName("ai");
    expect(game.currentPlayer.name).toEqual("human");
    game.switchPlayer();
    expect(game.currentPlayer.name).toEqual("ai");
  });
});

describe("play round", () => {
  const newGame = Game();
  newGame.player.setName("human");
  newGame.player.gameboard.place([[0, 0]]);
  newGame.ai.gameboard.place([10, 10]);

  test("receive attack is called within play round", () => {
    // player turn
    const spy = jest.spyOn(newGame.ai.gameboard, "receiveAttack");
    newGame.playRound([5, 5]);
    expect(spy).toHaveBeenCalled();
  });

  test("switch player is called within play round", () => {
    const spy = jest.spyOn(newGame, "switchPlayer");
    // current player is now ai
    expect(newGame.currentPlayer.name).toBeUndefined();
    newGame.playRound([0, 0]);
    expect(spy).toHaveBeenCalled();
  });

  test("game over is reflected on object when there are no more boats", () => {
    expect(newGame.gameOver).toBeTruthy();
  });
});
