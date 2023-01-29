import './style.css'
import Phaser from 'phaser'
import phaser_config from './phaser_config'
import Game from './scenes/Game'

new Phaser.Game(
  Object.assign(phaser_config, {
    scene: [Game]
  })
)
