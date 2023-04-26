
MyGame.render.AnimatedModel = function(spec, graphics) {
    'use strict';

    // Initialize variables
    let animationTime = 0;
    let subImageIndex = 0;
    let subTextureWidth = 0;
    let image = new Image();
    let isReady = false;
    let pathFinished = false;
    let x = 0;
    let y = 0;
    let attack = true;
    let oscillateTime = 0;
    let coefficient = 0.04;

    // Load enemy sprite sheet image
    image.onload = function() {
        isReady = true;
        subTextureWidth = image.width / spec.spriteCount;
    }
    image.src = spec.spriteSheet;
    spec.pathFinished = pathFinished;

    function oscillate(elapsedTime, oscillatePoint, totalTime) {
        if (oscillateTime >= 2000) {
            oscillateTime = 0;
            coefficient *= -1;
        } 
        let speed = Math.PI / 2; // radians per second
        let amplitude = 50; // pixels
        let angle = (speed * totalTime) % (2 * Math.PI);
        let displacement = Math.sin(angle) * amplitude;
        return (oscillatePoint + displacement);
    }

    // Update function to animate enemy and detect collisions with player projectiles
    function update(elapsedTime, ship, projectiles, wave1Enemies, j, particles) {
        oscillateTime += elapsedTime;
        // Update position of enemy based on player ship position
        x = ship.ship.center.x;
        y = ship.ship.center.y;
        animationTime += elapsedTime;
        ship.setTotalTime(elapsedTime)
       
        // Update animation of enemy sprite
        if (animationTime >= spec.spriteTime[subImageIndex]) {
            animationTime -= spec.spriteTime[subImageIndex];
            subImageIndex += 1;
            subImageIndex = subImageIndex % spec.spriteCount;
        }

        // Move enemy along its preset path
        if (ship.totalTime >= ship.moveTime) {
            followPath(ship.ship, elapsedTime);
            // ship.ship.center.x += oscillatePoint;
            ship.ship.center.x += oscillate(elapsedTime, 1, 2) * coefficient * elapsedTime;
        }

        // Check for collision with player projectiles
        for (let i = 0; i < projectiles.length; i++) {
            if (wave1Enemies[j] === undefined) {
                continue;
            }
            if ((projectiles[i].center.x + (projectiles[i].size.width / 2)) > (wave1Enemies[j].enemy.ship.center.x - (wave1Enemies[j].enemy.ship.size.x / 2))) {
                if ((projectiles[i].center.x - (projectiles[i].size.width / 2)) < (wave1Enemies[j].enemy.ship.center.x + (wave1Enemies[j].enemy.ship.size.x / 2))) {
                    if ((projectiles[i].center.y) < (wave1Enemies[j].enemy.ship.center.y) + (wave1Enemies[j].enemy.ship.size.y / 2)) {
                        if ((projectiles[i].center.y) + (projectiles[i].size.height / 2) > (wave1Enemies[j].enemy.ship.center.y) - (wave1Enemies[j].enemy.ship.size.y / 2)) {
                            if (projectiles[i].players) {
                                // Play enemy explosion sound effect and create explosion particle effect
                                MyGame.SoundPlayer.enemyExplosionSound();
                                MyGame.Particles.enemyExplosion(wave1Enemies[j].enemy.ship.center.x, wave1Enemies[j].enemy.ship.center.y, particles);
                                MyGame.screens['game-play'].setHits(1);

                                // Increase player score based on enemy type and behavior
                                if (wave1Enemies[j].enemy.ship.formation) {
                                    if (wave1Enemies[j].renderer.spec.spriteSheet === "assets/enemyOneSpritesheet.png") {
                                        MyGame.screens['game-play'].increaseHighscore(50);
                                    }
                                    if (wave1Enemies[j].renderer.spec.spriteSheet === "assets/enemyTwoSpritesheet.png") {
                                        MyGame.screens['game-play'].increaseHighscore(80);
                                    }
                                    if (wave1Enemies[j].renderer.spec.spriteSheet === "assets/enemyThreeSpritesheet.png") {
                                        MyGame.screens['game-play'].increaseHighscore(150);
                                    }
                                }

                                if (wave1Enemies[j].enemy.ship.diving) {
                                    if (wave1Enemies[j].renderer.spec.spriteSheet === "assets/enemyOneSpritesheet.png") {
                                        MyGame.screens['game-play'].increaseHighscore(100);
                                    }

                                    if (wave1Enemies[j].renderer.spec.spriteSheet === "assets/enemyTwoSpritesheet.png") {
                                        MyGame.screens['game-play'].increaseHighscore(160);
                                    }

                                    if (wave1Enemies[j].renderer.spec.spriteSheet === "assets/enemyThreeSpritesheet.png") {
                                        MyGame.screens['game-play'].increaseHighscore(400);
                                    }
                                }
                                
                                if (wave1Enemies[1] !== undefined) {
                                    wave1Enemies.splice(j, 1)
                                }

                                projectiles.splice(i, 1);
                            }
                        }
                    }
                }
            }
        }
    }

    function attack1(ship) {
        ship.pathIndex = 0;
        ship.path = {
            points: [
                { x: x, y: y + 70, attack: false },
                { x: x - 30, y: y + 40, attack: false },
                { x: x - 60, y: y + 15, attack: true },
                { x: x - 50, y: y - 30, attack: false },
                { x: x - 15, y: y - 60, attack: false},
                { x: x + 20, y: y - 50, attack: false},
                { x: x + 50, y: y - 30, attack: true},
                { x: x + 40, y: y, attack: false},
                { x: x + 40, y: y + 1500, attack: false},
                { x: MyGame.graphics.canvas.width / 2, y: 400, attack: false},
            ]
        };
    }

    function computeDistance(pt1x, pt1y, pt2x, pt2y) {
        let dx2 = Math.pow(pt2x - pt1x, 2);
        let dy2 = Math.pow(pt2y - pt1y, 2);

        return Math.sqrt(dx2 + dy2);
    }

    function followPath(ship, elapsedTime) {
        if (ship.pathIndex === 0) {
            document.getElementById('alien-flying-sound').play();
        }
        if (ship.pathIndex < ship.path.points.length - 1) {
            
            let distTraveled = ship.moveRate * elapsedTime;
            if (ship.path.points[ship.pathIndex + 1].attack) {
                setTimeout(() => {
                    attack = true;
                }, 100);
                if (attack) {
                    if (ship.ai) {
                        MyGame.assetCreator.getEnemyBullet(ship, elapsedTime, MyGame.screens['ai-game-play'].getParticles());
                    } else {
                        MyGame.assetCreator.getEnemyBullet(ship, elapsedTime, MyGame.screens['game-play'].getParticles());

                    }
                }
                attack = false;
            }

            
            let distRemaining = computeDistance(ship.center.x, ship.center.y, ship.path.points[ship.pathIndex + 1].x, ship.path.points[ship.pathIndex + 1].y);
            
            if (distTraveled > distRemaining) {
                distTraveled -= distRemaining;
                
                ship.center.x = ship.path.points[ship.pathIndex + 1].x;
                ship.center.y = ship.path.points[ship.pathIndex + 1].y;

                ship.pathIndex += 1;
            }

            if (ship.pathIndex < ship.path.points.length - 1) {
                
                let dirX = ship.path.points[ship.pathIndex + 1].x - ship.center.x;
                let dirY = ship.path.points[ship.pathIndex + 1].y - ship.center.y;
                
                let dirMag = Math.sqrt(dirX * dirX + dirY * dirY);
                dirX /= dirMag;
                dirY /= dirMag;
                
                let moveX = distTraveled * dirX;
                let moveY = distTraveled * dirY;
                
                ship.center.x += moveX;
                ship.center.y += moveY;
            }
        } else {
            setTimeout(() => {
                spec.pathFinished = true;
            }, 250);
        }
    }
    
    function render(model) {
        if (isReady) {
            graphics.drawSubTexture(image, subImageIndex, subTextureWidth, model.center, model.rotation, model.size);
        }
    }

    let api = {
        update: update,
        render: render,
        spec : spec,
        attack1 : attack1
    };

    return api;
};
