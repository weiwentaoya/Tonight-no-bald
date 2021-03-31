const canvas = document.querySelector("#cvs");
canvas.width = window.innerWidth
canvas.height = window.innerHeight

import { Color } from "https://cdn.bootcdn.net/ajax/libs/three.js/r126/three.module.js"


const gl = canvas.getContext('webgl')
const rgbaColor = "rgba(255,100,0,1)"
const color = new Color(rgbaColor)
gl.clearColor(color.r,color.g,color.b,1)
gl.clear(gl.COLOR_BUFFER_BIT);
!(function ani() {
    color.offsetHSL(0.001, 0, 0)
    gl.clearColor(color.r,color.g,color.b,1)
    gl.clear(gl.COLOR_BUFFER_BIT);
    requestAnimationFrame(ani)
})()
