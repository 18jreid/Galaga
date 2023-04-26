MyGame.WaveCreator = (function() {
    let totalTime  = 0;
    let shootTime = 0;
    let randomShoot = Random.nextRange(5, 8) * 1000;
    let stage = "stage1";
    let showingStage1Logo = true;
    let showStage2Logo = false;
    let showChallengingStageLogo = false;
    let stage1Header = MyGame.assetCreator.drawStage1Header();
    let stage2Header = MyGame.assetCreator.drawStage2Header();
    let challengingStageHeader = MyGame.assetCreator.drawChallengingStageHeader();
    let oscillate = false;
    let wavesOver = false;

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
                        diving: false,
                        ai: false
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
                        ai: false
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
                        ai: false
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
                        ai: false
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
                        ai: false
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
                        ai: false
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
                        ai: false
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

            moveTimeIncrement = 3000;
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
                        ai: false
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

            moveTimeIncrement = 5000;
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 770, y: 1000},
                            { x: 533, y: 845 },
                            { x: 477, y: 783 },
                            { x: 470, y: 711 },
                            { x: 503, y: 645 },
                            { x: 563, y: 620 },
                            { x: 620, y: 630 },
                            { x: 653, y: 678 },
                            { x: 662, y: 741 },
                            { x: 616, y: 797 },
                            { x: 550, y: 812 },
                            { x: 489, y: 783 },
                            { x: 470, y: 711 },
                            { x: 588 + (x * 60), y: 189 + (y * 40)},
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
                        ai: false
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

            moveTimeIncrement = 5750;
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 770, y: 1000},
                            { x: 533, y: 845 },
                            { x: 477, y: 783 },
                            { x: 470, y: 711 },
                            { x: 503, y: 645 },
                            { x: 563, y: 620 },
                            { x: 620, y: 630 },
                            { x: 653, y: 678 },
                            { x: 662, y: 741 },
                            { x: 616, y: 797 },
                            { x: 550, y: 812 },
                            { x: 489, y: 783 },
                            { x: 145 + (x * 60), y: 192 + (y * 40) }
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
                        ai: false
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
            
            moveTimeIncrement = 10000;
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 487, y: -15},
                            { x: 117, y: 393 },
                            { x: 93, y: 444 },
                            { x: 87, y: 505 },
                            { x: 111, y: 555 },
                            { x: 175, y: 585 },
                            { x: 243, y: 568 },
                            { x: 420 + (x * 60), y: 360 + (y * 40) }
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
                        ai: false
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

            moveTimeIncrement = 10000;
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 487, y: -15},
                            { x: 117, y: 393 },
                            { x: 93, y: 444 },
                            { x: 87, y: 505 },
                            { x: 111, y: 555 },
                            { x: 175, y: 585 },
                            { x: 243, y: 568 },
                            { x: 210 + (x * 60), y: 360 + (y * 40) }
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
                        ai: false
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

            moveTimeIncrement = 13000;
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 232, y: -15},
                            { x: 585, y: 380 },
                            { x: 624, y: 490 },
                            { x: 616, y: 570 },
                            { x: 560, y: 607 },
                            { x: 487, y: 600 },
                            { x: 483, y: 589 },
                            { x: 110 + (x * 60), y: 360 + (y * 40) }
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
                        ai: false
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

            moveTimeIncrement = 15000;
            for (let x = 0; x < 2; x++) {
                for (let y = 0; y < 2; y++) {
                    let line = {
                        points: [
                            { x: 232, y: -15},
                            { x: 585, y: 380 },
                            { x: 624, y: 490 },
                            { x: 616, y: 570 },
                            { x: 560, y: 607 },
                            { x: 487, y: 600 },
                            { x: 483, y: 589 },
                            { x: 530 + (x * 60), y: 360 + (y * 40) }
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
                        ai: false
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

    function createChallengingWave(enemies) {
        let rotation = (180 * Math.PI) / 180
        if (!showStage2Logo) {
            let moveTimeIncrement = 0;
            for (let x = 0; x < 4; x++) {
                let line = {
                    points: [
                        { x: 333, y: -15 },
                        { x: 435, y: 774 },
                        { x: 426, y: 793 },
                        { x: 388, y: 813 },
                        { x: 351, y: 816 },
                        { x: 331, y: 798 },
                        { x: 327, y: 762 },
                        { x: 345, y: 730 },
                        { x: 1000, y: 554 },
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
                        ai: false
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

            moveTimeIncrement = 0;
            for (let x = 0; x < 4; x++) {
                let line = {
                    points: [
                        { x: 439, y: -15 },
                        { x: 292, y: 760 },
                        { x: 298, y: 798 },
                        { x: 325, y: 825 },
                        { x: 363, y: 823 },
                        { x: 388, y: 800 },
                        { x: 393, y: 763 },
                        { x: 352, y: 727 },
                        { x: -75, y: 588 },
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
                        ai: false
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

            moveTimeIncrement = 4000;
            for (let x = 0; x < 8; x++) {
                let line = {
                    points: [
                        { x: -20, y: 769 },
                        { x: 565, y: 516 },
                        { x: 579, y: 465 },
                        { x: 564, y: 397 },
                        { x: 510, y: 378 },
                        { x: 409, y: 396 },
                        { x: 358, y: 525 },
                        { x: 447, y: 598 },
                        { x: 561, y: 586 },
                        { x: 1000, y: 249 }
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
                        ai: false
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

            moveTimeIncrement = 8000;
            for (let x = 0; x < 8; x++) {
                let line = {
                    points: [
                        { x:760, y: 777 },
                        { x: 282, y: 460 },
                        { x: 253, y: 340 },
                        { x: 295, y: 277 },
                        { x: 369, y: 262 },
                        { x: 423, y: 360 },
                        { x: 415, y: 420 },
                        { x: 244, y: 527 },
                        { x: 147, y: 507 },
                        { x: -150, y: 153 }
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
                        ai: false
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

            moveTimeIncrement = 12000;
            for (let x = 0; x < 8; x++) {
                let line = {
                    points: [
                        { x:470, y: -15 },
                        { x: 358, y: 777 },
                        { x: 300, y: 814 },
                        { x: 211, y: 823 },
                        { x: 168, y: 787 },
                        { x: 148, y: 724 },
                        { x: 168, y: 666 },
                        { x: 241, y: 624 },
                        { x: 1000, y: 618 }
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
                        ai: false
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

            moveTimeIncrement = 16000;
            for (let x = 0; x < 8; x++) {
                let line = {
                    points: [
                        { x: 268, y: -15 },
                        { x: 436, y: 870 },
                        { x: 475, y: 888 },
                        { x: 535, y: 880 },
                        { x: 590, y: 787 },
                        { x: 567, y: 712 },
                        { x: 465, y: 697 },
                        { x: -200, y: 688 }
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
                        ai: false
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
                        stage = "challengingStage";
                        showChallengingStageLogo = true;
                        totalTime = 0;
                        shootTime = 0;
                        oscillate = false;
                        randomShoot = Random.nextRange(5, 8) * 1000;
                    }
                }
            }
        }
        if (stage === "challengingStage") {
            if (totalTime >= 4000 && showChallengingStageLogo) {
                showChallengingStageLogo = false;
                createChallengingWave(enemies);
            } else {
                shootTime += elapsedTime;
                if (shootTime > randomShoot) {
                    let enemies = MyGame.screens['game-play'].getEnemies();
        
                    for (let i = 0; i < enemies.length; i++) {
                        if (enemies[i].enemy.ship.center.y < -50 || enemies[i].enemy.ship.center.y > 1025 || enemies[i].enemy.ship.center.x < -50 || enemies[i].enemy.ship.center.x > 770) {
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
                        wavesOver = true;
                        stage = "stage1";
                        showingStage1Logo = true;
                        totalTime = 0;
                        shootTime = 0;
                        oscillate = false;
                        randomShoot = Random.nextRange(5, 8) * 1000;
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
        } else if (showChallengingStageLogo) {
            challengingStageHeader.draw();
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

    function getWaveStatus() {
        return wavesOver;
    }

    let api = {
        update : update,
        createWave1 : createWave1,
        render : render,
        getWaveStage : getWaveStage,
        setWaveStage : setWaveStage,
        getOscillate : getOscillate,
        getWaveStatus : getWaveStatus
    };

    return api;
}());