import k from "../k_config"
import { movement, controls, link, spawn } from "../components"
import getRandomPosition from "../utils/getRandomPosition"

export default function Snake() {
    const {
        add,
        pos,
        // rect,
        color,
        origin,
        destroy,
        shake,
        text,
        sprite,
        go
    } = k

    let score = 0
    const scoreText = add([
        pos(2, 2),
        text(`score ${score}`),
        color(255, 255, 255)
    ])

    const spawner = add([
        spawn()
    ])

    let end = add([
        'head',
        pos(getRandomPosition()),
        sprite('snakeHeadLeft'),
        origin('center'),
        movement(),
        controls(),
        area(),
        link()
    ])

    spawner.spawn()

    onCollide('food', 'head', (food) => {
        destroy(food)
        shake(3)
        score += 10
        scoreText.text = `score ${score}`

        const newChild = add([
            'body',
            pos(end.pos.x, end.pos.y),
            sprite('snakeBody'),
            origin('center'),
            link(),
            area(),
            movement()
        ])

        end.setChild(newChild)
        end = newChild

        spawner.spawn()
    })

    onCollide('body', 'head', (body) => {
        if (body.isNew()) return
        go('game-over')
    })
}

