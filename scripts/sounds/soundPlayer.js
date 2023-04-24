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

    return {
        enemyExplosionSound : enemyExplosionSound,
        playerExplosionSound : playerExplosionSound,
        alienFlyingSound : alienFlyingSound,
        playerShotSound : playerShotSound,
        buttonSelectSound : buttonSelectSound
    }
}())