import React from "react";
import TableCell from "./TableCell";

const TableRow = ({ row, move, disabled }) => {
  return (
    <tr>
      {row &&
        row.map((cell, idx) => {
          return (
            <TableCell
              cell={cell}
              id={idx}
              key={idx}
              move={move}
              disabled={disabled}
            />
          );
        })}
    </tr>
  );
};

export default TableRow;
