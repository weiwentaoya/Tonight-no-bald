# Vue源码阅读

![生命周期图示)](https://cn.vuejs.org/images/lifecycle.png)

## 源码中所有打包的配置

code/vue-dev/scripts/config.js

## 入口文件

code/vue-dev/src/platforms/web/entry-runtime-with-compiler.js

- $mount下优先级为.     render > template > el
- 扩展$mount方法
- 在这里可以通过compileToFunctions编译方法拿到 render渲染函数, staticRenderFns静态渲染函数

code/vue-dev/src/platforms/web/runtime/index.js

- __patch__布丁函数

- 在Vue实例上挂载$mount方法
- mountComponent挂载执行

code/vue-dev/src/core/index.js

- 执行了initGlobalAPI方法，挂载了全局方法

code/vue-dev/src/core/global-api/index.js

- 全局方法入口

## Vue实例

code/vue-dev/src/core/instance/index.js 

- vue构造函数，并且执行了被混入的_init()方法
- initMixin   code/vue-dev/src/core/instance/init.js
  - mergeOptions 合并用户传入的选项和默认的选项
  - 核心的初始化逻辑
  - 声明周期的钩子beforeCreate、created
  - 初始化事件，data，事件，组件属性等
- stateMixin
- eventsMixin
- lifecycleMixin
- renderMixin