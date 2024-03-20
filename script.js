import { LinkedList } from "./linkedlist.js";

"use strict";

window.addEventListener("load", start);

// ******** CONTROLLER ********

function start() {
  console.log(`Javascript kører`);

  document.addEventListener("keydown", keyDown);
  document.addEventListener("keyup", keyUp);
  createView();
  createModel();
  generateGoal();
  deathCheck();
  

  // start ticking
  tick();
}

function keyDown(event) {
    switch (event.key) {
        case "w":
        case "ArrowUp":
        controls.up = true;
        break;
        case "s":
        case "ArrowDown":
        controls.down = true;
        break;
        case "a":
        case "ArrowLeft":
        controls.left = true;
        break;
        case "d":
        case "ArrowRight":
        controls.right = true;
        break;
    }
}

function keyUp(event) {
    switch (event.key) {
        case "w":
        case "ArrowUp":
        controls.up = false;
        break;
        case "s":
        case "ArrowDown":
        controls.down = false;
        break;
        case "a":
        case "ArrowLeft":
        controls.left = false;
        break;
        case "d":
        case "ArrowRight":
        controls.right = false;
        break;
    }
}

function tick() {
  // setup next tick
  setTimeout(tick, 200);

  // TODO: Do stuff

  // clear current player position
  for (const part of queue) {
    writeToCell(part.row, part.col, 0);
  }

  if(controls.up) {
    direction = "up";
  } else if(controls.down) {
    direction = "down";
  } else if(controls.left) {
    direction = "left";
  } else if(controls.right) {
    direction = "right";
  }

  // lav nyt head objekt
  const head = {
    row: queue[queue.length - 1].row,
    col: queue[queue.length - 1].col,
  }

  switch (direction) {
    case "up":
      head.row--;
      break;
    case "down":
      head.row++;
      break;
    case "left":
      head.col--;
      break;
    case "right":
      head.col++;
      break;
  }

    queue.push(head);
    queue.shift();

if (head.col < 0) {
  head.col = GRID_WIDTH - 1;
}

if (head.row < 0) {
  head.row = GRID_HEIGHT - 1;
}

if (head.row >= GRID_HEIGHT) {
  head.row = 0;
}

if (head.col >= GRID_WIDTH) {
  head.col = 0;
}


  if(head.row === apple.row && head.col === apple.col) {
    writeToCell(apple.row, apple.col, 0); // clear current apple position
    apple.row = Math.floor(Math.random() * GRID_HEIGHT);
    apple.col = Math.floor(Math.random() * GRID_WIDTH);

    // add new queue behind player
    queue.unshift({ row: queue[0].row, col: queue[0].col });
}

    // add queue behind player
  for (const part of queue) {
    writeToCell(part.row, part.col, 1);
  }

  //writeToCell(player.row, player.col, 1); // set new player position

  writeToCell(apple.row, apple.col, 2); // set apple position

  // display the model in full
  displayBoard();
}


// ******** MODEL ********

const model = [];

const GRID_HEIGHT = 30;
const GRID_WIDTH = 30;

function createModel() {
  for (let row = 0; row < GRID_HEIGHT; row++) {
    const newRow = [];
    for (let col = 0; col < GRID_WIDTH; col++) {
      newRow[col] = 0;
    }
    model[row] = newRow;
  }
}

let direction = "";

/* const head = {
    row: 4,
    col: 4,
};*/

const queue = [
  {
    row: 15,
    col: 15
  },
];

let apple = null;


const controls = {
  up: false,
  down: false,
  left: false,
  right: false,
};



function writeToCell(row, col, value) {
  model[row][col] = value;
}

function readFromCell(row, col) {
  return model[row][col];
}

function generateGoal() {
  let row, col;
  do {
      row = Math.floor(Math.random() * GRID_HEIGHT);
      col = Math.floor(Math.random() * GRID_WIDTH);
  } while (readFromCell(row, col) !== 0); 

 
  if (apple === null) {
      apple = { row, col };
  } else {
      apple.row = row;
      apple.col = col;
  }

  writeToCell(apple.row, apple.col, 2);
}


function deathCheck() {
  const head = queue[queue.length - 1];
  for (let i = 0; i < queue.length - 1; i++) {
    if (head.row === queue[i].row && head.col === queue[i].col) {
      console.log("You died");
      queue.length = 1;
    }
  }

}

// ******** VIEW ********

function displayBoard() {
  const cells = document.querySelectorAll("#board .cell");
  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const index = row * GRID_WIDTH + col;

      switch (readFromCell(row, col)) {
        case 0:
          cells[index].classList.remove("player", "goal");
          break;
        case 1: // Note: doesn't remove goal if previously set
          cells[index].classList.add("player");
          break;
        case 2: // Note: doesn't remove player if previously set
          cells[index].classList.add("goal");
          break;
      }
    }
  }
}



function createView() {
  const board = document.querySelector("#board");

  board.style.setProperty("--GRID_WIDTH", GRID_WIDTH);

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      board.appendChild(cell);
    }
  }
}