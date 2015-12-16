
//References to the stage and the output
var stage = document.querySelector("#stage");
var output = document.querySelector("#output");

//Keyboard listener
window.addEventListener("keydown", keydownHandler, false);

//Map code
var map = [
  [3, 6, 0, 7, 13, 11],
  [0, 0, 0, 0, 10, 13],
  [0, 9, 0, 6, 0, 7],
  [0, 5, 0, 0, 2, 0],
  [4, 0, 0, 5, 0, 0],
  [0, 0, 1, 0, 4, 0]
];

var gameObjects = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 8, 0, 0, 0],
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
var dragon = 13;

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
var counter = 0;
var gameMessage = "Help the Ventlemen complete their quest with the arrow keys!"

//Hide all event buttons
$("#fight-enemy1").hide();
$("#fight-enemy2").hide();
$("#fight-enemy3").hide();
$("#fight-enemy4").hide();
$("#fight-dragon").hide();
$("#enter-town1").hide();
$("#enter-town2").hide();
$("#enter-town3").hide();
$("#enter-fort1").hide();
$("#enter-fort2").hide();

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

    event.preventDefault();
  }
  //Find out what kind of cell the caravan is on
  switch(map[caravanRow][caravanColumn]) {
    case land:
      $("#fight-enemy1").hide();
      $("#fight-enemy2").hide();
      $("#fight-enemy3").hide();
      $("#fight-enemy4").hide();
      $("#fight-dragon").hide();
      $("#enter-town1").hide();
      $("#enter-town2").hide();
      $("#enter-town3").hide();
      $("#enter-fort1").hide();
      $("#enter-fort2").hide();
      gameMessage = "You and your friends continue on."
      break;

    case enemy1:
      //Display the combat modal when on a hostile tile
      $("#fight-enemy1").show();
      $("#fight-enemy2").hide();
      $("#fight-enemy3").hide();
      $("#fight-enemy4").hide();
      $("#fight-dragon").hide();
      $("#enter-town1").hide();
      $("#enter-town2").hide();
      $("#enter-town3").hide();
      $("#enter-fort1").hide();
      $("#enter-fort2").hide();
      gameMessage = "You spot some soldiers coming your way. But something seems off about them..."
      console.log("You are about to fight some soldiers.");
      break;

    case enemy2:
      $("#fight-enemy1").hide();
      $("#fight-enemy2").show();
      $("#fight-enemy3").hide();
      $("#fight-enemy4").hide();
      $("#fight-dragon").hide();
      $("#enter-town1").hide();
      $("#enter-town2").hide();
      $("#enter-town3").hide();
      $("#enter-fort1").hide();
      $("#enter-fort2").hide();
      gameMessage = "A dark mist approaches; you can sense something ahead, but you are unsure of what awaits you..."
      break;

    case enemy3:
      $(document).ready(function() {
        $("#fight-enemy1").hide();
        $("#fight-enemy2").hide();
        $("#fight-enemy3").show();
        $("#fight-enemy4").hide();
        $("#fight-dragon").hide();
        $("#enter-town1").hide();
        $("#enter-town2").hide();
        $("#enter-town3").hide();
        $("#enter-fort1").hide();
        $("#enter-fort2").hide();
      });
      gameMessage = "With your keen senses, you can tell that an ambush lies in wait ahead. You have heard rumors of the Black Hand and their power, but now you have the chance to experience it yourself..."
      break;

    case enemy4:
      $(document).ready(function() {
        $("#fight-enemy1").hide();
        $("#fight-enemy2").hide();
        $("#fight-enemy3").hide();
        $("#fight-enemy4").show();
        $("#fight-dragon").hide();
        $("#enter-town1").hide();
        $("#enter-town2").hide();
        $("#enter-town3").hide();
        $("#enter-fort1").hide();
        $("#enter-fort2").hide();
      });
      gameMessage = "The Elite Knights of Elysia are notorious for being the most powerful soldiers in the region. It has been said that as a rite of passage, they must slay two aged Drakes simultaneously. Unfortunately, one stands before you now."
      break;

    case town1:
      gameMessage = "You arrive in the bustling town of Philistine, a city that prides itself in being plentiful as far as supplies are concerned. A city of wealth and commerce, it is the last bountiful city before the High Keep of Noden."
      $(document).ready(function() {
        $("#fight-enemy1").hide();
        $("#fight-enemy2").hide();
        $("#fight-enemy3").hide();
        $("#fight-enemy4").hide();
        $("#fight-dragon").hide();
        $("#enter-town1").show();
        $("#enter-town2").hide();
        $("#enter-town3").hide();
        $("#enter-fort1").hide();
        $("#enter-fort2").hide();
      });
      break;

    case town2:
      gameMessage = "You arrive in Dephetus, a small town under constant plague of bandits and hardship. Only those hardened by battle or those ravaged by poverty reside here. In spite of all that, the citizens remain hopeful that one day, the difficulties shall come to an end."
      $(document).ready(function() {
        $("#fight-enemy1").hide();
        $("#fight-enemy2").hide();
        $("#fight-enemy3").hide();
        $("#fight-enemy4").hide();
        $("#fight-dragon").hide();
        $("#enter-town1").hide();
        $("#enter-town2").show();
        $("#enter-town3").hide();
        $("#enter-fort1").hide();
        $("#enter-fort2").hide();
      });
      break;

    case town3:
      gameMessage = "You arrive in Eridesi, a mysterious tribal village off the beaten path. The residents constantly warn visitors not to stay for long and it is unknown as to why."
      $(document).ready(function() {
        $("#fight-enemy1").hide();
        $("#fight-enemy2").hide();
        $("#fight-enemy3").hide();
        $("#fight-enemy4").hide();
        $("#fight-dragon").hide();
        $("#enter-town1").hide();
        $("#enter-town2").hide();
        $("#enter-town3").show();
        $("#enter-fort1").hide();
        $("#enter-fort2").hide();
      });
      break;

    case fort1:
      gameMessage = "You arrive in Castle Bant, a castle strictly reserved for soldiers to call home. Many adventurers pass through the castle, seeking quests and contracts alike."
      $(document).ready(function() {
        $("#fight-enemy1").hide();
        $("#fight-enemy2").hide();
        $("#fight-enemy3").hide();
        $("#fight-enemy4").hide();
        $("#fight-dragon").hide();
        $("#enter-town1").hide();
        $("#enter-town2").hide();
        $("#enter-town3").hide();
        $("#enter-fort1").show();
        $("#enter-fort2").hide();
      });
      break;

    case fort2:
      gameMessage = "You arrive in the Silent Fortress. Once known as the Grixis Castle, it has gone quiet for almost centuries now. No-one is sure as to why, and no-one stays long enough to find out."
      $(document).ready(function() {
        $("#fight-enemy1").hide();
        $("#fight-enemy2").hide();
        $("#fight-enemy3").hide();
        $("#fight-enemy4").hide();
        $("#fight-dragon").hide();
        $("#enter-town1").hide();
        $("#enter-town2").hide();
        $("#enter-town3").hide();
        $("#enter-fort1").hide();
        $("#enter-fort2").show();
      });
      break;

    case dragon:
      $("#fight-enemy1").hide();
      $("#fight-enemy2").hide();
      $("#fight-enemy3").hide();
      $("#fight-enemy4").hide();
      $("#fight-dragon").show();
      $("#enter-town1").hide();
      $("#enter-town2").hide();
      $("#enter-town3").hide();
      $("#enter-fort1").hide();
      $("#enter-fort2").hide();
      gameMessage = "You stand face-to-face with a Drake - one of the mightiest mythical beings in all of Orylia, classed as an A++ rank beast. Since the Veridian War, however, they have been considered an extremely rare and endangered species. But in order to gain passage into the High Keep of Noden, one must be defeated..."
      break;

    case goal:
      endGame();
      $(document).ready(function() {
        $("#fight-enemy1").hide();
        $("#fight-enemy2").hide();
        $("#fight-enemy3").hide();
        $("#fight-enemy4").hide();
        $("#fight-dragon").hide();
        $("#enter-town1").hide();
        $("#enter-town2").hide();
        $("#enter-town3").hide();
        $("#enter-fort1").hide();
        $("#enter-fort2").hide();
      });
      break;
  }
  //Subtract food by 1 each turn
  food--;
  //Add 1 to the counter each turn
  counter++;
  //Check if the caravan has run out of food
  if (food <= 0) {
    endGame();
  }
  //Move the assassin with each keypress
  moveAssassin();

  //Find out if the caravan and the assassin are interacting
  if (gameObjects[caravanRow][caravanColumn] === assassin) {
    endGame();
  }

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
    gameMessage = "You have finally arrived into the High Keep of Noden! You not only have found the last location of your allies, but you are hailed as a hero for defeating a Drake! Rest while you can, young adventurer... The search continues at dawn. (Thank you for playing! Your score is " + score + "!)";
    //Remove the event listener to end the game, then add some way to return to a title overlay
    window.removeEventListener("keydown", keydownHandler, false);
  }
  else if(gameObjects[caravanRow][caravanColumn] === assassin) {
    gameMessage = "Before you can even blink, you notice a large wound that has recently been inflicted upon you. You have been killed!";
    window.removeEventListener("keydown", keydownHandler, false);
  }
  else {
    if (food <= 0) {
      gameMessage += "You have run out of food and you have perished!";
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
          cell.src = "./images/town.png";
          break;

        case town2:
          cell.src = "./images/town.png";
          break;

        case town3:
          cell.src = "./images/town.png";
          break;

        case enemy1:
          cell.src = "./images/enemy1.png";
          break;

        case enemy2:
          cell.src = "./images/enemy2.png";
          break;

        case enemy3:
          cell.src = "./images/enemy3.png";
          break;

        case enemy4:
          cell.src = "./images/enemy4.png";
          break;


        case fort1:
          cell.src = "./images/castle.png";
          break;

        case fort2:
          cell.src = "./images/castle.png";
          break;

        case dragon:
          cell.src ="./images/dragon.png";
          break;

        case goal:
          cell.src = "./images/goal.png";
          break;
      }
      //Add the caravan and the assassin from the gameObjects array
      switch(gameObjects[row][column]) {
        case caravan:
          cell.src = "./images/caravan.png";
          break;

        case assassin:
          cell.src = "./images/assassin.png";
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
  output.innerHTML += "<br>Gold: " + gold + ", Food: " + food + ", Turn Count: " + counter;
}
