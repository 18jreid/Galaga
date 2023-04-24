//------------------------------------------------------------------
//
// Creates a Bird model based upon the passed in specification.
//
//------------------------------------------------------------------
MyGame.objects.Enemy = function(spec) {

    //------------------------------------------------------------------
    //
    // Move in the direction of the rotation.
    //
    //------------------------------------------------------------------
    function moveForward(elapsedTime) {
            //
            // Create a normalized direction vector
            let vectorX = Math.cos(spec.rotation);
            let vectorY = Math.sin(spec.rotation);
            //
            // With the normalized direction vector, move the center of the sprite
            spec.center.x += (vectorX * spec.moveRate * elapsedTime);
            spec.center.y += (vectorY * spec.moveRate * elapsedTime);
    }

    function rotateLeft(elapsedTime) {
        spec.rotation -= spec.rotateRate * (elapsedTime);
    }

    function rotateRight(elapsedTime) {
        spec.rotation += spec.rotateRate * (elapsedTime);
    }

    function setTotalTime(elapsedTime) {
        spec.totalTime += elapsedTime;
    }

    function getEnemyBullet(enemy, elapsedTime) {
        // Define enemy image
        let bullet = new Image();
        bullet.isReady = false;
        bullet.src = MyGame.assets['enemyBullet'].src;
        bullet.onload = function () {
            this.isReady = true;
        };
        // Define enemy attributes
        bullet.center = {x: enemy.center.x, y: enemy.center.y };
        bullet.size = {width: bullet.width * 2.25, height: bullet.height * 2.25};
        bullet.moveRate = 0.70;
        bullet.rotation = (180 * Math.PI) / 180;
        bullet.players = false;
        bullet.elapsedTime = elapsedTime;
        bullet.destroy = false;
        MyGame.screens['game-play'].addProjectile(bullet);

        // Define enemy functions
        bullet.render = function() {
            MyGame.graphics.drawTexture(
                bullet,
                { x: bullet.center.x, y: bullet.center.y },
                0,
                { width: bullet.size.width, height: bullet.size.height });
        };

        bullet.moveDown = function() {
            bullet.center.y += bullet.moveRate * elapsedTime;
        }

        bullet.update = function() {
            bullet.moveDown();
            let player = MyGame.screens['game-play'].getPlayer();
            let x = player.center.x;
            let y = player.center.y;
            let width =  player.size.width;
            let height = player.size.height;

            if ((bullet.center.x + (bullet.size.width / 2)) > (x - (width / 2))) {
                if ((bullet.center.x - (bullet.size.width / 2)) < (x + (width / 2))) {
                    if ((bullet.center.y + (bullet.size.height / 2)) > (y - (height / 2))) {
                        if ((bullet.center.y - (bullet.size.height / 2)) < (y + (height / 2))) {
                            if (!bullet.destroy) {
                                MyGame.Particles.playerExplosion(x, y);
                                MyGame.screens['game-play'].playerDeath();
                                MyGame.SoundPlayer.playerExplosionSound();
                            }
                            bullet.destroy = true;
                        }
                    }
                }
            }
        }
    }

    let api = {
        get size() { return spec.size; },
        get path() { return spec.path; },
        get ship() { return spec },
        get totalTime() { return spec.totalTime; },
        get moveTime() { return spec.moveTime ;},
        setTotalTime : setTotalTime,
        get center() { return spec.center; },
        get rotation() { return spec.rotation; },
        moveForward: moveForward,
        rotateLeft: rotateLeft,
        rotateRight: rotateRight,
    };

    return api;
};
