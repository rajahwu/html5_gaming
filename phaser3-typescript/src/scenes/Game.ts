import Phaser from 'phaser';

export default class HelloPhaser extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  static platforms
  static stars
  static bombs
  static player
  static cursors
  static score = 0
  static gameOver = false
  static scoreText

  preload() {
    this.load.image('sky', '../../public/assets/sky.png');
    this.load.image('ground', '../../public/assets/platform.png');
    this.load.image('star', '../../public/assets/star.png');
    this.load.image('bomb', '../../public/assets/bomb.png');
    this.load.spritesheet('dude', '../../public/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.add.image(400, 300, 'sky');

    HelloPhaser.platforms = this.physics.add.staticGroup();

    HelloPhaser.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    HelloPhaser.platforms.create(600, 400, 'ground')
    HelloPhaser.platforms.create(50, 250, 'ground')
    HelloPhaser.platforms.create(750, 220, 'ground')

    HelloPhaser.player = this.physics.add.sprite(100, 450, 'dude')

    HelloPhaser.player.setBounce(0.2)
    HelloPhaser.player.setCollideWorldBounds(true);

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

    HelloPhaser.cursors = this.input.keyboard.createCursorKeys()

    HelloPhaser.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    })

    HelloPhaser.stars.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })

    HelloPhaser.bombs = this.physics.add.group()
    this.physics.add.collider(HelloPhaser.bombs, HelloPhaser.platforms);
    this.physics.add.collider(HelloPhaser.player, HelloPhaser.bombs, this.hitbomb, null, this)

    HelloPhaser.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' })

    this.physics.add.collider(HelloPhaser.player, HelloPhaser.platforms)
    this.physics.add.collider(HelloPhaser.stars, HelloPhaser.platforms)

    this.physics.add.overlap(HelloPhaser.player, HelloPhaser.stars, this.collectStar, null, this)
  }

  update() {
    if (HelloPhaser.gameOver) {
      return
    }
    if (HelloPhaser.cursors.left.isDown) {
      HelloPhaser.player.setVelocityX(-160);

      HelloPhaser.player.anims.play('left', true);
    }
    else if (HelloPhaser.cursors.right.isDown) {
      HelloPhaser.player.setVelocityX(160);

      HelloPhaser.player.anims.play('right', true);
    }
    else {
      HelloPhaser.player.setVelocityX(0);

      HelloPhaser.player.anims.play('turn');
    }

    if (HelloPhaser.cursors.up.isDown && HelloPhaser.player.body.touching.down) {
      HelloPhaser.player.setVelocityY(-330);
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true)

    HelloPhaser.score += 10
    HelloPhaser.scoreText.setText(`Score: ${HelloPhaser.score}`)

    if (HelloPhaser.stars.countActive(true) === 0) {
      HelloPhaser.stars.children.iterate(function (child) {
        child.enableBody(true, child.x, 0, true, true)
      })
      let x = (HelloPhaser.player.x < 400) ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400)

      let bomb = HelloPhaser.bombs.create(x, 16, 'bomb')
      bomb.setBounce(1)
      bomb.setCollideWorldBounds(true)
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
      bomb.allowGravity = false
    }
  }

  hitbomb(player, bomb) {
    this.physics.pause()
    HelloPhaser.player.setTint(0xff0000)
    HelloPhaser.player.anims.play('turn')
    HelloPhaser.gameOver = true
  }

}


