MyGame.objects.Enemy = function(spec) {
    // Define a function to move the enemy forward
    function moveForward(elapsedTime) {
        // Calculate the x and y vector components for the enemy's rotation
        let vectorX = Math.cos(spec.rotation);
        let vectorY = Math.sin(spec.rotation);

        // Update the enemy's center x and y position based on its movement rate and elapsed time
        spec.center.x += (vectorX * spec.moveRate * elapsedTime);
        spec.center.y += (vectorY * spec.moveRate * elapsedTime);
    }

    // Define a function to rotate the enemy left
    function rotateLeft(elapsedTime) {
        // Update the enemy's rotation angle based on its rotation rate and elapsed time, in a counter-clockwise direction
        spec.rotation -= spec.rotateRate * (elapsedTime);
    }

    // Define a function to rotate the enemy right
    function rotateRight(elapsedTime) {
        // Update the enemy's rotation angle based on its rotation rate and elapsed time, in a clockwise direction
        spec.rotation += spec.rotateRate * (elapsedTime);
    }

    // Define a function to set the total time the enemy has been active in the game
    function setTotalTime(elapsedTime) {
        spec.totalTime += elapsedTime;
    }

    // Define the public API for the enemy object, with getter and setter methods for various properties
    let api = {
        get size() { return spec.size; },
        get path() { return spec.path; },
        get ship() { return spec },
        get totalTime() { return spec.totalTime; },
        get moveTime() { return spec.moveTime ;},
        setTotalTime : setTotalTime,
        get center() { return spec.center; },
        get rotation() { return spec.rotation; },
        moveForward: moveForward,
        rotateLeft: rotateLeft,
        rotateRight: rotateRight,
    };

    // Return the API for the enemy object
    return api;
};
