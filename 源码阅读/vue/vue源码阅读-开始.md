# Vue源码阅读

<img src="https://cn.vuejs.org/images/lifecycle.png" alt="生命周期图示" style="zoom: 50%;" />

## 准备工作

1. 需要从github克隆项目到本地

2. 安装依赖

3. 在package.json中配置脚本 --sourcemap,开启映射

   ```js
   "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
   ```

4. 执行 npm run dev 

## 结构目录说明

- **benchmarks**                  性能、基准测试
- **dist**                        构建打包的输出目录
- **examples**                    案例目录
- **flow**                        flow 语法的类型声明
- **packages**          一些额外的包，比如：负责服务端渲染的包 vue-server-renderer、配合 vue-loader 使用的的 vue-template-compiler，还有 weex 相关的
  - **vue-server-renderer**
  - **vue-template-compiler**
  - **weex-template-compiler**
  - **weex-vue-framework**
- **scripts**                     所有的配置文件的存放位置，比如 rollup 的配置文件
- **src**                         vue 源码目录
  - **compiler**                编译器
  - **core**                    运行时的核心包
    - **components**          全局组件，比如 keep-alive
    - **config.js**           一些默认配置项
    - **global-api**          全局 API，比如熟悉的：Vue.use()、Vue.component() 等
    - **instance**            Vue 实例相关的，比如 Vue 构造函数就在这个目录下
    - **observer**            响应式原理
    - **util**                工具方法
    - **vdom**                虚拟 DOM 相关，比如熟悉的 patch 算法就在这儿
  - **platforms**               平台相关的编译器代码
    - **web**
    - **weex**
  - **server**                  服务端渲染相关
- **test**                        测试目录
- **types**                       TS 类型声明



------



## 初始化

### 入口

首先是需要Vue的入口函数，主要是两种方式：

vue入口函数的代码

1. 在执行`npm run dev`时后面有相关的配置参数

   ```js
   "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev",
   ```

   

   在配置文件中`-c  scripts/config.js` 表示配置文件为scripts/config.js

   `TARGET:web-full-dev` 表示打包方式为web-full-dev ，也指定了Vue的入口处所在位置

   ```js
   // Runtime+compiler development build (Browser) 
   { 
     'web-full-dev': 
     { 
       entry: resolve('web/entry-runtime-with-compiler.js'), // 入口 
       dest: resolve('dist/vue.js'),// 目标文件 
       format: 'umd', // 输出规范 
       env: 'development', 
       alias: { 
        he: './entity-decoder' 
       },
       banner, 
     },
   }
   ```

   通过配置文件找到不是构造函数所在处，还需要往上找

2. 写一个测试文件在new Vue处打断点

   这样的方式找到的是Vue的构造函数被定义的位置，

   ![image-20210917174224390](..images/vue/image-20210917174715626.png) ![image-20210917174715626](/Users/weiwentao/Library/Application Support/typora-user-images/image-20210917174715626.png)

   

/src/core/instance/index.js

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options) // 初始化流程执行了_init方法
}

initMixin(Vue) // 挂载_init方法
stateMixin(Vue) //实例方法初始化：$set、$delete、$watch
eventsMixin(Vue)	//事件相关：$on、$once、$off、$emit
lifecycleMixin(Vue) //生命周期：_update、$forceUpdate、$destroy
renderMixin(Vue) //渲染相关：$nextTick、_render
```

Vue初始化的时候只执行了_init方法，而这个\_init方法是在initMixin(Vue)中被定义挂载到Vue.prototype中

### _init

vue-dev/src/core/instance/init.js

```js
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // 
    vm._uid = uid++ //每个组件都会有一个_uid，且依次递增

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // 合并 options
    if (options && options._isComponent) {
      // 如果是子组件
      // 将一些属性添加到vm.$options中，优化快速查找，否则要去原形链中查找，
      // 优化内部组件实例化
      // 因为动态选项合并非常慢，而且没有
      // 内部组件选项需要特殊处理。
      initInternalComponent(vm, options)
    } else {
      // 根组件选项合并（比如全局组件）
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* 设置代理到vm._renderProxy*/
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
  	// 处理组件之间的关系，设置$parent、$root、$children、$refs
    initLifecycle(vm)
  	// 处理父组件传递的事件
    initEvents(vm)
  	// 处理插槽$slots、$scopedSlots添加$createElement、_c
    initRender(vm)
    // 执行生命周期钩子
    callHook(vm, 'beforeCreate')
    // 处理组件接受到的inject选项，遍历执行defineReactive
    initInjections(vm) // resolve injections before data/props
    // 初始化props、methods、data、computed、watch、
  	// 做数据响应式
    initState(vm)
    // 将组件的provide挂载到vm._provided
    initProvide(vm) // resolve provide after data/props
  	// 执行生命周期钩子
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) { //如果传入了el则会直接执行$mount方法
      vm.$mount(vm.$options.el)
    }
  }
```



挂载_init方法中除了初始化组件的一些配置外主要是执行下面的方法

- initLifecycle(vm) 初始化组件间的关系：添加$parent、$parent、$children、$refs
- initEvents(vm) 处理父组件传递的事件
- initRender(vm) 处理插槽，添加$slots、$scopedSlots、_c、$createElement
- callHook(vm, 'beforeCreate') 执行生命周期钩子
- initInjections(vm) 获取到组件接受的inject参数，并执行数据响应式
- initState(vm) 处理props、methods、computed、watch并执行data的响应式
- initProvide(vm) 将组件的provide挂载到vm._provided
-  callHook(vm, 'created')执行生命周期钩子
-   vm.$mount(vm.$options.el) 执行挂载

