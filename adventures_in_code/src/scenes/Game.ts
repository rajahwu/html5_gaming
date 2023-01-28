import Phaser from "phaser";

export default class HelloWorld extends Phaser.Scene {
    preload() {
        this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/codey.png')
        this.load.image('bg', '../../matrix.jpg')
    }

    create() {
        this.add.image(200,200,'bg')
        this.add.text(50, 100, "Adventures in Game Dev", {font: '40px Times New Roman', color: '#ffa0d0'})
        this.add.text(130, 200, "by Rajah Wu", {font: '25px Times New Roman', color: '#ffa0d0'})

        this.add.circle(120, 475, 150, 0xffdd45)
        this.add.circle(50, 500, 100, 0x15dd45)
        this.add.circle(10, 350, 100, 0x15ff95)
        this.add.sprite(350, 200, 'codey')

    }
}