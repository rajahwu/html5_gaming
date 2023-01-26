import k from "../k_config"
import movement from "../components/Movement"
import controls from "../components/Controls"
import spawn from "../components/Spawn"
import link from "../components/Link"
import getRandomPosition from "../utils/getRandomPosition"

export default function Snake() {
    const {
        add,
        pos,
        rect,
        color,
        origin,
        destroy,
        shake,
        text,
        go
    } = k

    let score = 0
    const scoreText = add([
        pos(2,2),
        text(`score ${score}`),
        color(255,255,255)
    ])

    const spawner = add([
        spawn()
    ])

    let end = add([
        'head',
        pos(getRandomPosition()),
        rect(32, 32),
        color(0, 255, 0,),
        origin('center'),
        movement(),
        controls(),
        area(),
        link()
    ])

    spawner.spawn()

    onCollide('head', 'food', (head, food) => {
        destroy(food)
        shake(3)
        score += 10
        scoreText.text = `score ${score}`

        const newChild = add([
            'body',
            pos(end.pos.x, end.pos.y),
            rect(32, 32),
            color(0, 255, 0,),
            origin('center'),
            link(),
            area()
        ])

        end.setChild(newChild)
        end = newChild

        spawner.spawn()
    })

    onCollide('head', 'body', (head, body) => {
        if(body.isNew()) return
        go('game-over')
    })
}

