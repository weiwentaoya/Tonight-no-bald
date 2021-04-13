export default class Sky {
    constructor(gl){
        this.gl=gl
        this.children = []
    }
    add(obj){
        obj.gl = this.gl
        this.children.push(obj)
    }
    updateVertices(params){
        this.children.forEach(el=>{
            el.updateVertices(params)
        })
    }
    draw(){
        this.children.forEach(el=>{
            el.init()
            el.draw()
        })
    }
}