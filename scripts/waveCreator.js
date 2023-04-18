MyGame.WaveCreator = (function() {
    function createWave1(enemies) {
        let moveTimeIncrement = 0;
        for (let x = 0; x < 2; x++) {
            for (let y = 0; y < 3; y++) {
                let line = {
                    points: [
                        { x: 475 + (30 * x), y: -100 },
                        { x: 475 + (30 * x), y: 0 + (50 * y) },
                        { x: 450 + (30 * x), y: 147 + (50 * y) },
                        { x: 420 + (30 * x), y: 277 + (50 * y) },
                        { x: 410 + (30 * x), y: 361 + (50 * y) },
                        { x: 396 + (30 * x), y: 444 + (50 * y) },
                        { x: 370 + (30 * x), y: 502 + (50 * y) },
                        { x: 320 + (30 * x), y: 537 + (50 * y) },
                        { x: 252 + (30 * x), y: 558 + (50 * y) },
                        { x: 210 + (30 * x), y: 510 + (50 * y) },
                        { x: 212 + (30 * x), y: 442 + (50 * y) },
                        { x: 239 + (30 * x), y: 396 + (50 * y) },
                        { x: 264 + (30 * x), y: 346 + (50 * y) },
                        { x: 291 + (30 * x), y: 307 + (50 * y) },
                        { x: 316 + (30 * x), y: 262 + (50 * y) },
                        { x: 360 + (30 * x), y: 202 + (50 * y) },
                    ]
                };
        
                let enemy = MyGame.objects.Enemy({
                    size: { x: 40, y: 40 },       // Size in pixels
                    center: { x: line.points[0].x, y: line.points[0].y },
                    rotation: 0,
                    moveRate: 250 / 1000,         // Pixels per second
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
                moveTimeIncrement += 500;
            }
        }
    }

    let api = {
        createWave1 : createWave1
    };

    return api;
}());