import React from "react";
import TableRow from "./TableRow";

const Table = ({ grid, move, disabled }) => {
  return (
    <table className="table">
      <tbody>
        {grid.map((row, idx) => (
          <TableRow key={idx} row={row} move={move} disabled={disabled} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
