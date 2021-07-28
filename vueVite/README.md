

# vue3.0优化内容

1. 源码结构可读性更高
2. TypeScript：可在编码期间做类型检察坚持，有利于他去定义接口的类型，利于IDE对变量类型的推导
3. 性能优化：
   1. 引入tree-shaking的技术：依赖ES2015模块语法的静态解构（即import和export）通过编译阶段的静态分析，找到没有引入的模块并打上标记
   2.  数据劫持优化 Object.defineProperty=>Proxy ：真正访问到的内部对象才会变成响应式，而不是无脑递归，这样无疑在很大程度上提升了性能
4. 编译优化：
   1. Block Tree：一个基于动态节点指令切割的嵌套区块，每个区块内部的节点结构是固定的，每个区块只需要一个Array来追踪自身包含的动态节点。借助Block Tree，vue3.0将vnode更新性能由模块整体大小相关提升为与动态内容的数量相关

5. Composition API
   1. 优化逻辑组织：当使用Options API编写较复杂的组件时，相对时非常分散的，而Composition API可以将某个逻辑关注点相关的代码全部放在一个函数中
   2. 逻辑复用：在vue2.0中通常用mixins复用一些通用逻辑代码，当使用多个mixins时会出现两个非常明显的问题：命名冲突和数据来源不清晰，在vue3.0中可以把每个mixins定义为hook函数来使用，这样数据来源就会变清晰，也不会命名冲突，还会有更好的类型支持

## vnode

在vue内部，一个组件想要真正的渲染成DOM，还需要经历 `创建vnode => 渲染vnode => 生成DOM `  这几个步骤

### 应用程序初始化

在vue3.0中入口函数为`createApp`

<u>/packages/runtime-dom/src/index.ts</u>

```js
export const createApp = ((...args) => {
  // 创建app
  const app = ensureRenderer().createApp(...args)

  if (__DEV__) {
    injectNativeTagCheck(app)
    injectCustomElementCheck(app)
  }

  const { mount } = app
  // 重写 mount
  app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    const component = app._component
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML
    }
    // clear content before mounting
    container.innerHTML = ''
    const proxy = mount(container, false, container instanceof SVGElement)
    if (container instanceof Element) {
      container.removeAttribute('v-cloak')
      container.setAttribute('data-v-app', '')
    }
    return proxy
  }

  return app
})
```

#### 创建 app 对象

首先是`const app = ensureRenderer().createApp(...args)`来创建app对象

ensureRenderer()用来创建一个渲染器对象

```ts
let renderer: Renderer<Element> | HydrationRenderer

function ensureRenderer() {
  return renderer || (renderer = createRenderer<Node, Element>(rendererOptions))
}
```

通过createRenderer创建一个渲染器，内部包含createApp方法，它是执行createAppAPI返回的函数，当执行 createApp(App) 方法时，就会创建一个app对象，并提供mount方法

/packages/runtime-core/src/renderer.ts

```ts
export interface Renderer<HostElement = RendererElement> {
  render: RootRenderFunction<HostElement>
  createApp: CreateAppFunction<HostElement>
}
```

/packages/runtime-core/src/apiCreateApp.ts

```ts
export type CreateAppFunction<HostElement> = (
  rootComponent: Component,
  rootProps?: Data | null
) => App<HostElement>

  
export function createAppAPI<HostElement>(
  render: RootRenderFunction,
  hydrate?: RootHydrateFunction
): CreateAppFunction<HostElement> {
  return function createApp(rootComponent, rootProps = null) {
    const context = createAppContext()
    const installedPlugins = new Set()
    const app: App = (context.app = {
      _component: rootComponent as ConcreteComponent,
      _props: rootProps,
      _context: context,
      mount(
        rootContainer: HostElement,
        isHydrate?: boolean,
        isSVG?: boolean
      ): any {
        if (!isMounted) {
          //创建根组件的 vnode
          const vnode = createVNode(
            rootComponent as ConcreteComponent,
            rootProps
          )
          //利用渲染器渲染 vnode
          render(vnode, rootContainer, isSVG)
          app._container = rootContainer
          return vnode.component!.proxy
        } 
      },
 		})
	
    return app
  }
}
```

#### 重写app.mount方法

在前面创建app对象createAppAPI()方法中已经定义了mount方法，但是由于vue不仅仅支持web平台服务，它还支持跨平台渲染，在createAppAPI()方法中的mount方法只是一个标准的可跨平台的组件渲染流程

```ts
app.mount = (containerOrSelector: Element | ShadowRoot | string): any => {
  	// 标准化容器
    const container = normalizeContainer(containerOrSelector)
    if (!container) return
    const component = app._component
    // 如组件对象没有定义 render 函数和 template 模板，则取容器的 innerHTML 作为组件模板内容
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML
    }
    // 安装前清除内容
    container.innerHTML = ''
    // 真正的执行挂载
    const proxy = mount(container, false, container instanceof SVGElement)
    
    return proxy
  }
```

重写mount方法，首先是通过normalizeContainer标准化容器，然后判断如果组件对象没有定义render函数和template模版，则获取innerHTML，接着清空容器内容，在调用mount的方法渲染组件

### 核心的渲染流程：创建和渲染vnode

#### 创建vnode

`const vnode = createVNode( rootComponent )`

/packages/runtime-core/src/apiCreateApp.ts

```ts
function _createVNode(
  type: VNodeTypes | ClassComponent | typeof NULL_DYNAMIC_COMPONENT,
  props: (Data & VNodeProps) | null = null,
  children: unknown = null,
  patchFlag: number = 0,
  dynamicProps: string[] | null = null,
  isBlockNode = false
): VNode {

  if (props) {
    // 处理 props 相关逻辑，标准化 class 和 style
  }
  // 将vnode类型信息编码
  const shapeFlag = isString(type)
    ? 1
    : __FEATURE_SUSPENSE__ && isSuspense(type)
      ? ShapeFlags.SUSPENSE //1
      : isTeleport(type)
        ? ShapeFlags.TELEPORT //128
        : isObject(type)
          ? ShapeFlags.STATEFUL_COMPONENT //64
          : isFunction(type)
            ? ShapeFlags.FUNCTIONAL_COMPONENT //2
            : 0
  const vnode: VNode = {
    type,
    props,
    key: props && normalizeKey(props),
    ref: props && normalizeRef(props),
    shapeFlag
  }
  normalizeChildren(vnode, children)
  return vnode
}
```

以上就是简化的创建了vnode（主要是对props做标准化处理，对vnode的类型信息编码，创建vnode对象，标准化子节点children）

#### 渲染vnode

`render(vnode, rootContainer, isSVG)`

/packages/runtime-core/src/renderer.ts

```ts
  const render: RootRenderFunction = (vnode, container, isSVG) => {
    if (vnode == null) {
      // 如果容器中有vnode，销毁掉
      if (container._vnode) {
        unmount(container._vnode, null, null, true)
      }
    } else {
      // 创建或更新组件
      patch(container._vnode || null, vnode, container, null, null, null, isSVG)
    }
    flushPostFlushCbs()
    // 缓存vnode节点，表示已经渲染
    container._vnode = vnode
  }

```

render函数判断执行销毁还是创建组件

render函数中的patch为真正的渲染

/packages/runtime-core/src/renderer.ts

```ts
const patch: PatchFn = (n1,n2,container,...) => {
    // 如果存在新旧节点，且类型不同，则销毁旧节点
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1)
      unmount(n1, parentComponent, parentSuspense, true)
      n1 = null
    }

    if (n2.patchFlag === PatchFlags.BAIL) {
      optimized = false
      n2.dynamicChildren = null
    }

    const { type, ref, shapeFlag } = n2
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor) //处理文本节点
        break
      case Comment:
        processCommentNode(n1, n2, container, anchor) //处理注视节点
        break
      case Static:
        //处理静态节点
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG)
        } else if (__DEV__) {
          patchStaticNode(n1, n2, container, isSVG)
        }
        break
      case Fragment:
        // 处理 Fragment 元素
        processFragment(n1,n2,container,...)
        break
      default:
        if (shapeFlag & ShapeFlags.ELEMENT ) { //ShapeFlags.ELEMENT=1
          // 处理普通 DOM 元素
          processElement(n1,n2,container,...)
        } else if (shapeFlag & ShapeFlags.COMPONENT) { //ShapeFlags.COMPONENT=6
          // 处理组件
          processComponent(n1,n2,container,...)
        } else if (shapeFlag & ShapeFlags.TELEPORT) {  //ShapeFlags.TELEPORT= 64
          // 处理 TELEPORT
          (type as typeof TeleportImpl).process(n1,n2,container,...)
        } else if (__FEATURE_SUSPENSE__ && shapeFlag & ShapeFlags.SUSPENSE) { //ShapeFlags.SUSPENSE = 128
           // 处理 SUSPENSE
          (type as typeof SuspenseImpl).process(n1,n2,container,...)
        } else if (__DEV__) {
          warn('Invalid VNode type:', type, `(${typeof type})`)
        }
    }

    // set ref
    if (ref != null && parentComponent) {
      setRef(ref, n1 && n1.ref, parentSuspense, n2)
    }
  }
```

patch是打补丁的意思，主要是做挂载和更新

接受的参数：

1. n1表示旧的节点，当n1为null的时候表示是一次挂载的过程
2. n2表示新的vnode节点，根据类型的不同处理相应的逻辑
3. container表示DOM容器，就是vnode渲染成DOM后会挂载到container内部

上面根据节点的type类型做相应的逻辑处理

##### 处理组件

`processComponent(n1,n2,container,...)`

/packages/runtime-core/src/renderer.ts

```ts
 const processComponent = (n1,n2,container,...) => {
    if (n1 == null) {
      // 挂载组件
      mountComponent(n1,n2,container,...)
    } else {
      // 更新组件
      updateComponent(n1, n2, optimized)
    }
  }

```

###### 挂载组件

mountComponent挂载组件

```ts
const mountComponent = (instance, initialVNode, container,anchor,parentSuspense, isSVG, optimized) => {
  	// 创建组件实例
    const instance = (initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    )
    // 设置组件实例
    setupComponent(instance)
    // 设置并运行带副作用的渲染函数
    setupRenderEffect(instance, initialVNode, container,anchor,parentSuspense, isSVG, optimized)

  }
```

组件挂载主要是做三件事，创建实例，设置实例，设置并运行带副作用的渲染函数

setupRenderEffect带副作用的渲染函数

```ts
const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
  // 创建响应式的副作用渲染函数
  instance.update = effect(function componentEffect() {
    if (!instance.isMounted) {
      // 渲染组件生成子树 vnode
      const subTree = (instance.subTree = renderComponentRoot(instance))
      // 把子树 vnode 挂载到 container 中
      patch(null, subTree, container, anchor, instance, parentSuspense, isSVG)
      // 保留渲染生成的子树根 DOM 节点
      initialVNode.el = subTree.el
      instance.isMounted = true
    }
    else {
      // 更新组件
    }
  }, prodEffectOptions)
}
```

当组件的数据变化时effect函数包裹的内部渲染函数componentEffect会重新执行一遍，从而执行渲染组件的目的

###### 更新组件

updateComponent更新组件

```ts
const updateComponent = (n1: VNode, n2: VNode, optimized: boolean) => {
    const instance = (n2.component = n1.component)!
    //根据新旧子组件vnode判断是否需要更新子组件
    if (shouldUpdateComponent(n1, n2, optimized)) {
        // 把新的子组件vnode赋值给instance.next
        instance.next = n2
        // 子组件也可能因为数据变化被添加到更新队列中，移除防止对子组件重复更新
        invalidateJob(instance.update)
        // instance.update 执行子组件的update副作用渲染函数
        instance.update()
    } else {
      // 不需要更新，只复制属性
      n2.component = n1.component
      n2.el = n1.el
      instance.vnode = n2
    }
  }
```

shouldUpdateComponent函数，根据新旧子组件vnode来判断是否需要更新子组件。shouldUpdateComponent函数的内部，只要是通过检测和对比组件vnode的props、children、dirs、transtion等属性，来决定子组件是否需要更新，而组件的更新就是执行组件挂载时创建的副作用函数

##### 处理普通 DOM 元素

`processElement(n1,n2,container,...)`

```ts
const processElement = (n1,n2,container,...) => {
    isSVG = isSVG || (n2.type as string) === 'svg'
    if (n1 == null) {
      //挂载元素节点
      mountElement(n2,container,...)
    } else {
      //更新元素节点
      patchElement(n1,n2,container,...)
    }
  }
```

mountElement挂载元素节点

```ts
 const mountElement = (
    vnode: VNode,
    container: RendererElement,
    anchor: RendererNode | null,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    let el: RendererElement
    let vnodeHook: VNodeHook | undefined | null
    const { type, props, shapeFlag, transition, patchFlag, dirs } = vnode
    	// 创建 DOM 元素节点
      el = vnode.el = hostCreateElement( vnode.type,isSVG,props && props.is)
      // props
      if (props) {
        // 处理 props，比如 class、style、event 等属性
        for (const key in props) {
          if (!isReservedProp(key)) {
            hostPatchProp(el,key,null,props[key],isSVG,...)
          }
        }
      }
        
      if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {//ShapeFlags.TEXT_CHILDREN=8
        // 当子节点是纯文本的情况
        hostSetElementText(el, vnode.children as string)
      } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) { // ShapeFlags.ARRAY_CHILDREN=16
        // 处理子节点是数组的情况
        mountChildren(
          vnode.children,
          el,
          null,
          parentComponent,
          parentSuspense,
          isSVG && type !== 'foreignObject',
          slotScopeIds,
          optimized || !!vnode.dynamicChildren
        )
      }
      
    }
    // 把创建的 DOM 元素节点挂载到container上
    hostInsert(el, container, anchor)
  }
```





















