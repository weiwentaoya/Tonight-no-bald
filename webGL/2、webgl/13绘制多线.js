const canvas = document.querySelector("#cvs");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
import {initShaders, getMousePosInWebgl} from "./util/utils.js"
import Poly from "./util/Poly.js"
import Sky from "./util/Sky.js"
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
// 创建一个夜空实例
const sky = new Sky(gl)
let poly = null

// poly.draw()

cvs.oncontextmenu = function () {
    return false
}
cvs.addEventListener('mousemove',(event)=>{
    if (poly) {
        const {x,y} = getMousePosInWebgl(event, cvs)
        poly.setVertices(poly.count-1, x, y)
        render()
    }
})
cvs.addEventListener('mousedown',(event)=>{
    console.log(event.button);
    
    if (event.button === 2) {
        popVertices()
    }else{
        const {x,y} = getMousePosInWebgl(event, cvs)
        if (poly) {
            poly.addVertices(x,y)
        }else{
            createPoly(x,y)
        }
    }
    render()
})
function popVertices() {
    poly.popVertices()
    poly=null
}
function createPoly(x,y) {
    poly = new Poly({
        gl,
        vertices: [x,y,x,y],
        types:['POINTS','LINE_STRIP'],
        circleDot:true
    })
    sky.add(poly)
}
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT)
    sky.draw()
}
