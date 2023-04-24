MyGame.screens['high-scores'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() {
                MyGame.SoundPlayer.buttonSelectSound();
                game.showScreen('main-menu');
            });
        let highScores = JSON.parse(localStorage.getItem("highScores"));
        highScores = highScores.sort(function(a, b) {
            return a - b;
          });;
        
        document.getElementById("high-score-1").innerHTML = highScores[highScores.length - 1];
        document.getElementById("high-score-2").innerHTML = highScores[highScores.length - 2];
        document.getElementById("high-score-3").innerHTML = highScores[highScores.length - 3];
        document.getElementById("high-score-4").innerHTML = highScores[highScores.length - 4];
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
