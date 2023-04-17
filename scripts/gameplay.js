MyGame.screens['game-play'] = (function(game, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    // Create Assets
    let backgroundImg;
    let player;

    let myKeyboard = input.Keyboard();

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update() {
        player.update();
    }

    function render() {
        backgroundImg.render();
        player.render();
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        processInput(elapsedTime);
        update();
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function initialize() {
        backgroundImg = MyGame.assetCreator.getBackgroundImage();
        player = MyGame.assetCreator.getPlayer();

        myKeyboard.register('Escape', function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });

        myKeyboard.register('a', player.moveLeft);
        myKeyboard.register('d', player.moveRight)
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    return {
        initialize : initialize,
        run : run
    };

}(MyGame.game, MyGame.input));
