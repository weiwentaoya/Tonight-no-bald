function proxy(vm) {
    Object.keys(vm.$data).forEach(key=>{
        Object.defineProperty(vm, key,{
            get(){
                return vm.$data[key]
            },
            set(val){
                vm.$data[key]= val
            }
        })
    })
    Object.keys(vm.$methods).forEach(key=>{
        console.log(key,vm.$methods[key]);
        
        Object.defineProperty(vm, key,{
            get(){
                return vm.$methods[key]
            },
            
        })
    })
}
class Vue {
    constructor(options){
        this.$options = options
        this.$el = document.querySelector(options.el)
        this.$data = options.data
        this.$methods = options.methods
        this.init()
    }
    init() {
        observe(this.$data)
        proxy(this)
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
        new Watcher(this.$vm, exp, function (val) {
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
            }else if(attrName.startsWith('@')){
                const type = attrName.slice(1)
                const fn = this.$vm[exp].bind(this.$vm)
                el.addEventListener(type,fn)
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
    model (el, exp ){
        this.update(el, exp, 'input')
        const fn =function (val) {
            this.$vm[exp] = val
        }.bind(this)
        el.addEventListener('input',function (e) {
            fn(e.target.value)
        })
    }
    inputUpdate(el, val){
        el.value = val
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
        vm[key]
        Dep.target = null

    }
    update(){
        this.updateFn(this.$vm[ this.$key])
    }
}