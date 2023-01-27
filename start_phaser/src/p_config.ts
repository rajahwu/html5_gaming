import Phaser from "phaser";
import { preload, create } from "./game";

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
}

 const game = new Phaser.Game(config)

 export default game