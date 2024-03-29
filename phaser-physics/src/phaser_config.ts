import Phaser from 'phaser';

export default {
    type: Phaser.AUTO,
    parent: 'game',
    backgroundColor: '#000000',
    scale: {
        width: 400,
        height: 500,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    }

} as Phaser.Types.Core.GameConfig