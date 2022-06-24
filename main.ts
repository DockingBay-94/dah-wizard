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
function fireBlastDirection (initImg: Image, targetImg: Image, fireImg: Image, fireVel: number) {
    if (da_Wizard.image.equals(initImg)) {
        fire_blasts.push(sprites.createProjectileFromSprite(fireImg, da_Wizard, fireVel, 0))
        da_Wizard.setImage(targetImg)
        music.zapped.playUntilDone()
    }
}
function setPlayer1 () {
    da_Wizard = sprites.create(assets.image`Da Wizard right`, SpriteKind.Player)
    tiles.placeOnTile(da_Wizard, tiles.getTileLocation(2, 14))
    scene.cameraFollowSprite(da_Wizard)
}
function placeGhost (x: number, y: number, size: number) {
    evil_ghost_sprites.push(sprites.create(assets.image`evil ghost stage1`, SpriteKind.Enemy))
    evilGhostState.push("normal")
    evil_ghost_sprites[evil_ghost_sprites.length - 1].follow(da_Wizard, 10)
    tiles.placeOnTile(evil_ghost_sprites[evil_ghost_sprites.length - 1], tiles.getTileLocation(x, y))
    evil_ghost_sprites[evil_ghost_sprites.length - 1].setScale(size, ScaleAnchor.Middle)
}
function placeFirstGhosts () {
    placeGhost(8, 14, 1)
    placeGhost(13, 12, 1)
    placeGhost(14, 14, 1)
    placeGhost(17, 11, 1)
    placeGhost(21, 11, 1)
    placeGhost(23, 12, 1)
    placeGhost(27, 15, 1)
    placeGhost(30, 13, 1)
    placeGhost(31, 13, 1)
    placeGhost(32, 13, 1)
    placeGhost(33, 13, 1)
    placeGhost(34, 13, 1)
    placeGhost(35, 13, 1)
    placeGhost(36, 13, 1)
    placeGhost(37, 13, 1)
    placeGhost(38, 13, 1)
    placeGhost(39, 13, 1)
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
function placeCasleEnemys () {
    placeGhost(65, 16, 2)
    placeGhost(71, 17, 2)
    placeGhost(77, 16, 2)
    placeGhost(81, 17, 2)
    placeGhost(84, 16, 2)
    placeGhost(65, 16, 2)
    placeGhost(71, 17, 2)
    placeGhost(77, 16, 2)
    placeGhost(81, 17, 2)
    placeGhost(84, 16, 2)
    placeGhost(65, 16, 2)
    placeGhost(71, 17, 2)
    placeGhost(77, 16, 2)
    placeGhost(81, 17, 2)
    placeGhost(84, 16, 2)
    placeGhost(65, 16, 2)
    placeGhost(71, 17, 2)
    placeGhost(77, 16, 2)
    placeGhost(81, 17, 2)
    placeGhost(84, 16, 2)
    placeGhost(65, 16, 2)
    placeGhost(71, 17, 2)
    placeGhost(77, 16, 2)
    placeGhost(81, 17, 2)
    placeGhost(84, 16, 2)
    placeGhost(65, 16, 2)
    placeGhost(71, 17, 2)
    placeGhost(77, 16, 2)
    placeGhost(81, 17, 2)
    placeGhost(84, 16, 2)
    placeGhost(65, 16, 2)
    placeGhost(71, 17, 2)
    placeGhost(77, 16, 2)
    placeGhost(81, 17, 2)
    placeGhost(84, 16, 2)
    placeGhost(65, 16, 2)
    placeGhost(71, 17, 2)
    placeGhost(77, 16, 2)
    placeGhost(81, 17, 2)
    placeGhost(84, 16, 2)
}
let da_score = 0
let da_Wizard: Sprite = null
let da_score_bord: TextSprite = null
let evilGhostState: string[] = []
let fire_blasts: Sprite[] = []
let evil_ghost_sprites: Sprite[] = []
evil_ghost_sprites = []
fire_blasts = []
evilGhostState = []
setLevel()
setPlayer1()
placeFirstGhosts()
forever(function () {
    da_score_bord.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y) - 53)
    da_score_bord.setText(convertToText(da_score))
})
forever(function () {
    for (let index = 0; index <= evil_ghost_sprites.length - 1; index++) {
        for (let currentFireBlast of fire_blasts) {
            if (evil_ghost_sprites[index].overlapsWith(currentFireBlast)) {
                if (evilGhostState[index] == "normal") {
                    currentFireBlast.destroy()
                    evil_ghost_sprites[index].follow(da_Wizard, 30)
                    evilGhostState[index] = "Red"
                    skinChange(assets.image`evil ghost stage1`, assets.image`evil ghost stage2`, evil_ghost_sprites[index])
                    music.smallCrash.playUntilDone()
                }
            }
            if (evil_ghost_sprites[index].overlapsWith(currentFireBlast)) {
                if (evilGhostState[index] == "Red") {
                    evil_ghost_sprites[index].destroy()
                    da_score += 10
                    music.bigCrash.playUntilDone()
                }
            }
        }
    }
})
forever(function () {
    for (let attackingGhost of evil_ghost_sprites) {
        if (attackingGhost.overlapsWith(da_Wizard)) {
        	
        }
    }
})
forever(function () {
    if (controller.up.isPressed() && (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass up`) || (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass left up`) || (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Grass right up`) || (da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`myTile`) || da_Wizard.tileKindAt(TileDirection.Bottom, assets.tile`Piller3`)))))) {
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
        placeCasleEnemys()
        music.sonar.playUntilDone()
    }
})
forever(function () {
    if (da_Wizard.tileKindAt(TileDirection.Center, assets.tile`myTile3`) && da_score < 570) {
        pause(1000)
        game.splash("you must defeat all ghosts first")
    }
})
forever(function () {
    if (da_Wizard.tileKindAt(TileDirection.Center, assets.tile`myTile3`) && da_score >= 570) {
        game.over(true, effects.confetti)
    }
})
