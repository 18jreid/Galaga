let MyGame = {
    screens : {},
    input: {},
    objects: {},
    assets: {},
    render: []
};

MyGame.loader = (function () {
    'use strict';

    // Scripts to be loaded into game
    let myScripts = [
        {
            scripts: [
                "scripts/sounds/soundPlayer.js",
                "scripts/game.js",
                "scripts/systems/particle-system.js",
                "scripts/systems/particles.js",
                "scripts/render/particle-system.js",
                "scripts/render/assets.js",
                "scripts/input-keyboard.js",
                "scripts/mainmenu.js",
                "scripts/entities/enemy.js",
                "scripts/render/animated-enemy.js",
                "scripts/random.js",
                "scripts/render/core.js",
                "scripts/entities/player.js",
                "scripts/pages/gameplay.js",
                "scripts/pages/highscores.js",
                "scripts/pages/help.js",
                "scripts/pages/about.js",
                "scripts/waveCreator.js"
            ],
            message: "Scripts loaded",
            onComplete: null
        }
    ];

    // Assets to be loaded into game
    let myAssets = [
        {
            key: 'background',
            source: "assets/background.png"
        },
        {
            key: 'gameBackground',
            source: "assets/gameBackground.png"
        },
        {
            key: 'player',
            source: "assets/player.png"
        },
        {
            key: 'html_background',
            source: "assets/html_background.jpg"
        },
        {
            key: 'gameStartSound',
            source: "assets/GameStart.mp3"
        },
        {
            key: 'button-select',
            source: "assets/button-select.mp3"
        },
        {
            key: 'player-bullet',
            source: "assets/playerBullet.png"
        },
        {
            key: 'player-shot-sound',
            source: "assets/player-shot.mp3"
        },
        {
            key: 'enemy1',
            source: "assets/enemy1.png"
        },
        {
            key: 'enemyOneSpritesheet',
            source: "assets/enemyOneSpritesheet.png"
        },
        {
            key: 'fire',
            source: "assets/fire.png"
        },
        {
            key: 'smoke',
            source: "assets/smoke-2.png"
        },
        {
            key: 'alienFlying',
            source: "assets/alienFlying.mp3"
        },
        {
            key: 'alienDeath',
            source: "assets/alienDeath.mp3"
        },
        {
            key: 'enemyTwoSpritesheet',
            source: "assets/enemyTwoSpritesheet.png"
        },
        {
            key: 'enemyThreeSpritesheet',
            source: "assets/enemyThreeSpritesheet.png"
        },
        {
            key: 'enemyBullet',
            source: "assets/enemyBullet.png"
        },
        {
            key: 'enemyFourSpritesheet',
            source: "assets/enemyFourSpritesheet.png"
        }
    ]

    // Loads in an asset into asset objects
    function loadAsset(source, onSuccess, onError) {
        let xhr = new XMLHttpRequest(),
            asset = null,
            fileExtension = source.substr(source.lastIndexOf('.') + 1);    // Source: http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript

        if (fileExtension) {
            xhr.open('GET', source, true);
            xhr.responseType = 'blob';

            xhr.onload = function () {

                if (xhr.status === 200) {
                    if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'mp4') {
                        asset = new Image();
                    } else if (fileExtension === 'mp3') {
                        asset = new Audio();
                    } else {
                        if (onError) { onError('Unknown file extension: ' + fileExtension); }
                    }
                    asset.onload = function () {
                        window.URL.revokeObjectURL(asset.src);
                    };
                    asset.src = window.URL.createObjectURL(xhr.response);
                    if (onSuccess) { onSuccess(asset); }
                } else {
                    if (onError) { onError('Failed to retrieve: ' + source); }
                }
            };
        } else {
            if (onError) { onError('Unknown file extension: ' + fileExtension); }
        }

        xhr.send();
    }

    // Reverses string (used for getting file extensions)
    function reverseString(str) {
        var splitString = str.split("");
        var reverseArray = splitString.reverse();
        var joinArray = reverseArray.join("");
        
        return joinArray; // "olleh"
    }

    // Loads all scripts
    function loadScripts(scripts, onComplete) {
        if (scripts.length > 0) {
            let entry = scripts[0];
            require(entry.scripts, function () {
                console.log(entry.message);
                if (entry.onComplete) {
                    entry.onComplete();
                }
                scripts.splice(0, 1);
                loadScripts(scripts, onComplete);
            });
        } else {
            onComplete();
        }
    }

    // Load in all assets in assets folder
    function loadAssets(assets, onSuccess, onError, onComplete) {
        //
        // When we run out of things to load, that is when we call onComplete.
        if (assets.length > 0) {
            let entry = assets[0];
            loadAsset(entry.source,
                function (asset) {
                    onSuccess(entry, asset);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                },
                function (error) {
                    onError(error);
                    assets.splice(0, 1);
                    loadAssets(assets, onSuccess, onError, onComplete);
                });
        } else {
            onComplete();
        }
    }

    // Start Game
    function mainComplete() {
        console.log('Complete');
        MyGame.game.initialize();
    }

    console.log('Starting to dynamically load project assets');
    loadAssets(myAssets,
        function (source, asset) {    // Store it on success
            MyGame.assets[source.key] = asset;
        },
        function (error) {
            console.log(error);
        },
        function () {
            console.log('All assets loaded');
            console.log('Starting to dynamically load project scripts');
            loadScripts(myScripts, mainComplete);
        }
    );
}());