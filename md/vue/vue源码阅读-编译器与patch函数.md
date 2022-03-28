# 前言

这一篇我们从`new Watcher()`时传入的`updateComponent()`更新函数开始去探究Vue中的编译器以及patch函数中的对新旧节点的对比更新的实现

# 定义updateComponent

```js
// src/core/instance/lifecycle.js

// updateComponent方法是用虚拟DOM来生成生成真实DOM
// _render()函数是用来生成虚拟DOM， 在renderMixin中定义的_render
// _update()函数是用虚拟DOM来生成真实DOM，在lifeCycleMixin中定义的_update

let updateComponent = () => {
  vm._update(vm._render(), hydrating)
}
```

# VNode

vm._render()返回生成的VNode，VNode是在Vue中定义的一个普通对象，用来描述真实的DOM元素

```js
//  src/core/vdom/vnode.js

export default class VNode {

  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag //标签名称
    this.data = data //标签上的class attr 。。。
    this.children = children //子节点
    this.text = text //文本节点
    this.elm = elm // 对应的真实节点
    this.ns = undefined // 当前节点的命名空间
    this.context = context //组件作用域
    this.fnContext = undefined // 函数化组件上下文
    this.fnOptions = undefined // 函数化组件配置项
    this.fnScopeId = undefined // 函数化组件ScopeId
    this.key = data && data.key //key，diff过程提升性能
    this.componentOptions = componentOptions //通过vue组件生成的vnode对象，若是普通dom生成的vnode，为空
    this.componentInstance = undefined //当前组件实例
    this.parent = undefined //组件占位符节点
    this.raw = false //是否为原生节点
    this.isStatic = false //是否为静态节点
    this.isRootInsert = true //是否为根节点
    this.isComment = false //是否为注视
    this.isCloned = false // 是否为克隆节点
    this.isOnce = false // 是否为v-once的节点
    this.asyncFactory = asyncFactory // 异步工厂方法
    this.asyncMeta = undefined // 异步meta
    this.isAsyncPlaceholder = false // 是否为异步占位
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```

# 

# _render()

在_render()中其实只做一件事情，就是执行render()方法

```js
// src/core/instance/render.js

Vue.prototype._render = function (): VNode {
    const vm: Component = this
    const { render, _parentVnode } = vm.$options

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      )
    }

    //设置父节点。这允许渲染函数访问到父节点上的数据。
    vm.$vnode = _parentVnode
    // 渲染自己
    let vnode
    // 这里做了错误处理，可以捕获到发生的错误，真正执行的只是render()方法
    try {
      currentRenderingInstance = vm
      // 一般都会进来执行render()方法
      vnode = render.call(vm._renderProxy, vm.$createElement)
    } catch (e) {
      handleError(e, vm, `render`)
      // 返回错误的渲染结果，或以前的vnode，以防止渲染错误导致出现空白组件
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production' && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
        } catch (e) {
          handleError(e, vm, `renderError`)
          vnode = vm._vnode
        }
      } else {
        vnode = vm._vnode
      }
    } finally {
      currentRenderingInstance = null
    }
    // 如果允许返回的数组只包含一个节点
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0]
    }
    // 如果渲染函数出错，返回空vnode
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        )
      }
      vnode = createEmptyVNode()
    }
    // 设置父组件
    vnode.parent = _parentVnode
    return vnode
  }
```

而render()方法的定义我们需要回到入口处，在定义$mount方法的时候在vm.$options上挂载了render方法

# $mount

1. 判断不能挂载到body或者html标签上，需要使用普通元素
2. 如果没有render选项，获取编译模版
3. 通过编译模版获取到渲染函数render和静态渲染函数staticRenderFns，挂载到options
4. 执行mount()

```js
// src/platforms/web/entry-runtime-with-compiler.js

Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)

  // 不能挂载到body或者html标签上，需要使用普通元素
  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options
  // resolve template/el and convert to render function
  // 判断如果有render函数，不进行编译
  // 如果有template选项，获取innerHTML作为模版
  // 如果有el选项，获取outerHtml作为模版
  if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }
			// 如果有模版，则开始编译，通过编译模版得到渲染函数render和静态渲染函数staticRenderFns，挂载到options
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
  return mount.call(this, el, hydrating)
}
```

下面是寻找compileToFunctions方法定义的地方

```js
// src/platforms/web/compiler/index.js
const { compile, compileToFunctions } = createCompiler(baseOptions)
```

createCompileToFunctionFn

# createCompilerCreator -baseCompile

1. 执行createCompilerCreator()方法
2. 通过模版解析出抽象语法树
3. 优化抽象语法树，标记静态节点
4. 生成渲染函数

```js
// src/compiler/index.js
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // 将模版解析为抽象语法树，每个节点上都设置了元素的所有信息
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    // 优化抽象语法树
    // 这里主要是标记静态节点，被标记为静态节点后，在patch过程中就会被跳过，在vue3.0中会做的比较彻底
    optimize(ast, options)
  }
  // 从抽象语法树生成渲染函数
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    // code.render为动态渲染函数，将来执行的时候返回vnode
    staticRenderFns: code.staticRenderFns
  }
})
```

# createCompilerCreator - compile

1. 定义了compile函数
2. 执行baseCompile()方法，这里的baseCompile()方法为传入的第一个参数
3. 保存编译时发生的错误和提醒
4. 返回了compile和compileToFunctions

```js
// src/compiler/create-compiler.js
export function createCompilerCreator (baseCompile: Function): Function {
  return function createCompiler (baseOptions: CompilerOptions) {
    function compile (
      template: string,
      options?: CompilerOptions
    ): CompiledResult {
      // 这里删除了一部分不太重要的代码，这里的核心代码就是执行baseCompile()方法
      // baseCompile()方法为传入的第一个参数
      const compiled = baseCompile(template.trim(), finalOptions)
      if (process.env.NODE_ENV !== 'production') {
        detectErrors(compiled.ast, warn)
      }
      // 保存编译时发生的错误和提醒
      compiled.errors = errors
      compiled.tips = tips
      return compiled
    }

    return {
      compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}
```



# compileToFunctions

1. 检查缓存，如果有缓存，直接返回
2. 执行编译函数，得到结果
3. 处理编译期间的错误和提醒
4. 缓存编译的结果

```js
// src/compiler/to-function.js
export function createCompileToFunctionFn (compile: Function): Function {
  const cache = Object.create(null)

  return function compileToFunctions (
    template: string,
    options?: CompilerOptions,
    vm?: Component
  ): CompiledFunctionResult {
    options = extend({}, options)
    const warn = options.warn || baseWarn
    delete options.warn

    // 检查缓存，涂过油缓存直接返回缓存结果
    const key = options.delimiters
      ? String(options.delimiters) + template
      : template
    if (cache[key]) {
      return cache[key]
    }

    // 执行编译函数，得到编译结果
    const compiled = compile(template, options)

    // 检查编译时发生的错误和提醒
    if (process.env.NODE_ENV !== 'production') {
      if (compiled.errors && compiled.errors.length) {
        if (options.outputSourceRange) {
          compiled.errors.forEach(e => {
            warn(
              `Error compiling template:\n\n${e.msg}\n\n` +
              generateCodeFrame(template, e.start, e.end),
              vm
            )
          })
        } else {
          warn(
            `Error compiling template:\n\n${template}\n\n` +
            compiled.errors.map(e => `- ${e}`).join('\n') + '\n',
            vm
          )
        }
      }
      if (compiled.tips && compiled.tips.length) {
        if (options.outputSourceRange) {
          compiled.tips.forEach(e => tip(e.msg, vm))
        } else {
          compiled.tips.forEach(msg => tip(msg, vm))
        }
      }
    }

    // turn code into functions
    const res = {}
    const fnGenErrors = []
    res.render = createFunction(compiled.render, fnGenErrors)
    res.staticRenderFns = compiled.staticRenderFns.map(code => {
      return createFunction(code, fnGenErrors)
    })

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn(
          `Failed to generate render function:\n\n` +
          fnGenErrors.map(({ err, code }) => `${err.toString()} in\n\n${code}\n`).join('\n'),
          vm
        )
      }
    }
		// 添加编译结果到缓存中
    return (cache[key] = res)
  }
}
```



# _update

```js
// src/core/instance/lifecycle.js

Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this
  const prevEl = vm.$el
  const prevVnode = vm._vnode
  const restoreActiveInstance = setActiveInstance(vm)
  vm._vnode = vnode
  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode)
  }
  restoreActiveInstance()
  // update __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm
  }
  // if parent is an HOC, update its $el as well
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el
  }
  // updated hook is called by the scheduler to ensure that children are
  // updated in a parent's updated hook.
}
```

