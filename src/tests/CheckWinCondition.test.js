import { checkWinCondition } from "../utils/CheckWinCondition";
import { YOU, COMPUTER } from "../constants/GameGridConfig";

// Initialize variables used for testing.
let verticalWin = [
  [YOU, null, null, null],
  [YOU, null, null, null],
  [YOU, null, null, null],
  [YOU, COMPUTER, COMPUTER, COMPUTER],
];
let horizontalWin = [
  [COMPUTER, null, null, null],
  [COMPUTER, null, null, null],
  [COMPUTER, null, null, null],
  [YOU, YOU, YOU, YOU],
];
let leftDiagonalWin = [
  [null, null, null, YOU],
  [null, null, YOU, null],
  [null, YOU, null, null],
  [YOU, COMPUTER, COMPUTER, COMPUTER],
];
let rightDiagonalWin = [
  [YOU, null, null, COMPUTER],
  [null, YOU, null, COMPUTER],
  [null, null, YOU, COMPUTER],
  [null, null, null, YOU],
];
let drawNobodyWins = [
  [YOU, YOU, COMPUTER, COMPUTER],
  [COMPUTER, COMPUTER, YOU, COMPUTER],
  [YOU, YOU, YOU, COMPUTER],
  [YOU, COMPUTER, COMPUTER, YOU],
];
let gameUnfinished = [
  [YOU, YOU, COMPUTER, COMPUTER],
  [COMPUTER, COMPUTER, YOU, null],
  [YOU, YOU, YOU, COMPUTER],
  [YOU, COMPUTER, COMPUTER, YOU],
];

// These tests are for testing all possible win scenarios.
describe("checkWinCondition", () => {
  it("should be a vertical win for you", () => {
    expect(checkWinCondition(verticalWin)).toEqual(YOU);
  });
  it("should be a horizontal win for you", () => {
    expect(checkWinCondition(horizontalWin)).toEqual(YOU);
  });
  it("should be a left diagonal win for you", () => {
    expect(checkWinCondition(leftDiagonalWin)).toEqual(YOU);
  });
  it("should be a right diagonal win for you", () => {
    expect(checkWinCondition(rightDiagonalWin)).toEqual(YOU);
  });
  it("should be a draw, nobody wins", () => {
    expect(checkWinCondition(drawNobodyWins)).toEqual("DRAW");
  });
  it("should be null, game not finished yet", () => {
    expect(checkWinCondition(gameUnfinished)).toEqual(null);
  });
});
