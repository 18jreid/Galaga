MyGame.screens['help'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-help-back').addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                game.showScreen('main-menu');
            });
        
        let config = MyGame.screens["main-menu"].getConfig();
        // Move Left Config
        let moveLeftInput = document.getElementsByClassName('moveLeftInput')[0];
        moveLeftInput.value = config.moveLeft;
        moveLeftInput.addEventListener('keydown', function(event) {
            MyGame.SoundPlayer.changeConfirmSound();
            config.moveLeft = event.key;
            localStorage.setItem("config", JSON.stringify(config));
            moveLeftInput.value = event.key;
        });

        // Move Right Config
        let moveRightInput = document.getElementsByClassName('moveRightInput')[0];
        moveRightInput.value = config.moveRight;
        moveRightInput.addEventListener('keydown', function(event) {
            MyGame.SoundPlayer.changeConfirmSound();
            config.moveRight = event.key;
            localStorage.setItem("config", JSON.stringify(config));
            moveRightInput.value = event.key;
        });

        // Shoot Missile Config
        let shootMissileInput = document.getElementsByClassName('shootMissileInput')[0];
        if (config.shootMissle === " ") {
            shootMissileInput.value = "space"
        }
        else {
            shootMissileInput.value = config.shootMissle;
        }
        shootMissileInput.addEventListener('keydown', function(event) {
            MyGame.SoundPlayer.changeConfirmSound();
            if (event.key === " ") {
                config.shootMissle = " ";
            } else {
                config.shootMissle = event.key;
            }
            localStorage.setItem("config", JSON.stringify(config));
            shootMissileInput.value = event.key;
        });

    }
    
    function run() {
        //
        // I know this is empty, there isn't anything to do.
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
