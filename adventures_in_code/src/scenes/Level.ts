import Phaser from "phaser";

export default class Level extends Phaser.Scene {
    constructor() {
        super('level')
    }
    private circle?: Phaser.GameObjects.Arc

    preload() {
        this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/codey.png')

    }

    create() {
        this.add.sprite(350, 200, 'codey')
        this.circle = this.add.circle(25, 100, 20, 0xff0000)


    }

    update() {
        this.circle!.x += 1
    }
}