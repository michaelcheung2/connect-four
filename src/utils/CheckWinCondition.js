import { ROW_COUNT, COLUMN_COUNT } from "../constants/GameGridConfig";

// Checks the current status of the grid.
// Can return one of these: "YOU" | "COMPUTER" | "DRAW" | null
export const checkWinCondition = (grid) => {
  return (
    checkVertical(grid) ||
    checkHorizontal(grid) ||
    checkLeftDiagonal(grid) ||
    checkRightDiagonal(grid) ||
    checkDraw(grid)
  );
};

export const checkVertical = (grid) => {
  let row = ROW_COUNT - 1;
  for (let column = 0; column < COLUMN_COUNT; column++) {
    if (grid[row][column]) {
      if (
        grid[row][column] === grid[row - 1][column] &&
        grid[row][column] === grid[row - 2][column] &&
        grid[row][column] === grid[row - 3][column]
      ) {
        return grid[row][column];
      }
    }
  }
};

export const checkHorizontal = (grid) => {
  let column = COLUMN_COUNT - 1;
  for (let row = 0; row < ROW_COUNT; row++) {
    if (grid[row][column]) {
      if (
        grid[row][column] === grid[row][column - 1] &&
        grid[row][column] === grid[row][column - 2] &&
        grid[row][column] === grid[row][column - 3]
      ) {
        return grid[row][column];
      }
    }
  }
};

export const checkLeftDiagonal = (grid) => {
  let row = ROW_COUNT - 1,
    column = 0;
  if (grid[row][column]) {
    if (
      grid[row][column] === grid[row - 1][column + 1] &&
      grid[row][column] === grid[row - 2][column + 2] &&
      grid[row][column] === grid[row - 3][column + 3]
    ) {
      return grid[row][column];
    }
  }
};

export const checkRightDiagonal = (grid) => {
  let row = 0,
    column = 0;
  if (grid[row][column]) {
    if (
      grid[row][column] === grid[row + 1][column + 1] &&
      grid[row][column] === grid[row + 2][column + 2] &&
      grid[row][column] === grid[row + 3][column + 3]
    ) {
      return grid[row][column];
    }
  }
};

export const checkDraw = (grid) => {
  for (let row = 0; row < ROW_COUNT; row++) {
    for (let column = 0; column < COLUMN_COUNT; column++) {
      if (grid[row][column] === null) {
        return null;
      }
    }
  }
  return "DRAW";
};
