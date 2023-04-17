MyGame.screens['main-menu'] = (function(game) {
    'use strict';
    let lastTimeStamp = performance.now();
    let cancelNextRequest = true;
    let player;
    
    function initialize() {
        player = MyGame.assetCreator.getPlayer();
        //
        // Setup each of menu events for the screens
        document.getElementById('id-new-game').addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                game.showScreen('game-play');
                cancelNextRequest = true;
        });
        
        document.getElementById('id-high-scores').addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                game.showScreen('high-scores');
            });
        
        document.getElementById('id-help').addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                game.showScreen('help');
            });
        
        document.getElementById('id-about').addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                game.showScreen('about');
            });
    }

    function update() {
    }

    function render() {
        player.render();
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

    function run() {
        lastTimeStamp = performance.now();
        cancelNextRequest = false;
        requestAnimationFrame(gameLoop);
    }
    
    return {
        initialize : initialize,
        run : run
    };
}(MyGame.game));
