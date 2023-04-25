MyGame.SoundPlayer = (function() {
    function enemyExplosionSound() {
        let explosionAudio = document.createElement("Audio");
        explosionAudio.src = "assets/alienDeath.mp3";
        explosionAudio.play();
        explosionAudio.remove();
    }

    function playerExplosionSound() {
        let explosionAudio = document.createElement("Audio");
        explosionAudio.src = "assets/alienDeath.mp3";
        explosionAudio.play();
        explosionAudio.remove();
    }

    function alienFlyingSound() {
        let explosionAudio = document.createElement("Audio");
        explosionAudio.src = "assets/alienFlying.mp3";
        explosionAudio.play();
        explosionAudio.remove();
    }

    function playerShotSound() {
        let explosionAudio = document.createElement("Audio");
        explosionAudio.src = "assets/player-shot.mp3";
        explosionAudio.play();
        explosionAudio.remove();
    }

    function buttonSelectSound() {
        let explosionAudio = document.createElement("Audio");
        explosionAudio.src = "assets/button-select.mp3";
        explosionAudio.play();
        explosionAudio.remove();
    }

    function ambienceSound() {
        let audio = document.createElement("Audio");
        audio.src = "assets/backgroundAmbience.mp3"
        audio.play();
        audio.loop = true;
    }

    function changeConfirmSound() {
        let audio = document.createElement("Audio");
        audio.src = "assets/changeConfirm.mp3"
        audio.play();
    }

    function resetSound() {
        let audio = document.createElement("Audio");
        audio.src = "assets/resetSound.mp3"
        audio.play();
    } 

    return {
        enemyExplosionSound : enemyExplosionSound,
        playerExplosionSound : playerExplosionSound,
        alienFlyingSound : alienFlyingSound,
        playerShotSound : playerShotSound,
        buttonSelectSound : buttonSelectSound,
        ambienceSound : ambienceSound,
        changeConfirmSound : changeConfirmSound,
        resetSound : resetSound
    }
}())