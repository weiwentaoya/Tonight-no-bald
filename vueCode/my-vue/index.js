
function defineReactive(obj, key , value) {
    observe(value)
    const dep = new Dep()
    Object.defineProperty(obj,key,{
        get(){
            console.log('get:', value);
            if (Dep.target) {
                dep.pushWatch(Dep.target)
            }
            return value
        },
        set(newVal){
            if (newVal!==value) {
                console.log('set:', newVal);
                observe(newVal)
                value = newVal
                dep.notice()
            }
        }
        
    })
}

function observe(obj) {
    if (typeof obj === 'object' ) {
        new Observer(obj)
    }
}
function proxy(vm) {
    Object.keys(vm.$data).forEach(el=>{
        Object.defineProperty(vm,el,{
            get(){
                return vm.$data[el]
            },
            set(v){
                vm.$data[el]=v
            }
        })
    })
    Object.keys(vm.$methods).forEach(el=>{
        Object.defineProperty(vm,el,{
            get(){
                return vm.$methods[el]
            },
            
        })
    })
    
}
// 框架的构造函数
class Vue{
    constructor(option){
        this.$option = option
        this.$el = option.el
        this.$data = option.data()
        this.$methods = option.methods
        observe(this.$data)
        proxy(this)
        new Compile(this.$el, this)
    }
}
// 执行数据相应化
// 每一个响应式对象，伴生一个Observer实例，区分数组和对象
class Observer{
    constructor(obj){
        this.walk(obj)
    }
    walk(obj){
        Object.keys(obj).forEach(key=>{
            defineReactive(obj,key,obj[key])
        })
    }
}
// 编译模版，初始化视图，收集依赖（更新函数，创建watcher）
class Compile{
    constructor(el, vm){
        this.$el = document.querySelector(el)
        this.$vm = vm
        if (this.$el) {
            this.compile(this.$el)
        }
    }
    isElement(el){
        return el.nodeType === 1
    }
    isText(el){
        return el.nodeType === 3 && /\{\{(.*)\}\}/.test(el.textContent)
    }
    compile(el){
        el.childNodes.forEach(el=>{
            if (this.isElement(el)) {
                // console.log('节点标签',Array.from(el.attributes));
                Array.from(el.attributes).forEach(key=>{
                    const name = key.name
                    const value = key.value
                    if (name.startsWith('v-')) {
                        this[name.substr(2)](el,value)
                        
                    }else if(name.startsWith('@')){
                        this.addMethod(el,name.substr(1),this.$vm[value])
                    }
                })
            }else if (this.isText(el)){
                this.initText(el)
            }
            if (el.childNodes) {
                this.compile(el)
            }
        })
        
    }
    addMethod(el, type, method){
        el.addEventListener(type,method.bind(this.$vm))
    }
    update(el, type, key){
        // 初始化
        const fn = this[`${type}Update`]
        fn&&fn(el,this.$vm[key])

        new Watcher(el, this.$vm, key, (el,val)=>{
            fn&&fn(el,val)
        })
    }
    text(el,key){
        this.update(el,'text',key)
    }
    textUpdate = (el,value)=>{
        el.textContent =value
    }
    html(el,value){
        this.update(el,'html',value)
    }
    htmlUpdate(el,value){
        el.innerHTML = value
    }
    initText(el){
        this.update(el,'text',RegExp.$1)
    }
    model(el,key){
        this.update(el,'model',key)
        this.addMethod(el, 'input',(el)=>{
            this.$vm[key] = el.target.value
        })
    }
    modelUpdate(el,value){
        el.value = value
        
    }
    
}

// 执行更新函数
class Watcher {
    constructor(el, vm, key, updateFn){
        this.$el = el
        this.$vm = vm
        this.$key = key
        this.updateFn = updateFn

        Dep.target = this
        this.$vm[this.$key]
        Dep.target = null
    }
    update(){
        this.updateFn.call(this.$vm, this.$el, this.$vm[this.$key])
    }
}
// 管理多个Watcher,执行批量更新
class Dep{
    constructor(){
        this.WatcherS = []
    }
    pushWatch(watch){
        this.WatcherS.push(watch)
    }
    notice(){
        this.WatcherS.forEach(watch=>watch.update())
    }
}