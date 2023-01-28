import './style.css'
import Phaser from 'phaser'
import config from './phaser_config'
// import Game from './scenes/Game'
import TechDungeon from './scenes/TechDungeon'

new Phaser.Game(
    Object.assign(config, {
        scene: [TechDungeon]
    })
)