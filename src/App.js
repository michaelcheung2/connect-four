import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import {
  ROW_COUNT,
  COLUMN_COUNT,
  YOU,
  COMPUTER,
} from "./constants/GameGridConfig";
import { checkWinCondition } from "./utils/CheckWinCondition";
import "./App.css";

const App = () => {
  // Initialize state.
  const [grid, setGrid] = useState([]);
  const [gameResult, setGameResult] = useState("");
  const [allMoves, setAllMoves] = useState([]);
  const [playerTurn, setPlayerTurn] = useState();
  const [playerSelectionControls, setPlayerSelectionControls] = useState(true);

  useEffect(() => initGrid(), []);

  // Creates a new grid when page loads, or when user presses "Start Over" button.
  const initGrid = () => {
    let newGrid = [];
    for (let row = 0; row < ROW_COUNT; row++) {
      let currRow = [];
      for (let column = 0; column < COLUMN_COUNT; column++) {
        currRow.push(null);
      }
      newGrid.push(currRow);
    }
    setGrid(newGrid);
    setAllMoves([]);
  };

  // Call the 9dt playing service with all the moves that have taken place so far.
  const getComputerNextMove = () => {
    let url =
      "https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=[" +
      allMoves +
      "]";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAllMoves(data);
        handleMove(data[data.length - 1], COMPUTER); // Take last item in array (computer's move).
      });
  };

  // Register the selected move (for either the player or computer).
  const handleMove = (column, player) => {
    // If game already concluded, don't allow anymore moves to be made.
    if (!gameResult) {
      let newGrid = grid;
      for (let row = ROW_COUNT - 1; row >= 0; row--) {
        if (!grid[row][column]) {
          // Designate the selected spot on the grid to the player.
          newGrid[row][column] = player;
          setGrid(newGrid);

          // Add this move to the running list of moves being tracked.
          setAllMoves((allMoves) => [...allMoves, column]);

          break;
        }
      }

      // Check for a winner, if none then switch players.
      let result = checkWinCondition(grid);
      if (result != null) {
        switch (result.toUpperCase()) {
          case YOU:
            setGameResult("YOU WIN!!!");
            break;
          case COMPUTER:
            setGameResult("You lose :(");
            break;
          case "DRAW":
            setGameResult("Draw.");
            break;
          default:
            break;
        }
      }

      //  No winner yet, keep going.
      if (result == null) {
        if (player === YOU) {
          getComputerNextMove();
        }

        if (player === YOU) setPlayerTurn(COMPUTER);
        if (player === COMPUTER) setPlayerTurn(YOU);
      }
    }
  };

  // Event handler for "Start Over" button.
  const handleNewGameClick = () => {
    setGameResult("");
    initGrid();
    setPlayerSelectionControls(true);
  };

  // Event handler for "Me" button.
  const handlePlayerGoesFirstClick = () => {
    setPlayerSelectionControls(false);
  };

  // Event handler for "Computer" button.
  const handleComputerGoesFirstClick = () => {
    getComputerNextMove();
    setPlayerSelectionControls(false);
  };

  function customFunction() {
    /*var board = [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ];*/
    var board = [
      ["C", "A", "A"],
      ["A", "A", "A"],
      ["B", "C", "D"],
    ];
    var word = "AAB";
    exist(board, word);
  }

  var exist = function (board, word) {
    function checkNeighbors(r, c, idx) {
      if (word.length === idx) return true;
      if (r >= board.length || r < 0 || board[r][c] !== word[idx]) return false;

      board[r][c] = "#"; // mark as visited

      if (
        checkNeighbors(r + 1, c, idx + 1) ||
        checkNeighbors(r - 1, c, idx + 1) ||
        checkNeighbors(r, c + 1, idx + 1) ||
        checkNeighbors(r, c - 1, idx + 1)
      )
        return true;

      //board[r][c] = word[idx]; // reset the board
    }

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[0].length; c++) {
        if (board[r][c] === word[0] && checkNeighbors(r, c, 0)) return true;
      }
    }
    return false;
  };

  var lengthOfLongestSubstring = function (s) {
    let max = 0;
    let localMax = 0;
    let str = "";

    for (const c of s) {
      if (!str.includes(c)) {
        str += c;
        localMax++;
      } else {
        str = str.slice(str.indexOf(c) + 1) + c;
        localMax = str.length;
      }
      max = Math.max(localMax, max);
    }
    return max;
  };

  return (
    <>
      <div className="controls-wrapper">
        <h2>98point6 Drop Token</h2>
        <div style={{ display: !playerSelectionControls ? "" : "none" }}>
          <button className="button-new-game" onClick={customFunction()}>
            Start Over
          </button>
        </div>
        <div style={{ display: playerSelectionControls ? "" : "none" }}>
          <span>Select who goes first: </span>
          <button className="button-you" onClick={handlePlayerGoesFirstClick}>
            Me
          </button>
          <button
            className="button-computer"
            onClick={handleComputerGoesFirstClick}
          >
            Computer
          </button>
        </div>
      </div>
      <div className="result-wrapper">
        {gameResult && <div className="finished-text">{gameResult}</div>}
      </div>
      <div>
        <Table
          grid={grid}
          move={handleMove}
          disabled={playerSelectionControls === true}
        />
      </div>
    </>
  );
};

export default App;
