controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    dah_Wizard.setScale(0.5, ScaleAnchor.Bottom)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (dah_Wizard.image.equals(assets.image`dah Wizard right`) || false) {
        dah_Wizard.startEffect(effects.warmRadial)
        dah_Wizard.setImage(assets.image`dah Wizard red right`)
    }
    if (dah_Wizard.image.equals(assets.image`dah Wizard left`) || false) {
        dah_Wizard.startEffect(effects.warmRadial)
        dah_Wizard.setImage(assets.image`dah Wizard red left`)
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (dah_Wizard.image.equals(assets.image`dah Wizard red right`)) {
        dah_Wizard.setImage(assets.image`dah Wizard right`)
        effects.clearParticles(dah_Wizard)
    }
    if (dah_Wizard.image.equals(assets.image`dah Wizard red left`)) {
        dah_Wizard.setImage(assets.image`dah Wizard left`)
        effects.clearParticles(dah_Wizard)
    }
})
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    dah_Wizard.setScale(1, ScaleAnchor.Bottom)
})
let dah_Wizard: Sprite = null
scene.setBackgroundImage(assets.image`sus sky`)
tiles.setCurrentTilemap(tilemap`level1`)
dah_Wizard = sprites.create(assets.image`dah Wizard right`, SpriteKind.Player)
tiles.placeOnTile(dah_Wizard, tiles.getTileLocation(2, 14))
scene.cameraFollowSprite(dah_Wizard)
forever(function () {
    dah_Wizard.setVelocity(0, 50)
})
forever(function () {
    if (controller.up.isPressed()) {
        if (dah_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath2) || (dah_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath1) || dah_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath3))) {
            dah_Wizard.setVelocity(0, -200)
        }
    }
})
forever(function () {
    if (controller.left.isPressed()) {
        dah_Wizard.x += -2
        dah_Wizard.setImage(assets.image`dah Wizard left`)
    }
    if (controller.right.isPressed()) {
        dah_Wizard.x += 2
        dah_Wizard.setImage(assets.image`dah Wizard right`)
    }
})
forever(function () {
	
})
