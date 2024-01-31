import React, { useState } from 'react';

const Grid = () => {
  const rows = 5;
  const columns = 5;

  const [clickedCells, setClickedCells] = useState([]);

  const handleCellClick = (row, col) => {
    // Add the clicked cell to the array
    setClickedCells([...clickedCells, { row, col }]);
  };

  return (
    <div>
      <h2>Clickable Grid</h2>
      <table>
        <tbody>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }, (_, colIndex) => (
                <td key={colIndex}>
                  <button onClick={() => handleCellClick(rowIndex, colIndex)}>
                    {rowIndex}, {colIndex}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display clicked cells */}
      <div>
        <h3>Clicked Cells:</h3>
        <ul>
          {clickedCells.map(({ row, col }, index) => (
            <li key={index}>
              Clicked cell at ({row}, {col})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Grid;