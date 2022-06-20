tiles.setCurrentTilemap(tilemap`level1`)
let mySprite = sprites.create(assets.image`dah Wizard`, SpriteKind.Player)
mySprite.setPosition(30, 30)
scene.setBackgroundImage(assets.image`sus sky`)
scene.cameraFollowSprite(mySprite)
forever(function () {
    mySprite.setVelocity(0, 100)
    if (controller.right.isPressed()) {
        mySprite.x += 2
    }
    if (controller.left.isPressed()) {
        mySprite.x += -2
    }
    if (controller.up.isPressed()) {
        mySprite.y += -4
    }
    if (controller.A.isPressed()) {
        mySprite.startEffect(effects.warmRadial)
        mySprite.setImage(assets.image`dah Wizard but red`)
    } else {
        effects.clearParticles(mySprite)
        mySprite.setImage(assets.image`dah Wizard`)
    }
    if (controller.B.isPressed()) {
    	
    } else {
    	
    }
})
