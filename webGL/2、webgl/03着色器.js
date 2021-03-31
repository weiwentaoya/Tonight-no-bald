const canvas = document.querySelector("#cvs");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
import {initShaders} from "./util/utils.js"
const gl = canvas.getContext('webgl')
//定义顶点着色器
const VertexShader =`
    void main(){
        //定位
        gl_Position = vec4( 0, 0.5, 0, 1 );
        //大小
        gl_PointSize = 10.0;
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

gl.drawArrays(gl.POINTS, 0, 1)

// function initShaders(gl, vsSource, fsSource) {
//     // 创建程序对象
//     const program = gl.createProgram()
//     // 初始化顶点着色器和片元着色器
//     //gl.VERTEX_SHADER是顶点着色器类型
//     // gl.FRAGMENT_SHADER是片元着色器类型
//     const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
//     const framnebtShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
//     // 将顶点着色器对象装进程序对象中
//     gl.attachShader(program, vertexShader)
//     // 将片元着色器装进程序对象中
//     gl.attachShader(program, framnebtShader)
//     // webgl对象与程序对象建立连接
//     gl.linkProgram(program)
//     // 启动程序对象
//     gl.useProgram(program)
// }
// function loadShader(gl, type, source) {
//     // 根据着色器类型，建立着色器对象
//    const shader = gl.createShader(type)
//     //将着色器源文件传入着色器对象中
//    gl.shaderSource(shader, source)
//     //编译着色器对象
//    gl.compileShader(shader)
//    return shader
// }