const gridContainer = document.getElementById('grid-container');

const gridsize = 10;

// Function to create the grid
function createGrid() {
  for (let i = 0; i < gridsize; i++) {
    for (let j = 0; j < gridsize; j++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.dataset.x = i;
      square.dataset.y = j;
      square.addEventListener('click', handleClick);
      gridContainer.appendChild(square);
    }
  }
  updateGridColors();
}

// Function to handle square click
function handleClick(event) {
  const square = event.target;
  const x = square.dataset.x;
  const y = square.dataset.y;
  const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16); // Generate random color
  const data = { x, y, color: randomColor };
  
  fetch('http://localhost:31640', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      updateGridColors();
      console.log("Success:", response);
    }
    else {
      console.log("Error in post response: ", response);
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
}

// Function to update grid colors
function updateGridColors() {
  console.log("Updating grid colors")
  fetch('http://localhost:31640')
  .then(response => response.json())
  .then(data => {
    try{
      console.log(data)
      data.forEach(item => {
        const [coords, color] = item;
        const [x, y] = coords.split(',').map(Number);
        const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
        if (!square) return;
        square.style.backgroundColor = color;
      });
    }
    catch {
      console.log("Error: ", data);
    }
   
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}

// Initial grid creation
createGrid();

setInterval(updateGridColors, 5000); 