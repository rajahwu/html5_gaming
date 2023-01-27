import Phaser from 'phaser';

export default class HelloPhaser extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  private platforms?: Phaser.Physics.Arcade.StaticGroup
  private player?: Phaser.Physics.Arcade.Sprite
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  private stars?: Phaser.Physics.Arcade.Group
  private bombs?: Phaser.Physics.Arcade.Group
  private score = 0
  private gameOver = false
  private scoreText?: Phaser.GameObjects.Text

  preload() {
    this.load.image('sky', '../../public/assets/sky.png');
    this.load.image('ground', '../../public/assets/platform.png');
    this.load.image('star', '../../public/assets/star.png');
    this.load.image('bomb', '../../public/assets/bomb.png');
    this.load.spritesheet('dude', '../../public/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'sky');

    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')

    this.player = this.physics.add.sprite(100, 450, 'dude')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    this.cursors = this.input.keyboard.createCursorKeys()

    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })

    this.stars.children.iterate(c => {
      const child = c as Phaser.Physics.Arcade.Image
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    this.bombs = this.physics.add.group()
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitbomb, undefined, this)

    this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', color: '#000' })

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.stars, this.platforms)

    this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this)
  }

  update() {
    if (this.gameOver) {
      return
    }
    if (this.cursors?.left?.isDown) {
      this.player?.setVelocityX(-160);

      this.player?.anims.play('left', true);
    }
    else if (this.cursors?.right?.isDown) {
      this.player?.setVelocityX(160);

      this.player?.anims.play('right', true);
    }
    else {
      this.player?.setVelocityX(0);

      this.player?.anims.play('turn');
    }

    if (this.cursors?.up?.isDown && this.player?.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  private collectStar(player: Phaser.GameObjects.GameObject, s: Phaser.GameObjects.GameObject) {
    const star = s as Phaser.Physics.Arcade.Image
    star.disableBody(true, true)

    this.score += 10
    this.scoreText?.setText(`Score: ${this.score}`)

    if (this.stars?.countActive(true) === 0) {
      this.stars.children.iterate(c => {
        const child = c as Phaser.Physics.Arcade.Image
        child.enableBody(true, child.x, 0, true, true)
      })

      if(this.player) {
        let x = (this.player.x < 400) ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400)
          let bomb = this.bombs?.create(x, 16, 'bomb')
          bomb.setBounce(1)
          bomb.setCollideWorldBounds(true)
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
          bomb.allowGravity = false
      }

    }
  }

 private hitbomb(player: Phaser.GameObjects.GameObject, b: Phaser.GameObjects.GameObject) {
  const bomb = b as Phaser.Physics.Arcade.Image
    this.physics.pause()
    this.player?.setTint(0xff0000)
    this.player?.anims.play('turn')
    this.gameOver = true
  }

}


