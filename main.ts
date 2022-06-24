function setLevel () {
    tiles.setCurrentTilemap(tilemap`level1`)
    da_score_bord = textsprite.create("0", 15, 1)
    scene.setBackgroundImage(assets.image`sus sky`)
}
function skinChange (initImg: Image, targetImg: Image, who: Sprite) {
    if (who.image.equals(initImg)) {
        who.setImage(targetImg)
    }
}
function placeBadGuy (x: number, y: number, size: number) {
    bad_guys_sprites.push(sprites.create(assets.image`bad guy stage1`, SpriteKind.Enemy))
    badGuyState.push("normal")
    bad_guys_sprites[bad_guys_sprites.length - 1].follow(da_Wizard, 10)
    tiles.placeOnTile(bad_guys_sprites[bad_guys_sprites.length - 1], tiles.getTileLocation(x, y))
    bad_guys_sprites[bad_guys_sprites.length - 1].setScale(size, ScaleAnchor.Middle)
}
function fireBlastDirection (initImg: Image, targetImg: Image, fireImg: Image, fireVel: number) {
    if (da_Wizard.image.equals(initImg)) {
        fire_blasts.push(sprites.createProjectileFromSprite(fireImg, da_Wizard, fireVel, 0))
        da_Wizard.setImage(targetImg)
        pause(200)
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
    placeBadGuy(8, 14, 1)
    placeBadGuy(13, 12, 1)
    placeBadGuy(14, 14, 1)
    placeBadGuy(17, 11, 1)
    placeBadGuy(21, 11, 1)
    placeBadGuy(23, 12, 1)
    placeBadGuy(27, 15, 1)
    placeBadGuy(30, 13, 1)
    placeBadGuy(31, 13, 1)
    placeBadGuy(32, 13, 1)
    placeBadGuy(33, 13, 1)
    placeBadGuy(34, 13, 1)
    placeBadGuy(35, 13, 1)
    placeBadGuy(36, 13, 1)
    placeBadGuy(37, 13, 1)
    placeBadGuy(38, 13, 1)
    placeBadGuy(39, 13, 1)
}
let da_score = 0
let da_Wizard: Sprite = null
let da_score_bord: TextSprite = null
let badGuyState: string[] = []
let fire_blasts: Sprite[] = []
let bad_guys_sprites: Sprite[] = []
bad_guys_sprites = []
fire_blasts = []
badGuyState = []
setLevel()
setPlayer1()
forever(function () {
    da_score_bord.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) - 53)
    da_score_bord.setText(convertToText(da_score))
})
forever(function () {
    for (let index = 0; index <= bad_guys_sprites.length - 1; index++) {
        for (let currentFireBlast of fire_blasts) {
            if (bad_guys_sprites[index].overlapsWith(currentFireBlast)) {
                if (badGuyState[index] == "normal") {
                    currentFireBlast.destroy()
                    bad_guys_sprites[index].follow(da_Wizard, 30)
                    badGuyState[index] = "Red"
                    skinChange(assets.image`bad guy stage1`, assets.image`bad guy stage2`, bad_guys_sprites[index])
                    pause(500)
                }
            }
            if (bad_guys_sprites[index].overlapsWith(currentFireBlast)) {
                if (badGuyState[index] == "Red") {
                    bad_guys_sprites[index].destroy()
                    da_score += 10
                }
            }
        }
    }
})
forever(function () {
    for (let attackingBadGuy of bad_guys_sprites) {
        if (attackingBadGuy.overlapsWith(da_Wizard)) {
            game.reset()
        }
    }
})
forever(function () {
    if (controller.up.isPressed() && (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass up`) || (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass left up`) || (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass right up`) || da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`myTile`))))) {
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
        tiles.placeOnTile(da_Wizard, tiles.getTileLocation(55, 18))
        scene.setBackgroundImage(assets.image`castle`)
        placeBadGuy(65, 16, 2)
        placeBadGuy(71, 17, 2)
        placeBadGuy(77, 16, 2)
        placeBadGuy(81, 17, 2)
        placeBadGuy(84, 16, 2)
    }
})
