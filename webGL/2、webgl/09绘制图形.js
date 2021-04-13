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
// const a_Position = gl.getAttribLocation(gl.program,'a_Position')

// gl.vertexAttrib3f(a_Position, 0, -0.5, 0)

const vertices = new Float32Array([
    0.0,0.1,
    -0.1,-0.1,
    0.1,-0.1,

    0.4,0.3,
    0.2,-0.1,
    0.6,-0.1,

])
// 创建一个空的缓冲区对象
const vertexBuffer = gl.createBuffer();
// 绑定缓冲区对象
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
// 往缓冲区内写入对象
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
const a_Position = gl.getAttribLocation(gl.program,'a_Position')
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false ,0, 0)
gl.enableVertexAttribArray(a_Position)

gl.drawArrays(gl.TRIANGLES, 0, 6)
