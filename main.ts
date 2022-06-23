function setLevel () {
    scene.setBackgroundImage(assets.image`sus sky`)
    tiles.setCurrentTilemap(tilemap`level1`)
    da_score_bord = textsprite.create("0", 15, 1)
}
function skinChange (initImg: Image, targetImg: Image, who: Sprite) {
    if (who.image.equals(initImg)) {
        who.setImage(targetImg)
    }
}
function placeBadGuy (x: number, y: number) {
    bad_guys.push(sprites.create(assets.image`bad guy stage1`, SpriteKind.Enemy))
    bad_guys[bad_guys.length - 1].follow(da_Wizard, 10)
    tiles.placeOnTile(bad_guys[bad_guys.length - 1], tiles.getTileLocation(x, y))
}
function fireBlastDirection (initImg: Image, targetImg: Image, fireImg: Image, fireVel: number) {
    if (da_Wizard.image.equals(initImg)) {
        da_Wizard.setImage(targetImg)
        pause(200)
        fire_blasts.push(sprites.createProjectileFromSprite(fireImg, da_Wizard, fireVel, 0))
    }
}
function setPlayer1 () {
    da_Wizard = sprites.create(assets.image`Da Wizard right`, SpriteKind.Player)
    tiles.placeOnTile(da_Wizard, tiles.getTileLocation(2, 14))
    scene.cameraFollowSprite(da_Wizard)
}
function playerJump () {
    pause(50)
    da_Wizard.setVelocity(0, -200)
    pause(50)
    da_Wizard.setVelocity(0, -100)
    pause(50)
    da_Wizard.setVelocity(0, -50)
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
    skinChange(assets.image`Da Wizard red right`, assets.image`Da Wizard right`, da_Wizard)
    skinChange(assets.image`Da Wizard red left`, assets.image`Da Wizard left`, da_Wizard)
}
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
    placeBadGuy(35, 13)
    placeBadGuy(36, 13)
    placeBadGuy(37, 13)
    placeBadGuy(38, 13)
    placeBadGuy(39, 13)
}
let da_score = 0
let fire_blasts: Sprite[] = []
let da_Wizard: Sprite = null
let bad_guys: Sprite[] = []
let da_score_bord: TextSprite = null
setLevel()
setPlayer1()
placeAllBadGuys()
forever(function () {
    da_score_bord.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) - 53)
    da_score_bord.setText(convertToText(da_score))
})
forever(function () {
    for (let currentBadGuy of bad_guys) {
        for (let currentFireBlast of fire_blasts) {
            if (currentBadGuy.overlapsWith(currentFireBlast)) {
                if (currentBadGuy.image.equals(assets.image`bad guy stage1`)) {
                    skinChange(assets.image`bad guy stage1`, assets.image`bad guy stage2`, currentBadGuy)
                    currentFireBlast.destroy()
                    currentBadGuy.follow(da_Wizard, 30)
                    pause(500)
                }
            }
            if (currentBadGuy.overlapsWith(currentFireBlast)) {
                if (currentBadGuy.image.equals(assets.image`bad guy stage2`)) {
                    currentBadGuy.destroy()
                    da_score += 10
                }
            }
        }
    }
})
forever(function () {
    for (let attackingBadGuy of bad_guys) {
        if (attackingBadGuy.overlapsWith(da_Wizard)) {
            game.reset()
        }
    }
})
forever(function () {
    if (controller.up.isPressed() && (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass up`) || (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass left up`) || da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass right up`)))) {
        playerJump()
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
})
forever(function () {
    if (da_Wizard.tileKindAt(TileDirection.Top, sprites.dungeon.collectibleInsignia)) {
        game.over(true, effects.starField)
    }
})
