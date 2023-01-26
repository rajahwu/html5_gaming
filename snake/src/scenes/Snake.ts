import k from "../k_config"
import movement from "../components/Movement"
import controls from "../components/Controls"
import spawn from "../components/Spawn"
import link from "../components/Link"

export default function Snake() {
    const {
        add,
        pos,
        rect,
        color,
        origin,
        destroy,
        shake
    } = k

    const spawner = add([
        spawn()
    ])

   let end = add([
        'head',
        pos(16, 16),
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

     const newChild =  add([
            pos(end.pos.x, end.pos.y),
            rect(32, 32),
            color(0, 255, 0,),
            origin('center'),
            link()
        ])

        end.setChild(newChild)
        end = newChild

        spawner.spawn()
    })
}

