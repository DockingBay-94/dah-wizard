scene.setBackgroundImage(assets.image`sus sky`)
tiles.setCurrentTilemap(tilemap`level1`)
let dah_Wizard = sprites.create(assets.image`dah Wizard right`, SpriteKind.Player)
tiles.placeOnTile(dah_Wizard, tiles.getTileLocation(2, 14))
scene.cameraFollowSprite(dah_Wizard)
let dah_score = textsprite.create("0", 1, 15)
forever(function () {
    if (controller.up.isPressed()) {
        if (dah_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath2) || (dah_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath1) || dah_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath3))) {
            dah_Wizard.setVelocity(0, -100)
            pause(200)
        }
    } else {
        dah_Wizard.setVelocity(0, 100)
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
    if (controller.B.isPressed()) {
        dah_Wizard.setScale(2, ScaleAnchor.Bottom)
    } else {
        dah_Wizard.setScale(1, ScaleAnchor.Bottom)
    }
})
forever(function () {
    dah_score.setPosition(scene.cameraProperty(CameraProperty.X) + 70, scene.cameraProperty(CameraProperty.Y) - 50)
})
forever(function () {
    if (controller.A.isPressed()) {
        dah_Wizard.startEffect(effects.warmRadial)
        if (dah_Wizard.image.equals(assets.image`dah Wizard right`) || dah_Wizard.image.equals(assets.image`dah Wizard red right`)) {
            dah_Wizard.setImage(assets.image`dah Wizard red right`)
        }
        if (dah_Wizard.image.equals(assets.image`dah Wizard left`) || dah_Wizard.image.equals(assets.image`dah Wizard red left`)) {
            dah_Wizard.setImage(assets.image`dah Wizard red left`)
        }
    } else {
        effects.clearParticles(dah_Wizard)
    }
})
forever(function () {
    if (controller.down.isPressed()) {
        dah_score.setText("100")
    }
})
