import { Vector3,Spherical,Matrix4 } from 'https://unpkg.com/three/build/three.module.js';
const pvMatrix=new Matrix4()
const attr = ()=>({
    camera: null,
    dom: null,
    dragStart: new Vector3,
    dragEnd: new Vector3,
    state: 'none',
    mouseButtons: new Map([
        [2, 'pan'],
        [0, 'rotate']
    ]),
    panOffset : new Vector3,
    spherical : new Spherical,
    target: new Vector3(0,0,-2.5),
    zoomScale: 0.95,
    screenSpacePanning: true
})
export default class OrbitControls{
    constructor(options){
        Object.assign(this, attr(), options )
        this.init()
    }
    init(){
        const {camera,dom} = this
        if (!camera||!dom) return
        this.initSpherical()
        this.bindEvent()
    }
    bindEvent(){
        const {dom} = this
        dom.addEventListener('contextmenu',this.onContextMenu.bind(this))
        dom.addEventListener('mousedown',this.onMousedown.bind(this))
        dom.addEventListener('mouseup',this.onMouseup.bind(this))
        dom.addEventListener('mousemove',this.onMousemove.bind(this))
        dom.addEventListener('mousewheel',this.onMousewheel.bind(this))
        this.update();
    }
    onContextMenu(event){
        event.preventDefault();
    }
    onMousedown({clientX, clientY, button}){
        const {dragStart,mouseButtons} = this
        dragStart.set(clientX, clientY)
        this.state = mouseButtons.get(button)
    }
    onMouseup(){
        this.state = 'none'
    }
    onMousemove({clientX, clientY}){
        const {dragStart,dragEnd,state} = this
        dragEnd.set(clientX, clientY)
        switch (state) {
            case 'pan':
                this.pan(dragEnd.clone().sub(dragStart))
                break;
            case 'rotate':
                this.rotate(dragEnd.clone().sub(dragStart))
                break;
            default:
                break;
        }
        dragStart.copy(dragEnd)
    }
    pan({x,y}){
        const {fov,position,aspect} = this.camera;
        const {clientHeight, clientWidth} = this.dom;
        const ratioH = y/clientHeight
        const ratioW = x/clientWidth
        const L = position.clone().sub(this.target).length()
        const H = Math.tan(fov/2*180)*L
        const W = H * aspect
        const distanceLeft =W*ratioH
        const distanceHeight = H * ratioW

        const mx = new Vector3().setFromMatrixColumn(this.camera.matrix, 0)
        const my = new Vector3()
        if (this.screenSpacePanning) {
            my.setFromMatrixColumn(this.camera.matrix, 1)
        }else{
            my.crossVectors(this.camera.up, mx)
        }
        const vx = mx.clone().multiplyScalar(-distanceHeight)
        const vy = my.clone().multiplyScalar(distanceLeft)
        this.panOffset.copy(vx.add(vy))
        this.update()
    }
    rotate(){

    }
    onMousewheel({deltaY}){
        const {camera, target, zoomScale} = this
        
        if (deltaY>0) {
            // 向下变小0.95
            // this.camera.position.lerp(target, 1 - zoomScale)
            this.camera.zoom *= zoomScale
        }else{
            // 向上变大1.05
            // this.camera.position.lerp(target, 1 - 1/zoomScale)
            this.camera.zoom *= 1/zoomScale
        }
        this.camera.updateProjectionMatrix()
        this.update()
    }
    update(){
        
        const {
            camera,
            target,
            spherical,
            panOffset
        } = this
        camera.position.add(panOffset)
        target.add(panOffset)

        const rotateOffset = new Vector3()
        rotateOffset.setFromSpherical(spherical)

        camera.position.copy(
            target.clone().add(rotateOffset)
        )

        camera.lookAt(target)
        camera.updateWorldMatrix(true)
        this.initSpherical()
    }
    getPvMatrix(){
        const {camera} = this
        return pvMatrix.multiplyMatrices(
            camera.projectionMatrix,
            camera.matrixWorldInverse
        )
    }
    initSpherical(){
        const {spherical,camera,target} = this
        spherical.setFromVector3(
            camera.position.clone().sub(target)
        )
    }
}