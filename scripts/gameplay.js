MyGame.screens['game-play'] = (function(game, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    // Create Assets
    let backgroundImg;
    let player;
    let projectiles = [];
    let enemies = [];
    let particles = [];
    let highscores = [];
    let highscoreHeader;
    let highscoreValue;
    let waveCreator;

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

        for (let j = 0; j < enemies.length; j++) {
            enemies[j].renderer.update(elapsedTime, enemies[j].enemy, projectiles, enemies, j);
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].particlesFire.update(elapsedTime);
            particles[i].lifeTime += elapsedTime;

            if (particles[i].lifeTime >= 5000) {
                particles.splice(i, 1);
            }
        }


        waveCreator.update(elapsedTime, enemies);
    }

    function render() {
        backgroundImg.render();

        // Render player attributes
        player.render();

        // Render projectiles
        for (let i = 0; i < projectiles.length; i++) {
            projectiles[i].render();
        }

        // Render Enemies
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].renderer.render(enemies[i].enemy);
        }

        // Render Particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].renderFire.render();
        }

        highscoreHeader.draw();
        highscoreValue.draw();
        waveCreator.render();
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
        enemies = [];
        waveCreator = MyGame.WaveCreator;

        projectiles = [];
        highscores = JSON.parse(localStorage.getItem("highScores")).sort();
        highscoreHeader = MyGame.assetCreator.drawHighscoreHeader();
        highscoreValue = MyGame.assetCreator.drawHighscoreValue(highscores[0]);

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

    function getEnemies() {
        return enemies;
    }

    return {
        initialize : initialize,
        run : run,
        addProjectile : addProjectile,
        createExplosion : createExplosion,
        getEnemies : getEnemies
    };

}(MyGame.game, MyGame.input));
