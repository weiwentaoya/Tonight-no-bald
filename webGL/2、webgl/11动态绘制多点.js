const canvas = document.querySelector("#cvs");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
import {initShaders} from "./util/utils.js"
const gl = canvas.getContext('webgl')
//定义顶点着色器
const VertexShader =`
    attribute vec4 a_Position;
    void main(){
        //定位
        gl_Position = a_Position;
        //大小
        gl_PointSize = 20.0;
    }
`
//定义片元着色器
const FramnebtShader = `
    void main(){
        gl_FragColor = vec4(1, 1, 0, 1);
    }
`
gl.clearColor(0,0,0,1)
gl.clear(gl.COLOR_BUFFER_BIT)
initShaders(gl, VertexShader,FramnebtShader)
const a_Position = gl.getAttribLocation(gl.program,'a_Position')
const vertices= [0,0.2]

const vertexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(a_Position)
gl.drawArrays(gl.POINTS , 0, 1)

setTimeout(()=>{
    vertices.push(-0.2,-0.2)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.drawArrays(gl.POINTS , 0, 2)
},1000)

setTimeout(()=>{
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS , 0, 2)
    gl.drawArrays(gl.LINE_STRIP , 0, 2)
},2000)
