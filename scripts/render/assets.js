MyGame.assetCreator = (function() {
    'use strict';

    function getBackgroundImage() {
        let backgroundImage = new Image();
        backgroundImage.isReady = false;
        backgroundImage.src = MyGame.assets['gameBackground'].src;
        backgroundImage.onload = function () {
            this.isReady = true;
        };
        backgroundImage.render = function() {
            MyGame.graphics.drawTexture(
                backgroundImage,
                { x: MyGame.graphics.canvas.width / 2, y: MyGame.graphics.canvas.height / 2 },
                0,
                { width: MyGame.graphics.canvas.width, height: MyGame.graphics.canvas.height });
        }

        return backgroundImage;
    }

    function getPlayer() {
        // Define player image
        let player = new Image();
        player.isReady = false;
        player.src = MyGame.assets['player'].src;
        player.onload = function () {
            this.isReady = true;
        };
        // Define player attributes
        player.center = {x: MyGame.graphics.canvas.width / 2, y: MyGame.graphics.canvas.height - (player.height * 5) };
        player.size = {width: player.width * 2, height: player.height * 2};
        player.moveRate = 0.25;
        player.rotation = 0;
        player.timeSinceLastFire = 0;
        player.lives = [];
        player.time = 0;

        let xOffset = 25;
        for (let i = 0; i < 3; i++) {
            // Define life image
            let life = new Image();
            life.isReady = false;
            life.src = MyGame.assets['player'].src;
            life.onload = function () {
                this.isReady = true;
            };
            // Define player attributes
            life.center = {x: xOffset, y: MyGame.graphics.canvas.height - life.height };
            life.size = {width: life.width * 2, height: (life.height * 2)};
            life.render = function() {
                MyGame.graphics.drawTexture(
                    life,
                    {x: life.center.x, y: life.center.y},
                    0,
                    {width: life.size.width, height: life.size.height}
                )
            }

            player.lives.push(life);
            xOffset += life.size.width + 5;
        }

        player.renderLives = function() {
            for (let i = 0; i < player.lives.length; i++) {
                player.lives[i].render();
            }
        }

        // Define player functions
        player.render = function() {
            MyGame.graphics.drawTexture(
                player,
                { x: player.center.x, y: player.center.y },
                0,
                { width: player.size.width, height: player.size.height });
            player.renderLives();
        };

        player.moveLeft = function () {
            player.center.x -= player.moveRate * player.time;
        };
        player.moveRight = function () {
            player.center.x += player.moveRate * player.time;
        }
        player.update = function (elapsedTime) {
            player.time = elapsedTime;
            player.timeSinceLastFire += player.time;
            if (player.center.x <= player.size.width / 2) {
                player.center.x += (player.size.width / 6);
            }
            if (player.center.x >= MyGame.graphics.canvas.width - (player.size.width / 2)) {
                player.center.x -= (player.size.width / 6);
            }
        }

        player.fireBullet = function () {
            if (player.timeSinceLastFire > 600) {
                getBullet(player, player.time);
                document.getElementById('player-shot-sound').play();
                player.timeSinceLastFire = 0;
            }
        }

        return player;
    }

    function getBullet(player) {
        // Define player image
        let bullet = new Image();
        bullet.isReady = false;
        bullet.src = MyGame.assets['player-bullet'].src;
        bullet.onload = function () {
            this.isReady = true;
        };
        // Define player attributes
        bullet.center = {x: player.center.x, y: player.center.y };
        bullet.size = {width: bullet.width * 2.25, height: bullet.height * 2.25};
        bullet.moveRate = 0.70;
        bullet.rotation = 0;
        MyGame.screens['game-play'].addProjectile(bullet);

        // Define player functions
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

    function drawHighscoreHeader() {
        let highscoreHeader = MyGame.graphics.Text({
            text : 'High Score',
            font : '30px Turret Road',
            fill : 'Red',
            stroke : 'Red',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 70 , y : 10},
            rotation : 0
        });

        return highscoreHeader;
    }

    function drawHighscoreValue() {
        let highscoreValue = MyGame.graphics.Text({
            text : '0',
            font : '30px Turret Road',
            fill : 'white',
            stroke : 'white',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 10, y : 40},
            rotation : 0
        });

        return highscoreValue;
    }
    
    return {
        getBackgroundImage: getBackgroundImage,
        getPlayer : getPlayer,
        drawHighscoreHeader : drawHighscoreHeader,
        drawHighscoreValue : drawHighscoreValue
    };
}());
