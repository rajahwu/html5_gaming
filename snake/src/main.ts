import './style.css'
import k from './k_config'
import Snake from './scenes/Snake'
import GameOver from './scenes/GameOver'




k.scene('snake', Snake)
k.scene('game-over', GameOver)




k.go('snake')