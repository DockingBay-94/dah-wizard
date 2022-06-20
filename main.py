def on_b_pressed():
    dah_Wizard.set_scale(0.5, ScaleAnchor.BOTTOM)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_b_released():
    dah_Wizard.set_scale(1, ScaleAnchor.BOTTOM)
controller.B.on_event(ControllerButtonEvent.RELEASED, on_b_released)

dah_Wizard: Sprite = None
scene.set_background_image(assets.image("""
    sus sky
"""))
tiles.set_current_tilemap(tilemap("""
    level1
"""))
dah_Wizard = sprites.create(assets.image("""
        dah Wizard right
    """),
    SpriteKind.player)
tiles.place_on_tile(dah_Wizard, tiles.get_tile_location(2, 14))
scene.camera_follow_sprite(dah_Wizard)

def on_forever():
    dah_Wizard.set_velocity(0, 50)
forever(on_forever)

def on_forever2():
    if controller.left.is_pressed():
        dah_Wizard.x += -2
        dah_Wizard.set_image(assets.image("""
            dah Wizard left
        """))
    if controller.right.is_pressed():
        dah_Wizard.x += 2
        dah_Wizard.set_image(assets.image("""
            dah Wizard right
        """))
forever(on_forever2)

def on_forever3():
    if controller.A.is_pressed():
        dah_Wizard.start_effect(effects.warm_radial)
        if dah_Wizard.image.equals(assets.image("""
            dah Wizard right
        """)):
            dah_Wizard.set_image(assets.image("""
                dah Wizard red right
            """))
        elif dah_Wizard.image.equals(assets.image("""
            dah Wizard left
        """)):
            dah_Wizard.set_image(assets.image("""
                dah Wizard red left
            """))
    else:
        effects.clear_particles(dah_Wizard)
forever(on_forever3)

def on_forever4():
    if controller.up.is_pressed():
        if dah_Wizard.tile_kind_at(TileDirection.BOTTOM, sprites.castle.tile_path2) or (dah_Wizard.tile_kind_at(TileDirection.BOTTOM, sprites.castle.tile_path1) or dah_Wizard.tile_kind_at(TileDirection.BOTTOM, sprites.castle.tile_path3)):
            dah_Wizard.set_velocity(0, -20000)
forever(on_forever4)
