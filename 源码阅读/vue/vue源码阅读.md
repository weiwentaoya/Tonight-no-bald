# Vue源码阅读

<img src="https://cn.vuejs.org/images/lifecycle.png" alt="生命周期图示" style="zoom: 50%;" />

## 结构目录说明

- 源码中所有打包的配置：scripts/config.js
- 编译器：src/compiler
- 核心代码：src/core
  - 通用组件：src/core/components（KeepAlive）
  - 全局API：src/core/global-api（mixin、use...）
  - 构造函数：src/core/instance（Vue 构造函数）
  - 响应式相关：src/core/observer（Observer、Watcher、Dep、修改数组原型）
  - 全局函数定义：src/core/util（nextTick...）
  - 虚拟DOM：src/core/vdom
- 入口处：src/platforms/web (平台特有代码)



## 初始化流程

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
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```

### initMixin

```js
vm._self = vm
initLifecycle(vm) // 初始化生命周期
initEvents(vm) // 初始化事件
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')

if (vm.$options.el) {
  vm.$mount(vm.$options.el) // 执行了$mount方法
}
```



挂载_init方法中



## 入口

src/platforms/web

