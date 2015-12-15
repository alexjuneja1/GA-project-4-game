
//References to the stage and the output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");

//Keyboard listener
window.addEventListener("keydown", keydownHandler, false);

//Map code
var map = [
  [0, 0, 0, 7, 0, 11],
  [0, 3, 6, 0, 10, 0],
  [6, 0, 0, 6, 0, 7],
  [0, 5, 9, 0, 2, 5],
  [4, 0, 0, 4, 0, 5],
  [0, 0, 1, 0, 4, 0]
];

var gameObjects = [
  [8, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [12, 0, 0, 0, 0, 0]
];

var current_map = [
  0
]

//Map code
var land = 0;
var town1 = 1;
var town2 = 2;
var town3 = 3;
var enemy1 = 4;
var enemy2 = 5;
var enemy3 = 6;
var enemy4 = 7;
var assassin = 8;
var fort1 = 9;
var fort2 = 10;
var goal = 11;
var caravan = 12;

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
//Also loop to track where the assassin is at
var assassinRow;
var assassinColumn;

for (var row = 0; row < rows; row++) {
  for (var column = 0; column < columns; column++) {
    if (gameObjects[row][column] === caravan) {
      caravanRow = row;
      caravanColumn = column;
    }
    //Render the assassin along with the caravan.
    if (gameObjects[row][column] === assassin) {
      assassinRow = row;
      assassinColumn = column;
    }
  }
}

//Game variables
var food = 10;
var gold = 10;
var gameMessage = "Help the Ventlemen complete their quest with the arrow keys!"

render();

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

    case enemy1:
      gameMessage = "Alex, you need to add the fight code here."
      break;

    case enemy2:
      gameMessage = "Alex, you need to add the fight code here."
      break;

    case enemy3:
      gameMessage = "Alex, you need to add the fight code here."
      break;

    case enemy4:
      gameMessage = "Alex, you need to add the fight code here."
      break;

    case assassin:
      gameMessage = "Alex, you need to add the fight code here."
      break;

    case town1:
      gameMessage = "Alex, you need to add the town code here."
      break;

    case town2:
      gameMessage = "Alex, you need to add the town code here."
      break;

    case town3:
      gameMessage = "Alex, you need to add the town code here."
      break;

    case fort1:
      gameMessage = "Alex, you need to add the castle code here."
      break;

    case fort2:
      gameMessage = "Alex, you need to add the castle code here."
      break;

    case goal:
      gameMessage = "Alex, you need to add the ending here."
      break;
  }
  //Subtract food by 1 each turn
  food--;
  //Check if the caravan has run out of food
  if (food <= 0) {
    console.log("The end game function goes here.")
  }
  //Move the assassin with each keypress
  moveAssassin();

  //Re-render the game at the end of a keypress
  render();
}

function moveAssassin() {
  //The 4 possible directions that the monster can move
  var UP = 1;
  var DOWN = 2;
  var LEFT = 3;
  var RIGHT = 4;

  //An array to store the valid direction that the monster is allowed to move in
  var validDirections = [];

  //The final direction that the monster will move in
  var direction = undefined;

  //Find out what kinds of things are in the cells that surround the assassin
  //If the cells contain land, push the corresponding direction into the validDirections array
  if (assassinRow > 0) {
    var thingAbove = map[assassinRow - 1][assassinColumn];
    if (thingAbove === land) {
      validDirections.push(UP)
    }
  }
  if (assassinRow < rows - 1) {
    var thingBelow = map[assassinRow + 1][assassinColumn];
    if (thingBelow === land) {
      validDirections.push(DOWN)
    }
  }
  if (assassinColumn > 0) {
    var thingToTheLeft = map[assassinRow][assassinColumn - 1];
    if (thingToTheLeft === land) {
      validDirections.push(LEFT)
    }
  }
  if (assassinColumn < columns - 1) {
    var thingToTheRight = map[assassinRow][assassinColumn + 1];
    if (thingToTheRight === land) {
      validDirections.push(RIGHT)
    }
  }
  //If a valid direction was found, randomly choose one of the possible directions
  if (validDirections.length !== 0) {
    var randomNumber = Math.floor(Math.random() * validDirections.length);
    direction = validDirections[randomNumber];
  }
  //Move the assassin in the chosen direction
  switch(direction) {
    case UP:
      //Clear assassin's current cell
      gameObjects[assassinRow][assassinColumn] = 0;
      //Subtract 1 from the assassin's row
      assassinRow--;
      //Apply the assassin's new updated position into the array
      gameObjects[assassinRow][assassinColumn] = assassin;
      break;

    case DOWN:
      gameObjects[assassinRow][assassinColumn] = 0;
      assassinRow++;
      gameObjects[assassinRow][assassinColumn] = assassin;
      break;

    case LEFT:
      gameObjects[assassinRow][assassinColumn] = 0;
      assassinColumn--;
      gameObjects[assassinRow][assassinColumn] = assassin;
      break;

    case RIGHT:
      gameObjects[assassinRow][assassinColumn] = 0;
      assassinColumn++;
      //Apply the assassin's new updated position into the array
      gameObjects[assassinRow][assassinColumn] = assassin;
      break;
  }
}

function endGame() {
  if(map[caravanRow][caravanColumn] === goal) {
    // Calculate a score
    var score = food + gold;
    console.log("You made it home! " + "Final Score: " + score);
    //Remove the event listener to end the game, then add some way to return to a title overlay
    window.removeEventListener("keydown", keydownHandler, false);
  }
  else {
    if (food <= 0) {
      gameMessage += " You have run out of food and your party has perished...";
      //Remove the event listener to end the game, then add some way to return to a title overlay
      window.removeEventListener("keydown", keydownHandler, false);
    }
  }
}

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
          //cell.src = image source;
          break;

        case town1:
          cell.src = "town.png";
          break;

        case town2:
          cell.src = "town.png";
          break;

        case town3:
          cell.src = "town.png";
          break;

        case enemy1:
          cell.src = "enemy1.png";
          break;

        case enemy2:
          cell.src = "enemy2.png";
          break;

        case enemy3:
          cell.src = "enemy3.png";
          break;

        case enemy4:
          cell.src = "enemy4.png";
          break;


        case fort1:
          cell.src = "castle.png";
          break;

        case fort2:
          cell.src = "castle.png";
          break;

        case goal:
          // cell.src = image source;
          break;
      }
      //Add the caravan from the gameObjects array
      switch(gameObjects[row][column]) {
        case caravan:
          cell.src = "caravan.png"
          break;

        case assassin:
          cell.src = "assassin.png";
          break;

      }
      //Position the cell
      cell.style.top = row * size + "px";
      cell.style.left = column * size + "px";
    }
  }
  //Display the game messages
  output.innerHTML = gameMessage;

  //Display food, gold, game variables, etc
  output.innerHTML += "<br>Gold: " + gold + ", Food: " + food;
}
