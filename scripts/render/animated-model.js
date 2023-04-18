// --------------------------------------------------------------
//
// Renders an animated model based on a spritesheet.
//
// --------------------------------------------------------------
MyGame.render.AnimatedModel = function(spec, graphics) {
    'use strict';

    let animationTime = 0;
    let subImageIndex = 0;
    let subTextureWidth = 0;
    let image = new Image();
    let isReady = false;  // Can't render until the texture is loaded

    //
    // Load he texture to use for the particle system loading and ready for rendering
    image.onload = function() {
        isReady = true;
        subTextureWidth = image.width / spec.spriteCount;
    }
    image.src = spec.spriteSheet;

    //------------------------------------------------------------------
    //
    // Update the state of the animation
    //
    //------------------------------------------------------------------
    function update(elapsedTime, ship, projectiles, wave1Enemies, j) {
        animationTime += elapsedTime;
        ship.setTotalTime(elapsedTime)
        //
        // Check to see if we should update the animation frame
        if (animationTime >= spec.spriteTime[subImageIndex]) {
            //
            // When switching sprites, keep the leftover time because
            // it needs to be accounted for the next sprite animation frame.
            animationTime -= spec.spriteTime[subImageIndex];
            subImageIndex += 1;
            //
            // Wrap around from the last back to the first sprite as needed
            subImageIndex = subImageIndex % spec.spriteCount;
        }
        if (ship.totalTime >= ship.moveTime) {
            updateShip(ship.ship, elapsedTime);
        }

        for (let i = 0; i < projectiles.length; i++) {
            if ((projectiles[i].center.x + (projectiles[i].size.width / 2)) > (wave1Enemies[j].enemy.ship.center.x - (wave1Enemies[j].enemy.ship.size.x / 2))) {
                if ((projectiles[i].center.x - (projectiles[i].size.width / 2)) < (wave1Enemies[j].enemy.ship.center.x + (wave1Enemies[j].enemy.ship.size.x / 2))) {
                    if ((projectiles[i].center.y) < (wave1Enemies[j].enemy.ship.center.y) + (wave1Enemies[j].enemy.ship.size.y / 2)) {
                        if ((projectiles[i].center.y) + (projectiles[i].size.height / 2) > (wave1Enemies[j].enemy.ship.center.y) - (wave1Enemies[j].enemy.ship.size.y / 2)) {
                            MyGame.screens['game-play'].createExplosion(wave1Enemies[j].enemy.ship.center.x, wave1Enemies[j].enemy.ship.center.y);
                            document.getElementById('alien-death-sound').play();
                            wave1Enemies.splice(j, 1);
                            projectiles.splice(i, 1);
                        }
                    }
                }
            }
        }
    }

    function computeDistance(pt1x, pt1y, pt2x, pt2y) {
        let dx2 = Math.pow(pt2x - pt1x, 2);
        let dy2 = Math.pow(pt2y - pt1y, 2);

        return Math.sqrt(dx2 + dy2);
    }

    function updateShip(ship, elapsedTime) {
        if (ship.pathIndex === 0) {
            document.getElementById('alien-flying-sound').play();
        }
        if (ship.pathIndex < ship.path.points.length - 1) {
            // Compute distance traveled
            let distTraveled = ship.moveRate * elapsedTime;

            // Compute remaining distance on the current line segment
            let distRemaining = computeDistance(ship.center.x, ship.center.y, ship.path.points[ship.pathIndex + 1].x, ship.path.points[ship.pathIndex + 1].y);
            
            if (distTraveled > distRemaining) {
                distTraveled -= distRemaining;
                // Move the ship to the end of the current line segment
                ship.center.x = ship.path.points[ship.pathIndex + 1].x;
                ship.center.y = ship.path.points[ship.pathIndex + 1].y;

                ship.pathIndex += 1;
            }

            if (ship.pathIndex < ship.path.points.length - 1) {
                // Now, handle the distance along the current line segment
                // Start by computing the direction vector of the line
                let dirX = ship.path.points[ship.pathIndex + 1].x - ship.center.x;
                let dirY = ship.path.points[ship.pathIndex + 1].y - ship.center.y;
                // Normalize the vector
                let dirMag = Math.sqrt(dirX * dirX + dirY * dirY);
                dirX /= dirMag;
                dirY /= dirMag;
                // See how far along that vector the ship moved
                let moveX = distTraveled * dirX;
                let moveY = distTraveled * dirY;
                // Update the ship position with the movement distance
                ship.center.x += moveX;
                ship.center.y += moveY;
            }
        }
    }

    //------------------------------------------------------------------
    //
    // Render the specific sub-texture animation frame
    //
    //------------------------------------------------------------------
    function render(model) {
        if (isReady) {
            graphics.drawSubTexture(image, subImageIndex, subTextureWidth, model.center, model.rotation, model.size);
        }
    }

    let api = {
        update: update,
        render: render
    };

    return api;
};
