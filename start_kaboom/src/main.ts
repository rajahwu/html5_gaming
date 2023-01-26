import './style.css'
import k from './k_canvas'
// import HelloWorld from './scenes/HelloWorld'
// import Collisions from './scenes/Collisions'
import Animation from './scenes/Animation';
import level from './scenes/level';


loadSprite('tiles', './1bitplatformerpack/Tilemap/monochrome_tilemap_transparent_packed.png', {
  sliceX: 20,
  sliceY: 20,
  anims: {
    idle: { from: 300, to: 300 },
    run: { from: 301, to: 305 },
  }
});

scene('hello', () => {
  // Collisions()
  Animation()
  level()
})

k.go('hello')