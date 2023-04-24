MyGame.Particles = (function() {
    'use strict';

    function enemyExplosion(x, y) {
        let particlesFire = MyGame.SystemParticleSystem.createParticle({
            center: { x: x, y: y },
            size: { mean: 8, stdev: 2 },
            speed: { mean: 15, stdev: 6 },
            lifetime: { mean: 1.5, stdev: 0.3 },
        },
        MyGame.graphics);
    
        let renderFire = MyGame.RenderParticleSystem.createRenderer(particlesFire, MyGame.graphics, 'assets/fire.png');
        
        MyGame.screens['game-play'].getParticles().push({particlesFire: particlesFire, renderFire : renderFire, lifeTime: 0});
    }

    function playerExplosion(x, y) {
        let particlesFire = MyGame.SystemParticleSystem.createParticle({
            center: { x: x, y: y },
            size: { mean: 8, stdev: 2 },
            speed: { mean: 15, stdev: 6 },
            lifetime: { mean: 1.5, stdev: 0.3 },
        },
        MyGame.graphics);
    
        let renderFire = MyGame.RenderParticleSystem.createRenderer(particlesFire, MyGame.graphics, 'assets/smoke-2.png');
        
        MyGame.screens['game-play'].getParticles().push({particlesFire: particlesFire, renderFire : renderFire, lifeTime: 0});
    }

    return {
        enemyExplosion : enemyExplosion,
        playerExplosion : playerExplosion
    };
}()) 