function setLevel () {
    scene.setBackgroundImage(assets.image`sus sky`)
    tiles.setCurrentTilemap(tilemap`level1`)
    da_score_bord = textsprite.create("0", 15, 1)
}
function skinChange (initImg: Image, targetImg: Image) {
    if (da_Wizard.image.equals(initImg)) {
        da_Wizard.setImage(targetImg)
    }
}
function jumpAcc () {
    pause(50)
    da_Wizard.setVelocity(0, -200)
    pause(50)
    da_Wizard.setVelocity(0, -100)
    pause(50)
    da_Wizard.setVelocity(0, -50)
}
function placeBadGuy (x: number, y: number) {
    bad_guy = sprites.create(assets.image`bad guy`, SpriteKind.Enemy)
    bad_guy.follow(da_Wizard, 10)
    tiles.placeOnTile(bad_guy, tiles.getTileLocation(x, y))
}
function fireBlastDirection (initImg: Image, targetImg: Image, fireImg: Image, fireVel: number) {
    if (da_Wizard.image.equals(initImg)) {
        fire_blast = sprites.createProjectileFromSprite(fireImg, da_Wizard, fireVel, 0)
        da_Wizard.setImage(targetImg)
    }
}
function setPlayer1 () {
    da_Wizard = sprites.create(assets.image`Da Wizard right`, SpriteKind.Player)
    tiles.placeOnTile(da_Wizard, tiles.getTileLocation(2, 14))
    scene.cameraFollowSprite(da_Wizard)
}
function movePlayer1 (num: number, myImage: Image) {
    da_Wizard.x += num
    da_Wizard.setImage(myImage)
}
function fireBlast () {
    fireBlastDirection(assets.image`Da Wizard right`, assets.image`Da Wizard red right`, assets.image`fire blast right`, 100)
    fireBlastDirection(assets.image`Da Wizard left`, assets.image`Da Wizard red left`, assets.image`fire blast left`, -100)
}
function skinRevertToBlue () {
    skinChange(assets.image`Da Wizard red right`, assets.image`Da Wizard right`)
    skinChange(assets.image`Da Wizard red left`, assets.image`Da Wizard left`)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.destroy()
    dah_score += 7
})
function placeAllBadGuys () {
    placeBadGuy(8, 14)
    placeBadGuy(13, 12)
    placeBadGuy(14, 14)
    placeBadGuy(17, 11)
    placeBadGuy(21, 11)
    placeBadGuy(23, 12)
    placeBadGuy(27, 15)
    placeBadGuy(30, 13)
    placeBadGuy(31, 13)
    placeBadGuy(32, 13)
    placeBadGuy(33, 13)
    placeBadGuy(34, 13)
    placeBadGuy(30, 13)
    placeBadGuy(31, 13)
    placeBadGuy(32, 13)
    placeBadGuy(33, 13)
    placeBadGuy(34, 13)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.over(false)
})
let dah_score = 0
let fire_blast: Sprite = null
let bad_guy: Sprite = null
let da_Wizard: Sprite = null
let da_score_bord: TextSprite = null
setLevel()
setPlayer1()
forever(function () {
	
})
forever(function () {
    da_score_bord.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) - 53)
    da_score_bord.setText(convertToText(dah_score))
})
forever(function () {
    if (controller.up.isPressed() && (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass up`) || (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass left up`) || da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass right up`)))) {
        jumpAcc()
    } else {
        da_Wizard.ay = 200
    }
    if (controller.right.isPressed()) {
        movePlayer1(2, assets.image`Da Wizard right`)
    }
    if (controller.left.isPressed()) {
        movePlayer1(-2, assets.image`Da Wizard left`)
    }
    if (controller.A.isPressed()) {
        fireBlast()
    } else {
        skinRevertToBlue()
    }
    if (controller.B.isPressed()) {
        da_Wizard.setScale(2, ScaleAnchor.Bottom)
    } else {
        da_Wizard.setScale(1, ScaleAnchor.Bottom)
    }
})
forever(function () {
    if (da_Wizard.tileKindAt(TileDirection.Top, sprites.dungeon.collectibleInsignia)) {
        game.over(true, effects.starField)
    }
})
