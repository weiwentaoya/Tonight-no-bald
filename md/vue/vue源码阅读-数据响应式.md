# 前言

在阅读响应式原理之前，我们需要先梳理一下整体的流程，对订阅发布模式有个简单的流程梳理，便于对后续的阅读有更深的理解

首先我们考虑，new Vue()都做了什么事情，从这里出发

![vue数据响应式流程](../images/vue数据响应式流程.png)

# $mount()

## 包装$mount()

1. 保存原有的$mount
2. 如果options参数内有render函数，直接执行保存的$mount方法，不经过下面流程
3. 没有render函数的话先去判断有没有template模版
4. 没有template的情况下去解析el中的内容
5. 当获取到template后通过compileToFunctions()方法获取render方法，挂载到options
6. 执行保存的$mount方法

```js
// src/platforms/web/entry-runtime-with-compiler.js

// 保存原先的$mount，包装一层函数,所以此处并不是$mount真正被定义的位置，但是我们先看其如何进行包装
const mount = Vue.prototype.$mount
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // 解析模板/el并转换为渲染函数
  // 当render函数不存在的话
  if (!options.render) {
    let template = options.template
    // 如果存在template模版
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          // 根据id获取内容
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
        // 如果存在nodeType，直接获取innerHTML内容
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      // 如果不存在template，存在el，就解析el获取template内容
      template = getOuterHTML(el)
    }
    // 如果经过上述处理，获取到template
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }
			// 调用compileToFunctions()方法，获取dender函数，挂载到options
      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  // 执行真正的$mount()方法
  return mount.call(this, el, hydrating)
}
```

## 定义$mount()

1. 挂载平台相关补丁，vue有两个平台，web和weex，web平台中是patch函数
2. 定义mount方法，执行了mountComponent()

```js
// src/platforms/web/runtime/index.js

// 挂载相关平台补丁
Vue.prototype.__patch__ = inBrowser ? patch : noop

// mount方法定义
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

```

## mountComponent

1. 如果$options中 没有render函数，则创建一个空的VNode
2. 执行生命周期钩子 `beforeMount`
3. 定义updateComponent更新函数
4. 创建观察者，传入updateComponent函数
5. 执行生命周期钩子 `mounted`

```js
// src/core/instance/lifecycle.js

export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  // 如果$options中 没有render函数，则render函数会被覆盖为一个用来创建 空的VNode 的函数
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        )
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        )
      }
    }
  }
  // 生命周期钩子beforeMount
  callHook(vm, 'beforeMount')
	// 定义updateComponent更新函数，会被传出入Watcher中
  // _render()函数是用来生成虚拟DOM
  // _update()函数是用虚拟DOM来生成真实DOM
  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      const name = vm._name
      const id = vm._uid
      const startTag = `vue-perf-start:${id}`
      const endTag = `vue-perf-end:${id}`

      mark(startTag)
      const vnode = vm._render()
      mark(endTag)
      measure(`vue ${name} render`, startTag, endTag)

      mark(startTag)
      vm._update(vnode, hydrating)
      mark(endTag)
      measure(`vue ${name} patch`, startTag, endTag)
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  // 创建观察者
  new Watcher(vm, updateComponent, noop, {
    before () {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```



# initState

**响应式原理的入口**

1. 初始化props
2. 初始化methods
3. 初始化data
4. 初始化computed
5. 初始化watch

```js
// src/core/instance/state.js

export function initState (vm: Component) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props) //初始化props
  if (opts.methods) initMethods(vm, opts.methods) //初始化methods
  if (opts.data) {
    initData(vm) //初始化data
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)// 初始化computed
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)// 初始化watch
  }
}
```



## initProps

1. 用数组缓存props中的所有key
2. 遍历props获取默认值
3. 设置数据响应式
4. 把当前key代理到vm上

```js
// src/core/instance/state.js

function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  //缓存propskey，以便以后的props更新可以使用数组进行迭代 
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  // 如果是根实例 props应该被转换
  if (!isRoot) {
    toggleObserving(false)
  }
  // 遍历props
  for (const key in propsOptions) {
    //将当前key添加到数组中缓存
    keys.push(key)
    // 获取默认值 propsData[key]
    const value = validateProp(key, propsOptions, propsData, vm)
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      const hyphenatedKey = hyphenate(key)
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
          vm
        )
      }
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
            `overwritten whenever the parent component re-renders. ` +
            `Instead, use a data or computed property based on the prop's ` +
            `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
      // 设置数据响应式
      defineReactive(props, key, value)
    }
    // 把当前key代理到vm上
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}
```





## initMethods

1. 遍历methods校验所有的key必须是数组
2. 校验当前key不能和props以及Vue实例上的已有方法重叠
3. 将当前方法挂载到vm实例

```js
// src/core/instance/state.js

function initMethods (vm: Component, methods: Object) {
  const props = vm.$options.props
  for (const key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      // 校验 methoss[key]，必须是一个函数
      if (typeof methods[key] !== 'function') {
        warn(
          `Method "${key}" has type "${typeof methods[key]}" in the component definition. ` +
          `Did you reference the function correctly?`,
          vm
        )
      }
      //校验 methods 中的 key 不能和 props 中的 key 相同
      if (props && hasOwn(props, key)) {
        warn(
          `Method "${key}" has already been defined as a prop.`,
          vm
        )
      }
      //校验 methos 中的 key 与 Vue 实例上已有的方法重叠
      if ((key in vm) && isReserved(key)) {
        warn(
          `Method "${key}" conflicts with an existing Vue instance method. ` +
          `Avoid defining component methods that start with _ or $.`
        )
      }
    }
    // 将当前key放到vm实例上，得到vm[key] = methods[key]
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}
```

## initData

1. 获取data数据
2. 校验data返回的是否是对象
3. 遍历data中的数据，校验是否和methods、props中的key是否相同
4. 给data做数据响应式

```js
// src/core/instance/state.js

function initData (vm: Component) {
  let data = vm.$options.data
  // 获取data数据，data是一个函数，返回一个对象
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  // 判断data函数应该返回一个对象
  if (!isPlainObject(data)) {
    data = {}
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    )
  }
  // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      // 校验当前key不能等于methods中的key
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    // 校验当前key不能等于props中的key
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      // 把当前key代理到vm上
      proxy(vm, `_data`, key)
    }
  }
  // 设置数据响应式
  observe(data, true /* asRootData */)
}
```

### observe

1. 判断传入value是否为object格式，不是直接return
2. 判断是否已经是响应式数据，若是，直接返回实例
3. 执行new Observer(value)给数据做数据响应式处理

```js
//  src/core/observer/index.js

/**
*尝试为一个值创建一个观察者实例，
*如果创建成功，返回新的观察者，
*如果已经有观察者返回已有的观察者。
*/
export function observe (value: any, asRootData: ?boolean): Observer | void {
  // 如果value不是对象的话直接return
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob: Observer | void
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    // 如果原型上有 '__ob__'表示已经是响应式
    //如果已有观察者实例，则返回
    ob = value.__ob__
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    // 如果是不是响应式的数据
    // 添加新的观察者实例
    // ⚠️注意，这里的value只有类型是对象时才会进行数据响应式处理
    ob = new Observer(value)
  }
  if (asRootData && ob) {
    ob.vmCount++
  }
  return ob
}
```

### Observer

1. 定义一个dep大管家
2. 给传入的数据增加`__ob__`
3. 如果是数组的情况，增强数组中会修改数组本身的七个方法，让其可以被拦截
4. 如果value是数组，遍历数组，如果数组中有对象，使其执行observe()方法
5. 执行walk()方法，遍历所有的key值，执行响应式处理的defineReactive()方法

```js
//  src/core/observer/index.js

export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    //实例化一个dep管家
    this.dep = new Dep()
    this.vmCount = 0
    // 定义一个属性。 给value添加__ob__
    def(value, '__ob__', this)
    if (Array.isArray(value)) {//如果value为数组
      // 如果有__proto__，浏览器兼容性问题，一些低版本浏览器是没有__proto__属性的
      if (hasProto) {
        // 覆盖数组的原型
        protoAugment(value, arrayMethods)
      } else {
        // 给数组定义七个方法
        copyAugment(value, arrayMethods, arrayKeys)
      }
      // 设置数组响应式,如果数组中的项为对象
      this.observeArray(value)
    } else {
      // 处理响应式
      this.walk(value)
    }
  }

 	/**
  * value type为Object情况情况下
  * 遍历所有属性并将它们转换为
  * getter / setter。
  */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * 观察Array项的列表。
   */
  observeArray (items: Array<any>) {
    //遍历数组，把每个key在传入处理响应式的observe方法中，如果数组元素中有项为对象的数据做响应式处理
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}
```

### defineReactive

1. 创建一个dep小管家，一个key对应一个dep，用于收集该字段的依赖
2. 判断属性若不可修改或不可删除则不能做响应式处理
3. 记录 getter 和 setter，获取val
4. 递归执行observe，让深层的元素也做数据响应式
5. 响应式核心内容：get和set
   1. get拦截对key的读取操作
      1. 执行getter或者返回val
      2. Dep.target 是类的静态属性（Watcher）
      3. dep.depend()为依赖收集，在dep中添加watcher，也在watcher中添加dep
      4. 如果有嵌套对象(也是观察者对象),也做依赖收集
      5. 如果是数组，触发数组的响应式
      6. 为数组项为对象的项添加依赖
   2. set拦截对key的写入操作
      1. 如果新值和旧值相同，则不需要出发更新，直接return
      2. 如果只有getter没有setter则为只读属性，直接return
      3. 执行setter，设置新值
      4. 对新值做响应式处理
      5. 执行dep中的通知更新

```js
//  src/core/observer/index.js

//定义对象上的响应性属性。
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  // 一个key对应一个dep
  const dep = new Dep()
	// 获取对应的属性描述
  const property = Object.getOwnPropertyDescriptor(obj, key)
  // 如果该属性为不可被改变或者不可被删除 直接return
  if (property && property.configurable === false) {
    return
  }

  // 记录 getter 和 setter，获取 val 值
  const getter = property && property.get
  const setter = property && property.set
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key]
  }

  let childOb = !shallow && observe(val)//递归调用
  // 定义响应式数据
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 如果有getter就执行，否则直接返回val
      const value = getter ? getter.call(obj) : val
      //Dep.target 是类的静态属性（Watcher）   static target: ?Watcher;
      if (Dep.target) {//如果有Watcher
        // 这里执行的是Watcher的depend，收集依赖
        // 把dep添加到Watcher
        dep.depend()
        // 这里是表示存在子ob
        // 将子ob也添加到Watcher
        if (childOb) {
          childOb.dep.depend()
          // 如果是数组
          if (Array.isArray(value)) {
            // 处理数组选项为对象的情况，对其进行依赖收集，因为前面的处理都没有办法对数组项为对象的元素进行依赖收集
            dependArray(value)
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      // 获取到旧val
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      // 如果新的val与旧的val相同，直接return ，不触发响应式
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      // 只读属性，直接return ，不触发响应式
      if (getter && !setter) return
      
      if (setter) {
        setter.call(obj, newVal)// 设置值
      } else {
        val = newVal
      }
      // 将新值也做响应式处理
      childOb = !shallow && observe(newVal)
      // 通知依赖更新
      dep.notify()
    }
  })
}


/**
*当数组被访问时，收集数组元素的依赖项，因为
*不能像属性getter那样截取数组元素访问。
*/
function dependArray (value: Array<any>) {
  for ( let i = 0; i < value.length; i++) {
    let e = value[i]
    e && e.__ob__ && e.__ob__.dep.depend()
    if (Array.isArray(e)) {
      dependArray(e)
    }
  }
}
```

### 数组响应式

1. 缓存原生方法
2. 执行def()，拦截 arrayMethods.method 的访问
3. 执行原生方法
4. 新值元素设置数据响应式

```js
// src/core/observer/array.js

/*
 * 定义arrayMethods对象，用于增强Array原型
 * 动态访问Array原型的方法
 */

import { def } from '../util/index'

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * 拦截以上七个方法并触发事件
 */
methodsToPatch.forEach(function (method) {
  // 缓存原生方法
  const original = arrayProto[method]
  // def 就是 Object.defineProperty，拦截 arrayMethods.method 的访问
  def(arrayMethods, method, function mutator (...args) {
    // 执行原生方法
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    // 'push'、'unshift'、'splice'三个方法会新增元素
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    // 新值元素设置数据响应式
    if (inserted) ob.observeArray(inserted)
    // 通知更新
    ob.dep.notify()
    return result
  })
})

```

### 

#### protoAugment

设置target._proto__ = src

把数组对象的原型设置为arrayMethods

```js
//  src/core/observer/index.js

/**
* 通过拦截增加目标对象或数组
*/
function protoAugment (target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src// src为增强的原型方法，支持数据响应式
  /* eslint-enable no-proto */
}
```

#### copyAugment

```js
//  src/core/observer/index.js

/**
* 通过定义来增加目标对象或数组
* 隐藏属性。
* 原型链使用__proto__（非标准属性）
* 因为有的浏览器对象是没有__proto__这个属性的，兼容性问题
*/
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
```

#### def

将增强的七个数组方法，覆盖到数组的原型上，由此拦截了原有的数组方法，也增强了响应式能力

`Object.defineProperty()` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```js
// src/core/util/lang.js

export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
```

### 

### Dep

```js
// src/core/observer/dep.js

/*
* 一个dep对应一个obj.key
* 在数据响应式的get时会收集依赖，每个dep所对应的watcher
* 在数据响应式set时会通知dep中的watcher去执行update更新方法
*/
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }
	// dep中添加watcher
  addSub (sub: Watcher) {
    this.subs.push(sub)
  }
// dep中删除watcher
  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }
	// watcher中添加dep
  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
	// 通知更新，遍历执行每个watcher的update
  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null
const targetStack = []
// 在需要进行依赖收集的时候调用，设置 Dep.target = watcher
export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}
// 依赖收集结束调用，设置 Dep.target = null
export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
```

### Watcher



```js
//  src/core/observer/watcher.js

/**
 * 一个组件一个watcher或者一个表达式一个watcher
 * 当数据更新时会被触发，或者访问访问 this.computedProperty 时也会触发 watcher
 */
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function, //这里为更新函数 updateComponent
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) {
      vm._watcher = this
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn // 把updateComponent赋值到getter
    } else {
      this.getter = parsePath(expOrFn)
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * 评估getter，并重新收集依赖项。
   * 这里执行了new Watcher时传入第二个参数updateComponent方法
   * 当触发更新时，会执行render函数 会再次做依赖收集
   */
  get () {
    // 开启依赖收集，在依赖收集时会判断Dep中的target
    pushTarget(this)
    let value
    const vm = this.vm
    try {
      // 这里执行updateComponent方法
      value = this.getter.call(vm, vm)
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value)
      }
      //删除Dep中的target，关闭依赖收集
      popTarget()
      this.cleanupDeps()
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  addDep (dep: Dep) {
    const id = dep.id
    // 如果dep有则不重复添加
    if (!this.newDepIds.has(id)) {
      // 先保存id，每次进来会判重
      this.newDepIds.add(id)
      // 添加dep
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        // 同样添加watcher自己到dep
        dep.addSub(this)
      }
    }
  }

  /**
   * 清理依赖项
   */
  cleanupDeps () {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }

  /**
   * 当依赖项改变时将被执行。dep.notify()
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      //computed会有固定参数lazy，会走这里
      this.dirty = true //这里是缓存的开关，保证每一次更新computed中的函数只执行一次
    } else if (this.sync) {
      // 这里是同步更新。。。
      this.run()
    } else {
      // 这里是一般情况下的更新逻辑，让watcher进入队列，通过nexttick执行
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run () {
    if (this.active) {
      const value = this.get()//调用get
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) {
          // 如果是自己定义的watcher，会执行传递的第三个参数，会调函数
          try {
            this.cb.call(this.vm, value, oldValue)
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * 这只适用于懒执行computed。
   * dirty的作用就是让computed再一次循环中只执行一次，每次页面更新就会设置为true
   */
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}

```



## initComputed

这里主要关键点是`const computedWatcherOptions = { lazy: true }`

表示当前Watcher为懒执行，由Watcher的dirty控制，每次页面更新只执行一次，而methods中的方法，在页面更新中，被访问几次就会执行几次

```js
// src/core/instance/state.js

const computedWatcherOptions = { lazy: true }
function initComputed (vm: Component, computed: Object) {
  // $flow-disable-line
  const watchers = vm._computedWatchers = Object.create(null)
  // computed properties are just getters during SSR
  const isSSR = isServerRendering()
	//遍历computed选项
  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        `Getter is missing for computed property "${key}".`,
        vm
      )
    }

    if (!isSSR) {
      // 为computed属性创建 Watcher.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions // 默认为懒执行不可更改的{ lazy: true }
      )
    }

    //这里也是代理操作，让其可以直接用this.computedKey的方式去访问
    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(`The computed property "${key}" is already defined in data.`, vm)
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(`The computed property "${key}" is already defined as a prop.`, vm)
      }
    }
  }
}
```

## initWatch

```js
// src/core/instance/state.js

function initWatch (vm: Component, watch: Object) {
  //遍历watch选项
  //调用createWatcher
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      //如果是数组，遍历数组
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}

function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
    // handler是对象的话，获取选项的值
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
    //handler是字符串的话就是methods中的一个方法
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}


Vue.prototype.$watch = function (
    expOrFn: string | Function,
    cb: any,
    options?: Object
  ): Function {
    const vm: Component = this
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {}
    options.user = true
  	//创建Watcher
    const watcher = new Watcher(vm, expOrFn, cb, options)
    //如果设置了immediate选项，则立即执行一次回调函数
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value)
      } catch (error) {
        handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
      }
    }
  //unwatchFn用于解除监听
    return function unwatchFn () {
      watcher.teardown()
    }
  }
```

## proxy

代理，主要用于设置props、data、computed中的每个key代理到vm实例上

允许以`this.key`的方式来访问配置项中的参数和方法

例如：当我们用`this.dataKey`去访问`vm.data.dataKey`就是因为这里设置了代理

```js
// src/core/instance/state.js

export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  // 设置 把key代理到target上
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

