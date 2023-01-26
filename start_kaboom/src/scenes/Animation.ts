export default function Animation() {
    // TODO create player
    const player = add([
        sprite('tiles', {
            animSpeed: 1,
            // frame: 300
        }),
        pos(width() * 0.5, height() * 0.5),
        scale(1),
        body(),
        area()
    ])
    player.play('idle')
    player.onUpdate(() => camPos(player.pos))

    // TODO handle left and right key press
    onKeyDown('left', () => {
        player.play('run')
        player.move(-100, 0)
    })

    onKeyDown('right', () => {
        player.play('run')
        player.move(100, 0)
    })

    onKeyPress('space', () => {
        player.jump()
    })

    onKeyPress('up', () => {
        player.jump()
    })

    

    // TODO handle return to idle

}

