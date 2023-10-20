import { Player } from "../src/models";

const player = Player();

describe("create human player", () => {
  test("initialize human player", () => {
    const playerData = {
      name: undefined,
      isWinner: undefined,
    };
    expect(player).toMatchObject(playerData);
    expect(player.gameboard).toBeDefined();
  });

  test("set human player name", () => {
    player.setName("Winwin");
    expect(player.name).toBe("Winwin");
  });

  test("isWinner status can be updated", () => {
    player.isWinner = true;
    expect(player.isWinner).toBeTruthy();
  });
});
