function proxy(vm, obj) {
    Object.keys(obj).forEach(key=>{
        Object.defineProperty(vm, key,{
            get(){
                return obj[key]
            },
            set(val){
                obj[key]= val
            }
        })
    })
}
class Vue {
    constructor(options){
        this.$options = options
        this.$el = document.querySelector(options.el)
        this.$data = options.data
        this.init()
    }
    init() {
        observe(this.$data)
        proxy(this, this.$data)
        new Compile(this, this.$el)
    }
}
function observe(obj) {
    if (typeof obj !== 'object'||obj===null) return
    Object.keys(obj).forEach(key=>{
        new Observe(obj, key, obj[key])
    })
}
class Observe{
    constructor(obj, key, value){
        if (Array.isArray(value)) {
            //数组操作
        }else{
            this.work(obj, key, value)
        }
    }
    work(obj,key,value){
        defineProperty(obj, key, value)
    }
}
function defineProperty(obj, key, value){
    observe(value)
    const dep = new Dep()
    Object.defineProperty(obj, key, {
        get(){
            Dep.target&&dep.add(Dep.target)
            return value
            
        },
        set(newVal){
            if (newVal !== value) {
                // console.log('set', newVal);
                observe(newVal)
                value = newVal
                dep.notify()
            }
        }
    })
}

class Compile{
    constructor(vm, el){
        this.$vm = vm
        this.$el = el
        this.compile(el)
    }
    isInterpolation(node) { //判断插值文本
        return node.nodeType === 3&& /\{\{(.*)\}\}/.test(node.textContent)
    }
    compile(el) {
        const childNodes = el.childNodes
        childNodes && Array.from(childNodes).forEach(el=>{
            if (this.isInterpolation(el)) {
                this.compileText(el, RegExp.$1)
            }else if (el.nodeType === 1) {
                this.compile(el)
                this.compileElement(el)
            }
        })
    }
    update(el, exp, funType){
        const fn = this[funType+'Update']
        fn&&fn(el, this.$vm[exp])

        new Watcher(this.$vm, exp, (val)=>{
            fn(el, val)
        })
    }

    compileElement(el){
        Array.from(el.attributes).forEach(attr=>{
            const attrName = attr.name
            const exp = attr.value
            if (attrName.startsWith('v-')) {
                const dir = attrName.slice(2)
                dir&&this[dir](el, exp)
            }
        })
    }
    compileText(el, exp){
        this.update(el, exp, 'text')
    }
    text(el, exp ){
        this.update(el, exp, 'text')
    }
    html(el, exp ){
        this.update(el, exp, 'html')
    }

    htmlUpdate(el, val){
        el.innerHTML = val
    }
    textUpdate(el, val){
        el.textContent = val
    }

    
}
class Dep{
    constructor(){
        this.Watchers = []
    }
    add(w){
        this.Watchers.push(w)
    }
    notify(){
        this.Watchers.forEach(w=>{
            w.update()
        })
    }
}
class Watcher {
    constructor(vm, key, updateFn){
        this.$vm = vm
        this.$key = key
        this.updateFn = updateFn
        Dep.target = this
        this.$vm[this.$key]
        Dep.target = null

    }
    update(){
        this.updateFn.call(this.$vm,this.$vm[this.$key])
    }
}