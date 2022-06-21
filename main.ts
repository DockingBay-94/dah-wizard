let fire_blast: Sprite = null
scene.setBackgroundImage(assets.image`sus sky`)
tiles.setCurrentTilemap(tilemap`level1`)
let dah_Wizard = sprites.create(assets.image`dah Wizard right`, SpriteKind.Player)
tiles.placeOnTile(dah_Wizard, tiles.getTileLocation(2, 14))
let bad_guy = sprites.create(assets.image`bad guy`, SpriteKind.Enemy)
tiles.placeOnTile(bad_guy, tiles.getTileLocation(8, 14))
let bad_guy_2 = sprites.create(assets.image`bad guy`, SpriteKind.Enemy)
tiles.placeOnTile(bad_guy_2, tiles.getTileLocation(8, 15))
scene.cameraFollowSprite(dah_Wizard)
let dah_score = 0
let dah_score_bord = textsprite.create("0", 15, 1)
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
    dah_score_bord.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) - 53)
    dah_score_bord.setText(convertToText(dah_score))
    if (controller.down.isPressed()) {
        dah_score += 7
    }
})
forever(function () {
    bad_guy.follow(dah_Wizard, 10)
    if (dah_Wizard.overlapsWith(bad_guy)) {
        game.reset()
    }
    bad_guy_2.follow(dah_Wizard, 10)
    if (dah_Wizard.overlapsWith(bad_guy_2)) {
        game.reset()
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
    if (controller.A.isPressed()) {
        if (dah_Wizard.image.equals(assets.image`dah Wizard right`)) {
            fire_blast = sprites.createProjectileFromSprite(assets.image`fire blast right`, dah_Wizard, 100, 0)
            dah_Wizard.setImage(assets.image`dah Wizard red right`)
        }
        if (dah_Wizard.image.equals(assets.image`dah Wizard left`)) {
            dah_Wizard.setImage(assets.image`dah Wizard red left`)
        }
    } else {
        effects.clearParticles(dah_Wizard)
        if (dah_Wizard.image.equals(assets.image`dah Wizard red left`)) {
            fire_blast = sprites.createProjectileFromSprite(assets.image`fire blast left`, dah_Wizard, -100, 0)
            dah_Wizard.setImage(assets.image`dah Wizard left`)
        }
        if (dah_Wizard.image.equals(assets.image`dah Wizard red right`)) {
            dah_Wizard.setImage(assets.image`dah Wizard right`)
        }
    }
})
forever(function () {
    if (controller.B.isPressed()) {
        dah_Wizard.setScale(2, ScaleAnchor.Bottom)
    } else {
        dah_Wizard.setScale(1, ScaleAnchor.Bottom)
    }
})
