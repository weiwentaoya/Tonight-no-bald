export default class Compose{
    constructor(){
        this.parent = null
        this.child = []
    }
    add(obj){
        obj. parent = this
        this.child.push(obj)
    }
    update(t){
        this.child.forEach(obj=>obj.update(t))
    }
}