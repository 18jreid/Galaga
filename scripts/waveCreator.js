MyGame.WaveCreator = (function() {
    function createWave1(enemies) {
        stage1(enemies);
    }

    function stage1(enemies) {
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
                    rotation: 0,
                    moveRate: 400 / 1000,         // Pixels per second
                    rotateRate: Math.PI / 1000,    // Radians per second,
                    path: line,
                    pathIndex: 0,
                    totalTime: 0,
                    moveTime: moveTimeIncrement
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
                    rotation: 0,
                    moveRate: 400 / 1000,         // Pixels per second
                    rotateRate: Math.PI / 1000,    // Radians per second,
                    path: line,
                    pathIndex: 0,
                    totalTime: 0,
                    moveTime: moveTimeIncrement
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

    let api = {
        createWave1 : createWave1
    };

    return api;
}());