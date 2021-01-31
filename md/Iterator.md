# Iterator 和 for...of

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)

[阮一峰](https://es6.ruanyifeng.com/#docs/iterator#%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%9A%84-Iterator-%E6%8E%A5%E5%8F%A3)

1. Iterator（遍历器）的概念
2. 默认 Iterator 接口
3. 字符串的 Iterator 接口
4. 给对象添加 Iterator 接口
5. 修改字符串的 Iterator 接口
6. 调用 Iterator 接口的场合
7. Iterator 接口与 Generator 函数
8. 遍历器对象的 return()，throw()
9. for...of 循环



#### **Iterator**（遍历器）的概念

javaScript 原有的表示“集合”的数据结构，主要是数组（`Array`）和对象（`Object`），ES6 又添加了`Map`和`Set`。这四种数据集合

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令`for...of`循环，**Iterator 接口主要供`for...of`消费**。

Iterator 的遍历过程

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的`next`方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的`next`方法，直到它指向数据结构的结束位置。

每一次调用`next`方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含`value`和`done`两个属性的对象。其中，`value`属性是当前成员的值，`done`属性是一个布尔值，表示遍历是否结束

模拟`next`方法返回值的例子

```js
function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}

var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

```

#### 默认-Iterator-接口

Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制。当使用`for...of`循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable **可迭代协议**）。`Symbol.iterator`属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数，就会返回一个遍历器。

**原生具备 Iterator 接口的数据结构**

- Array

- Map

- Set

- String

- [TypedArray(**类型化数组**)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)

- 函数的 arguments 对象

- NodeList 对象(节点列表对象)

  ```js
  // 字符串
  let str = "hello";
  
  for (let s of str) {
    console.log(s); // h e l l o
  }
  
  // DOM NodeList对象
  let paras = document.querySelectorAll("p");
  
  for (let p of paras) {
    p.classList.add("test");
  }
  
  // arguments对象
  function printArgs() {
    for (let x of arguments) {
      console.log(x);
    }
  }
  printArgs('a', 'b');
  // 'a'
  // 'b'
  ```

  

  

#### 字符串的 Iterator 接口

[`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String) 是一个内置的可迭代对象：

```js
let someString = new String("hi");
typeof someString[Symbol.iterator];          // "function"
```

`String` 的默认迭代器会依次返回该字符串的各码点（code point）：

```js
let iterator = someString[Symbol.iterator]();
iterator + "";                               // "[object String Iterator]"
 
iterator.next();                             // { value: "h", done: false }
iterator.next();                             // { value: "i", done: false }
iterator.next();                             // { value: undefined, done: true }
```

一些内置的语法结构——比如[`展开语法`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_operator)——其内部实现也使用了同样的迭代协议：

```js
[...someString]                              // ["h", "i"]
```



#### 为对象添加 Iterator 接口

我们可以实现一个自己的可迭代对象，就像这样:

```js
let obj = {
    top: 200,
    left: 400,
    [Symbol.iterator] () {
      let keys = Object.keys(obj)
      let leng = keys.length
      let n = 0
      return {
          next: function() {
              if(n < leng) {
                  return {
                      value: {k:keys[n], v:obj[keys[n++]]},
                      done: false // 迭代是否完成
                  }
              } else {
                  return {
                      done: true // 迭代是否完成
                  }
              }
          }
      }
  }
}
for (var {k, v} of obj) {
    console.log(k, v);  
}
```

#### 修改字符串的 Iterator 接口

我们可以通过提供自己的 `@@iterator` 方法，重新定义迭代行为：

```js
// 必须构造 String 对象以避免字符串字面量 auto-boxing
var someString = new String("hi");

someString[Symbol.iterator] = function() {
  return { // 只返回一次元素，字符串 "bye"，的迭代器对象
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};
```

注意重新定义的 `@@iterator` 方法是如何影响内置语法结构的行为的：

```js
[...someString];             // ["bye"]
someString ;                 // String {"hi", Symbol(Symbol.iterator): ƒ}

```

#### 调用 Iterator 接口的场合

有一些场合会默认调用 Iterator 接口（即`Symbol.iterator`方法），除了for...of`循环，还有几个别的场合。

1. 解构赋值
2. 扩展运算符
3. yield\*
4. **其他场合**

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
- Promise.all()
- Promise.race()

#### Iterator 接口与 Generator 函数

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的`Symbol.iterator`属性，从而使得该对象具有 Iterator 接口

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
for (let x of myIterable) {
  console.log(x); //1 //2 //3
}

[...myIterable] // [1, 2, 3]
```



#### 遍历器对象的 return()，throw()

遍历器对象除了具有`next()`方法，还可以具有`return()`方法和`throw()`方法

...

#### for...of 循环

数组原生**具备**`iterator`接口（即默认部署了`Symbol.iterator`属性），`for...of`循环本质上就是调用这个接口产生的遍历器。

对象原生**不具备**`iterator`接口, 空对象`obj`部署了数组`arr`的`Symbol.iterator`属性，结果`obj`的`for...of`循环，产生了与`arr`完全一样的结果。

```js
const arr = ['red', 'green', 'blue'];

for(let v of arr) {
  console.log(v); // red green blue
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for(let v of obj) {
  console.log(v); // red green blue
}
```

**iterator接口主要供for...of...消费**



























