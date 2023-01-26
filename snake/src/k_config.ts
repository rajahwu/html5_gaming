import kaboom from "kaboom";
const canvas = document.getElementById('k_canvas')

export const k = kaboom({
    width: 960,
    height: 540,
    canvas: canvas as HTMLCanvasElement,
    background: [7, 7, 7]
});

export default k;