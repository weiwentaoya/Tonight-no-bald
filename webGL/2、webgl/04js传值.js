const canvas = document.querySelector("#cvs");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
import {initShaders} from "./util/utils.js"
const gl = canvas.getContext('webgl')
//定义顶点着色器
// vec4( 0, 0.5, 0, 1 )
const VertexShader =`
    attribute vec4 a_Position;
    void main(){
        //定位
        gl_Position = a_Position;
        //大小
        gl_PointSize = 50.0;
    }
`
//定义片元着色器
const FramnebtShader = `
    void main(){
        gl_FragColor = vec4(1,1,0,1);
    }
`
// 初始化着色器

gl.clearColor(0,0,0,1)
gl.clear(gl.COLOR_BUFFER_BIT)
initShaders(gl, VertexShader,FramnebtShader)

const a_Position = gl.getAttribLocation(gl.program,'a_Position')
// gl.vertexAttrib3f(a_Position, 0, 0.5, 0)

// gl.drawArrays(gl.POINTS, 0, 1)

const {left, top, width, height} = canvas.getBoundingClientRect()
console.log( width, height);

canvas.addEventListener('click',({clientX, clientY})=>{
    const [cssX, cssY] =[
        clientX-left,
        clientY-top
    ]
    const [xBaseCenter, yBaseCenter] = [cssX- width/2, -(cssY-height/2)]
    const [x, y] = [xBaseCenter/ (width/2), yBaseCenter/(height/2)]


    gl.vertexAttrib2f(a_Position, x, y)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, 1)
})