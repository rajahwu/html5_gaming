import k from "../k_config"

export default function link() {
    const {
        vec2
    } = k

    let child
    let isNew = true
    const nextPositon = vec2(0, 0)
    return {
        add() {
            nextPositon.x = this.pos.x
            nextPositon.y = this.pos.y
        },
        getChild() {
            return child
        },
        setChild(c) {
            child = c
        },
        moveUpdate(x, y) {
            const pos = nextPositon.clone()

            nextPositon.x = x
            nextPositon.y = y

            this.pos.x = pos.x
            this.pos.y = pos.y

            isNew = false

            if (!child) {
                return
            }

            child.moveUpdate(pos.x, pos.y)
        },
        isNew() {
            return isNew
        }

    }
}