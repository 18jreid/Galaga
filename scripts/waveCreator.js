MyGame.WaveCreator = (function() {
    let totalTime  = 0;
    let shootTime = 0;
    let randomShoot = Random.nextRange(5, 8) * 1000;
    let stage = "stage1";
    let showingStage1Logo = true;
    let showStage2Logo = false;
    let stage1Header = MyGame.assetCreator.drawStage1Header();
    let stage2Header = MyGame.assetCreator.drawStage2Header();
    let oscillate = false;

    function createWave1(enemies) {
        let rotation = (180 * Math.PI) / 180
        if (!showingStage1Logo) {
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
                        diving: false
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
                        diving: false
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
                    diving: false
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
                        diving: false
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

            moveTimeIncrement = 6000;
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
                        diving: false
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
    }

    function createWave2(enemies) {
        let rotation = (180 * Math.PI) / 180
        if (!showStage2Logo) {
            let moveTimeIncrement = 0;
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 315, y: -15},
                            { x: 520, y: 435},
                            { x: 562, y: 538},
                            { x: 543, y: 601},
                            { x: 480, y: 654},
                            { x: 387, y: 650},
                            { x: 351, y: 580},
                            { x: 354, y: 500},
                            { x: 515 + (x * 100), y: 215 + (y * 20) },
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
                        diving: false
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

            moveTimeIncrement = 0;
            for (let x = 0; x < 3; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 475, y: -15},
                            { x: 120, y: 435},
                            { x: 102, y: 538},
                            { x: 111, y: 601},
                            { x: 150, y: 654},
                            { x: 145, y: 650},
                            { x: 215, y: 580},
                            { x: 357, y: 500},
                            { x: 515 + (x * 100), y: 288 + (y * 20) },
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
                        diving: false
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
                    diving: false
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
                            { x: 202 + (x * 40), y: 223 + (y * 40) },
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
                        diving: false
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
                for (let y = 0; y < 2; y++) {
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
                            { x: 250 + (x * 40), y: 650 + (y * 40) },
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
                        diving: false
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
            }
        }
    }

    function enemyAttack(enemy, enemies) {
        enemy.enemy.ship.formation = false;
        enemy.enemy.ship.diving = true;
        enemy.renderer.attack1(enemy.enemy.ship);
    }

    function update(elapsedTime, enemies) {
        totalTime += elapsedTime;
        if (totalTime >= 14000) {
            oscillate = true;
        }
        if (stage === "stage1") {
            if (totalTime >= 4000 && showingStage1Logo) {
                showingStage1Logo = false;
                createWave1(enemies);
            } else {
                shootTime += elapsedTime;
                if (shootTime > randomShoot) {
                    let enemies = MyGame.screens['game-play'].getEnemies();
        
                    for (let i = 0; i < enemies.length; i++) {
                        if (enemies[i].enemy.ship.center.y < -500 || enemies[i].enemy.ship.center.y > 1025) {
                            if (enemies[i] !== undefined) {
                                enemies.splice(i, 1)
                            }
                        }
                    }
                    if (enemies.length  !== 0) {
                        let randIndex = Random.nextRange(0, enemies.length - 1);
                        let randomEnemy = enemies[randIndex];
                        if (randomEnemy.renderer.spec.pathFinished) {
                            enemyAttack(randomEnemy, enemies, elapsedTime);
                        }
                    }
        
                    randomShoot = Random.nextRange(2, 5) * 1000;
                    shootTime = 0;

                    if (enemies.length === 0) {
                        stage = "stage2";
                        showStage2Logo = true;
                        totalTime = 0;
                        shootTime = 0;
                        oscillate = false;
                        randomShoot = Random.nextRange(5, 8) * 1000;
                    }
                }
            }
        }
        if (stage === "stage2") {
            if (totalTime >= 4000 && showStage2Logo) {
                showStage2Logo = false;
                createWave2(enemies);
            } else {
                shootTime += elapsedTime;
                if (shootTime > randomShoot) {
                    let enemies = MyGame.screens['game-play'].getEnemies();
        
                    for (let i = 0; i < enemies.length; i++) {
                        if (enemies[i].enemy.ship.center.y < -500 || enemies[i].enemy.ship.center.y > 1025) {
                            enemies.splice(i, 1)
                        }
                    }
                    if (enemies.length  !== 0) {
                        let randIndex = Random.nextRange(0, enemies.length - 1);
                        let randomEnemy = enemies[randIndex];
                        if (randomEnemy.renderer.spec.pathFinished) {
                            enemyAttack(randomEnemy, enemies, elapsedTime);
                        }
                    }
        
                    randomShoot = Random.nextRange(2, 5) * 1000;
                    shootTime = 0;

                    if (enemies.length === 0) {
                        console.log("challenging stage")
                    }
                }
            }
        }
    }

    function render() {
        if (showingStage1Logo) {
            stage1Header.draw();
        } else if (showStage2Logo) {
            stage2Header.draw();
        }
    }

    function getWaveStage() {
        return stage;
    }

    function setWaveStage(stage) {
        stage = stage;
    }

    function getOscillate() {
        return oscillate;
    }

    let api = {
        update : update,
        createWave1 : createWave1,
        render : render,
        getWaveStage : getWaveStage,
        setWaveStage : setWaveStage,
        getOscillate : getOscillate
    };

    return api;
}());