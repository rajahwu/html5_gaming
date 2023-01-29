import Phaser from "phaser";

export default class StartScreen extends Phaser.Scene {
    constructor() {
        super('titleScreen')
    }

    private startBtn?: Phaser.GameObjects.Text
    private music?: Phaser.Sound.BaseSound

    preload() {
        this.load.image('bg', '../../matrix.jpg')
        this.load.audio('theme', '../../theme.wav')
    }

    create() {
        this.add.image(200, 200, 'bg')
        this.add.text(50, 100, "Adventures in Game Dev", { font: '40px Times New Roman', color: '#ffa0d0' })
        this.add.text(130, 200, "by Rajah Wu", { font: '25px Times New Roman', color: '#ffa0d0' })
        this.startBtn = this.add.text(330, 300, "Start Game", { font: '30px Times New Roman', color: '#fff' })
        this.music = this.sound.add('theme')
        this.music.play({
        })

        this.add.circle(120, 475, 150, 0xffdd45)
        this.add.circle(50, 500, 100, 0x15dd45)
        this.add.circle(10, 350, 100, 0x15ff95)

        this.startBtn.setInteractive()
        this.startBtn.on('pointerup', () => {

            this.scene.start('level')
        })

    }
}