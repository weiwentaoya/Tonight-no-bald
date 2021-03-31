const canvas = document.querySelector("#cvs");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
import {initShaders} from "./util/utils.js"
const gl = canvas.getContext('webgl')
//定义顶点着色器
const VertexShader =`
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main(){
        //定位
        gl_Position = a_Position;
        //大小
        gl_PointSize = a_PointSize;
    }
`
//定义片元着色器
const FramnebtShader = `
    void main(){
        gl_FragColor = vec4(1,1,0,1);
    }
`
// 初始化着色器

initShaders(gl, VertexShader,FramnebtShader)

gl.clearColor(0,0,0,1)



const a_points = [
    [ -0.5, 0, 0],
    [ 0.5, 0, 0],
]
function rand(points) {
    gl.clear(gl.COLOR_BUFFER_BIT)

    points.forEach((item,index)=>{
        const a_Position = gl.getAttribLocation(gl.program,'a_Position')
        const a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize')
        gl.vertexAttrib3f(a_Position,...item)
        gl.vertexAttrib1f(a_PointSize,index)
        gl.drawArrays(gl.POINTS, 0, 1)
    })
}
rand(a_points)

const {left, top, width, height} = canvas.getBoundingClientRect()
canvas.addEventListener('click',({clientX, clientY})=>{
    const [cssX, cssY] =[
        clientX-left,
        clientY-top
    ]
    const [xBaseCenter, yBaseCenter] = [cssX- width/2, -(cssY-height/2)]
    const [x, y] = [xBaseCenter/ (width/2), yBaseCenter/(height/2)]


    a_points.push([ x, y, 0])
    rand(a_points)
})