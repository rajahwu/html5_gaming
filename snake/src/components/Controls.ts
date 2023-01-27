import k from "../k_config"
import type { GameObj } from 'kaboom'

export default function controls() {
    const {
        onKeyPress
    } = k
    let direction: string
    return {
        add(this:GameObj) {
            onKeyPress('left', () => {
                
                if (!this.movement) {
                    console.error('missing movement component')
                    return
                }
                if (direction !== 'right') {
                    this.movement.left()
                    this.use(sprite('snakeHeadLeft'))
                    direction = 'left'
                }
            })

            onKeyPress('right', () => {
                if (!this.movement) {
                    console.error('missing movement component')
                    return
                }

                if (direction !== 'left') {
                    this.movement.right()
                    this.use(sprite('snakeHeadRight'))
                    direction = 'right'
                }
            })

            onKeyPress('up', () => {
                if (!this.movement) {
                    console.error('missing movement component')
                    return
                }
                if (direction !== 'down') {
                    this.movement.up()
                    this.use(sprite('snakeHeadUp'))
                    direction = 'up'
                }
            })

            onKeyPress('down', () => {
                if (!this.movement) {
                    console.error('missing movement component')
                    return
                }
                if (direction !== 'up') {
                    this.movement.down()
                    this.use(sprite('snakeHeadDown'))
                    direction = 'down'
                }
            })

        }
    }
}