const canvas = document.querySelector("#cvs");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
import {initShaders} from "./util/utils.js"
const gl = canvas.getContext('webgl')
//定义顶点着色器
const VertexShader =`
    attribute vec4 a_Position;
    uniform vec4 u_Translation;
    // float angle = radians(5.0);
    uniform float u_sinB;
    uniform float u_cosB;
    uniform float u_scale;
    void main(){
        //定位
        // gl_Position = vec4(vec3(a_Position)*u_scale, 1.0);
        gl_Position.x = (a_Position.x*u_cosB-a_Position.y*u_sinB)*u_scale;
        gl_Position.y = (a_Position.y*u_cosB+a_Position.x*u_sinB)*u_scale+u_Translation.y;
        gl_Position.z = a_Position.z*u_scale;
        gl_Position.w = 1.0;
        // gl_Position = a_Position+u_Translation;
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



const vertices = new Float32Array([
    0.0,0.1,
    -0.2,-0.1,
    0.1,-0.2,
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

const u_Translation = gl.getUniformLocation(gl.program,'u_Translation')
const u_sinB = gl.getUniformLocation(gl.program,'u_sinB')
const u_cosB = gl.getUniformLocation(gl.program,'u_cosB')
const u_scale = gl.getUniformLocation(gl.program,'u_scale')



let y = 0
!(function ani(){
    y+=0.01
    if (y>1.3) {
        y=-1
    }
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniform4f(u_Translation, 0,y,0,0)
    gl.uniform1f(u_sinB, Math.sin(y))
    gl.uniform1f(u_cosB, Math.cos(y))
    gl.uniform1f(u_scale, Math.abs(y)+0.5)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    requestAnimationFrame(ani)
})()