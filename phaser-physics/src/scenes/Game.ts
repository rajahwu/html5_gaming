import Phaser from "phaser";

export default class Game extends Phaser.Scene {
    constructor() {
        super('game')
    }
    private player?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    private platforms?: Phaser.Physics.Arcade.StaticGroup
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
    private enemies?: Phaser.Physics.Arcade.Group
    private xCoordinate?: number 
    private enemyGenLoop?: Phaser.Time.TimerEvent
    private scoreText?: Phaser.GameObjects.Text
    private score = 0

    preload() {
        this.load.image('bug1', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_1.png')
        this.load.image('bug2', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_2.png')
        this.load.image('bug3', 'https://content.codecademy.com/courses/learn-phaser/physics/bug_3.png')
        this.load.image('platform', 'https://content.codecademy.com/courses/learn-phaser/physics/platform.png')
        this.load.image('codey', 'https://content.codecademy.com/courses/learn-phaser/physics/codey.png')
    }

    create() {
        this.scoreText = this.scoreText = this.add.text(16, 16, `Score: 0`, {fontSize:'15px', color: '#fff'})

        this.player = this.physics.add.sprite(200, 250, 'codey')
        this.player.setCollideWorldBounds(true)

        this.platforms = this.physics.add.staticGroup()
        this.platforms.create(220, 500, 'platform')
        this.physics.add.collider(this.player, this.platforms)

        this.enemies = this.physics.add.group()
        this.enemyGenLoop = this.time.addEvent({
            callback: this.enemeyGen,
            delay: 100,
            callbackScope: this,
            loop: true
        })
        this.physics.add.collider(this.enemies, this.platforms, enemy => {
            enemy.destroy()
            this.score += 10
            this.scoreText?.setText(`Score: ${this.score}`)
        })

        this.physics.add.collider(this.player, this.enemies, () => {
            this.enemyGenLoop?.destroy()
            this.physics.pause()
            this.add.text(150, 150, `Game Over \n \n score: ${this.score}`, {fontSize: '20px', color: '#fff'})
            this.add.text(125, 200, 'Play Again?', {fontSize: '25px', color: '#fff'})
            this.input.on('pointerup', () => {
                this.scene.restart()
                this.score = 0
            })
            
        })
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        this.player?.setVelocityX(0)
        if (this.cursors?.left.isDown) { this.player?.setVelocityX(-160) }
        if (this.cursors?.right.isDown) { this.player?.setVelocityX(160) }
    }

    enemeyGen() {
        this.xCoordinate = Math.random() * 400
        this.enemies?.create(this.xCoordinate, 0, 'bug1')
    }
}