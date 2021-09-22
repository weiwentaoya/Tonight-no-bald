
## Promise与异步函数

### 异步编程

同步和异步行为的对立统一是计算机科学的一个基本概念。在JavaScript这种单线程事件循环模型中，同步操作与异步操作更是代码所依赖的核心机制。异步行为是为了优化因计算量大而时间长的操作。如果在等待其他操作完成的同时，即使运行其他指令，系统也能保持稳定。

#### 同步与异步

同步行为对应内存中顺序执行的处理器指令。每条指令都会严格按照他们出现的顺序来执行，而每条指令执行后也能立即获得存储在本地的信息，这样的执行流程容易分析程序在执行到代码任意位置的状态。

相对地，异步行为类似于系统中断，即当前进程外部的实体可以触发代码执行。异步操作经常是必要的，因为强制进程等待一个长时间的操作通常是不可行的 (同步操作则必须要等)。如果代码要访问一些高延迟的资源，比如向远程服务器发送请求并等待响应，就会出现长时间的等待

### 期约

一种异步程序执行的机制

#### 期约基础

ECMAScript6新增的引用类型Promise，可以通过new操作符来实例化。创建新期约时需要传入执行器(exexutor)函数作为参数

##### 期约状态机

期约是一个有状态的对象，可能处于三种状态之一：

- 待定（pending）
- 兑现（fulfilled，有时候也称为“解决”，resolved）
- 拒绝（rejected）

期约的状态不是私有的，不能直接通过JavaScript检测到。这主要是为了避免根据读取到的期约状态，以同步的当时处理期约对象。。另外，期约的状态也不能被外部的JavaScript代码修改。与不能读取该状态的原因是一样的：期约故意将异步行为封装起来，从而隔离外部的同步代码。

```js
const p1 = new Promise((resolve,reject)=>{})
const p2 = new Promise((resolve,reject)=>{resolve()})
const p3 = new Promise((resolve,reject)=>{reject()})

console.log(p1); //Promise {<pending>}
console.log(p2); //Promise {<fulfilled>: undefined}
console.log(p3); //Promise {<rejected>: undefined}
```

##### 通过执行函数控制期约状态

执行器函数主要有两项职责：初始化期约的异步行为和控制状态的最终转换。

**执行器函数是同步执行的**

```js
new Promise(()=>{setTimeout(console.log, 0, 'Promise')})
setTimeout(console.log, 0, 'setTimeout')
//Promise
//setTimeout
```

可以通过Promise.resolve()静态方法实例化一个解决的期约

```js
new Promise((resolve,reject)=>{resolve()})
//等价于
Promise.resolve()
```

可以通过Promise.reject()静态方法实例化一个拒绝的期约,并抛出一个异步错误（这个错误不能通过try/catch捕获，而只能通过拒绝处理程序捕获）

```js
new Promise((resolve,reject)=>{reject()})
//等价于
Promise.reject()
```

##### 同步/异步执行的二元性

Promise的设计很大程度上会导致一种完全不同于JavaScript的计算模式

```js
try {
  throw new Error('foo')
} catch (e) {
  console.log(e); //Error: foo
}

try {
  Promise.reject(new Error('Promise Error'))
} catch (e) {
  console.log(e);
}
//demo.html:28 Uncaught (in promise) Error: Promise Error
```

拒绝期约的错误并没有抛到执行同步代码的线程里，而是通过浏览器异步队列来处理的。因此。try/catch块并不能捕获该错误。代码一旦开始以异步模式执行，则唯一与之交互的方式就是使用一部结构——就是期约的方法

#### 期约的实例方法

期约实例的方法是链接外部同步代码 与异步代码之间的桥梁

##### Promise.prototype.then()

为期约添加处理程序，接受两个参数：onResolved处理程序和onRejected处理程序。可选参数，会分别进入“兑现”和“拒绝”状态时执行

##### Promise.prototype.catch()

同于给期约添加拒绝处理程序，只接受一个参数onRejected处理程序。这个方法就是一个语法糖，相等于调用Promise.prototype.then(null,onRejected )

##### Promise.prototype.finally()

用于给期约添加onFinally()处理程序，这个处理程序在契约转换为解决或拒绝状态时都会执行。主要用于添加清理代码

##### 非重入期约方法

当期约进入落定状态时，与该状态相关的处理程序仅仅会被排期，而非立即执行。跟在添加这个处理程序的代码之后的同步代码一定会在处理程序之前先执行

```js
let asyncResolve 
const p = new Promise((resolve)=>{
  asyncResolve = function () {
    console.log(1);
    resolve()
    console.log(2);

  }
})
p.then(()=>{
  console.log(4);
})
asyncResolve()
console.log(3);

//1
//2
//3
//4
```

即使期约状态发生在添加处理程序之后，处理程序也会等到运行的消息队列让它出列时才会执行

#### 期约连锁与期约合成

##### 期约连锁

把期约逐个串联起来是一种非常有用的编程模式。因为每个期约实例的方法(then()、catch()、finally())都会返回一个新的期约对象。

```js
const p = new Promise((resolve)=>{
  setTimeout(resolve, 1000)
})
p.then(()=> new Promise((resolve)=>{
  console.log('first');
  setTimeout(resolve, 1000)
}))
.then(()=> new Promise((resolve)=>{
  console.log('second');
  setTimeout(resolve, 1000)
}))
.then(()=> new Promise((resolve)=>{
  console.log('third');
  setTimeout(resolve, 1000)
}))
// first (1秒后)
// second (2秒后)
// third (3秒后)
```

或者使用工厂函数

```js
function delayedResolve(str) {
  return new Promise((resolve)=>{
    setTimeout(()=>{
      console.log(str);
      resolve()
    }, 1000)
  })
}
delayedResolve('first')
  .then(()=> delayedResolve('second'))
  .then(()=> delayedResolve('third'))
  .then(()=> delayedResolve('fourth'))
// first（1秒后）
// second（2秒后）
// third（3秒后）
// fourth（4秒后）
```

##### Promise.all()和Promise.race()

Promise.all()静态方法创建的期约会在一组期约全部解决之后再解决。这个静态方法接受一个可迭代对象，返回一个新期约。

```js
Promise.all([
  Promise.resolve(),
  new Promise((resolve)=>setTimeout(resolve, 1000))
]).then(()=>{
  console.log('Promise.all  --  end');
  // Promise.all  --  end (1秒后)
})
```

- 合成的期约只会在每个包含的期约都解决之后才会解决（合成期约的解决值是包含所有期约解决值的数组，按照迭代器的顺序）
- 如果至少包含一个期约待定，则合成的期约也会待定
- 如果有一个包含的期约拒绝，则合成的期约也会拒绝（如果有期约拒绝，第一个期约拒绝理由会作为合成期约的拒绝理由）

Promise.race()静态方法返回一个包装期约，是一组集合中最先解决或拒绝的期约的镜像。接受一个可迭代对象，返回一个新期约

```js
Promise.race([
  Promise.resolve(3),
  new Promise((resolve)=>setTimeout(resolve, 1000))
]).then(res=>{
  console.log(res); //3
})


Promise.race([
  Promise.reject(1),
  new Promise((resolve)=>setTimeout(resolve, 1000))
]).then(res=>{
  console.log(res);
}).catch(err=>{
  console.log(err); //1
})
```

Promise.race()不会对解决或拒绝的期约区别对待。无论是解决还是拒绝，只要是第一个落定的期约，Promise.race()就会包装其解决值或拒绝理由并返回新期约

#### 期约扩展

ES6期约实现是很可靠的，但也有不足之处。比如：期约取消和进度追踪

##### 期约取消

遇到期约正在处理过程，但程序却不需要其结果的情形

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
   <body>
        <div id="app">
            <button id="cancelButton">cancelButton</button>
            <button id="startButton">startButton</button>
        </div>
    </body>
    <script>
        class CancelToken {
            constructor(cancelFn){
                this.promise = new Promise((resolve, reject)=>{
                    cancelFn(()=>{
                        setTimeout(console.log,0,'delay cancelled')
                        resolve()
                    })
                })
            }
        }

        function cancellableDelayedResolve(delay) {
            setTimeout(console.log,0, "set delay");
            return new Promise((resolve, reject)=>{
              	//这里是startButton被点击后主要执行的内容
                const id =setTimeout(console.log, delay, "delayed resolve");
                
              	//实例化一个cancelToken并传入回调
                const cancelToken = new CancelToken((cancelCallback)=>{
                    cancelButton.addEventListener("click",cancelCallback)
                })
                //当期约触发时清楚定时器，执行取消操作
                cancelToken.promise.then(()=> clearTimeout(id))
            })
        }
        startButton.addEventListener('click',()=>cancellableDelayedResolve(2000))
    </script>
</html>
```

startButton被点击就会开始计时（在传入的倒计时时间到达时会完成此次行为），实例化一个cancelToken的实例，如果提前点击cancelButton就会触发取消期约（清除定时器）

##### 期约进度通知

执行中的期约可能会有不少离散的“阶段”，在最终解决之前必须依次经过。

```js
class TrackablePromise extends Promise{
  constructor(executor){
    const notifyHandlers = []
    super((resolve,reject)=>{
      return executor(resolve,reject,(status) => {
        //这里是新添加的notify方法
        notifyHandlers.map(handler=>handler(status))
      })
    })
    this.notifyHandlers = notifyHandlers
  }

  notify(notifyHandler){
    this.notifyHandlers.push(notifyHandler)
    console.log(this.notifyHandlers);
    return this
  }
}

let p = new TrackablePromise((resolve,reject,notify)=>{
  function countdown(x) {
    if (x > 0) {
      notify(`${x} remaining`)
      setTimeout(() => {
        countdown(x-1) 
      }, 1000);
    }else{
      resolve()
    }
  }
  countdown(5)
})
p.notify((x)=>{
  console.log(x);
  //4 (1秒后)
  //3 (2秒后)
  //2 (3秒后)
  //1 (4秒后)
  
})
p.then(()=>{
  console.log(0); //0 (5秒后)
})
```

### 异步函数

async/await语法关键字，让以同步方式写异步代码

async 关键字用来声明异步函数。使用关键字可以让函数具有异步特征，但总体上其代码仍然是同步求值的。而在参数或闭包方面，异步函数仍然具有普通函数的正常行为

```js
async function foo() {
  console.log(1);
}
foo()
console.log(2);

//1
//2
```

默认会用Promise.resolve()包装函数return关键字返回的值（不写return默认返回undefined），使其变成一个期约对象

```js
async function foo() {
  console.log(1);
}
foo().then(()=>{console.log(3)})
console.log(2);

//1
//2
//3
```

异步函数主要针对不会马上完成的任务，所以需要一种暂停和恢复执行的能力。使用await关键字可以暂停异步函数代码的执行，等待期约解决

⚠️await关键字会暂停执行异步函数后面的代码，让出JavaScript运行的执行线程。这个行为与生成器中的yield关键字是一样的。await关键字同样是尝试“解包”对象的值，然后将这个值传给表达式，在异步恢复异步函数的执行。

await关键字必须在异步函数中使用

async/await中真正起作用的是await。async关键字是标识符，如果异步函数不包含await关键字，其执行基本上跟普通函数没有区别。

JavaScript运行时在碰到await关键字时，会记录在哪里暂停执行。等到await后边的值可用了，JavaScript运行时会向消息队列推送一个任务，这个任务会恢复异步函数的执行

```js
async function foo() {
  console.log(2);
  await null
  console.log(4);
}
console.log(1);
foo()
console.log(3);
//1
//2
//3
//4
```

```js
 async function foo() {
   console.log(2);
   console.log(await Promise.resolve(6));
   console.log(7);
 }
async function bar() {
  console.log(4);
  console.log(await 8);
  console.log(9);
}
console.log(1);
foo()
console.log(3);
bar()
console.log(5);

//1
//2
//3
//4
//5
//6
//7
//8
//9
```
