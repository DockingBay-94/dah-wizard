function setLevel () {
    scene.setBackgroundImage(assets.image`sus sky`)
    tiles.setCurrentTilemap(tilemap`level1`)
    da_score_bord = textsprite.create("0", 15, 1)
}
function placeBadGuy (x: number, y: number) {
    bad_guy = sprites.create(assets.image`bad guy`, SpriteKind.Enemy)
    bad_guy.follow(da_Wizard, 10)
    tiles.placeOnTile(bad_guy, tiles.getTileLocation(x, y))
}
function setPlayer () {
    da_Wizard = sprites.create(assets.image`dah Wizard right`, SpriteKind.Player)
    tiles.placeOnTile(da_Wizard, tiles.getTileLocation(2, 14))
    scene.cameraFollowSprite(da_Wizard)
}
function fireBlastDirection (initImg: Image, targetImg: Image, fireImg: Image, fireVel: number) {
    if (da_Wizard.image.equals(initImg)) {
        fire_blast = sprites.createProjectileFromSprite(fireImg, da_Wizard, fireVel, 0)
        da_Wizard.setImage(targetImg)
    }
}
function movePlayer1 (num: number, myImage: Image) {
    da_Wizard.x += num
    da_Wizard.setImage(myImage)
}
function fireBlast () {
    fireBlastDirection(assets.image`dah Wizard right`, assets.image`dah Wizard red right`, assets.image`fire blast right`, 100)
    fireBlastDirection(assets.image`dah Wizard left`, assets.image`dah Wizard red left`, assets.image`fire blast left`, -100)
}
function skinRevertToBlue () {
    skinRevertAndDirection(assets.image`dah Wizard red right`, assets.image`dah Wizard right`)
    skinRevertAndDirection(assets.image`dah Wizard red left`, assets.image`dah Wizard left`)
}
function skinRevertAndDirection (initImg: Image, targetImg: Image) {
    if (da_Wizard.image.equals(initImg)) {
        da_Wizard.setImage(targetImg)
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy()
    dah_score += 7
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.reset()
})
let dah_score = 0
let fire_blast: Sprite = null
let da_Wizard: Sprite = null
let bad_guy: Sprite = null
let da_score_bord: TextSprite = null
setLevel()
setPlayer()
placeBadGuy(8, 14)
placeBadGuy(8, 15)
forever(function () {
    if (controller.up.isPressed() && (da_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath2) || (da_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath1) || da_Wizard.tileKindAt(TileDirection.Bottom, sprites.castle.tilePath3)))) {
        pause(100)
        da_Wizard.setVelocity(0, -100)
        pause(200)
    } else {
        da_Wizard.setVelocity(0, 100)
    }
})
forever(function () {
    if (controller.right.isPressed()) {
        movePlayer1(2, assets.image`dah Wizard right`)
    }
    if (controller.left.isPressed()) {
        movePlayer1(-2, assets.image`dah Wizard left`)
    }
})
forever(function () {
    da_score_bord.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) - 53)
    da_score_bord.setText(convertToText(dah_score))
})
forever(function () {
    if (controller.B.isPressed()) {
        da_Wizard.setScale(2, ScaleAnchor.Bottom)
    } else {
        da_Wizard.setScale(1, ScaleAnchor.Bottom)
    }
})
forever(function () {
    if (controller.A.isPressed()) {
        fireBlast()
    } else {
        skinRevertToBlue()
    }
})
