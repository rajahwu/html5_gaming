import k from "../k_config";

export default function GameOver() {
    const {
        add,
        pos,
        text,
        color,
        origin,
        width,
        height,
        onKeyPress
    } = k

    add([
        pos(width() * 0.5, height() * 0.5),
        text('Game Over'),
        color(255, 0, 0),
        origin('center')
    ])

    onKeyPress('enter', () => {
        go('snake')
    })
}