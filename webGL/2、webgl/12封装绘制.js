const canvas = document.querySelector("#cvs");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
import {initShaders, getMousePosInWebgl} from "./util/utils.js"
import Poly from "./util/Poly.js"
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
    precision mediump float;
    uniform bool u_IsPOINTS ;
    void main(){
        if(u_IsPOINTS){
            float dist = distance(gl_PointCoord, vec2(0.5,0.5));
            if(dist<0.4){
                gl_FragColor = vec4(1, 1, 0, 1);
            }else{
                discard;
            }
        }else{
            gl_FragColor = vec4(1, 1, 0, 1);
        }
        
        
    }
`
gl.clearColor(0,0,0,1)
gl.clear(gl.COLOR_BUFFER_BIT)
initShaders(gl, VertexShader,FramnebtShader)
const poly = new Poly({
    gl,
    vertices: [0, 0.2],
    types:['POINTS','LINE_STRIP'],
    circleDot:true
})
poly.draw()
cvs.addEventListener('click',(event)=>{
    const {x,y} = getMousePosInWebgl(event, cvs)
    poly.addVertices(x,y)
    gl.clear(gl.COLOR_BUFFER_BIT)
    poly.draw()
})
