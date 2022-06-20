tiles.setCurrentTilemap(tilemap`level1`)
let mySprite = sprites.create(assets.image`dah Wizard`, SpriteKind.Player)
mySprite.setPosition(30, 33)
scene.setBackgroundImage(assets.image`sus sky`)
scene.cameraFollowSprite(mySprite)
forever(function () {
    mySprite.setVelocity(0, 50)
    if (controller.right.isPressed()) {
        mySprite.x += 2
    }
    if (controller.left.isPressed()) {
        mySprite.x += -2
    }
    if (controller.up.isPressed()) {
        mySprite.y += -2
    }
    if (controller.A.isPressed()) {
        mySprite.startEffect(effects.warmRadial)
    } else {
        effects.clearParticles(mySprite)
    }
    if (controller.down.isPressed()) {
    	
    }
    if (controller.B.isPressed()) {
        game.reset()
    }
})
