// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Game of Life
// Video: https://youtu.be/FWSR_7kZuYg

let grid;
let cols;
let rows;
let resolution = 13;

function setup() {
  let header = document.querySelector("header");
  canvas = createCanvas(header.clientWidth, header.clientHeight);
  resolution = 0.009 * header.clientWidth;
  console.log(header.clientWidth, header.clientHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-99");
  canvas.style("webkitFilter", "blur(1px)");
  backgroundColor = [0, 0, 0];
  cellColor = [255, 255, 255];
  configureGrid();

  setTimeout(() => {
    setInterval(randomize, 10000);
  }, 1000);
}

function configureGrid() {
  cols = Math.floor(width / resolution);
  rows = Math.floor(height / resolution);

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}

function draw() {
  background(
    `rgba(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]},0.20)`
  );
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        fill(cellColor[0], cellColor[1], cellColor[2]);
        stroke(0);
        rect(x, y, resolution, resolution);
      }
    }
  }

  let next = make2DArray(cols, rows);

  // Compute next based on grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      // Count live neighbors!
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }

  grid = next;
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function windowResized() {
  let header = document.querySelector("header");
  resolution = 0.009 * header.clientWidth;
  resizeCanvas(header.clientWidth, header.clientHeight);
  configureGrid();
}

function randomize() {
  backgroundColor = [
    randomBetween(0, 255),
    randomBetween(0, 255),
    randomBetween(0, 255),
  ];
  cellColor = [
    randomBetween(0, 255),
    randomBetween(0, 255),
    randomBetween(0, 255),
  ];
  configureGrid();
  changePageColorCombination();
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * max + min);
}

function changePageColorCombination() {
  let mean = (backgroundColor[0] + backgroundColor[1] + backgroundColor[2]) / 3;
  let root = document.querySelector(":root");
  if (mean <= 100) {
    root.style.setProperty("--header-text-color", "#fff");
  } else {
    root.style.setProperty("--header-text-color", "rgb(15, 23,42)");
  }
}
