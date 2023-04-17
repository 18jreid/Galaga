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
        let player = new Image();
        player.isReady = false;
        player.src = MyGame.assets['player'].src;
        player.onload = function () {
            this.isReady = true;
        };
        player.render = function() {
            MyGame.graphics.drawTexture(
                player,
                { x: MyGame.graphics.canvas.width / 2, y: MyGame.graphics.canvas.height - (player.height * 2) },
                0,
                { width: player.width * 2, height: player.height * 2 });
        }

        return player;
    }
    
    return {
        getBackgroundImage: getBackgroundImage,
        getPlayer : getPlayer
    };
}());
