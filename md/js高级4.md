# js高级4

## 3.语言基础

### 语法：

- 区分大小写
- 关键字和保留字不可用于变量名称

### 变量

- 变量提升（var，会把所有的声明变量提升到作用域的顶部）

  ```js
  function foo(){
    console.log(age);
    var age = 10;
  }
  foo()
  //这里代码不会报错，会打印undefined， 因为var会导致变量提升所导致，等价于以下代码
  
  
  function foo(){
    var age
    console.log(age);
    age = 10;
  }
  foo()
  ```

  let和const不会变量提升

  let在全局声明的变量不会挂在window上

  const声明的变量不可被修改

- #### 数值

  基本的数值字面量格式是十进制整数

  整数也可用八进制或者十六进制字面量来表示

  - 八进制第一个数字必须是0

  - 如果字面量中的数字超出了应有的范围（数值0-7）默认会被当成十进制

    ```js
    let num1 = 070 //八进制的56
    let num2 = 079 //十进制的79
    let num2 = 08  //十进制的8
    ```

  - 十六进制前缀必须是（0x）开头然后是（0-9 以及 A-F）**不区分大小写**

  ```js
  let num1 = 0xa  //十六进制的10
  let num2 = 0x1f //十六进制的31
  ```

  ```js
  0.1+0.2 = 0.30000000000000004
  
  1.1-1 = 0.10000000000000009
  
  //以上运算会产生精度问题
  //当数值在运算时会先转换成2进制进行运算，展示时在转换成10进制
  ```

  

##### 位操作

###### 按位非。~

```js
let num1 = 25			//0000 0000 0000 0000 0000 0000 0001 1001
let num2 = ~num1	//1111 1111 1111 1111 1111 1111 1110 0110
console.log(num2) //-26
```

按位非的最终效果是对数值取反并减1

###### 按位与**&**

按位与操作符：只有两个数值的对应位都是1才返回1，任何一位是0都返回0

```js
var res = 25&3
//res  1


var num = 25
num.toString(2)
"11001"
var num1 = 3
num1.toString(2)
"11"

25 = 0000 0000 0000 0000 0000 0000 0001 1001
 3 = 0000 0000 0000 0000 0000 0000 0000 0011
------------------------------------------------
     0000 0000 0000 0000 0000 0000 0000 0001
```

###### 按位或 ｜

按位与操作符：只有两个数值的对应位都是0才返回0，任何一位是1都返回1

```js
var res = 25|3
//res  27


var num = 25
num.toString(2)
"11001"
var num1 = 3
num1.toString(2)
"11"

25 = 0000 0000 0000 0000 0000 0000 0001 1001
 3 = 0000 0000 0000 0000 0000 0000 0000 0011
------------------------------------------------
     0000 0000 0000 0000 0000 0000 0001 1011
```

###### 关系操作符

当两个操作数都是字符串的时候，比较对应字符编码值,当有一个位数值时，会对另一个操作数进行数据转换

```js
var result= '23' < '3'
//true

var result= '23' < 3
//false
```

###### 参数传递

```js
function add(num){
  num+=10; 
  return num
}; 
var num = 10;
var res= add(num);

//num 10
//res 20
```

###### 取模操作符 （余数）%

```js
let result = 26%5 //1
```



#### 语句

##### do-while

条件语句后置，循环体内的代码至少执行一次

```js
let i = 0;
do{
  i+=2
  console.log(i)
} while(i<10)
```

##### while

条件语句前置，代码有可能不会执行

```js
let i = 0;
while(i<10){
  i+=2
  console.log(i)
}
```

### 基本引用类型

#### Date

**Date.parse()**方法接受一个表示日期的字符串参数，将该字符串转换为表示改日期的毫秒数

**toLocaleString()** 返回与浏览器运行的本地环境一致的日期和时间

```js
(new Date).toLocaleString()
"2020/11/26 上午10:05:20"
```

**toString()** 返回带时区信息的日期和时间

```js
(new Date).toString()
"Thu Nov 26 2020 10:07:15 GMT+0800 (中国标准时间)"
```

**valueOf()** 被重写后返回的是日期的毫秒数

```js
(new Date).valueOf()
1606356512721

//因此可以直接用操作符使用它返回的值

let date1 = new Date(2019, 1, 1)
let date2 = new Date(2020, 1, 1)
date1>date2 //false
date1<date2	//true
```

日期的格式化方法

**toDateString()**

**toTimeString()**

**toLocaleDateString()**

**toLocaleTimeString()**

**toUTCString()**

这些方法的输出和 **toLocaleString()**和**toString()**都会因浏览器的差异返回的不一致

```js
(new Date).toDateString()
"Thu Nov 26 2020"
(new Date).toTimeString()
"10:13:47 GMT+0800 (中国标准时间)"
(new Date).toLocaleDateString()
"2020/11/26"
(new Date).toLocaleTimeString()
"上午10:14:20"
(new Date).toUTCString()
"Thu, 26 Nov 2020 02:14:34 GMT"
```

#### Number

toFixed() 返回包含指定小数点位数的数值字符串

```js
let n = 10
n.toFixed(2) //"10.00"

let n = 10.005
n.toFixed(2) //"10.01"
```

isInteger() es6新增，用于辨别一个数值是否保存为整数

```js
Number.isInteger(10) //true
Number.isInteger(10.0) //true
Number.isInteger(10.01) //false
```

#### String

charCodeAt() 查看指定码元的字符编码

concat() 用于拼接一个或多个字符串



slice(a,b)  提取字符串a开始到b结束的字符串段

如果参数中有负数，会解析成字符串长度加上负数参数值

substr(a,b) 提取字符串a开始到b个字符串段

如果参数中有负数，第一个参数会解析成字符串长度加上负数参数值，第二个参数会解析为0

substring(a,b) 提取字符串a开始到b结束的字符串段

会将所有的负数转化为0

```js
var str = 'abcdefghigklmnopqrstuvwxyz'
str.slice(2,6)  //"cdef"
str.substring(2,6)  //"cdef"
str.substr(2,6)  //"cdefgh"
```

startsWith()  检查是否以该字符串开头

endsWith()  检查是否以该字符串结尾

includes()  检查整个字符串是否包含



trim() 删除前后所有的空格，不会删除中间的空格

repeat() 将字符串复制多少次



**如果小于指定长度，会在相应的一边填充字符**

padStart()

padEnd()

```js
var msg = 'hello'
msg.padStart(10,'.')  //".....hello"
msg.padEnd(10,'.')    //"hello....."
```

### Global

#### url编码方式

encodeURI() 会对整个uri进行编码

encodeURIComponent() 会对uri中单独的组件进行编码

```js
var uri = 'www.aaa.com/bbb a#b'
encodeURI(uri)  //"www.aaa.com/bbb%20a#b"
encodeURIComponent(uri)  //"www.aaa.com%2Fbbb%20a%23b"
```

decodeURI() 对应解码encodeURI()

decodeURIComponent() 对应解码encodeURIComponent()



### eval

这个方法就是一个js解释器，接受要执行的代码字符串

### Math

#### min()和max()

用于确定一组数值中的最小值和最大值，都可接受多个参数

#### 舍入方法

Math.ceil()  向上舍入为最接近的整数

Math.floor() 向下舍入为最接近的整数

Math.round() 进行四舍五入

Math.fround() 返回数值最接近的单精度浮点数

#### random

Math.random()返回一个0-1的随机数

## 集合引用类型

### Array

 es6新增创建数组的静态方法

#### Array.from() 将类数组结构转换为数组实例

 **<u>(第一个参数可以是任何可迭代的对象)</u>**

第二个可选参数用来映射函数的参数

第三个可选参数用来指定映射函数的this的值

```js
Array.from('hello') // ["h", "e", "l", "l", "o"]

const arr1 = [1,2,3] // [1,2,3]
const arr2 = Array.from(arr1) // [1,2,3]
arr1 === arr2 //false

//第二个可选参数用来映射函数的参数
const arr3 = [1,2,3]
const arr4 =Array.from(arr3).map(i=>i*2) //[2, 4, 6]
//等同于下面
const arr3 = [1,2,3]
const arr4 =Array.from(arr3,i=>i*2)
```

#### Array.of()将一组参数转换为数组

这个方法用户替代之前常用的Array.prototype.slice.call(arguments)

~~~js
Array.of(1,2,3,4) //[1, 2, 3, 4]
~~~

#### 数组空位

es6将数组中的空位都重新定义为了undefined

#### 迭代器方法

keys()

Values()

Entries()

```js
const arr = ['a','b','c','d']
Array.from(arr.keys()) // [0, 1, 2, 3]
Array.from(arr.values()) // ["a", "b", "c", "d"]
Array.from(arr.entries()) //[ [0, "a"], [1, "b"],[2, "c"], [3, "d"]]
```

#### 复制和填充方法

copyWithin()批量复制

fill() 填充数组

~~~js
const arr = ['a','b','c','d']
arr.fill(0) 
arr // [0, 0, 0, 0]

const arr1 = ['a','b','c','d']
arr1.fill(0,2) 
arr1 // ["a", "b", 0, 0]
~~~

#### 栈方法

push() 从数组的最后推入一个或多个元素

pop() 从数组的最后弹出一个或多个元素

#### 队列方法

unshift() 从数组的头部推入一个或多个元素

shift() 从数组的头部弹出一个或多个元素

#### 排序

reverse()将数组的元素**反向**排列

**sort()** 默认将数组的元素**生序**排列

注意⚠️默认 sort会以元素的**编码比较大小排序**

~~~js
var arr = [0, 1, 5, 10]
arr.sort()  //[0, 1, 10, 5]

arr.sort((a,b)=>{
  if(a<b){
    return 1
  }else if(a>b){
    return -1
  }else{
    return 0
  }
}) //[10, 5, 1, 0]
~~~

sort可接受可选参数（比较函数）

#### 操作方法

concat() 拼接数组

slice(a,b) 提取数组中a索引到b索引或者结束位置的元素

splice()

#### 搜索和位置方法

indexOf()

lastIndexOf()

includes() es7新增方法用来判断一个数组是否包含一个指定的值 (用===)

#### 断言函数

find() 返回第一个匹配的元素

findIndex()返回第一个匹配的元素的下标

#### 迭代方法

every()  测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

filter() 创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 

foreach() 对数组的每个元素执行一次给定的函数。

map()  创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。

some() 测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值

#### 归并方法

reduce() 对数组中的每个元素执行一个由您提供的**reducer**函数(升序执行)，将其结果汇总为单个返回值。

reduceRight() 同上反向

```js
const arr = [1, 2, 3, 4];
arr.reduce((prev, cur) => prev + cur) //10
```

### 定型数组

#### ArrayBuffer



```js
const buf = new ArrayBuffer(16);
console.log(buf.byteLength); // 16
```

### map

为js真正的带来了键/值存储机制

与object只能用数字和字符串作为键相比，Map可以使用任何数据类型作为键

```js
const m = new Map([["key1","val1"],["key2","val2"],["key3","val3"]])
//{"key1" => "val1", "key2" => "val2", "key3" => "val3"}
```

set() 添加键/值

get() 获取值

has() 查询

size() 获取数量

delete() 删除

clear() 清除

```js
const m = new Map()

const funk = function name(params) {}

const symk = Symbol()

const objk = new Object()

m.set(funk,()=>{return 123})
m.set(symk,'233')
m.set(objk, {a:233})

//0: {function name(params) {} => ()=>{return 123}}
//key: ƒ name(params)
//value: ()=>{return 123}

//1: "233"
//key: Symbol()
//value: "233"

//2: {Object => Object}
//key: {}
//value: {a: 233}

```

在映射中作为键值的对象以及其他类型的对象在内容被修改时任保持不变

```js

const m = new Map()
const objk = new Object({b:'233'})
const objv =  {a:233}
m.set(objk,objv)

objk.b= '344'
objv.a= 'aaa'
console.log(m); //key: {b: "344"} value: {a: "aaa"}
```

### WeakMap

弱映射 

弱映射的键只能是Object 或者继承自Object的类型

```js
const key1 = {id: 1}
const key2 = {id: 2}
const key3 = {id: 3}

const wm1 = new WeakMap([
    [key1,'val1'],
    [key2,'val2'],
    [key3,'val3'],
])
console.log(wm1);
//0: {Object => "val2"}
//key: {id: 2}
//value: "val2"
//1: {Object => "val3"}
//key: {id: 3}
//value: "val3"
//2: {Object => "val1"}
//key: {id: 1}
//value: "val1"
```

如果要以非Object类型作为键，会报错 **TypeError**，但是原始值可以包装成对象作为键

```js
wm1.set('key4','val4') // TypeError: Invalid value used as weak map key
wm1.set(new String('key4'),'val4')
```

#### 弱键

WeakMap中的键不属于正式的使用，不会阻止垃圾回收，只要键存在，键值对就会存在映射中，并被当作对值的引用，因此就不会被当作垃圾回收

### Set

与Map类似，可以包含任何js数据类型作为值

#### 顺序与迭代

Set会维护值插入时的顺序，因此支持按顺序迭代

集合实例提供一个迭代器，能以插入顺序生成集合内容，可以通过values(), keys(), [Symbol.iterator](), 取到迭代器

```js
const s = new Set(['val1', 'val2', 'val3']);
console.log(s.values); //values() { [native code] }
console.log(s.keys); //values() { [native code] }
console.log(s[Symbol.iterator]); //values() { [native code] }
console.log(s.values === s.keys); //true
console.log(s.values === s[Symbol.iterator]); //true
console.log(s.keys === s[Symbol.iterator]); //true

for (const key of s.keys()) {
    console.log(key); //val1, val2, val3
}
for (const value of s.values()) {
    console.log(value); //val1, val2, val3
}
for (const iterator of s[Symbol.iterator]()) {
    console.log(iterator); //val1, val2, val3
}
```

## 函数

函数实际上是对象，每个函数都是Function类型的实例，而Function也有属性和方法，跟其他引用类型一样，所以函数名就是指向函数对象的指针。

```js
function sum(num1, num2) {
    return num1 + num2
}

let sum = function(num1, num2) {
    return num1 + num2
}

let sum = (num1, num2) => {
    return num1 + num2
}
```

#### 箭头函数

很大程度上箭头函数实例化的函数对象与正式的函数表达式创建的函数对象行为是相同的，任何使用函数表达式的地方，都可以使用箭头函数

```js
const ints = [1,2,3]
ints.map(function(i){return i*2})
ints.map(i=>i*2)
```

#### 函数名

因为函数名就是指向函数的指针，所以一个函数可以有多个名称

#### 理解参数

函数的参数在内部表现为一个数组

在箭头函数中不能使用arguments关键字访问，只能通过定义的命名参数访问

#### 函数声明与函数表达式

函数声明提升：在执行代码时js引擎会先执行一遍扫描，把发现的函数声明提升到源代码树的顶部（var关键字也是一样）因此即使函数定义出现在函数调用之后

```js
console.log(sum(1,2));
function sum(num1, num2) {
    return num1 + num2
}//正常

console.log(sum1(1,2));
let sum1 = function (num1, num2) {
    return num1 + num2
}//会报错

console.log(sum2(1,2));

var sum2 = function (num1, num2) {
    return num1 + num2
}//正常
```

#### 函数内部

**arguments.callee** 指向arguments对象所在函数的指针

如果在下面这种情况下**arguments.callee**会使函数紧密耦合

```js
function factorial(num) {
    if (num <=1 ) {
        return 1
    } else {
        return num * factorial(num-1)
    }
}

let trueFactorial = factorial

function factorial() {
    return 0
}

console.log(trueFactorial(5));//0
console.log(factorial(5));//0
```

```js
function factorial(num) {
    if (num <=1 ) {
        return 1
    } else {
        return num * arguments.callee(num-1)
    }
}

let trueFactorial = factorial

factorial =function () {
    return 0
}

console.log(trueFactorial(5));//120
console.log(factorial(5));//0
```



**new.target**es6新增

如果函数是正常调用的new.target的值为undefined， 如果是使用new关键字调用的，则new.target将引用被调用的构造函数

#### 闭包

指的是哪些引用了另一个函数作用域中变量的函数

**this**

this在函数内部是一个特殊的对象，在标准函数和箭头函数中有不同的行为

在标准函数中，this引用的是把函数当成方法调用的上下文对象，（在网页的全局上下文中，this指向weindows），this到底引用那个对象必须到**函数被调用时才能确定**。因此这个值在代码执行的过程中可能会变。

在箭头函数中，this引用的是定义箭头函数的上下文

#### 属性与方法

函数本身是对象，因此有属性和方法，每个函数都有两个属性：length 和 prototype 

length：函数命名参数的个数

prototype：保存引用类型所有实例的地方，意味着toString(), valueOf()等方法都保存在这里

，然后共享给所有实例

apply， call， bind：

 这三个方法都会以指定的this值来调用函数，就是调用函数时函数体内的this对象的值，apply接收两个参数this的值和一个参数数组，call接收多个参数，第一个是this的值后面就是逐个传递的参数，bind只接受一个参数 this的值

## 第12章： BOM



### window

BOM的核心是window对象，表示浏览器的实例，window对象在浏览器中有两重身份，一个是global对象，一个是浏览器窗口的js接口

- var声明的所有函数，全局变量都会变成window对象的属性和方法
- let，const不会把变量添加给全局对象

#### 窗口位置与像素比

- screenLeft 表示窗口相对于屏幕左侧的位置
- screenTop表示窗口相对于屏幕顶部的位置
- ⚠️  moveTo(x,y) 移动到新的位置坐标为x和y
- ⚠️  moveBy(x,y) 在当前位置移动x，y两个方向

#### 窗口大小

- innerWidth

- innerHeight

  返回浏览器窗口中页面视口的大小(不包含浏览器边框和工具栏)

- outerWidth

- outerHeight

  返回浏览器窗口自身的大小

- document.documentElement.clientWidth

- document.documentElement.clientHeight

  返回页面视口的宽度和高度

#### 视口位置

- window.pageYOffset    ===    window.scrollY

- window.pageXOffset    ===    window.scrolX

  当页面滚动时被卷曲的位置

- scrollTo(0,0)

- scrollBy(0,0)

- scrollTo( { left : 0, top : 200, behavior : 'smooth' } ) 平滑移动

- scrollTo({left:0,top:1000,behavior:'auto'}) 正常移动

  滚动到页面指定位置

#### 导航与打开新窗口

- Window.open() 导航到指定的URL

#### 定时器

js在浏览器中时单线程执行，但是允许使用定时器在某一时间之后或每隔一段时间执行相应的代码

- setTimeout()  指定在一定时间后执行相应代码

- setInterval()  指定每隔一段时间执行某些代码

  第一个参数时要执行的代码，第二个是要等待的毫秒数,返回ID可用于清除

  - clearTimeout()

  - clearInterval()