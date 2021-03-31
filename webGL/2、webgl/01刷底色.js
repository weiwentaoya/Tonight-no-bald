const canvas = document.querySelector("#cvs");

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gl = canvas.getContext('webgl')
gl.clearColor(0,0,0,1)
gl.clear(gl.COLOR_BUFFER_BIT);

const rgbaColor = "rgba(255,100,0,1)"
function cssColor2webglColor(rgbaColor) {
    const reg = RegExp(/\((.*)\)/)
    const rgbaStr = reg.exec(rgbaColor)[1]
    const rgba = rgbaStr.split(',').map(n=>parseInt(n))
    return [
        rgba[0] / 255,
        rgba[1] / 255,
        rgba[2] / 255,
        rgba[3] ,
    ]
}
const webglColor =  cssColor2webglColor(rgbaColor)
gl.clearColor(...webglColor)
gl.clear(gl.COLOR_BUFFER_BIT);