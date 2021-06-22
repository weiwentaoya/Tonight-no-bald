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
    draw(){
        const {children} = this
        console.log(children);
        
        children.forEach(el=>{
            el.init()
            el.draw()
        })
    }
}