MyGame.screens['game-play'] = (function(game, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    // Create Assets
    let backgroundImg;
    let player;
    let projectiles = [];
    let highscoreHeader;
    let highscoreValue;

    let myKeyboard = input.Keyboard();

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update(elapsedTime) {
        player.update(elapsedTime);
        for (let i = 0; i < projectiles.length; i++) {
            projectiles[i].update();
            if (projectiles[i].center.y < 0) {
                projectiles.splice(i, 1);
            }
        }
    }

    function render() {
        backgroundImg.render();
        highscoreHeader.draw();
        highscoreValue.draw();

        // Render player attributes
        player.render();

        // Render projectiles
        for (let i = 0; i < projectiles.length; i++) {
            projectiles[i].render();
        }
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update(elapsedTime);
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        backgroundImg = MyGame.assetCreator.getBackgroundImage();
        player = MyGame.assetCreator.getPlayer();
        projectiles = [];
        highscoreHeader = MyGame.assetCreator.drawHighscoreHeader();
        highscoreValue = MyGame.assetCreator.drawHighscoreValue();

        // myKeyboard.register('Escape', function() {
        //     //
        //     // Stop the game loop by canceling the request for the next animation frame
        //     cancelNextRequest = true;
        //     //
        //     // Then, return to the main menu
        //     game.showScreen('main-menu');
        // });

        myKeyboard.register('ArrowLeft', player.moveLeft);
        myKeyboard.register('ArrowRight', player.moveRight)
        myKeyboard.register(' ', player.fireBullet);
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    function addProjectile(bullet) {
        projectiles.push(bullet);
    }

    return {
        initialize : initialize,
        run : run,
        addProjectile : addProjectile
    };

}(MyGame.game, MyGame.input));
