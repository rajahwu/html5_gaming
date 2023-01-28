import Phaser from "phaser";

export default class TechDungeon extends Phaser.Scene {
    constructor() {
        super('techDungeon')
    }
    private player?: Phaser.Physics.Arcade.Sprite
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

    preload() {
        this.load.image('tiles', '../../tech_dungeon_tileset.png')
        this.load.tilemapTiledJSON('map', '../../tech_dungeon_map.json')
        this.load.spritesheet('player', '../../player.png', { frameWidth: 16, frameHeight: 16 })
    }

    create() {
        const map = this.make.tilemap({ key: 'map' })
        const tileset = map.addTilesetImage('tech_dungeon', 'tiles')
        const floor = map.createLayer("Floor", tileset, 0, 0)
        const walls = map.createLayer("Walls", tileset, 0, 0)
        walls.setCollisionByProperty({ collides: true })

        // const debugGraphics = this.add.graphics().setAlpha(0.5)
        // walls.renderDebug(debugGraphics, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // })

        this.player = this.physics.add.sprite(100, 100, 'player')
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 0}],
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        })
        this.physics.add.collider(this.player, walls)

        this.cursors = this.input.keyboard.createCursorKeys()


    }

    update() {
        if (this.cursors?.left?.isDown) {
            this.player?.setVelocityX(-60);
            this.player?.anims.play('walk', true); 
        }
        else if (this.cursors?.right?.isDown) {
            this.player?.setVelocityX(60);
            this.player?.anims.play('walk', true);
        }
        else if (this.cursors?.up?.isDown) {

            this.player?.setVelocityY(-60);
            this.player?.anims.play('walk', true);
        }
        else if (this.cursors?.down?.isDown) {

            this.player?.setVelocityY(60);
            this.player?.anims.play('walk', true);

        } else {
            this.player?.anims.play('idle', true);
            this.player?.setVelocityX(0)
            this.player?.setVelocityY(0)
        }

    }
}