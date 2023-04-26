MyGame.assetCreator = (function() {
    'use strict';

    function getBackgroundImage() {
        let backgroundImage = new Image();
        backgroundImage.isReady = false;
        backgroundImage.src = MyGame.assets['gameBackground'].src;
        backgroundImage.onload = function () {
            this.isReady = true;
        };
        backgroundImage.render = function() {
            MyGame.graphics.drawTexture(
                backgroundImage,
                { x: MyGame.graphics.canvas.width / 2, y: MyGame.graphics.canvas.height / 2 },
                0,
                { width: MyGame.graphics.canvas.width, height: MyGame.graphics.canvas.height });
        }

        return backgroundImage;
    }

    function getEnemyBullet(enemy, elapsedTime, particles) {
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
                                MyGame.Particles.playerExplosion(x, y, particles);
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

    function drawHighscoreHeader() {
        let highscoreHeader = MyGame.graphics.Text({
            text : 'High Score',
            font : '30px Turret Road',
            fill : 'Red',
            stroke : 'Red',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 70 , y : 10},
            rotation : 0
        });

        return highscoreHeader;
    }

    function drawHighscoreValue(value) {
        let highscoreValue = MyGame.graphics.Text({
            text : '' + value,
            font : '30px Turret Road',
            fill : 'white',
            stroke : 'white',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 30, y : 40},
            rotation : 0
        });

        return highscoreValue;
    }

    function drawTrueHighscoreValue(value) {
        let highscoreValue = MyGame.graphics.Text({
            text : '' + value,
            font : '30px Turret Road',
            fill : 'white',
            stroke : 'white',
            pos : {x : (MyGame.graphics.canvas.width / 64), y : 10},
            rotation : 0
        });

        return highscoreValue;
    }

    function drawStage1Header() {
        let highscoreHeader = MyGame.graphics.Text({
            text : 'Stage 1',
            font : '30px Turret Road',
            fill : 'White',
            stroke : 'White',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 70 , y : MyGame.graphics.canvas.height / 2},
            rotation : 0
        });

        return highscoreHeader;
    }

    function drawStage2Header() {
        let highscoreHeader = MyGame.graphics.Text({
            text : 'Stage 2',
            font : '30px Turret Road',
            fill : 'White',
            stroke : 'White',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 70 , y : MyGame.graphics.canvas.height / 2},
            rotation : 0
        });

        return highscoreHeader;
    }

    function drawChallengingStageHeader() {
        let highscoreHeader = MyGame.graphics.Text({
            text : 'Challenging Stage',
            font : '30px Turret Road',
            fill : 'White',
            stroke : 'White',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 140 , y : MyGame.graphics.canvas.height / 2},
            rotation : 0
        });

        return highscoreHeader;
    }

    function drawLivesLeft() {
        let livesLeft = MyGame.graphics.Text({
            text : 'Lives Left: ' + MyGame.screens['game-play'].getPlayer().lives.length,
            font : '30px Turret Road',
            fill : 'White',
            stroke : 'White',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 70 , y : MyGame.graphics.canvas.height / 2},
            rotation : 0
        });

        return livesLeft;
    }

    function getGameover() {
        let livesLeft = MyGame.graphics.Text({
            text : 'Game Over',
            font : '30px Turret Road',
            fill : 'Red',
            stroke : 'Red',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 110 , y : (MyGame.graphics.canvas.height / 2) - 150},
            rotation : 0
        });

        return livesLeft;
    }

    function getShotsFired(shots) {
        let livesLeft = MyGame.graphics.Text({
            text : 'Shots fired: ' + shots,
            font : '30px Turret Road',
            fill : 'Red',
            stroke : 'Red',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 110 , y : (MyGame.graphics.canvas.height / 2) - 100},
            rotation : 0
        });

        return livesLeft;
    }

    function getHitsText(hits) {
        let livesLeft = MyGame.graphics.Text({
            text : 'Hits: ' + hits,
            font : '30px Turret Road',
            fill : 'Red',
            stroke : 'Red',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 110 , y : MyGame.graphics.canvas.height / 2 - 50},
            rotation : 0
        });

        return livesLeft;
    }

    function getHitMissRatio(hits, shots) {
        let livesLeft = MyGame.graphics.Text({
            text : 'Hit/Miss Ratio: ' + (hits / shots).toFixed(2),
            font : '30px Turret Road',
            fill : 'Red',
            stroke : 'Red',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 110 , y : MyGame.graphics.canvas.height / 2},
            rotation : 0
        });

        return livesLeft;
    }

    function getFinalScoreText(score) {
        let livesLeft = MyGame.graphics.Text({
            text : 'Final Score: ' + (score),
            font : '30px Turret Road',
            fill : 'Red',
            stroke : 'Red',
            pos : {x : (MyGame.graphics.canvas.width / 2) - 110 , y : (MyGame.graphics.canvas.height / 2) + 50},
            rotation : 0
        });

        return livesLeft;
    }
    
    return {
        getBackgroundImage: getBackgroundImage,
        drawHighscoreHeader : drawHighscoreHeader,
        drawHighscoreValue : drawHighscoreValue,
        drawStage1Header : drawStage1Header,
        drawStage2Header : drawStage2Header,
        getEnemyBullet : getEnemyBullet,
        drawLivesLeft : drawLivesLeft,
        getGameover : getGameover,
        drawTrueHighscoreValue : drawTrueHighscoreValue,
        getShotsFired : getShotsFired,
        getHitMissRatio : getHitMissRatio,
        getHitsText : getHitsText,
        drawChallengingStageHeader : drawChallengingStageHeader,
        getFinalScoreText : getFinalScoreText
    };
}());
