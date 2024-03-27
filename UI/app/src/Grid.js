import React, { useState, useEffect } from 'react';

const Grid = () => {
  const rows = 5;
  const columns = 5;

  const [clickedCells, setClickedCells] = useState([]);
  const [cellColors, setCellColors] = useState([]);

  async function refreshColors() {
    try {
      const headers = { "Access-Control-Allow-Origin": '*' }
      const response = await fetch('http://localhost:31640', { headers });
      if (!response.ok) {
        console.error('Failed to fetch colors:', response.statusText);
        return
      }
      const data = await response.json();
      setCellColors(data);
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  }

  useEffect(() => {
    // Call the refreshColors function when the component mounts
    refreshColors();
    const interval = setInterval(() => {
      refreshColors();
    }, 2000);
    return () => clearInterval(interval)
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const refreshDB = async () => {
    try {
      const response = await fetch('http://localhost:31640/reset', {
        method: 'DELETE',
        headers: {
          "Access-Control-Allow-Origin": '*'
        },
      });
      if (response.ok) {
        setCellColors([]);
      }
    }
    catch (error) {
      console.error('Error updating color:', error);
    }
    await refreshColors();

  }

  const handleCellClick = async (row, col) => {
    // Add the clicked cell to the array
    setClickedCells([...clickedCells, { row, col }]);

    // Generate a random color
    const randomColor = getRandomColor();

    // Make a POST API call to update the color of the clicked cell
    try {
      const response = await fetch('http://localhost:31640', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          x: row,
          y: col,
          color: randomColor,
        }),
      });
      if (response.ok) {
        refreshColors();
      } else {
        console.error('Failed to update color:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating color:', error);
    }
  };

  const getRandomColor = () => {
    // Generate a random hex color
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };


  const getColorForCell = (row, col) => {
    // Find the color for the given coordinates
    const cell = cellColors.find(([coordinates,_]) => coordinates === row+","+col);
    return cell ? cell[1] : 'blue'; // default color
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
                  <button
                    style={{ backgroundColor:getColorForCell(rowIndex, colIndex)}}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    class="tile"
                  >
                    {rowIndex}, {colIndex}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => refreshDB()}>Refresh DB</button>
      </div>

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