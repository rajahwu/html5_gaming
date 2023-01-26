export default function Collisions(): void {
    //TODO Add a player
    const player = add([
        rect(32,64),
        pos(width() * 0.5, 0),
        area(),
        body(),
    ])
    console.log({player})
    // ? Add a platform
    add([
        rect(100, 50),
        pos(width() * 0.5, height() * 0.5),
        area(),
        solid()
    ])

    //TODO Add a floor
    add([
        rect(width(), 50),
        pos(0, height()),
        area(),
        solid()
    ])
}
