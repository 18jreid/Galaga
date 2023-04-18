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
        let moveLeftButtonReset = document.getElementsByClassName("moveLeftButtonReset")[0];
        let moveLeftInput = document.getElementsByClassName('moveLeftInput')[0];
        moveLeftInput.value = config.moveLeft;
        moveLeftButtonReset.addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                config.moveLeft = "ArrowLeft";
                localStorage.setItem("config", JSON.stringify(config));
                moveLeftInput.value = "ArrowLeft"
            }
        );
        let moveLeftButtonSet = document.getElementsByClassName("moveLeftButtonSet")[0];
        moveLeftButtonSet.addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                config.moveLeft = moveLeftInput.value;
                localStorage.setItem("config", JSON.stringify(config));
                MyGame.screens["main-menu"].setConfig(config);
            }
        );

        // Move Right Config
        let moveRightButtonReset = document.getElementsByClassName("moveRightButtonReset")[0];
        let moveRightInput = document.getElementsByClassName('moveRightInput')[0];
        moveRightInput.value = config.moveRight;
        moveRightButtonReset.addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                config.moveRight = "ArrowRight";
                localStorage.setItem("config", JSON.stringify(config));
                moveRightInput.value = "ArrowRight"
            }
        );
        let moveRightButtonSet = document.getElementsByClassName("moveRightButtonSet")[0];
        moveRightButtonSet.addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                config.moveRight = moveRightInput.value;
                localStorage.setItem("config", JSON.stringify(config));
                MyGame.screens["main-menu"].setConfig(config);
            }
        );

        // Shoot Missile Config
        let shootMissileButtonReset = document.getElementsByClassName("shootMissileButtonReset")[0];
        let shootMissileInput = document.getElementsByClassName('shootMissileInput')[0];
        if (config.shootMissle === " ") {
            shootMissileInput.value = "space"
        }
        else {
            shootMissileInput.value = config.shootMissle;
        }
        shootMissileButtonReset.addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                config.shootMissle = " ";
                localStorage.setItem("config", JSON.stringify(config));
                shootMissileInput.value = "space"
            }
        );
        let shootMissileButtonSet = document.getElementsByClassName("shootMissileButtonSet")[0];
        shootMissileButtonSet.addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                if (shootMissileInput.value === "space") {
                    config.shootMissle = " ";
                } else {
                    config.shootMissle = shootMissileInput.value;
                }
                localStorage.setItem("config", JSON.stringify(config));
                MyGame.screens["main-menu"].setConfig(config);
            }
        );
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
