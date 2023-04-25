MyGame.screens['main-menu'] = (function(game) {
    'use strict';
    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let highScores = [0, 0, 0, 0];
    let config = {moveLeft: "ArrowLeft", moveRight: "ArrowRight", shootMissle: " "};
    
    function initialize() {
        // Get high scores and configuration for controls
        if (localStorage.getItem("highScores") !== null) {
            highScores = JSON.parse(localStorage.getItem("highScores"));
        } else {
            localStorage.setItem("highScores", JSON.stringify(highScores));
        }

        if (localStorage.getItem("config") !== null) {
            config = JSON.parse(localStorage.getItem("config"));
        } else {
            localStorage.setItem("config", JSON.stringify(config));
        }

        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {
                MyGame.SoundPlayer.buttonSelectSound();
                MyGame.screens['game-play'].initialize();
                document.getElementById('game-start-sound').pause();
                MyGame.SoundPlayer.ambienceSound();
                game.showScreen('game-play');
                cancelNextRequest = true;
        });
        
        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() {
                MyGame.SoundPlayer.buttonSelectSound();
                game.showScreen('high-scores');
            });
        
        document.getElementById('id-help').addEventListener(
            'click',
            function() {
                MyGame.SoundPlayer.buttonSelectSound();
                game.showScreen('help');
            });
        
        document.getElementById('id-about').addEventListener(
            'click',
            function() {
                MyGame.SoundPlayer.buttonSelectSound();
                game.showScreen('about');
            });
    }

    function update() {
    }

    function render() {
    }

    function gameLoop(time) {
        let elapsedTime = time - lastTimeStamp;
        lastTimeStamp = time;

        update();
        render();

        if (!cancelNextRequest) {
            requestAnimationFrame(gameLoop);
        }
    }

    function getConfig() {
        return config;
    }

    function setConfig(newConfig) {
        config = newConfig;
    }

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }
    
    return {
        initialize : initialize,
        run : run,
        getConfig : getConfig,
        setConfig : setConfig
    };
}(MyGame.game));
