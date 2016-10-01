#Classic Arcade Game#

##Installation##
Clone the repository to your system by downloading the zip file and extract to any of your preffered location.

##How to play##
The game can be started by opening the index.html file in a browser.
For windows use either Google Chrome or Mozilla Firefox for better rendering.
For IOS use either of the above specified browsers if available or use Safari.

##Customizations##

###Player Characterisation###
You can change the player or the enemy character to whichever character you prefer. You can follow the following steps to change a character.

* Go to the images folder and either choose from the available players or paste your own player image.(please note the size of the player image.If size increases, it may affect game rendering.).
* Go to the app.js file in the js folder, change the 'this.sprite ' to your preffered image for both the player and the enemy.
* Go to the engine.js and add the image in the Resources function if it is not already present.

###Enemy speed###

Inorder to control the enemy speed, go to the app.js file in the js folder and then edit the line 'this.speed' in the Enemy class present.
To increase the speed increase the value assosciated with the 'Math.random()' function and to decrease the speed, decrease the value assosciated.

##Enjoy the Game##