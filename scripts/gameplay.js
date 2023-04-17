MyGame.screens['game-play'] = (function(game, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let assets = [];

    // Gameplay background image
    let backgroundImg = new Image();
    backgroundImg.isReady = false;
    backgroundImg.src = MyGame.assets['gameBackground'].src;
    backgroundImg.onload = function () {
        this.isReady = true;
    };
    

    let myKeyboard = input.Keyboard();

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function update() {
    }

    function render() {
        MyGame.graphics.drawTexture(
            backgroundImg,
            { x: MyGame.graphics.canvas.width / 2, y: MyGame.graphics.canvas.height / 2 },
            0,
            { width: MyGame.graphics.canvas.width, height: MyGame.graphics.canvas.height });
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
        myKeyboard.register('Escape', function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });
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
