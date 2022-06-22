function placeBadGuy (x: number, y: number) {
    bad_guy = sprites.create(assets.image`bad guy`, SpriteKind.Enemy)
    tiles.placeOnTile(bad_guy, tiles.getTileLocation(x, y))
}
function skinToBlue () {
    if (dah_Wizard.image.equals(assets.image`dah Wizard red left`)) {
        dah_Wizard.setImage(assets.image`dah Wizard left`)
    }
    if (dah_Wizard.image.equals(assets.image`dah Wizard red right`)) {
        dah_Wizard.setImage(assets.image`dah Wizard right`)
    }
}
function fireBlast () {
    if (dah_Wizard.image.equals(assets.image`dah Wizard right`)) {
        fire_blast = sprites.createProjectileFromSprite(assets.image`fire blast right`, dah_Wizard, 100, 0)
        dah_Wizard.setImage(assets.image`dah Wizard red right`)
    }
    if (dah_Wizard.image.equals(assets.image`dah Wizard left`)) {
        fire_blast = sprites.createProjectileFromSprite(assets.image`fire blast left`, dah_Wizard, -100, 0)
        dah_Wizard.setImage(assets.image`dah Wizard red left`)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
	
})
let dah_score = 0
let fire_blast: Sprite = null
let bad_guy: Sprite = null
let dah_Wizard: Sprite = null
scene.setBackgroundImage(assets.image`sus sky`)
tiles.setCurrentTilemap(tilemap`level1`)
dah_Wizard = sprites.create(assets.image`dah Wizard right`, SpriteKind.Player)
tiles.placeOnTile(dah_Wizard, tiles.getTileLocation(2, 14))
scene.cameraFollowSprite(dah_Wizard)
let dah_score_bord = textsprite.create("0", 15, 1)
placeBadGuy(8, 14)
placeBadGuy(8, 15)
forever(function () {
    bad_guy.follow(dah_Wizard, 10)
    if (dah_Wizard.overlapsWith(bad_guy)) {
        game.reset()
    }
    if (fire_blast && fire_blast.overlapsWith(bad_guy)) {
        bad_guy.destroy()
    }
})
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
    dah_score_bord.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) - 53)
    dah_score_bord.setText(convertToText(dah_score))
})
forever(function () {
    if (controller.B.isPressed()) {
        dah_Wizard.setScale(2, ScaleAnchor.Bottom)
    } else {
        dah_Wizard.setScale(1, ScaleAnchor.Bottom)
    }
    if (controller.down.isPressed()) {
        dah_score += 7
    }
})
forever(function () {
    if (controller.A.isPressed()) {
        fireBlast()
    } else {
        skinToBlue()
    }
})
