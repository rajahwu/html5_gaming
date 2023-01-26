import k from "../k_config"

export default function controls() {
    const {
        onKeyPress
    } = k

    return {
        add() {
            onKeyPress('left', () => {
                if (!this.movement) {
                    console.error('missing movement component')
                    return
                }
                this.movement.left()
            })

            onKeyPress('right', () => {
                if (!this.movement) {
                    console.error('missing movement component')
                    return
                }
                this.movement.right()
            })

            onKeyPress('up', () => {
                if (!this.movement) {
                    console.error('missing movement component')
                    return
                }
                this.movement.up()
            })

            onKeyPress('down', () => {
                if (!this.movement) {
                    console.error('missing movement component')
                    return
                }
                this.movement.down()
            })

        }
    }
}