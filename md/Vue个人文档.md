# Vue个人文档



## MVVM

View.   <==ViewModel==> Model

- 数据响应式  
  - Object.defineProperty()
- 模版引擎
  - 插值： {{}}
  - 指令： v-bind、v-on、v-model、v-for、v-if
- 渲染
  - 模版=>vdom=>dom





## vue组件化

提高开发效率、方便重复使用、简化调试步骤、提升项目可维护性、便于多人协同开发

------

### 通信方式

#### vuex

#### props

#### $emit/$on

#### Event bus

1、通过在vue实例挂载一个**$bus**

2、组件间可通过**$bus**传递接受参数

#### $parent

事件的派发和监听通常只需要借助一个都能访问到的组件，比如相同的**父组件**

#### $children

父组件可以通过$children访问子组件实现父子通信，

this.$children可以获取到当前组件的所有子组件（数组形式，也可用下标访问this.$children[0]）

⚠️ 如果有异步组件、动态组件 不一定会保证访问顺序，不建议使用

#### $root

事件的派发和监听通常只需要借助一个都能访问到的组件，比如相同的**根组件**

#### $refs

可以直接访问到指定ref的子组件或元素

#### $attrs/$listeners

父组件绑定的参数，子组件没有用props声明的，会以键值对的方式放在$attrs里

$attrs包含了父作用域中不作为**prop**被识别(且获取)的绑定(class和style 除外)。当一个组件没有任何prop时，$attrs会包含所有父作用域的绑定(class和style 除外)，并且可通过v-bind="$attrs"传入内部组件,                         v-bind="$attrs"类似于结构赋值,把$attrs中的所有值又依次传入下一级组件中常用语跨层级的传递参数

$listeners同理$attrs，但是传递的是**事件**

#### Provide/inject

在隔多代传递参数时需要用Provide/inject（不是响应式，但是可以传递对象）

Provide==》data

inject==》props

#### 插槽

slot元素作为承载分发内容的出口,v-slot:名称

匿名插槽：没有名称默认为 v-slot:default

具名插槽 ：在有具体名称时需要接受  **<slot name="名称"></slot>**

作用域插槽： 父组件可通过插槽使用子组件的参数

### el-form

#### FormInput

```vue
<template>
    <div>
        <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
        <!-- v-bind="$attrs" 展开没有被props接受的参数，比如: placeholder -->
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props:{
            value:{
                type: String,
                default: ''
            },
            type:{
                type: String,
                default: 'text'
            }
        },
        methods:{
            onInput(e){
                // 在组件上使用v-model时会自动注册$on
                this.$emit('input', e.target.value)
                this.$parent.$emit('validator')
            }
        }
    }
</script>

```

#### FormItem

```vue
<template>
    <div>
        <label v-if="label">{{label}}</label>
        <slot></slot>
        <div class="error">{{error}}</div>
    </div>
</template>

<script>
    import AsyncValidator from 'async-validator';
    export default {
        inject: ['elForm'],
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String,
            },
        },
        data() {
            return {
                error: ''
            }
        },
        mounted(){
            this.$on('validator',()=>{
                this.validator()
            })
        },
        methods: {
            validator() {
                //验证当前项
                const value = this.elForm.model[this.prop]
                const rule = this.elForm.rules[this.prop]
                const descriptor = {};
                descriptor[this.prop] = rule
                const model = {};
                model[this.prop] = value;
                const validator = new AsyncValidator(descriptor);
                return validator.validate(model, error=>{
                    console.log(error);
                    if (error) {
                        this.error = error[0].message
                    }else{
                        this.error = ''
                    }
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
.error{
    color: #ff1100;
}
</style>
```

#### Form

```vue
<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        provide(){
            return {
                elForm: this
            }
        },
        props: {
            model: {
                type: Object,
                required: true
            },
            rules: {
                type: Object,
            },
        },
        methods: {
            validate(cb) {
                //源码里这里用的是element-ui自己实现的dispatch将每个子组件收集起来
                //src/mixins/emitter.js
                //this.dispatch('ElForm', 'el.form.addField', [this]);
                const promises =this.$children.filter(el=>el.prop).map(el=>el.validator())
                Promise.all(
                    promises
                ).then(()=>{
                    cb(true)
                }).catch(()=>{
                    cb(false)
                })
            }
        },
    }
</script>

```

#### 使用

```vue
<template>
    <div>
        <p>{{msg}}</p>
        <Form :model="userForm" :rules="rules" ref="userFormRef">
            <FormItem label="用户名" prop="userName">
                <FormInput v-model="userForm.userName" placeholder="请输入用户名"/>
            </FormItem>
            <FormItem label="密码" prop="passWord">
                <FormInput v-model="userForm.passWord" placeholder="请输入密码"/>
            </FormItem>
            <FormItem>
                <button @click="submit">提交</button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import FormInput from "@/components/form/FormInput.vue"
    import FormItem from "@/components/form/FormItem.vue"
    import Form from "@/components/form/Form.vue"
    export default {
        components:{
            FormInput,
            FormItem,
            Form,
        },
        data(){
            return{
                userForm:{
                    userName: 'userName',
                    passWord: 'passWord',
                },
                rules:{
                    userName: [
                        { required: true, message: '请输入用户名称'},
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
                    ],
                    passWord: [
                        { required: true, message: '请输入密码'},
                    ],
                },
                msg: 'hello'
            }
        },
        methods: {
            submit() {
                this.$refs.userFormRef.validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        alert('error submit!!');
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
```

### 创建vue组件的方式

#### vue中rander的h函数

```js
 const vm = new Vue({
     render: h => h(Component, { props })
 }).$mount();
```

#### Vue.extend

https://cn.vuejs.org/v2/api/#Vue-extend

Vue.extend执行返回的是Vue._init 实例，如果要往组件中传递参数，可在new 实例的时候传递propsData

 ```js
new contr({propsData: props }).$mount()
 ```

源码中接受参数的时候接受了两个参数

src/core/instance/state.js

```js
const propsData = vm.$options.propsData || {}
const props = vm._props = {}
```



```js
var Profile = Vue.extend({
  template: '<p>{{bar}} </p>',
  data: function () {
    return {
      bar: 'bar',
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上(可为空元素)。
new Profile().$mount('#mount-point')
```

#### Vue.component

https://cn.vuejs.org/v2/guide/components.html

```js
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

#### Vue.component 使用模板

```vue
<template id="temp1">
    <div>
        <h1>好用，有代码提示快捷键</h1>
    </div>
</template>

Vue.component("com3",{
   template : '#temp1' 
})
```

## VueRouter

思路：

---

1、注册两个全局组件'router-link','router-view', 

2、'router-view' 组件根据当前路由hash从整个路由表中获取到当前所对应的component渲染

​	如何在注册组件的时候拿到路由表

3、让当前路由hash变成响应式数据，添加路由监听，有变化的时候同时渲染内容

```js
//   /src/main.js
import Vue from "vue";
import App from "./App.vue";
import router from "./my-router";
import store from "./store";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
```



```js
//   /src/router/index.js
import Vue from "vue";
import VueRouter from "./vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);  //use执行的是install方法，在这里是没有routes路由表的

const routes = []
const router = new VueRouter({ //new执行的是VueRouter实例方法
  mode: "history",
  routes
});

export default router;
```

```js
//   /src/router/vue-router.js
let _Vue;
export default class VueRouter{
    constructor(option){
       //执行顺序1、Vue.use(VueRouter);2、new VueRouter();3、new Vue();
       //由于install优先于constructor先执行，但是要拿到当前的实例，采用的方法是混入，在install中混入将当前实例挂载到组件原型，将来的某一时间去执行
        this.$option=option
        //获取到当前路由hash，通过defineReactive让数据成为响应式数据挂载到VueRouter实例
        const initCourrent = window.location.hash.split('#').pop()||'/'
        _Vue.util.defineReactive(this,'_route',initCourrent)
       // 添加路由监听，和路由加载
        window,addEventListener('hashchange',this.HashChange.bind(this))
        window,addEventListener('load',this.HashChange.bind(this))
    }
    HashChange(){
        this._route=window.location.hash.split('#').pop()
    }
    static install(Vue){
        _Vue = Vue
        _Vue.mixin({ //由于无法拿到路由实例，所以通过混入的方式，把VueRouter挂载到当前的组件
            beforeCreate(){
  //这里的this是组件实例，$options是new Vue时传递的参数，其中有router选项，就是VueRouter实例
  //在这里把VueRouter实例挂载到当前的组件，但是在install方法执行的时候VueRouter实例还没有，所以放在混入中，将来当前组件生成的时候再去执行这里的操作
  //当组件生成之前去判断有没有router这个选项（只有在根实例的时候才有）
                if (this.$options.router) {
                    Vue.prototype.$router= this.$options.router
                }
            }
        })
        _Vue.component('router-link', {
            props:{
                to:{
                    type: String
                }
            },
            render(h){
                return h('a',{attrs:{href: `#${this.to}`}},  this.$slots.default)
            },
        })
        _Vue.component('router-view', {
            render(h){
                const routes = this.$router.$option.routes;
                const comp = routes.find(route=>route.path===this.$router._route)
                return h(comp.component)
            },
        })
    }
}
```

以上完成vue router的基本功能，但是只限于一级路由的情况，如果出现多级路由则不能满足,接下来完成多级路由

​	继续以上思路

1. 设置一个保存路由的响应式数组matched

2. 递归路由表，获取到对应当前路由的matched数组

   例如：

   ```js
   url: http://localhost:8080/#/link/info
   matched:["【/link】所对应的组件","【/link/info】所对应的组件"]
   ```

   以上内容matched【0】匹配到一级路由，matched【1】匹配到二级路由，由此在展示的时候通过当前组件的深度获取matched匹配路由的深度

3. 标记当前<router-view>组件，获取当前路由深度，(路由深度的判断就是递归找组件的父组件，如果父组件中有被标记为<router-view>组件，则当前组件深度➕1，递归结束为止)

```js
//   /src/router/vue-router.js
let _Vue;
export default class VueRouter{
    constructor(option){
        this.$option=option
        this.current = '/'
       //1、由于路由会出现多级情况（自路由）首先设置一个保存路由的响应式数组matched
        _Vue.util.defineReactive(this,'matched',[])        
        window,addEventListener('hashchange',this.HashChange.bind(this))
        window,addEventListener('load',this.HashChange.bind(this))

    }
    match(routes){
        //3、递归路由表，获取到对应当前路由的matched数组
        routes.forEach(route=>{
            if (this.current ==='/' && route.path==='/') {
                this.matched.push(route)
            }
            if (route.path !== '/' && this.current.indexOf(route.path) > -1) {
                this.matched.push(route)
            }
            if (route.children) {
                this.match(route.children);
            }
        })
    }
    HashChange(){
        this.current = window.location.hash.split('#').pop()
        this.matched=[]
        this.match(this.$option.routes)
        //2、在路由加载或改变的时候清除matched数组，并让其重新去匹配
    }
    static install(Vue){
        _Vue = Vue
        _Vue.mixin({
            beforeCreate(){
                if (this.$options.router) {
                    Vue.prototype.$router= this.$options.router
                }
            }
        })
        Vue.component('router-link', {
            props:{
                to:{
                    type: String
                }
            },
            render(h){
                return h('a',{attrs:{href: `#${this.to}`}},  this.$slots.default)
            },
        })
        Vue.component('router-view', {
            render(h){
                let depth = 0
                //4、标记当前的router-view组件
                this.$vnode.data.routerView = true
                let parent = this.$parent
                while (parent) {
                   if (parent.$vnode&&parent.$vnode.data&&parent.$vnode.data.routerView) {
                       //递归获取到当前组件的深度depth++
                       depth++
                   }   
                   parent = parent.$parent
                }
                return h(this.$router.matched[depth]?.component||null)
            },
        })
        
    }
}
```



## VueX

src/store/index.js

```js
import Vue from "vue";
import Vuex from "./my-vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state){
      state.count++
    }
  },
  actions: {
    add({commit}) {
      setTimeout(() => {
        commit('add')
      }, 1000);
    }
  },
  getters:{
    doubleCount: store=>store.count*2
  },
  modules: {}
});

```

src/store/my-vuex.js

```js
let _Vue
class Store{
    constructor(option){
        this._vm = new _Vue({
            data:{
                //将传入的state借用Vue实例的data属性，转换为响应式数据，$$将其隐藏
                $$state:option.state
            }
        })
      	//保存mutations和actions，在调用的时候执行相应的函数，注意⚠️：防止this指向问题,这里要把将要执行函数的this指向Store，下面是源码中的写法，直接bind(this)也是可以的
        this._mutations = option.mutations
        this._actions = option.actions
        const store = this
        const { dispatch, commit } = this
        this.dispatch = function boundDispatch (type, payload) {
            return dispatch.call(store, type, payload)
        }
        this.commit = function boundCommit (type, payload, options) {
            return commit.call(store, type, payload, options)
        }
        this.getters ={}
        //获取到所有的getters将其遍历，用Object.defineProperty绑定到预先准备的getters空对象中，获取值的时候去执行getters中的函数
        Object.keys(option.getters).forEach(gett=>{
            Object.defineProperty(
                store.getters,
                gett,
                {
                    get(){ return option.getters[gett](store.state)} 
                }
            )
        })
    }
    get state(){
        //获取的时候直接返回
        return this._vm._data.$$state
    }
    set state(v){
        //不可被重新赋值，这里会报错
        console.log('set error');
    }
    commit(type,payload){
        this._mutations[type](this.state, payload)
    }
    dispatch(type,payload){
        return this._actions[type](this,payload)
    }
}
function install(Vue) {
    _Vue=Vue
    _Vue.mixin({
        beforeCreate(){
            if (this.$options.store) {
                _Vue.prototype.$store = this.$options.store
            }
        }
    })
}
export default {Store,install}
```

## Vue

简单实现vue的流程，差不多是vue1.0的样子，主要是为了理解整个过程。

1.  new Vue() ⾸先执⾏初始化，对data做响应式处理
2. **Compile** 编译模版，初始化视图，解析指令v-xxx、{{}}
3. **Watcher**定义一个更新函数和Watcher，将来数据变化时Watcher回调用更新函数
4. 添加订阅者，将当前Watcher添加到对应key所对应的dep中
5. 数据劫持到数据的变化，执行当前key所对应的dep中的所有Watcher重的更新函数

```js

function defineReactive(obj, key , value) {
    observe(value)
  	//5. dep为收集者，在get被触发时，判断有没有Wathcer实例，有则添加到当前dep中
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
              	//6.每次数据被改变时去更新当前key所对应的所有收集者中保存的所有更新函数
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
// 执行数据相应化
// 每一个响应式对象，伴生一个Observer实例，区分数组和对象
class Observer{
    constructor(obj){
        this.wark(obj)
    }
    wark(obj){
        Object.keys(obj).forEach(key=>{
            defineReactive(obj,key,obj[key])
        })
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
// 1.框架构造函数，
//  observe(this.$data)数据响应式处理，
//  proxy(this) 代理data，methods中的值，（this.$data.xxx）=>（this.xxx）
//	new Compile(this.$el, this)编译模版，初始化视图，收集依赖（更新函数，创建watcher）
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

// 2.编译模版，初始化视图，收集依赖（更新函数，创建watcher）
class Compile{
    constructor(el, vm){
        this.$el = document.querySelector(el)
        this.$vm = vm
        if (this.$el) {
            this.compile(this.$el)
        }
    }
    isElement(el){
        //判断是否是元素节点
        return el.nodeType === 1
    }
    isText(el){
      	//判断是插值表达式
        return el.nodeType === 3 && /\{\{(.*)\}\}/.test(el.textContent)
    }
    compile(el){
        el.childNodes.forEach(el=>{
            if (this.isElement(el)) {
                Array.from(el.attributes).forEach(key=>{
                    const name = key.name
                    const value = key.value
                    if (name.startsWith('v-')) {
                      	//判断是否是指令
                        this[name.substr(2)](el,value)
                    }else if(name.startsWith('@')){
                      	//如果是@开头的指令，绑定事件
                        this.addMethod(el,name.substr(1),this.$vm[value])
                    }
                })
            }else if (this.isText(el)){
                this.initText(el)
            }
            if (el.childNodes) {
                //递归编译模版
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
				
        //3.添加一个Watcher,和更新函数
        new Watcher(el, this.$vm, key, (el,val)=>{
            fn&&fn(el,val)
        })
    }
    //v-text
    text(el,key){
        this.update(el,'text',key)
    }
    textUpdate = (el,value)=>{
        el.textContent =value
    }
    //v-html
    html(el,value){
        this.update(el,'html',value)
    }
    htmlUpdate(el,value){
        el.innerHTML = value
    }
    initText(el){
        this.update(el,'text',RegExp.$1)
    }
    //v-model
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

class Watcher {
    constructor(el, vm, key, updateFn){
        this.$el = el
        this.$vm = vm
        this.$key = key
        this.updateFn = updateFn

      	//4. 触发一次Object.defineProperty中的get方法，并且绑定当前的Watcher
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
```

