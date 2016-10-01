// ENEMY Class
var Enemy = function(x,y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //x and y coordinates:
    this.x = x;
    this.y = y;

    //speed of the bugs with Math.random().
    this.speed = Math.random()*200 + 150;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
      this.x = (this.x + this.speed*dt)%500;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// PLAYER class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.score = 0;
    this.lives = 3;
};

//Function to check the movement of the player.
Player.prototype.update = function(dt) {
    //providing a new variable for the player call reference!
    var self = this;
    //if left key is pressed:
    if(this.pressedKey === 'left' && this.x > 0) { //player isn't on left edge
        this.x = this.x - 100;
    }

    //if right key is pressed:
    if(this.pressedKey === 'right' && this.x < 400) { //player isn't on right edge
        this.x = this.x + 100;
    }

    //if up key is pressed:
    if(this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 90;
    }

    //if down key is pressed:
    if(this.pressedKey === 'down' && this.y < 390) {
        this.y = this.y + 90;
    }

    //this will make player jump only once when key is pressed:
    this.pressedKey = null;

    //if player reaches water, position reset:
    if(this.y < 0) {
        this.gameWon();
    }
    //Collision Detection mecanism!
    allEnemies.forEach(function(enemy) {
    if(self.x >= enemy.x - 30 && self.x <= enemy.x + 30) {
        if(self.y >= enemy.y - 30 && self.y <= enemy.y + 30) {
            self.gameLose();
            }
        }
    });
};

//Function to render the player and its assosciated features on screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //To display the title of the game.
    ctx.clearRect(1, 1, 505, 35);
    ctx.font = "3em Helvetica";
    ctx.fillStyle = "orange";
    ctx.textAlign = "left";
    ctx.fillText("Classic Arcade Game", 1, 35);
    //To call the score and the life function for display in each frame.
    this.scoreCard();
    this.livesLeft();
};

//handleInput() method for player:
Player.prototype.handleInput = function(e) {
    this.pressedKey = e;
};

//Function to update the score of the player.
Player.prototype.scoreCard = function() {
    //ctx.clearRect(1, 51, 200, 50);
    ctx.font = "1.75em Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + this.score, 15, 90);
};

//Function to update the number of lives the player has left.
Player.prototype.livesLeft = function() {
    //ctx.clearRect(310, 590, 200, 50);
    ctx.font = "1.75em Arial";
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    ctx.fillText("Lives left: " + this.lives, 310, 90);
};

// Instantiation of enemies and player objects:
var allEnemies = [new Enemy(15,50), new Enemy(0,140), new Enemy(-60,230), new Enemy(-500,140), new Enemy(-300,50)]; //creates an array of Enemies
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Function that updates the value of number of lives left if player is out,
//and resets the player back to normal position.
Player.prototype.gameLose = function() {
    this.x = 200;
    this.y = 406;
    this.lives -= 1;
    this.scoreCard();
    if (this.lives === 0) {
        alert("You have used up all your lives! Please Start a New Game..");
        reset();
    }
};

//Function to update the value of the score when the player reaches the water,
//and reset the player back to starting position.
Player.prototype.gameWon = function() {
    this.x = 200;
    this.y = 406;
    this.score += 100;
    this.scoreCard();
};
//Resets the whole game back to normal after the player has used up all the 3 life.
function reset() {
  player.x = 200;
  player.y = 390;
  player.score = 0;
  player.lives = 3;
}
