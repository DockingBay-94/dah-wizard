let mySprite = sprites.create(assets.image`dah Wizard`, SpriteKind.Player)
forever(function () {
    if (controller.right.isPressed()) {
        mySprite.x += 2
    }
    if (controller.left.isPressed()) {
        mySprite.x += -2
    }
})
