
//References to the stage and the output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");

//Map code
var map = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var gameObjects = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

//Variable and loop to track where the caravan is at when the player moves it
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
      var cell = documnet.createElement("img");
      //Setting its css class to cell
      cell.setAttribute("class", "cell");
      //Adding the img tag to the stage div
      stage.appendChild(cell);
      //Applying correct image to the map cell
      switch(map[row][column]) {
        case land:
          cell.src = // image source;
          break;

        case town:
          cell.src = // image source;
          break;

        case enemy:
          cell.src = // image source;
          break;

        case goal:
          cell.src = // image source;
          break;
      }
      //Add the caravan from the gameObjects array
      switch(gameObjects[row][column]) {
        case caravan:
        cell.src = //image source;
        break;
      }
      //Position the cell
      cell.style.top = row * size + "px";
      cell.style.left = column * size + "px";
    }
  }
}
