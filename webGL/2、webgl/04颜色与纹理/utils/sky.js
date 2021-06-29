export default class Sky{
    constructor(gl){
        this.gl =gl
        this.children = []
    }
    add(obj){
        const {gl} = this
        obj.gl = gl
        this.children.push(obj)
    }
    update(){
        const {children} = this
        children.forEach(el=>{
            el.updateGeoData()
        })
    }
    draw(){
        const {children} = this
        children.forEach(el=>{
            el.init()
            el.draw()
        })
    }
}