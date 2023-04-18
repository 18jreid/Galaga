MyGame.screens['game-play'] = (function(game, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    // Create Assets
    let backgroundImg;
    let player;
    let projectiles = [];
    let wave1Enemies = [];
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

        for (let i = 0; i < wave1Enemies.length; i++) {
            wave1Enemies[i].renderer.update(elapsedTime);
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

        for (let i = 0; i < wave1Enemies.length; i++) {
            wave1Enemies[i].renderer.render(wave1Enemies[i].enemy);
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

        for (let x = 0; x < 15; x++) {
            for (let y = 0; y < 5; y++) {
                let enemy = MyGame.objects.Enemy({
                    size: { x: 40, y: 40 },       // Size in pixels
                    center: { x: 50 + (x * 46), y: 150 + (y * 50) },
                    rotation: 0,
                    moveRate: 125 / 1000,         // Pixels per second
                    rotateRate: Math.PI / 1000    // Radians per second
                });
                let enemyRenderer = MyGame.render.AnimatedModel({
                    spriteSheet: 'assets/enemyOneSpritesheet.png',
                    spriteCount: 2,
                    spriteTime: [500, 500],   // ms per frame
                }, MyGame.graphics);

                let enemyObject = {
                    enemy: enemy,
                    renderer: enemyRenderer
                }
                wave1Enemies.push(enemyObject);
            }
        }

        // myKeyboard.register('Escape', function() {
        //     //
        //     // Stop the game loop by canceling the request for the next animation frame
        //     cancelNextRequest = true;
        //     //
        //     // Then, return to the main menu
        //     game.showScreen('main-menu');
        // });

        let config = MyGame.screens["main-menu"].getConfig();
        myKeyboard.register(config.moveLeft, player.moveLeft);
        myKeyboard.register(config.moveRight, player.moveRight)
        myKeyboard.register(config.shootMissle, player.fireBullet);
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
