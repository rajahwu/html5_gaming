import './style.css'
import Phaser from 'phaser';
import phaser_config from './phaser_config';
import TitleScreen from './scenes/Game';
import Level from './scenes/Level'

new Phaser.Game(
  Object.assign(phaser_config, {
    scene: [TitleScreen, Level]
  })
);
