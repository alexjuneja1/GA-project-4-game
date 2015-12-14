
//References to the stage and the output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");

//Map code
var map = [
  [0, 0, 0, 0, 0, 3],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0]
];

var gameObjects = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [4, 0, 0, 0, 0, 0]
];

//Map code
var land = 0;
var town = 1;
var enemy = 2;
var goal = 3;
var caravan = 4;

//Size of each cell on the map
var size = 64;

//The number of rows and columns
var rows = map.length;
var columns = map[0].length;

//Arrow key codes
var up = 38;
var down = 40;
var right = 39;
var left = 37;

//Variable and loop to track where the caravan starts at and when the player moves it
var caravanRow;
var caravanColumn;

for (var row = 0; row < rows; row++) {
  for (var column = 0; column < columns; column++) {
    if (gameObjects[row][column] === caravan) {
      caravanRow = row;
      caravanColumn = column;
    }
  }
}

//Game variables

function keydownHandler(event) {
  switch(event.keyCode) {
    case up:
    //Find out if the caravan's move will be within the board
    if (caravanRow > 0) {
      //If so, clear the caravan's current cell
      gameObjects[caravanRow][caravanColumn] = 0;
      //Subtract 1 from the caravan's row to move it up one row on the map
      caravanRow--;
      //Apply the caravan's updated position to the array
      gameObjects[caravanRow][caravanColumn] = caravan;
    }
    break;

    case down:
    if(caravanRow < rows - 1) {
      gameObjects[caravanRow][caravanColumn] = 0;
      caravanRow++;
      gameObjects[caravanRow][caravanColumn] = caravan;
    }
    break;

    case left:
    if (caravanColumn > 0) {
      gameObjects[caravanRow][caravanColumn] = 0;
      caravanColumn--;
      gameObjects[caravanRow][caravanColumn] = caravan;
    }
    break;

    case right:
    if (caravanColumn < columns - 1) {
      gameObjects[caravanRow][caravanColumn] = 0;
      caravanColumn++;
      gameObjects[caravanRow][caravanColumn] = caravan;
    }
    break;
  }
  //Find out what kind of cell the caravan is on
  switch(map[caravanRow][caravanColumn]) {
    case land:
      gameMessage = "You and your friends continue on."
      break;

    case enemy:
      gameMessage = "Alex, you need to add the fight code here."
      break;

    case town:
      gameMessage = "Alex, you need to add the town code here."
      break;

    case goal:
      gameMessage = "Alex, you need to add the ending here."
      break;
  }
  //Do things to the game variables here

  //Re-render the game at the end of a keypress
  render();
}

render();

function render() {
  //Clearing the stage of img tag cells from the previous turn
  if (stage.hasChildNodes()) {
    for (var i = 0; i < rows * columns; i++) {
      stage.removeChild(stage.firstChild);
    }
  }
  //Render the game by looping through the map arrays
  for (var row = 0; row < rows; row++) {
    for (var column = 0; column < columns; column++) {
      //Making cell the img tag
      var cell = document.createElement("img");
      //Setting its css class to cell
      cell.setAttribute("class", "cell");
      //Adding the img tag to the stage div
      stage.appendChild(cell);
      //Applying correct image to the map cell
      switch(map[row][column]) {
        case land:
          // cell.src = image source;
          break;

        case town:
          // cell.src = image source;
          break;

        case enemy:
          // cell.src = image source;
          break;

        case goal:
          // cell.src = image source;
          break;
      }
      //Add the caravan from the gameObjects array
      switch(gameObjects[row][column]) {
        case caravan:
        // cell.src = image source;
        break;
      }
      //Position the cell
      cell.style.top = row * size + "px";
      cell.style.left = column * size + "px";
    }
  }
}
