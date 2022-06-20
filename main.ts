scene.setBackgroundImage(assets.image`sus sky`)
tiles.setCurrentTilemap(tilemap`level1`)
let dah_Wizard = sprites.create(assets.image`dah Wizard`, SpriteKind.Player)
dah_Wizard.setPosition(30, 30)
scene.cameraFollowSprite(dah_Wizard)
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
    if (controller.up.isPressed()) {
        dah_Wizard.y += -4
    }
    dah_Wizard.setVelocity(0, 100)
})
forever(function () {
    if (controller.A.isPressed()) {
        dah_Wizard.startEffect(effects.warmRadial)
        if (dah_Wizard.equals(assets.image`dah Wizard`)) {
            dah_Wizard.setImage(assets.image`dah Wizard but red`)
        } else if (dah_Wizard.equals(assets.image`dah Wizard but left`)) {
            dah_Wizard.setImage(assets.image`dah Wizard but red but left`)
        }
    } else {
        effects.clearParticles(dah_Wizard)
    }
})
