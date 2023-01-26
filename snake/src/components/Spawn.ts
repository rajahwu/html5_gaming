import k from "../k_config";

import getRandomPosition from "../utils/getRandomPosition";

export default function spawn() {
    const {
        wait,
        add,
        pos,
        rect,
        color,
        origin
    } = k
    return {
        spawn() {
            wait(1, () => {
                add([
                    'food',
                    pos(getRandomPosition()),
                    rect(32, 32),
                    color(0, 0, 255),
                    origin('center'),
                    area()
                ])
            })
        }
    }
}