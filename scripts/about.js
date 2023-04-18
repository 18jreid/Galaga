MyGame.screens['about'] = (function(game) {
    'use strict';
    
    function initialize() {
        document.getElementById('id-about-back').addEventListener(
            'click',
            function() {
                let sound = document.getElementById("button-select-sound");
                sound.play();
                game.showScreen('main-menu');
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
