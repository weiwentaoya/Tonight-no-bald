# 前言

在上一篇中说道，在`defineReactive`函数中为数据做了响应式处理，其中在get中收集了依赖，在set中如果拦截到数据的变化，就会触发通知更新方法，执行`dep.notify()`，接下来我们就从`dep.notify()`出发，探究异步更新的策略

# dep.notify()

1. 之前说过dep中收集了watcher依赖，这里只做一件事，就是执行watcher的更新

```js
// src/core/observer/dep.js  

notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // 对watcher进行排序
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      // 执行每个watcher的update()方法
      subs[i].update()
    }
  }
```

# Watcher.update()

```js
// src/core/observer/watcher.js

/**
* 当依赖项改变时将被调用。
*/
update () {
    // 这里只有计算属性会用到，保证每一次页面更新只执行一次
    if (this.lazy) {
      this.dirty = true
    // 如果需要同步执行，直接执行run()方法，在使用watch选项中可以传一个sync选项
    } else if (this.sync) {
      this.run()
    } else {
    // 一般情况下都会走这里，异步更新排队
      queueWatcher(this)
    }
  }
```

# queueWatcher()

1. 将当前watcher放入观察者队列
2. 执行`nextTick()`传入`flushSchedulerQueue`

```js
// src/core/observer/scheduler.js

/*
* 将一个观察者推入观察者队列。
* 具有重复id的将被跳过
*/
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  if (has[id] == null) {
    has[id] = true
    // flushed表示队列正在刷新
    // queue为存放watcher的队列
    if (!flushing) {
      // 将当前watcher放入队列中
      queue.push(watcher)
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // queue the flush
    if (!waiting) {
      waiting = true

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue()
        return
      }
      // 执行nextTick()传入flushSchedulerQueue
      nextTick(flushSchedulerQueue)
    }
  }
}
```

## flushSchedulerQueue()

这里先看传入到`nextTick()`方法中的`flushSchedulerQueue()`

1. 对watcher列表排序
2. 遍历watcher列表先执行before钩子，在执行watcher的run()方法

```js
// src/core/observer/scheduler.js

function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  // 表示正在刷新队列
  flushing = true
  let watcher, id

  // 刷新队列前升序排序，保证:
  // 1. 组件更新顺序为父组件到子组件。(因为父组件总是在子组件之前创建）
  // 2. 用户自定义watcher在观察者watcher前执行
  // 3. 如果一个组件在父组件的watcher运行期间被销毁，它的watcher被跳过。
  queue.sort((a, b) => a.id - b.id)

 	//不缓存长度，因为可能会有更多的watcher被推入，只运行现有的watcher
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      //before钩子执行
      watcher.before()
    }
    id = watcher.id
    has[id] = null
    // 执行watcher的run()方法
    watcher.run()
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? `in watcher with expression "${watcher.expression}"`
              : `in a component render function.`
          ),
          watcher.vm
        )
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice()
  const updatedQueue = queue.slice()

  resetSchedulerState()

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue)
  callUpdatedHooks(updatedQueue)

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush')
  }
}
```

### watcher.run()

1. 调用get()获取value
2. 保存旧value
3. 设置旧value为新的value
4. 如果是用户定义的watcher，执行回调传入新value和旧value，并且捕获回调函数执行报错
5. 执行回调传入新value和旧value

```js
// src/core/observer/watcher.js

run () {
  if (this.active) {
    // 调用get()获取value
    const value = this.get()
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // 保存旧value
      const oldValue = this.value
      // 设置旧value为新的value
      this.value = value
      if (this.user) {
        // 如果是用户定义的watcher，执行回调传入新value和旧value，并且捕获回调函数执行报错
        try {
          this.cb.call(this.vm, value, oldValue)
        } catch (e) {
          handleError(e, this.vm, `callback for watcher "${this.expression}"`)
        }
      } else {
        // 执行回调传入新value和旧value
        this.cb.call(this.vm, value, oldValue)
      }
    }
  }
}
```

### watcher.get()

1. 将Dep.target设置为当前watcher，开启依赖收集
2.  执行回调进入更新阶段`updateComponent()`
3. 将Dep.target设置为undefined，关闭收集依赖
4. 清理所有依赖项

```js
// src/core/observer/watcher.js

/**
* 重新收集依赖项。
*/
get () {
  // 将Dep.target设置为当前watcher
  pushTarget(this)
  let value
  const vm = this.vm
  try {
    // 执行回调更新阶段，执行new Watcher()时传入的updateComponent函数
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
    // 将Dep.target设置为undefined，从而关闭收集依赖
    popTarget()
    // 清理所有依赖项
    this.cleanupDeps()
  }
  return value
}
```



## nextTick()

接下来看执行`flushSchedulerQueue()`方法的`nextTick()`方法

⚠️此处的 `nextTick` 就是 `vue.$nextTick()`

1. 保存回调函数，并将其包装为可捕获错误的函数
2. 执行`timerFunc()`方法

**当pending为false时表示当前的flushCallbacks()进入任务队列中被执行了，当pending为true时，表示flushCallbacks()还在微任务队列中等待执行，在等待期间callbacks没有被清空，若再次进入一个flushCallbacks()，就有一些更新会被两个或多个flushCallbacks()更新，所以，在等待期间不会有flushCallbacks()进入微任务队列，然而这里的等待一般不会被触发或者很少会触发**

```js
// src/core/util/next-tick.js

//接受的会掉函数cb为flushSchedulerQueue
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  // 保存回调函数
  callbacks.push(() => {
    // 包装回调函数，使其错误可以被捕获
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // pending表示当前是否用Promise.resolve().then()的方式在执行callbacks中的回调函数
  // Vue优先采用Promise.resolve().then()微任务队列的方式去执行所有的更新函数
  // 默认微任务会被一次性更新完，这是浏览器的机制
  
  if (!pending) {
    pending = true
    // 执行timerFunc()方法
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

### timerFunc()

这里其实只是在定义timerFunc()方法，介于浏览器的兼容性问题优先顺序如下:

`Promise>MutationObserver>setImmediate>setTimeout`

一般情况下都是会用`Promise.resolve().then()`，会将其放入微任务队列执行

微任务队列会被一次性全部执行

**这里其实可以直接理解为在微任务队列中加入了一个方法来遍历去执行所有更新函数**

```js
// src/core/util/next-tick.js

let timerFunc

// 如果浏览器支持Promise，则用Promise微任务队列来执行所有更新的回调
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // 一些兼容性问题，强制刷新微任务队列
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // 如果原生Promise不可用的情况下使用MutationObserver
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 使用 setImmediate， 它利用了(宏)任务队列，
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // 最后只能用setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

### flushCallbacks()

这里就是去执行所有的更新方法`flushSchedulerQueue()`

```js
// src/core/util/next-tick.js

function flushCallbacks () {
  pending = false
  // 清空callbacks
  const copies = callbacks.slice(0)
  callbacks.length = 0
  // 遍历callbacks，执行传入的方法flushSchedulerQueue()
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```

# 总结

1. 当dep的`notify()`方法被执行时就开始了异步更新
2. 首先会通知所有的watcher执行`update()`方法
3. watcher的`update()`方法中通过`queueWatcher(this)`将当前的watcher放入一个watcher队列
4. 执行`nextTick(flushSchedulerQueue)`,将执行watcher队列中所有`update()`的`flushSchedulerQueue`方法通过`nextTick`放入callbacks回调函数数组中
5. 执行`timerFunc()`根据浏览器兼容性判断执行方式，优先使用`Promise.resolve().then()`利用浏览器的微任务队列的方式去执行`flushCallbacks()`
6. `flushCallbacks()`去遍历执行所有的callbacks数组中的`flushSchedulerQueue`方法
7. `flushSchedulerQueue`方法去执行所有watcher的`run()`方法
8. watcher的`run()`方法执行了watcher的`get()`方法
9. watcher的`get()`方法又去执行了`new Watcher()`时传入的`updateComponent()`更新函数
10. 至此旧完成了整个的异步更新