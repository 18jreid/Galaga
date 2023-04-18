MyGame.screens['high-scores'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-high-scores-back').addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                game.showScreen('main-menu');
            });
        let highScores = JSON.parse(localStorage.getItem("highScores"));
        highScores = highScores.sort();
        
        document.getElementById("high-score-1").innerHTML = highScores[0];
        document.getElementById("high-score-2").innerHTML = highScores[1];
        document.getElementById("high-score-3").innerHTML = highScores[2];
        document.getElementById("high-score-4").innerHTML = highScores[3];
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
