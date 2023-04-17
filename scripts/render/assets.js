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
        player.update = function () {
            if (player.center.x <= player.size.width / 2) {
                player.center.x += (player.size.width / 6);
            }
            if (player.center.x >= MyGame.graphics.canvas.width - (player.size.width / 2)) {
                player.center.x -= (player.size.width / 6);
            }
        }

        return player;
    }
    
    return {
        getBackgroundImage: getBackgroundImage,
        getPlayer : getPlayer
    };
}());
