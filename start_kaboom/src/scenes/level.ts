const level1 = [
    '                                     ',
    '                                     ',
    '                                     ',
    '                       ========      ',
    '                                     ',
    '                                     ',
    '                                     ',
    '                                     ',
    '                                     ',
    '                                     ',
    '          ========                   ',
    '                                     ',
    '                                     ',
    '^                 ^                  ',
    '=====================================',
]

export default function level() {
    addLevel(level1, {
        width: 16,
        height: 16,
        "=": () => [
            sprite('tiles', {frame: 65}),
            area(),
            solid()
        ],
        "^": () => [
            sprite('tiles', {frame: 55})
        ]
    })
}
