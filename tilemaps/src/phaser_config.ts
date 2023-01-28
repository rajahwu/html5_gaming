import Phaser from "phaser";

export default {
    type: Phaser.AUTO,
    parent: 'game-container',
    backgroundColor: '#000',
    scale: {
        width: 400,
        height: 250,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
    
} as Phaser.Types.Core.GameConfig