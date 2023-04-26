MyGame.screens['ai-game-play'] = (function(game, input) {
    'use strict';

    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;

    let backgroundImg;
    let player;
    let enemies = [];
    let particles = [];
    let projectiles = [];
    let myKeyboard = input.Keyboard();
    let oscillatePoint = 0;

    function processInput(elapsedTime) {
        myKeyboard.update(elapsedTime);
    }

    function ai(player) {
        // set initial direction of movement
        let direction = 'right';
    
        // move left and right randomly
        setInterval(function() {
            if (Math.random() > 0.5) {
                direction = 'left';
            } else {
                direction = 'right';
            }
        }, 1000);
    
        // shoot randomly
        setInterval(function() {
            if (Math.random() > 0.5) {
                player.getBullet(player);
            }
        }, 500);
    
        // update the player's position based on direction of movement
        setInterval(function() {
            if (direction === 'left') {
                player.moveLeft();
            } else {
                player.moveRight();
            }
        }, 10);
    }
    

    function update(elapsedTime) {

        // Add event listeners to document
        document.addEventListener('keydown', goBackToMainMenu);
        
        function goBackToMainMenu() {
            // Remove event listeners to prevent memory leaks
            document.removeEventListener('keydown', goBackToMainMenu);
            cancelNextRequest = true;
            game.showScreen('main-menu');
        }

        player.update(elapsedTime);
        for (let j = 0; j < enemies.length; j++) {
            enemies[j].renderer.update(elapsedTime, enemies[j].enemy, projectiles, enemies, j, particles);
        }

        for (let i = 0; i < projectiles.length; i++) {
            if (projectiles[i].destroy) {
                projectiles.splice(i, 1);
            } else {
                projectiles[i].update();
                if (projectiles[i].center.y < 0 || (projectiles[i].center.y > MyGame.graphics.canvas.height)) {
                    projectiles.splice(i, 1);
                }
            }
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].particlesFire.update(elapsedTime);
            particles[i].lifeTime += elapsedTime;

            if (particles[i].lifeTime >= 5000) {
                particles.splice(i, 1);
            }
        }

        // Render Particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].renderFire.render();
        }
    }

    function render() {
        backgroundImg.render();
        player.render();

        // Render Enemies
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].renderer.render(enemies[i].enemy);
        }

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
        player = MyGame.assets.ai;
        enemies = [];
        
        getEnemies(enemies);

        let config = MyGame.screens["main-menu"].getConfig();
        myKeyboard.register(config.moveLeft, player.moveLeft);
        myKeyboard.register(config.moveRight, player.moveRight)
        myKeyboard.register(config.shootMissle, player.fireBullet);
        ai(player)
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }

    function addProjectile(bullet) {
        projectiles.push(bullet);
    }

    function getEnemies(enemies) {
        let rotation = (180 * Math.PI) / 180
        
            let moveTimeIncrement = 0;
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 340, y: -15 },
                            { x: 395, y: 492 },
                            { x: 438, y: 525 },
                            { x: 495, y: 527 },
                            { x: 532, y: 495 },
                            { x: 548, y: 455 },
                            { x: 539, y: 410 },
                            { x: 355 + (x * 40), y: 144 + (y * 40) },
                        ]
                    };

                    let enemy = MyGame.objects.Enemy({
                        size: { x: 40, y: 40 },       // Size in pixels
                        center: { x: line.points[0].x, y: line.points[0].y },
                        rotation: rotation,
                        moveRate: 500 / 1000,         // Pixels per second
                        rotateRate: Math.PI / 1000,    // Radians per second,
                        path: line,
                        pathIndex: 0,
                        totalTime: 0,
                        moveTime: moveTimeIncrement,
                        formation: true,
                        diving: false,
                        ai: true
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
                    enemies.push(enemyObject);
                    moveTimeIncrement += 333;
                }
            }

            moveTimeIncrement = 0;
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 408, y: -15 },
                            { x: 355, y: 492 },
                            { x: 312, y: 525 },
                            { x: 245, y: 527 },
                            { x: 188, y: 495 },
                            { x: 168, y: 455 },
                            { x: 183, y: 410 },
                            { x: 355 + (x * 40), y: 220 + (y * 40) },
                        ]
                    };

                    let enemy = MyGame.objects.Enemy({
                        size: { x: 40, y: 40 },       // Size in pixels
                        center: { x: line.points[0].x, y: line.points[0].y },
                        rotation: rotation,
                        moveRate: 500 / 1000,         // Pixels per second
                        rotateRate: Math.PI / 1000,    // Radians per second,
                        path: line,
                        pathIndex: 0,
                        totalTime: 0,
                        moveTime: moveTimeIncrement,
                        formation: true,
                        diving: false,
                        ai: true
                    });
                    let enemyRenderer = MyGame.render.AnimatedModel({
                        spriteSheet: 'assets/enemyTwoSpritesheet.png',
                        spriteCount: 2,
                        spriteTime: [500, 500],   // ms per frame
                    }, MyGame.graphics);
            
                    let enemyObject = {
                        enemy: enemy,
                        renderer: enemyRenderer
                    }
                    enemies.push(enemyObject);
                    moveTimeIncrement += 333;
                }
            }

            moveTimeIncrement = 4000;
            for (let x = 0; x < 8; x++) {
                let line = {
                    points: [
                        { x: -100, y: 615},
                        { x: 315, y: 405},
                        { x: 327, y: 339},
                        { x: 285, y: 285},
                        { x: 211, y: 295},
                        { x: 181, y: 353},
                        { x: 207, y: 414},
                        { x: 264, y: 427},
                        { x: 327, y: 385},
                        { x: 250 + (x * 40), y: 105 },
                    ]
                };

                let enemy = MyGame.objects.Enemy({
                    size: { x: 40, y: 40 },       // Size in pixels
                    center: { x: line.points[0].x, y: line.points[0].y },
                    rotation: 0,
                    moveRate: 500 / 1000,         // Pixels per second
                    rotateRate: Math.PI / 1000,    // Radians per second,
                    path: line,
                    pathIndex: 0,
                    totalTime: 0,
                    moveTime: moveTimeIncrement,
                    formation: true,
                    diving: false,
                    ai: true
                });
                let enemyRenderer = MyGame.render.AnimatedModel({
                    spriteSheet: 'assets/enemyThreeSpritesheet.png',
                    spriteCount: 2,
                    spriteTime: [500, 500],   // ms per frame
                }, MyGame.graphics);
        
                let enemyObject = {
                    enemy: enemy,
                    renderer: enemyRenderer
                }
                enemies.push(enemyObject);
                moveTimeIncrement += 333;
            }

            moveTimeIncrement = 6000;
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 800, y: -30 },
                            { x: 745, y: 100 },
                            { x: 577, y: 564 },
                            { x: 528, y: 590 },
                            { x: 457, y: 589 },
                            { x: 423, y: 560 },
                            { x: 408, y: 500 },
                            { x: 549 + (x * 60), y: 223 + (y * 40) },
                        ]
                    };

                    let enemy = MyGame.objects.Enemy({
                        size: { x: 40, y: 40 },       // Size in pixels
                        center: { x: line.points[0].x, y: line.points[0].y },
                        rotation: rotation,
                        moveRate: 500 / 1000,         // Pixels per second
                        rotateRate: Math.PI / 1000,    // Radians per second,
                        path: line,
                        pathIndex: 0,
                        totalTime: 0,
                        moveTime: moveTimeIncrement,
                        formation: true,
                        diving: false,
                        ai: true
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
                    enemies.push(enemyObject);
                    moveTimeIncrement += 333;
                }
            }

            moveTimeIncrement = 9000;
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: -30, y: -30 },
                            { x: 5, y: 100 },
                            { x: 168, y: 564 },
                            { x: 218, y: 590 },
                            { x: 213, y: 589 },
                            { x: 291, y: 560 },
                            { x: 334, y: 500 },
                            { x: 350, y: 490 },
                            { x: 202 + (x * 70), y: 223 + (y * 40) },
                        ]
                    };

                    let enemy = MyGame.objects.Enemy({
                        size: { x: 40, y: 40 },       // Size in pixels
                        center: { x: line.points[0].x, y: line.points[0].y },
                        rotation: rotation,
                        moveRate: 500 / 1000,         // Pixels per second
                        rotateRate: Math.PI / 1000,    // Radians per second,
                        path: line,
                        pathIndex: 0,
                        totalTime: 0,
                        moveTime: moveTimeIncrement,
                        formation: true,
                        diving: false,
                        ai: true
                    });
                    let enemyRenderer = MyGame.render.AnimatedModel({
                        spriteSheet: 'assets/enemyTwoSpritesheet.png',
                        spriteCount: 2,
                        spriteTime: [500, 500],   // ms per frame
                    }, MyGame.graphics);
            
                    let enemyObject = {
                        enemy: enemy,
                        renderer: enemyRenderer
                    }
                    enemies.push(enemyObject);
                    moveTimeIncrement += 333;
                }
            }
    }

    function getParticles() {
        return particles;
    }

    return {
        initialize : initialize,
        run : run,
        addProjectile : addProjectile,
        getParticles : getParticles,
    }
}(MyGame.game, MyGame.input));