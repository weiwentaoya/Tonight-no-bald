export default class Compose {
    constructor() {
        this.parent = null
        this.children = []
    }
    add(obj){
        obj.parent = this
        this.children.push(obj)
    }
    update(t){

        this.children.forEach(el=>{
            console.log(t);

            el.update(t)
        })
    }
}