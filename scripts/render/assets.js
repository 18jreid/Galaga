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
        player.center = {x: MyGame.graphics.canvas.width / 2, y: MyGame.graphics.canvas.height - (player.height * 2) };
        player.size = {width: player.width * 2, height: player.height * 2};
        player.moveRate = 0.25;
        player.rotation = 0;
        player.timeSinceLastFire = 0;

        // Define player functions
        player.render = function() {
            MyGame.graphics.drawTexture(
                player,
                { x: player.center.x, y: player.center.y },
                0,
                { width: player.size.width, height: player.size.height });
        };

        player.moveLeft = function (elapsedTime) {
            player.center.x -= player.moveRate * elapsedTime;
        };
        player.moveRight = function (elapsedTime) {
            player.center.x += player.moveRate * elapsedTime;
        }
        player.update = function (elapsedTime) {
            player.timeSinceLastFire += elapsedTime;
            if (player.center.x <= player.size.width / 2) {
                player.center.x += (player.size.width / 6);
            }
            if (player.center.x >= MyGame.graphics.canvas.width - (player.size.width / 2)) {
                player.center.x -= (player.size.width / 6);
            }
        }

        player.fireBullet = function () {
            if (player.timeSinceLastFire > 500) {
                getBullet(player);
                player.timeSinceLastFire = 0;
            }
        }

        return player;
    }

    function getBullet(player, elapsedTime) {
        // Define player image
        let bullet = new Image();
        bullet.isReady = false;
        bullet.src = MyGame.assets['player-bullet'].src;
        bullet.onload = function () {
            this.isReady = true;
        };
        // Define player attributes
        bullet.center = {x: player.center.x, y: player.center.y };
        bullet.size = {width: bullet.width * 2, height: bullet.height * 2};
        bullet.moveRate = 2;
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

        bullet.update = function(elapsedTime) {
            bullet.center.y -= bullet.moveRate;
        }
    }
    
    return {
        getBackgroundImage: getBackgroundImage,
        getPlayer : getPlayer
    };
}());
