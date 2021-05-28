export default class Sky{
    constructor(gl){
        this.gl =gl
        this.children = []
    }
    addPoly(poly){
        poly.gl = this.gl
        this.children.push(poly)
    }
    updatePoly(params){
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