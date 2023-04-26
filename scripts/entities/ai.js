MyGame.assets.ai = (function() {
    
    // Create a new image for the player and set it to not ready
    let player = new Image();
    player.isReady = false;
    // Set the image source to the 'player' asset and set the image to be ready once it loads
    player.src = MyGame.assets['player'].src;
    player.onload = function () {
        this.isReady = true;
    };
    
    // Set the initial position of the player to the center of the canvas at the bottom
    player.center = {x: MyGame.graphics.canvas.width / 2, y: MyGame.graphics.canvas.height - (player.height * 5) };
    // Set the size of the player to be twice the size of the image
    player.size = {width: player.width * 2, height: player.height * 2};
    // Set the move rate of the player
    player.moveRate = 0.2;
    // Set the initial rotation of the player
    player.rotation = 0;
    // Set the time since the player last fired a bullet
    player.timeSinceLastFire = 0;
    // Create an empty array to hold the player's remaining lives
    player.lives = [];
    // Set the initial time of the player to 0
    player.time = 0;

    // Create a life image for each of the player's remaining lives and add it to the array of lives
    let xOffset = 25;
    for (let i = 0; i < 3; i++) {
        // Create a new image for the life and set it to not ready
        let life = new Image();
        life.isReady = false;
        // Set the image source to the 'player' asset and set the image to be ready once it loads
        life.src = MyGame.assets['player'].src;
        life.onload = function () {
            this.isReady = true;
        };
        
        // Set the initial position of the life image to the bottom left of the canvas, with some horizontal offset between each life
        life.center = {x: xOffset, y: MyGame.graphics.canvas.height - life.height };
        // Set the size of the life image to be twice the size of the image
        life.size = {width: life.width * 2, height: (life.height * 2)};
        // Define a render function for the life image
        life.render = function() {
            MyGame.graphics.drawTexture(
                life,
                {x: life.center.x, y: life.center.y},
                0,
                {width: life.size.width, height: life.size.height}
            )
        }

        // Add the life image to the array of lives and update the xOffset for the next life image
        player.lives.push(life);
        xOffset += life.size.width + 5;
    }

    // Define a function to render the player's remaining lives
    player.renderLives = function() {
        for (let i = 0; i < player.lives.length - 1; i++) {
            player.lives[i].render();
        }
    }

    // Define a render function for the player
    player.render = function() {
        MyGame.graphics.drawTexture(
            player,
            { x: player.center.x, y: player.center.y },
            0,
            { width: player.size.width, height: player.size.height });
        player.renderLives();
    };

    // Define functions for the player to move left and right
    player.moveLeft = function () {
        player.center.x -= player.moveRate * player.time
    }

    // Define functions for the player to move left and right
    player.moveRight = function () {
        player.center.x += player.moveRate * player.time
    }

    
    player.update = function (elapsedTime) {
    // Update the player's elapsed time and time since last fire
    player.time = elapsedTime;
    player.timeSinceLastFire += player.time;

    // If the player goes off the left or right side of the screen, move them back towards the center
    if (player.center.x <= player.size.width / 2) {
        player.center.x += (player.size.width / 6);
    }
    if (player.center.x >= MyGame.graphics.canvas.width - (player.size.width / 2)) {
        player.center.x -= (player.size.width / 6);
    }
    }
    
    player.getBullet = function(player) {
        // Create a new bullet object
        let bullet = new Image();
        bullet.isReady = false;
        bullet.src = MyGame.assets['player-bullet'].src;
        bullet.onload = function () {
            this.isReady = true;
        };

        // Set the bullet's initial position, size, speed, and rotation
        bullet.center = {x: player.center.x, y: player.center.y - (bullet.height * 4) };
        bullet.size = {width: bullet.width * 2.25, height: bullet.height * 2.25};
        bullet.moveRate = 0.70;
        bullet.rotation = 0;
        bullet.players = true;

        // Add the bullet to the game's list of projectiles
        MyGame.screens['ai-game-play'].addProjectile(bullet);

        // Define the bullet's render and update functions
        bullet.render = function() {
            MyGame.graphics.drawTexture(
                bullet,
                { x: bullet.center.x, y: bullet.center.y },
                0,
                { width: bullet.size.width, height: bullet.size.height });
        };

        bullet.moveUp = function() {
            bullet.center.y -= player.time * bullet.moveRate;
        }

        bullet.update = function() {
            bullet.moveUp();
        }
    }

    
    player.fireBullet = function () {
        // If enough time has passed since the player's last shot, fire a new bullet and play the sound effect
        if (player.timeSinceLastFire > 600) {
            player.getBullet(player, player.time);
            MyGame.SoundPlayer.playerShotSound();
            player.timeSinceLastFire = 0;
        }
    }

    // Return the player object with the updated functions
    return player;

}())