import React from "react";
import { YOU, COMPUTER } from "../constants/GameGridConfig";

const TableCell = ({ cell, id, move, disabled }) => {
  let cellPieceStyle;
  if (cell === COMPUTER) cellPieceStyle = "computer-piece";
  if (cell === YOU) cellPieceStyle = "you-piece";

  return (
    <td>
      <div
        className={"cell"}
        key={id}
        onClick={disabled ? null : () => move(id, YOU)}
      >
        <div className={cellPieceStyle} />
      </div>
    </td>
  );
};

export default TableCell;
