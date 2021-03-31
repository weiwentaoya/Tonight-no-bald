## let 和 const 命令

1. **let命令**<!--ES6 新增了`let`命令，用来声明变量。它的用法类似于`var`，但是所声明的变量，只在`let`命令所在的代码块内有效。-->

   **`let`实际上为 JavaScript 新增了块级作用域。**

```js
//每一个{}为一个代码块
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```

上面代码在代码块之中，分别用`let`和`var`声明了两个变量。然后在代码块之外调用这两个变量，结果`let`声明的变量报错，`var`声明的变量返回了正确的值。这表明，**`let`声明的变量只在它所在的代码块有效**。

```javascript
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

上面代码中用var声明i ，每次循环都会赋值i的值，所有最后打印的时候所有的i都会为10

```js
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```

如果用let声明，每个i只在本次循环中，所以打印为当前循环时的i

```js
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;
```

**let声明的变量不会发生变量提升**

```js
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```

只要块级作用域内存在`let`命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“**暂时性死区**”

```js
// 报错
function func() {
  let a = 10;
  var a = 1;
}

// 报错
function func() {
  let a = 10;
  let a = 1;
}
//`let`不允许在相同作用域内，重复声明同一个变量。
```

**块级作用域与函数声明**

``````js
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
//上面代码在 ES5 中运行，会得到“I am inside!”，因为在if内声明的函数f会被提升到函数头部，实际运行的代码如下。

function f() { console.log('I am outside!'); }

(function () {
  function f() { console.log('I am inside!'); }
  if (false) {
  }
  f();
}());
``````

上面的代码在 ES6 环境中，都会报错。

```js
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }
(function () {
  var f = undefined;
  if (false) {
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
```

ES6 规定

1. 允许在块级作用域内声明函数。
2. 函数声明类似于`var`，即会提升到全局作用域或函数作用域的头部。
3. 同时，函数声明还会提升到所在的块级作用域的头部。

## 解构赋值

```js
//1
  let obj = {
		a:1,
		b:2
	}
	let a = obj.a
	let b = obj.b
//2
  let obj = {
		a:1,
		b:2
	}
  let {a,b} = obj
```

以上两种写法效果相同，第二种为解构赋值

在数组中，以下标为准

```js
	let arr = ['a','b','c']
	let [e,f] = arr
	console.log(e,f); //'a','b'
```

在字符串中解构赋值的是字符串的字符

```js
	let str = '123'
	let [a,b] = str
	console.log(a,b); //'1','2'
```

⚠️**解构赋值其实是在执行原生对象属性上的迭代器方法**

## 展开运算符

```js
	let arr = [1,2,3,4]
	let arr2 = ['a','b',...arr,'c','d']
	console.log(arr2);//["a", "b", 1, 2, 3, 4, "c", "d"]
```

