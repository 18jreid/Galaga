MyGame.screens['game-play'] = (function(game, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    // Create Assets
    let backgroundImg;
    let player;
    let projectiles = [];
    let wave1Enemies = [];
    let particles = [];
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

        for (let j = 0; j < wave1Enemies.length; j++) {
            wave1Enemies[j].renderer.update(elapsedTime, wave1Enemies[j].enemy, projectiles, wave1Enemies, j);
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].particlesFire.update(elapsedTime);
            particles[i].lifeTime += elapsedTime;

            if (particles[i].lifeTime >= 5000) {
                particles.splice(i, 1);
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

        for (let i = 0; i < wave1Enemies.length; i++) {
            wave1Enemies[i].renderer.render(wave1Enemies[i].enemy);
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].renderFire.render();
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
        wave1Enemies = [];

        projectiles = [];
        highscoreHeader = MyGame.assetCreator.drawHighscoreHeader();
        highscoreValue = MyGame.assetCreator.drawHighscoreValue();

        let line = {
            points: [
                { x: 800, y: -100 },
                { x: 110, y: 600 },
                { x: 115, y: 650 },
                { x: 120, y: 660 },
                { x: 125, y: 665 },
                { x: 130, y: 660 },
                { x: 135, y: 650 },
                { x: 145, y: 600 },
                { x: 190, y: 500 },
                {x: 700, y: 50}
            ]
        };

        let enemy = MyGame.objects.Enemy({
            size: { x: 40, y: 40 },       // Size in pixels
            center: { x: line.points[0].x, y: line.points[0].y },
            rotation: 0,
            moveRate: 200 / 1000,         // Pixels per second
            rotateRate: Math.PI / 1000,    // Radians per second,
            path: line,
            pathIndex: 0
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

        myKeyboard.register('Escape', function() {
            //
            // Stop the game loop by canceling the request for the next animation frame
            cancelNextRequest = true;
            //
            // Then, return to the main menu
            game.showScreen('main-menu');
        });

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

    function createExplosion(x, y) {
        let particlesFire = MyGame.SystemParticleSystem.createParticle({
            center: { x: x, y: y },
            size: { mean: 8, stdev: 2 },
            speed: { mean: 15, stdev: 6 },
            lifetime: { mean: 1.5, stdev: 0.3 },
        },
        MyGame.graphics);
    
        let renderFire = MyGame.RenderParticleSystem.createRenderer(particlesFire, MyGame.graphics, 'assets/fire.png');
        
        particles.push({particlesFire: particlesFire, renderFire : renderFire, lifeTime: 0});
    }

    return {
        initialize : initialize,
        run : run,
        addProjectile : addProjectile,
        createExplosion : createExplosion
    };

}(MyGame.game, MyGame.input));
