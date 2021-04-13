const canvas = document.querySelector("#cvs");
canvas.width = window.innerWidth
canvas.height = window.innerHeight
import {initShaders, getMousePosInWebgl,glToCssPos} from "./util/utils.js"
import Poly from "./util/Poly.js"
import Sky from "./util/Sky.js"
import Compose from "./util/Compose.js"
import Track from "./util/Track.js"
const gl = canvas.getContext('webgl')
gl.enable(gl.BLEND) //开启片元的颜色合成功能
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)//设置片元的合成方式
//定义顶点着色器
const VertexShader =`
    attribute vec4 a_Attr;
    varying float v_Alpha;
    void main(){
        //定位
        gl_Position = vec4(a_Attr.x, a_Attr.y, 0.0, 1.0);
        //大小
        gl_PointSize = a_Attr.z;
        v_Alpha = a_Attr.w;
    }
`
//定义片元着色器
const FramnebtShader = `
    precision mediump float;
    uniform bool u_IsPOINTS ;
    varying float v_Alpha;
    void main(){
        if(u_IsPOINTS){
            float dist = distance(gl_PointCoord, vec2(0.5,0.5));
            if(dist<0.4){
                gl_FragColor = vec4(0.87, 0.91, 1, v_Alpha);
            }else{
                discard;
            }
        }else{
            gl_FragColor = vec4(0.87, 0.91, 1, v_Alpha);
        }
        
        
    }
`
gl.clearColor(0,0,0,0.7)
gl.clear(gl.COLOR_BUFFER_BIT)
initShaders(gl, VertexShader,FramnebtShader)
// 创建一个夜空实例
const sky = new Sky(gl)
const compose = new Compose()
let poly = null
let point = null

cvs.oncontextmenu = function () {
    return false
}


cvs.addEventListener('mousedown',(event)=>{
    if (event.button === 2) {
        poly&&popVertices()
    }else{
        const {x,y} = getMousePosInWebgl(event, cvs)
        if (poly) {
            addVertices(x,y)
        }else{
            createPoly(x,y)
        }
    }
    render()
})
function addVertices(x,y) {
    const {geoData} = poly
    if (point) {
        geoData[geoData.length-1] = point
    }
    let obj={x,y,pointSize: random(),alpha:1}
    geoData.push(obj)
    crtTrack(obj)
    // poly.addVertices(x,y)
}
cvs.addEventListener('mousemove',(event)=>{
    const {x,y} = getMousePosInWebgl(event, cvs)
    point = haverPoint(x,y)
    if (point) {
        cvs.style.cursor = 'pointer'
    }else{
        cvs.style.cursor = 'default'
    }
    if (poly) {
        const obj = poly.geoData[poly.geoData.length-1]
        obj.x=x
        obj.y=y
    }
})
function haverPoint(mx,my){
    for (const { geoData } of sky.children) {
        for (const obj of geoData) {
            if (poly && obj === poly.geoData[poly.geoData.length-1]) {
                continue
            }
            const delta = {
                x: mx - obj.x,
                y: my - obj.y,
            }
            const {x,y} = glToCssPos(delta,cvs)
            const dist =x*x+y*y
            if (dist<100) {
                return obj
            }
        }
    }
    return null
}

function popVertices() {
    poly.geoData.pop()
    compose.children.pop()
    poly=null
}
function createPoly(x,y) {
    
    let o1 = point?point:{x,y,pointSize: random(),alpha:1}
    const o2= {x,y,pointSize: random(),alpha:1}
    poly = new Poly({
        gl,
        size:4,
        attrName:'a_Attr',
        geoData:[o1,o2],
        types:['POINTS','LINE_STRIP'],
        circleDot:true
    })
    
    sky.add(poly)
    crtTrack(o1)
    crtTrack(o2)
}
function crtTrack(obj) {
    const {pointSize} = obj
    const track = new Track(obj);
    track.start = new Date();
    track.timelen = 3000;
    track.loop = true
    track.keyMap = new Map([
        [
            'pointSize',
            [
                [500, pointSize], 
                [1000, 0], 
                [1500, pointSize]
            ]
        ],
        [
            'alpha',
            [
                [500, 1], 
                [1000, 0], 
                [1500, 1]
            ]
        ],
    ])

    compose.add(track)
}

function random() {
    return Math.random()*8+3
}
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT)
    sky.draw()
}

!(function ani(){
    compose.update(new Date())
    
    sky.updateVertices(['x','y','pointSize','alpha'])
    render()
    requestAnimationFrame(ani)
})()