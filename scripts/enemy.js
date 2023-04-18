//------------------------------------------------------------------
//
// Creates a Bird model based upon the passed in specification.
//
//------------------------------------------------------------------
MyGame.objects.Enemy = function(spec) {

    //------------------------------------------------------------------
    //
    // Move in the direction of the rotation.
    //
    //------------------------------------------------------------------
    function moveForward(elapsedTime) {
            //
            // Create a normalized direction vector
            let vectorX = Math.cos(spec.rotation);
            let vectorY = Math.sin(spec.rotation);
            //
            // With the normalized direction vector, move the center of the sprite
            spec.center.x += (vectorX * spec.moveRate * elapsedTime);
            spec.center.y += (vectorY * spec.moveRate * elapsedTime);
    }

    function rotateLeft(elapsedTime) {
        spec.rotation -= spec.rotateRate * (elapsedTime);
    }

    function rotateRight(elapsedTime) {
        spec.rotation += spec.rotateRate * (elapsedTime);
    }

    let api = {
        get size() { return spec.size; },
        get path() { return spec.path; },
        get ship() { return spec },
        get center() { return spec.center; },
        get rotation() { return spec.rotation; },
        moveForward: moveForward,
        rotateLeft: rotateLeft,
        rotateRight: rotateRight
    };

    return api;
};
