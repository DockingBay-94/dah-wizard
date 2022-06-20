controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (dah_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath2)) {
        dah_Wizard.setVelocity(0, 100)
    }
    if (dah_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath3)) {
        dah_Wizard.setVelocity(0, 100)
    }
    if (dah_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath1)) {
        dah_Wizard.setVelocity(0, 100)
    }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    dah_Wizard.setScale(0.5, ScaleAnchor.Bottom)
})
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    dah_Wizard.setScale(1, ScaleAnchor.Bottom)
})
let dah_Wizard: Sprite = null
scene.setBackgroundImage(assets.image`sus sky`)
tiles.setCurrentTilemap(tilemap`level1`)
dah_Wizard = sprites.create(assets.image`dah Wizard`, SpriteKind.Player)
tiles.placeOnTile(dah_Wizard, tiles.getTileLocation(2, 14))
scene.cameraFollowSprite(dah_Wizard)
forever(function () {
    dah_Wizard.setVelocity(0, 100)
})
forever(function () {
    if (controller.left.isPressed()) {
        dah_Wizard.x += -2
        dah_Wizard.setImage(assets.image`dah Wizard but left`)
    }
    if (controller.right.isPressed()) {
        dah_Wizard.x += 2
        dah_Wizard.setImage(assets.image`dah Wizard`)
    }
})
forever(function () {
    if (controller.A.isPressed()) {
        dah_Wizard.startEffect(effects.warmRadial)
        if (dah_Wizard.image.equals(assets.image`dah Wizard`)) {
            dah_Wizard.setImage(assets.image`dah Wizard but red`)
        } else if (dah_Wizard.image.equals(assets.image`dah Wizard but left`)) {
            dah_Wizard.setImage(assets.image`dah Wizard but red but left`)
        }
    } else {
        effects.clearParticles(dah_Wizard)
    }
})
