scene.setBackgroundImage(assets.image`sus sky`)
tiles.setCurrentTilemap(tilemap`level1`)
let mySprite = sprites.create(assets.image`dah Wizard`, SpriteKind.Player)
mySprite.setPosition(30, 30)
scene.cameraFollowSprite(mySprite)
forever(function () {
    if (controller.up.isPressed()) {
        mySprite.y += -4
    }
    mySprite.setVelocity(0, 100)
})
forever(function () {
    if (controller.right.isPressed()) {
        mySprite.x += 2
        mySprite.setImage(assets.image`dah Wizard`)
        if (controller.A.isPressed()) {
            mySprite.startEffect(effects.warmRadial)
            mySprite.setImage(assets.image`dah Wizard but red0`)
        } else {
            effects.clearParticles(mySprite)
        }
    }
})
forever(function () {
    if (controller.left.isPressed()) {
        mySprite.x += -2
        mySprite.setImage(assets.image`dah Wizard but left`)
        if (controller.A.isPressed()) {
            mySprite.startEffect(effects.warmRadial)
            mySprite.setImage(assets.image`dah Wizard but red but left`)
        } else {
            effects.clearParticles(mySprite)
        }
    }
})
forever(function () {
    if (controller.A.isPressed()) {
        if (true) {
        	
        }
        mySprite.startEffect(effects.warmRadial)
        mySprite.setImage(assets.image`dah Wizard but red0`)
    } else {
        effects.clearParticles(mySprite)
    }
})
