import Phaser from "phaser";

export default class Level extends Phaser.Scene {
    constructor() {
        super('level')
    }
    private circle?: Phaser.GameObjects.Arc
    private player?: Phaser.Physics.Arcade.Sprite
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    // private ground?: Phaser.Physics.Arcade.StaticGroup
    // private platform: Phaser.GameObjects.Rectangle

    preload() {
        this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/codey.png')

    }

    create() {
        this.player = this.add.sprite(350, 200, 'codey')
        this.circle = this.add.circle(25, 100, 20, 0xff0000)
        // this.platform = this.add.rectangle(0, 500, 2500, 50, 0x00ff00)
        // this.ground = this.physics.add.staticGroup()


    }

    update() {
        this.circle!.x += 1
    }
}