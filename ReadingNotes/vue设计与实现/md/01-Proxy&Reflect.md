# Proxy & Reflect
`前言: vue3.0版本响应数据的实现改为了 JavaScript Proxy，在我们对vue3.0的响应式原理理解之前有必要先理解 Proxy & Reflect 语法`

## Proxy
[Proxy() 是一个构造器，用来创建 Proxy(代理)对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy)

` 
我们可以通过Proxy()构造器来创建一个新的Proxy对象，可以通过在handle上定义一组处理函数，可以自定义的处理一些特定的行为。比如，通过定义get()、set() 就可以自定义处理被代理对象的属性访问和设置。
若没有自己添加handle处理函数，则会创建一个与被代理对象行为几乎完全相同的代理对象
`

### 语法
``` js
  new Proxy(target, handler)
```

#### 参数
* target 被代理对象, 可为任何数据类型
* handler 处理对target操作的 __处理函数__ 对象

#### 处理函数
自定义的处理函数会对底层被代理对象的调用进行劫持


##### handler.get() 获取属性值劫持
  ###### 参数
  + target 目标对象
  + property 被处理的属性名
  + receiver Proxy或者继承Proxy的对象
  ###### 返回值
  get 方法可以返回任何参数作为访问到的值，默认为undefined
  ###### code
  ```js
  const obj = { foo: 'bar'}
  const p = new Proxy(obj, {
    get: (target, property, receiver) => {
      // 当执行p.foo时，会触发代理对象中的get方法
      // 此时 target为obj、property为foo、receiver为p
      // get返回值会成为p.foo的值
      // return 'foo' // p.foo的值为 'foo'
      return target[property]
    }
  })
  console.log(p.foo) // 'bar'
  ```

  ###### 注意⚠️
  + 如果访问的目标时不可写以及不可配置的，则返回的值必须与该目标的值相同
  + 如果配置get方法没有明确返回值，则默认方法返回undefined


#### handle.set() 设置属性值劫持
  ###### 参数
  + target 目标对象
  + property 被处理的属性名
  + value 属性的新值
  + receiver Proxy或者继承Proxy的对象
  ###### 返回值
  必须需要返回一个布尔值参数，true代表设置成功，false为失败，严格模式下，返回false会报错
  ###### code
  ```js
    const obj = {}

    const p = new Proxy(obj, {
      set: (target, property, value, receiver) => {
        const val = property[target] // 先获取一次旧的value
        if (val === value) {
          // 若设置的value和旧的value相同则不需要去做重复的工作
          // 当然不做这一步判断也是没有问题的
          return true
        }
        // 设置属性值
        target[property] = value
        // 返回true表示设置成功
        return true
      }
    })
    p.foo = 'bar'
    console.log(p) // Proxy {foo: 'bar'}
    console.log(obj) // {foo: 'bar'}
  ```
  ###### 注意⚠️
  + 若目标属性为不可设置属性，则不能修改它的值
  + 严格模式下返回false会报错

#### handler.has() in 操作符劫持

###### 参数
  + target 目标对象
  + key 需要检查是否存在的属性
###### 返回值
  必须返回一个 boolean 属性值表示是否存在
###### code
  ```js 
  const obj = { foo: 'bar', bar: undefined}

  const p = new Proxy(obj, {
    has: (target, key) => {
      return key in target
    }
  })

  console.log('foo' in p) // true
  console.log('bar' in p) // true
  console.log('toString' in p) // true
  console.log('noValue' in p) // false
  ```
###### 注意⚠️
  + x 若目标对象的属性不可被配置，则该属性不能被代理隐藏

#### handler.deleteProperty()  对 对象属性的delete操作 劫持

###### 参数
  + target 目标对象
  + key 被删除的属性名称
###### 返回值
  必须手动返回一个boolean值表示是否删除成功
###### code
  ```js 
    const obj = { foo: 'bar'}

    const p = new Proxy(obj, {
      deleteProperty: (target, key) => {
        delete target[key]
        return true
      }
    })

    delete p.foo

    console.log(obj); // {}
  ```
###### 注意⚠️
  + 如果目标对象的属性是不可配置的，那么该属性不能被删除。

#### handler.apply()  函数调用劫持

###### 参数
  + target (function)
  + thisArg this上下文对象
  + argumentsList 参数
###### 返回值
  可以返回任何值作为被劫持函数的返回值
###### code
  ```js 
    const sum = ( a, b ) => a + b

    const p = new Proxy(sum, {
      apply: (target, thisArg, argumentsList) => {
        console.log(target, thisArg, argumentsList);
        // return 0 //若返回0，则sum函数不论传什么参数结果都为0
        return target(...argumentsList)
      }
    })

    console.log(p( 2, 3 )); // 5
  ```
###### 注意⚠️
  + target参数必须为一个函数


#### handler.construct()  new 操作符 劫持

###### 参数
  + target 目标对象。
  + argumentsList constructor 的参数列表。
  + newTarget 最初被调用的构造函数
###### 返回值

###### code
  ```js 
    function Sum( a, b ) {
      this.a = a
      this.b = b
    }

    const p = new Proxy(Sum, {
      construct: (target, argumentsList, newTarget) => {
        console.log(target, argumentsList, newTarget);
        // return {} //若返回{}，则Sum构造函数一直返回 {}
        return new target(...argumentsList)
      }
    })

    console.log(new p( 2, 3 )); // Sum {a: 2, b: 3}
  ```
###### 注意⚠️
  + 必须返回一个对象


#### handler.defineProperty()  对象的 Object.defineProperty() 操作 劫持

###### 参数
  + target 目标对象。
  + key 检索属性名称
  + descriptor 描述符
###### 返回值
  必须返回一个boolean类型表示操作是否成功
###### code
  ```js 
    const obj = {}

    const p = new Proxy(obj, {
      defineProperty: (target, key, descriptor) => {
        console.log(target, key, descriptor);
        Object.defineProperty(target, key, descriptor)
        return true
      }
    })

    Object.defineProperty(p, 'foo', {
      value: 'bar',
      writable: false
    })

    console.log(obj) // {foo: 'bar'}
  ```
###### 注意⚠️
  + [注意内容过多, 请点击](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

#### handler.setPrototypeOf()  Object.setPrototypeOf() 劫持

###### 参数
  + target 目标对象。
  + prototype 对象新原型或者null.
###### 返回值
  必须返回一个boolean类型表示操作是否成功
###### code
  ```js 
    const obj = {}

    const p = new Proxy(obj, {
      setPrototypeOf: (target, prototype) => {
        console.log(target, prototype);
        Object.setPrototypeOf(target, prototype)
        return true
      }
    })
    Object.setPrototypeOf( p, { a: 0 })
    console.log(obj.__proto__) // {a: 0}
  ```
###### 注意⚠️
  + x
  + x

#### handler.xxx()  xxx 劫持

###### 参数
  + target 目标对象。
  + 
###### 返回值

###### code
  ```js 

  ```
###### 注意⚠️
  + x
  + x

## Reflect
` Reflect是一个内置对象，它提供拦截JavaScript操作的方法。这些方法与Proxy提供的方法相同 下面就不去写了`

__那么为什么我们需要Reflect呢？__ 
首先先看一段代码，js原型链查找。如下代码，毫无疑问bar.name结果为 'bar'
```js
  const foo = { 
    _name: 'foo',
    get name(){
      return this._name
    }
  }

  const bar = { _name: 'bar', __proto__: foo}

  console.log(bar.name) // bar
```

同样我们创建一个代理
```js
  const bar = { name: 'bar'}

  let args = null
  const p = new Proxy(bar, {
    get: (target, key, receiver) => {
      args=[target, key, receiver]
      return target[key]
    }
  })


  console.log(p.name) // bar
  console.log(args); // [ {name: "bar"}, "name", Proxy {name: 'bar'} ]
```
上面代码中可以看到当触发get劫持时，传入的三个参数分别为 目标对象{name: "bar"}, 属性名称"name", 代理对象Proxy {name: 'bar'}


接下来换个复杂的写法，如下
```js
  const foo = { 
    _name: 'foo',
    get name(){
      return this._name
    }
  }
  let args = null
  const p = new Proxy(foo, {
    get: (target, key, receiver) => {
      // 这里赋值一下target, key, receiver三个参数
      args=[target, key, receiver]
      return target[key]
    }
  })

  const bar = { _name: 'bar', __proto__: p}

  console.log(bar.name) // foo
  // 传到get方法中的三个参数
  console.log(args); // [ {_name: 'foo'}, "name", {_name: 'bar'} ]
```
思考🤔......
仔细梳理一下上面代码的执行过程
1. 定义对象foo,   有属性_name和 name getter 方法 返回_name
2. 定义args用于保存参数，方便查看
3. 执行new Proxy，接受代理对象
4. 定义对象bar，将原型设置为代理对象p
5. 访问bar.name
   1. 在bar上访问name属性，bar自身没有name属性
   2. 所以访问bar的原型链，bar的原型链为代理对象p
   3. 代理对象p为foo的代理对象
   4. foo身上有 getter name，返回_name
   5. 按道理这个getter优先返回的是外层bar对象的_name,而不是原型链上的_name
   6. 因为获取name属性的是bar而非foo
   7. 其实在打印的参数中就可以看到，我们忽略了get劫持的第三个参数receiver
   8. 而receiver官方解释是 Proxy 或者继承 Proxy 的对象
   9. 如果我们把getter中的this指向了第三个参数receiver,bar.name拿到的应该就是'bar'而非'foo'了

Reflect就是来解决这种问题的
```js
  const foo = { 
    _name: 'foo',
    get name(){
      return this._name
    }
  }
  let args = null
  const p = new Proxy(foo, {
    get: (target, key, receiver) => {
      // 这里赋值一下target, key, receiver三个参数
      args=[target, key, receiver]
      return Reflect.get(target, key, receiver)
    }
  })

  const bar = { _name: 'bar', __proto__: p}

  console.log(bar.name) // bar
  // 传到get方法中的三个参数
  console.log(args); // [ {_name: 'foo'}, "name", {_name: 'bar'} ]
```
这样，如愿所偿 结果为 'bar'
