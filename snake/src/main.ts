import './style.css'
import k from './k_config'
import { Snake, GameOver } from './scenes'


loadSprite('snakeHeadUp', './src/sprites/snake_head/up.png')
loadSprite('snakeHeadDown', './src/sprites/snake_head/down.png')
loadSprite('snakeHeadLeft', './src/sprites/snake_head/left.png')
loadSprite('snakeHeadRight', './src/sprites/snake_head/right.png')
loadSprite('snakeBody', '../src/sprites/snake-body_32.png')

k.scene('snake', Snake)
k.scene('game-over', GameOver)

k.go('snake')