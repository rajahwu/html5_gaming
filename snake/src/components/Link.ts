import k from "../k_config"
import { PosComp, GameObj } from "kaboom"

export default function link() {
    const {
        vec2
    } = k

    let child: GameObj
    let isNew = true
    const nextPositon = vec2(0, 0)
    return {
        add(this: PosComp) {
            nextPositon.x = this.pos.x
            nextPositon.y = this.pos.y
        },
        getChild() {
            return child
        },
        setChild(c: GameObj) {
            child = c
        },
        moveUpdate(this: PosComp,  x:number, y:number,) {
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