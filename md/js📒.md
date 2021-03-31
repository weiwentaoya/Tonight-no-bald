# js📒

## 语言基础

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

## 基本引用类型

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

## BOM



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

### location

location提供了当前窗口加载文档的信息，以及通常的导航功能。它既是window的属性，也是document的属性，window.location === document.location

#### location.search 

返回了从问号开始直到URL末尾的所有内容

解析查询字符串方法：

```js
let getQueryString = function(){
  let qs = location.search.length>0 ? location.search.substring(1) : '';
  let args = {}
  for(let item of qs.split('&').map(kv => kv.split('='))) {
    let name = decodeURIComponent(item[0])
    let value = decodeURIComponent(item[1])
    if(name.length){
      args[name]=value
    }
  }
  return args
}
```

#### 操作地址

location.assign('http://www.baidu.com')

Window.location = 'http://www.baidu.com'

location.href = 'http://www.baidu.com'

location.assign会立即启动导航到新的URL的操作，也会在浏览器历史记录中增加一条记录，当调用Window.location和location.href都会执行与显示调用location.assign一样的操作

location.replace( 'http://www.baidu.com')重新加载后不会增加历史记录，用户不能点击后退返回到前一页

location.reload()重新加载当前页面，可以传true，会强制从服务器重新加载

### navigator

navigator对象属性通常用于确定浏览器的类型

#### window.navigator.plugins

获取当前浏览器安装的所有插件

### screen

保存客户端能力信息，也就是显示器的信息，设备信息

### history

保存了当前窗口首次使用以来用户的导航历史记录

history.go(1) 前进一页

history.go(2) 前进两页

history.go(-1) 后退一页

history.go('http://www.baidu.com') 导航到最近的baidu页面

history.back() 后退一页

history.forward() 前进一页

history.length 历史记录总条数

#### 历史状态管理

hashchange 会在页面URL的散列变化时被触发

pushState 在历史记录中推入新的相对URL

popstate 在历史记录中推出,相当于点击后退

## DOM

### dom节点层级

nodeType 节点类型

nodeName 节点名称

nodeValue 

childNodes 所有的子元素

parentNode 父元素

previousSibling 上一个兄弟元素

nextSibing 下一个兄弟元素

hasChildNodes() 判断是否有子节点

ownerDocument 指向代表整个文档节点的指针

appendChild() 在childNodes列表末尾添加节点,如果把文档中已经存在的节点传给appendChild()，则这个节点会从之前的位置被转移到新位置

insertBefore() 第一个参数为新节点，第二个位被参照的节点，新节点会被插入到被参照节点之前的位置，如果被参照节点为null，则会被插入到最后，同appendChild()

replaceChild() 第一个参数为新节点，替换第二个参数为旧节点

removeChild() 移除当前的节点

cloneNode() 复制节点，接受为布尔值的参数，表示是否深复制。只会复制html属性，不会复制节点的javascript属性，比如时间处理程序

#### Document类型

Document类型是表示整个HTML页面

- nodeType 9
- nodeName '#document'
- nodeValue null
- parentNode null
- ownerDocument null

文档信息：

1. title 浏览器窗口或标签页的标题栏
2. url 完整的url
3. domain 域名
4. referrer 来源

定位元素

1. document.getElementById()
2. document.getElementByTagName()
3. ...

#### Element类型

- nodeType 1
- nodeName 元素的标签名
- nodeValue null
- parentNode Document 或Element对象

属性操作：

1. getAttribute()
2. setAttribute()
3. removeAttribute()

 createElement() 创建元素

#### Text类型

- nodeType 3
- nodeName  '#text'
- nodeValue 节点包含的文本
- parentNode Element对象

Text节点包含的文本可以通过nodeValue属性访问或修改，也可以通过data属性访问或修改

操作方法：

1. appendData(text) 向节点末尾添加文本text
2. deleteData(offset, count) 从位置offset开始删除count个字符
3. insertData(offset, text) 从位置offset开始插入text
4. replaceData(offset, count, text) 用text替换位置offset到 offset+count的文本
5. splitText(offset) 在位置offset将当前文本节点拆分为两个文本节点
6. substringData(offset, count)提取位置offset到 offset+count的文本
7. length === nodeValue.length === data.length 获取文本节点中包含字符的数量

createTextNode() 创建文本节点

normalize() 合并相邻的文本节点(在父节点调用，合并所有的相邻的子文本节点)

splitText(count) 从count位置处把当前文本节点拆分成两个文本节点

#### Comment类型

Comment类型表示Dom中的注释

- nodeType 8
- nodeName  '#comment'
- nodeValue 注释的内容
- parentNode Document 或Element对象

#### CDATASection类型

CDATASection类型表示特有的CDATA区块

- nodeType 4
- nodeName  '#cdata-section'
- nodeValue CDATA区块的内容
- parentNode Document 或Element对象

#### DocumentType类型

DocumentType类型包含文档的文档类型(doctype)

- nodeType 10
- nodeName  文档类型的名称
- nodeValue null
- parentNode Document对象

#### DocumentFragment类型

DocumentFragment类型表示文档碎片，虚拟dom的

- nodeType 11
- nodeName  '#document-fragment'
- nodeValue null
- parentNode null

createDocumentFragment() 创建文本片段

#### Attr类型

Attr类型表示DOM中的元素数据

- nodeType 2
- nodeName  属性名
- nodeValue 属性值
- parentNode Document对象

### DOM编程

#### MutationObserver接口

MutationObserver接口用来 观察文档，DOM树，某个元素，的属性，节点，文本等的变化

MutationObserverInit对象的属性

- subtree 布尔值 是否观察目标节点的字节点
- attributes 布尔值 是否观察目标节点的属性变化
- attributeFilter 字符串数组 要观察那些属性的变化， true表示所有属性
- attributeOldValue 布尔值 是否记录之前的属性值
- characterData 布尔值 表示修改字符数据是否触发改变
- characterDataOldValue 布尔值 是否记录变化之前的字符数据
- childList 布尔值 表示修改目标字节点是否触发变化

1. observe()方法

   ```js
   let observer = new MutationObserver(
      (MutationRecord,MutationObserver)=>{
        console.log('<div> change')
      }
   )
   observer.observe(document.querySelector('#list'), {attributes: true})
   document.querySelector('#list').className='lists'
   console.log('change class list to lists');
   
   //'change class list to lists'
   //'<div> change'
   ```

   

执行上面代码，发现MutationObserver中的回调函数是后执行的，因为MutationObserver重的回调函数是异步执行的

每个回调函数都会收到一个MutationRecord实例的数组，包含dom的变化状态，以及相关信息,第二个参数为MutationObserver实例

2.disconnect()方法

默认情况下，只要被观察的元素不会被垃圾回收，MutationObserver中的回调就会一直被响应，disconnect()可以提前终止执行回调，⚠️如果已经加入任务队列的回调，要在下个任务队列里终止执行(setTimeout).

```js

let observer = new MutationObserver(
   (MutationRecord,MutationObserver)=>{
     console.log('<div> change')
   }
)
observer.observe(document.querySelector('#list'), {attributes: true})
document.querySelector('#list').className='lists'
console.log('change class list to lists');
observer.disconnect() //会终止执行MutationObserver的回调
//'change class list to lists'
```

## DOM扩展

### Selectors API

1. querySelector() 接受css选择符参数，返回匹配该模式的第一个后代元素，没有匹配到返回null
2. querySelectorAll() 同querySelector()，返回的是NodeList的静态实例
3. matches() 在规范草案中称为matchesSelector()， 接受一个css选择符参数，如果元素匹配到返回true，否则返回false

### 元素遍历

由于IE9之前的差异问题，新增5个属性

1. childElementCount 返回子元素数量
2. firstElementChild 指向第一个Element类型的子元素
3. lastElementChild 指向最后一个Element类型的子元素
4. previousElementSibling  指向前一个Element类型的同胞元素
5. nextElementSibling 指向后一个Element类型的同胞元素

### HTML5

#### css类扩展

1. getElementsByClassName() 接受一个参数，包含一个或多个类名的字符串，返回包含相应类的元素的NodeList
2. classList属性
   - add(value) 向类名列表中添加指定的字符串值
   - contains(value) 返回布尔值，表示给定的value是否存在
   - remove(value) 从类名列表中删除指定的字符串值
   - toggle(value)  切换删除和添加指定的字符串值

#### 焦点管理

document.activeElement 包含当前拥有焦点的DOM元素，默认情况下在页面加载完毕之后会设置document.body为默认获得焦点的元素，

document.hasFocus() 返回布尔值，表示文档是否拥有焦点

#### HTMLDocument扩展

1. document.readyState 返回以下两个值，表示文档的加载状态

   - loading 表示文档正在加载
   - complete 表示文档加载完成

2. document.compatMode 返回以下两个值，表示当前的渲染模式

   - css1Compat 标准模式
   - backCompat 混杂模式

3. head属性

   document.head指向了文档的<head>元素

#### 字符集属性

可通过document.characterSet获取或者设置当前文档的字符集属性

#### 自定义属性dataset

元素中通过 data-xx="" 来表示

也可通过元素.dataset.xx来设置或获取

#### 插入标记

1. innerHTML 读取或设置元素所有的后代HTML，⚠️读取或写入的时候会因为各浏览器之间的差异关系而有所不同

2. outerHTML读取或设置调用它的元素以及所有的后代元素

3. insertAdjacentHTML()和insertAdjacentText()插入标签或元素，接受两个参数，第一个为以下中的值

   - 'beforebegin' 插入当前元素的前面，作为前一个同胞节点
   - 'afterbegin' 插入当前元素内部，作为新的字节点或放在第一个字节点前面
   - 'beforeend' 插入当前元素内部，作为新的字节点或放在最后一个字节点后面
   - 'afterend' 插入当前元素后面，作为下一个同胞节点

4. 内存与性能问题

   在使用以上方法替换字节点可能在浏览器中导致内存问题(热别是ie)

   比如，被移除的元素之前有关联的事件处理程序或其他的javaScript对象，那么他们之间的绑定关系会滞留在内存中，如果频繁操作，页面中内存占用就会持续攀升。

5. 跨站点脚本

   innerHTML虽然不会执行自己创建的<script>标签，但是用户也可以创建元素并执行事件，为了防止XSS攻击，在插入数据前使用相关库对它们进行转义

#### scrollIntoView()

scrollIntoView()方法存在于HTML元素上，可以滚动浏览器窗口或容器元素以便包含元素进入视口，参数如下：

- alignToTop 布尔值
  - true：窗口滚动后元素的顶部于视口的顶部对其
  - false：窗口滚动后元素的底部与视口的底部对其
- scrollIntoViewOptions 是一个选项对象
  - behavior：定义过度动画，可选值为'smooth','auto'
  - block: 定义垂直方向的对齐，可取值为 'start','center','end','nearest'
  - inline: 定义水平方向的对齐，可取值为 'start','center','end','nearest'

#### 专有属性

1. children属性 包含元素的字类型
2. contains() 确定传入的元素是不是另一个元素的后代





## 事件

### 事件流

#### 事件冒泡

ie事件流被称为事件冒泡，这是因为事件被定义为从具体的元素开始触发，然后向上传播至没有那么具体的元素

```html
<html>
  <body>
    <div id="mydiv">
      Click Me
    </div>
  </body>
</html>
<!-- 在此dom结构中，当id为"mydiv"的元素触发事件时，会依次往这个dom树的顶层依次触发 -->
<!--
1.div
2.body
3.html
4.document
5.window 
-->
```

#### 事件捕获

Netscape团队提出的另一种名为事件捕获的事件流，与IE的冒泡相反是从顶层往下到具体的元素依次触发

```html
<!--
1.document
2.html
3.body
4.div
-->
```

#### DOM事件流

DOM2规范规定事件流分为三个阶段：事件捕获，到达目标，事件冒泡。事件捕获最先发生，为提前拦截事件提供了可能

### 事件处理程序

#### DOM2事件处理程序

下面两个方法用来添加或移除监听方法，接受三个参数：事件名、事件处理函数、一个布尔值，true表示在捕获阶段调用，false(默认值)表示在冒泡阶段调用

大多数情况下，事件会被添加到事件流的冒泡阶段，，因为兼容性好

- addEventListener()
- removeEventListener()

#### IE事件处理程序

IE实现了与上面dom中类似的方法

attachEvent()

detachEvent()

### 事件对象

DOM发生事件时，所有的相关信息都会被收集并存储在event对象中,而在IE中event对象会被保存在window

#### 事件对象

在事件处理内部，this对象始终等于event.currentTarget的值，而target只包含事件的实际目标，

preventDefault()用于组织事件的默认动作

```js
let link = document.getElementById('mylink')
link.onclick = function(event){
  event.preventDefault()
}
```

###  事件类型

#### 用户界面事件

用户界面事件或UI事件不一定跟用户操作有关。

- DOMActivate：元素被用户通过鼠标或键盘操作激活时触发**~~(已被废弃)~~**。
- load：在window上页面加载完毕后触发，在img元素上当图片加载完成后触发，在object元素上当相对应对象加载完成后触发
- unload：在window上当页面完全卸载后触发，在object元素上当相应对象卸载完成后触发
- abort：在object元素上当相应对象加载完成前被用户提前终止下载时触发
- error：在window上当javascript报错时触发，在img元素上当图片无法加载时触发，在object元素上当相对对象无法加载时触发
- select：在文本框(<input>,<textarea>)上当用户选择了一个或多个字符时触发
- resize：当window或窗格上当窗口或窗格被缩放时触发
- scroll：当用户滚动包含滚动条的元素时在元素上触发，<body>元素包含已加载页面的滚动条

#### 焦点事件

焦点事件在页面元素获得或失去焦点时触发，这些事件可以与document.hasFocus()和doxument.activeElement()一起为开发者提供用户在页面中导航的信息

- blur：当元素失去焦点时触发，不冒泡
- focus：当元素获得焦点时触发，不冒泡
- focusin：当元素获得焦点时触发，是focus的冒泡版
- focusout：当元素失去焦点时触发，是blur的冒泡版

#### 鼠标和滚轮事件

- click：用户单机鼠标主键(通常是左键)时触发
- dbclick：用户双机鼠标主键(通常是左键)时触发
- mousedown：当用户按下任意鼠标键时触发
- mouseenter：当用户把光标从元素外部移到元素内部时触发
- mouseleave：当用户把光标从元素内部移到元素外部时触发
- mousemove：当元素光标在元素上移动时反复触发
- mouseout：当用户把鼠标光标从一个元素移到另一个元素上时触发
- mouseover：当用户把鼠标光标从元素外部移到元素内部时触发
- mouseup：当用户释放鼠标键时触发

页面中所有的元素都支持鼠标事件。除了mouseenter,mouseleave，所有的事件都会冒泡，都可以被取消。

##### 客户端坐标

客户端坐标是事件发生时鼠标光标在客户端视口中的坐标

鼠标事件都是在浏览器视口中的某个位置上发生的，这些信息都被保存在event对象的clientX和clientY属性中

##### 页面坐标

页面坐标是事件发生时鼠标光标在页面上的坐标，通过event对象的pageX和pageY可以获取，这两个属性表示光标在页面上的位置，因此反映的是光标到页面而非视口左边与上边的距离。

在页面没有滚动时，pageX和pageY与clientX和clientY的值相同

##### 鼠标坐标

鼠标事件不仅仅是在浏览器窗口中发生的，也是在整个屏幕上发生的，可以通过event对象的screenX和screenY属性获取鼠标在屏幕上的光标

##### 修饰键

键盘上的修饰键Shift、Ctrl、Alt、和Meta经常用于修改鼠标事件的行为，DOM规定了4个属性来表示这几个修饰键的状态：shiftKey、ctrlKey、altKey、MetaKey。在event对象上这几个属性会在各自的修饰键被按下时为true，没有被按下时为false

##### 相关元素

对mouseover和mouseout事件而言，还存在相关元素的其他元素，这两个事件都涉及从一个元素的边界之内把光标移到另一个元素的边界之内，对于mouseover而言，时间的主要目标是获得光标的元素，相关元素是失去光标的元素，对于mouseout，事件的主要目标是失去光标的元素，相关元素就是获得光标的元素

##### 鼠标按键

只要在元素上单击鼠标主键时click事件才会触发，因此按键信息不是必须的，对mousedown和mouseup事件来说，event对象上会有一个button属性，表示按下或释放的是哪个键：0表示鼠标主键，1表示鼠标中键(通常是滚轮键)，2表示鼠标副建

##### 额外事件信息

在event属性上提供了detail属性，表示在给定位置上发生了多少次单击，每次单击会加1，如果mousedown和mouseup之间移动了，则detail会重置为0.

**IE还为鼠标提供了以下额外信息**

altLeft：布尔值，表示是否按下了左Alt键

ctrlLeft：布尔值，表示是否按下了左Ctrl键

offsetX：光标相对于目标元素边界的x坐标

offsetY：光标相对于目标元素边界的y坐标

shiftLeft：布尔值，表示是否按下了左Shift键

##### mousewheel事件

mousewheel事件会在用户使用鼠标滚轮时触发，这个事件会在任何元素上触发，并冒泡到document和window，mousewheel事件的event对象包含鼠标事件的所有标准信息，还有一个wheelDelta的新属性。当鼠标滚轮向前滚动时，wheelDelta每次都是+120，向后滚动时每次都是-120

##### 触摸屏设备

因为触摸屏通常不支持鼠标操作，要注意以下事项

- ​	不支持dbclick。双击浏览器窗口可以放大，但没有方法覆盖这个行为
- 单指点触屏幕的可点击元素会触发mousemove事件。如果操作会导致内容变化，则不会触发其他事件
- mousemove事件也会触发mouseover和mouseout事件
- 双指点触屏幕并滑动导致页面滚动时会触发mousewheel和scroll事件



### 键盘与输入事件

键盘事件包含3个事件

- keydown：用户按下键盘上某个键时触发，持续按住会重复触发
- keypress：用户按下键盘上某个键并产生字符时触发，而且持续按住会重复触发。DOM3 Events废弃了keypress事件，推荐textInput事件
- keyup：用户释放键盘上某个键时触发

输入事件只有一个textInput。这个事件是对keypress的扩展，用于文本显示给用户之前更方便的截获文本输入，textInput会在文本被插入到文本框之前触发。

#### 键码

对于keydown和keyup事件，event对象的keyCode属性中会保存一个键码，对应键盘上特定的一个键

#### 字符编码

浏览器在event对象上支持charCode属性，只有发生keypress事件时这个属性才会被设置为按键字符对应的ASCII编码

#### textInput事件

textInput事件只要关注字符，所以在event对象上提供了一个data属性，包含要插入的字符。data的值始终是要被插入的字符，

event对象上还有一个名为inputMethod的属性，表示向控件中输入文本的手段

- 0：表示不确定
- 1：表示键盘
- 2：表示粘贴
- 3：表示拖放操作
- 4：表示IME
- 5：表示表单选项
- 6：表示手写
- 7：表示语音
- 8：表示组合方式
- 9：表示脚本

#### HTML5事件

##### contextmenu事件

contextmenu事件专门表示上下文菜单（在Windows上是右击鼠标，在Mac上是Ctrl+单击或者右击鼠标）允许开发者取消默认的上下文菜单并提供自定义菜单

```js
app.addEventListener('contextmenu',(event)=>{
    console.log(event);
    event.preventDefault()
})
```

##### beforeunload事件

beforeunload事件会在window上触发，用意是给开发者提供页面被卸载的机会

```js
window.addEventListener('beforeunload',(event)=>{
    let message = '...';
    event.returnValue = message;
    console.log(event);
    return message;
})
```

##### DOMContentLoaded事件

window的load事件会在页面完全加载完后触发，要等待外部资源的加载，DOMContentLoaded事件会在Dom加载完成后触发

##### readystatechange事件

readystatechange事件提供文档或元素加载状态的信息，但是行为有时候不太稳定，支持readystatechange事件的每个对象都有一个readyState属性，包含以下内容：

- uninitialized：对象存在并尚未初始化
- loading：对象正在加载数据
- loaded：对象已经加载完数据
- interactive：对象可以交互，但尚未加载完成
- complete：对象加载完成

##### pageshow与pagehide事件

往返缓存的功能，旨在使用浏览器使用“前进”和“后退”按钮时加快页面之间的切换，不仅存储页面数据，还存储DOM和javascript状态，如果页面在缓存中，导航到这个页面就不会触发load事件

##### hashchange事件

hashchange事件用于在URL散列值（URL最后#后面的部分）发生变化时触发

```js
window.addEventListener('hashchange',(event)=>{
    console.log(event);
})
```

#### 设备事件

##### orientationchange事件

iOS设备支持orientationchange事件，方便开发者判断用户设备是处于垂直模式还是水平模式，并且在window上爆露了window.orientation属性，有以下三个值

- 0:表示垂直模式
- 90:表示左转水平模式(主屏幕键在右侧)
- -90:表示右转水平模式(主屏幕键在左侧)

##### deiceorientation事件

deiceorientation事件反映设备在3D空间中的朝向

##### devicemotion事件

devicemotion事件可以用来确定设备正在掉落或者正拿着一个行走的人手里

当devicemotion事件触发时，event对象包含以下属性

- acceleration：对象，包含x，y，z，反映不考虑重力情况下各个维度的加速信息
- accelerationIncludingGravity：对象，包含x，y，z，反映各个维度的加速信息，包含z轴自然重力加速度
- interval：毫秒，距离下次触发devicemotion事件的时间
- rotationRate：对象，包含alpha、beta、gamma属性，表示设备朝向

#### 触摸及手势事件

##### 触摸事件

- touchstart：手指放到屏幕上时触发
- touchmove：手指在屏幕上滑动时连续触发。这个事件中调用preventDefault()可以阻止滚动
- touchend：手指从屏幕上移开时触发
- touchcancel：系统停止跟踪时触发。文档中并未明确什么情况下停止跟踪

这些事件都会冒泡，每个事件的event都提供了鼠标事件的公共属性

### 内存与性能

#### 事件委托

过多事件处理程序的解决方案是使用事件委托，事件委托利用事件冒泡，可以只使用一个事件处理程序来管理一种类型的事件

```html
<ul id="lists">
  <li>11111</li>
  <li>22222</li>
  <li>33333</li>
</ul>
<!--在以上结构中如果要给li元素添加事件，无需给每个li元素添加事件，如果li有无穷多个的时候就会做无穷多次同样的事情-->
<script>
	lists.addEventListener('click', event=>{
		console.log(event.target)
	})
</script>
<!-- 这里只需要给父元素添加一个事件处理程序，通过事件冒泡额度机制，最终都会由这个函数来处理 -->
```

#### 删除事件处理程序

当把事件处理程序指定给元素后，在浏览器代码和负责页面交互的javascript代码之间就建立了联系，这种联系建立的越多，性能就会愈差。除了通过事件委托来限制这种连接之外，还应该及时的删除不用的事件处理程序。很多web性能不佳都是由于无用的事件处理程序长驻内存导致的

导致这个问题的主要原因有两个。

1、删除带事件处理程序的元素。比如通过真正的dom方法removeChild()或replaceChild()删除节点。

2、最常见的还是使用innerHTML替换页面的某一部分

这时候被删除的元素上如果有事件处理程序，就不会被垃圾收集程序正常清理,所以在知道某个元素被删除前，手动删除它的事件处理程序

### 模拟事件

#### DOM事件模拟

任何时候，都可以使用document.createEvent()方法创建一个event对象，接送一个参数：

'UIEvents'(DOM3中是'UIEvent')：通用用户界面事件(鼠标事件和键盘事件都继承自这个事件)

'MouseEvents'(DOM3中是'MouseEvent')：通用鼠标事件

'HTMLEvents'(DOM3中没有)：通用HTML事件(HTML事件已经分隔到了其他事件大类中)

事件模拟的最后一步时触发事件 dispatchEvent()方法，接受一个参数，表示要触发的event对象，调用后便会冒泡触发事件处理程序

## json

json是一种数据格式，而不是编程语言，JSON不属于javascript，他们只是拥有相同的语法，很多语言都支持的一种通用数据格式

### 语法

json语法支持表示三种类型的值

1. 简单值：字符串、数值、布尔值、和null可以在json中出现，就像在javascript一样，特殊值undefined不可以
2. 对象：复杂数据类型，对象表示有序的键值对
3. 数组：复杂数据类型

json没有变量、函数或对象实例的概念，所有的记号只为表示结构化数据

### 解析与序列化

stringify() ：将JavaScript对象序列化为一个json字符串

parse() ：将json解析为原声的JavaScript值

## 网络请求与远程资源

### XMLHttpRequest对象

#### 使用XHR

⚠️：只能访问同源URL，否则会抛出安全错误

使用XHR对象首先要调用open()方法。表示做好发送前的准备接受三个参数：请求类型、请求URL、以及请求是否异步的布尔值。

然后是send()方法，接受一个参数，作为请求体发送的数据，如果不发送请求体，则必须传null。因为这个参数在某些浏览器是必须的。调用send()之后，请求就会发送到服务器。

因为这个请求是同步的，所以JavaScript代码会等待服务器响应之后再继续执行，收到响应后，XHR对象的以下属性会被填充

- responseText：作为响应体返回的文本
- responseXML：如果响应的内容类型是'text/xml'或'application/xml',那就是包含响应数据的XML DOM文档
- status：响应的HTTP状态
- statusText：响应的HTTP状态描述

大多数情况下最好使用异步请求，这样可以不阻塞javaScript代码继续执行。XHR对象有一个readystate属性，表示当前处在哪个阶段

- 0：未初始化。尚未调用open()方法
- 1:  已打开。已调用open()方法，尚未调用send()方法
- 2：已发送。已调用send()方法，尚未收到响应
- 3：接受中。已经收到部分响应
- 4：完成。已经收到所有响应，可以使用了

每次deadyState从一个值变成另一个值，都会触发readystatechange事件，可以借此机会检查readyState的值

```js
let xhr = new XMLHttpRequest();
xhr.onreadtstatechange = function() {
  if(readyState == 4){
   //表示请求成功或失败，已完成响应
  }
}
xhr.open('get','example.php',true);
xhr.send(null)
```

在收到响应之前如果想取消异步请求，可以调用abort()方法

```js
xhr.abort()
//调用这个方法，XHR对象会停止触发事件。由于内存问题，不推荐重用XHR对象
```

#### HTTP头部

每个http请求和响应都会携带一些头部字段，这些字段可能会对开发者有用，xhr对象会通过一些方法暴漏与请求和响应相关的头部字段。

默认情况下，XHR请求会发送以下头部字段

- Accept：浏览器可以处理的内容类型
- Accept-Charset：浏览器可以显示的字符集
- Accept-Encoding：浏览器可以处理的压缩编码类型
- Accept-Language：浏览器使用的语言
- Connection：浏览器与服务器的连接类型
- Cookie：页面中设置的Cookie
- Host：发送请求的页面所在的域
- Referer：发送请求的页面的URL。注意，这个字段在http规范中拼错了，争取的是Referrer
- User-Agent：浏览器的用户代理字符串

以上是默认的字段，如果要发送额外的请求头部，使用setRequestHeader()，注意必须在open()之后、send()之前调用

```js
let xhr = new XMLHttpRequest();
xhr.onreadtstatechange = function() {
  if(readyState == 4){
   //表示请求成功或失败，已完成响应
  }
}
xhr.open('get','example.php',true);
xhr.setRequestHeader("MyHeader","HeaderValue")
xhr.send(null)
```

服务器通过可以通过自定义头部可以确定适当的操作。自定义头部一定要区别于浏览器正常头部的发送，否则可能会影响服务器正常响应，有些浏览器允许重写默认头部，有些浏览器则不允许

可以使用getResponseHeader()获取响应头部

getAllResponseHeaders()方法获取包含所有响应头部的字符串

#### XMLHttpRequest Level2

##### FormData类型

FormData类型便于表单序列化，也便于创建与表单类似格式的数据然后通过XHR发送

```js
let data = new FormData()
data.append("name","Nicholas")
```

append()方法接受两个参数，键和值。

<u>**此外，通过直接给FormData构造函数传入一个表单元素，也可以将表单中的数据作为键值对填充进去**</u>

##### 超时

XHR对象上添加一个timeout属性，用于表示发送请求后等待多少毫秒，如果响应不成功就中断，并触发timeout事件，readyState仍然会变成4

```js
let xhr = new XMLHttpRequest();
xhr.onreadtstatechange = function() {
  if(readyState == 4){
   //表示请求成功或失败，已完成响应
  }
}
xhr.open('get','example.php',true);
xhr.timeout = 1000; //设置为1000毫秒，1秒
xhr.ontimeout = function() {
  console.log('1秒后没有响应')
}
xhr.send(null)
```

overrideMimeType()方法

overrideMimeType()方法用于重写XHR响应的MIME类型

```js
let xhr = new XMLHttpRequest()
xhr.open('get','example.php',true);
xhr.overrideMimeType("text/xml")
xhr.send(null)
```

以上例子强制让XHR把响应当成XML而不是纯文本来处理。为了正确覆盖响应的MIME类型，必须在调用send()之前调用xhr.overrideMimeType("text/xml")

### 进度事件

进度相关的事件

- loadstart：在接受到响应的第一个字节时触发。
- progress：在接受响应期间反复触发。
- error：在请求出错时触发
- abort：在调用abort()终止连接时触发
- load：在成功接受完响应时触发
- loadend：在通信完成时，且在error、abort或load后触发

每个请求都会首先触发loadstart，之后是一个或多个progress事件，接着时error、abort、或load中的一个，最后以loadend结束

#### progress事件

在浏览器接受数据期间，这个事件会反复触发，每次触发时，onprpgress事件都会收到event对象，其target属性时XHR对象，且包含三个属性：lengthComputable、position、totalSize。

lengthComputable：布尔值，表示进度信息是否可用

position：接收到的字节数

totalSize：响应的Content-Length头部定义的总字节数

一般这些信息用于展示进度条

### 跨源资源共享

通过XHR进行Ajax通信的一个主要限制是跨源安全策略。默认情况下，XHR只能访问与发起请求的页面在同一个域内的资源。这个安全限制可以防止某些恶意行为。

对于简单的请求，没有自定义头部，而且请求体是text/plain类型，这样的请求在发送时会有一个额外的头部叫做Origin。Origin头部包含发送请求的页面的源（协议、域名、端口），以便于服务器提供响应

```js
Origin: http://www.nczonline.net
```

如果服务器决定响应请求，那么应该发送Access-Control-Allow-Origin头部，包含相同的源；或者资源是公开的，那么就包含"*"

```js
Access-Control-Allow-Origin: http://www.nczonline.net
```

如果没有这个头部，或者源不匹配，则表明不会响应浏览器请求。否则，服务器就会处理这个请求。注意，无论请求还是响应都不会包含cookie信息

跨域XHR对象允许访问status和statusText属性，也允许同步请求，出于安全考虑，也有一些额外的限制

- 不能使用setRequestHeader()设置自定义头部
- 不能接受和发送cookie
- getAllResponseHeaders()方法始终返回空字符串

#### 预检请求

CORS通过一种叫预检请求的服务器验证机制，允许使用自定义头部，除了GET、POST之外的方法，以及不同请求体内容类型。在要涉及及上述

某种高级选项的请求时，会先向服务器发送一个预检请求。这个请求使用OPTIONS方法发送并包含以下头部

- Origin：与简单请求相同
- Access-Control-Request-Method：请求使用的方法
- Access-Control-Request-Headers：可选、要使用的逗号分隔的自定义头部列表

在这个请求发送后，服务器可以确定是否允许这种类型的请求

预检请求返回后，结果会按响应指定的时间进行缓存

#### 凭据请求

默认情况下，跨源请求不提供（cookie、HTTP认证和客户端SSL证书）。可以通过将withCredentials属性设置为true来表明请求还会发送凭据，如果服务器允许带凭据的请求，那么可以在响应中包含如下HTTP头部：

```js
Access-Control-Allow-Credentials: true
```

### 替代性跨源技术

#### 图片探测

图片探测是利用<img>标签实现跨域通信的一种技术

```js
let img = new Image();
img.onload = img.onerror = function () {
  alert('done!')
}
img.src = "http://www.example.com/test/name=Nicholas"
```

图片探测的缺点是只能发送GET请求和无法获取服务器响应的内容（单向通信）

#### JSONP

```js
function handleResponse(response){
  console.log(response)
}
let script = document.createElement('script')
script.src = "http://freegeoip.net/json/?callback=handleResponse"
document.body.insertBefore(script, document.body.firstChild)
```

相对于图片，JSONP可以访问响应数据，但是也有一些缺点

1、JSONP是从不同的域拉取可执行的代码，如果这个域不可信，可能会被加入恶意内容

2、JSONP请求不能确定是否失败

### Fetch API

Fetch API能够执行XMLHttpRequest对象的所有任务，但更容易使用，接口也更现代化，Fetch API必须时异步

#### 基本用法

fetch()方法是暴漏在全局作用域中的，包括主页面执行线程、模块和工作线程。调用这个方法，浏览器就会向给定的URL发送请求

##### 分派请求

fetch()只有一个必须的参数，是要获取资源的URL，这个方法返回一个期约

```js
let r = fetch('https://api.juejin.cn/user_api/v1/user/get?aid=2608&user_id=4406498336442967&not_self=1')
console.log(r) //Promise {<pending>}
```

请求完成、资源可用时，期约会返回一个Response对象。这个对象是API的封装，可以通过它获取资源

```js
let r = fetch('https://api.juejin.cn/user_api/v1/user/get')
r.then(
  (response)=>{
  	console.log(response) //Response {type: "cors", url...}
  }
)
```

##### 读取响应

读取响应内容的最简单方式是取得纯文本格式的内容，要用到text()方法，返回一个期约

```js
let r = fetch('https://api.juejin.cn/user_api/v1/user/get?aid=2608&user_id=4406498336442967&not_self=1')
r.then(
  response=>response.text()
).then(
  data=>console.log(data)//字符串内容
)
```

##### 处理状态码和请求失败

Fetch API支持通过Response的status和statusText属性检查响应状态，成功为200，不存在为404，服务器报错为500

因为服务器没有响应而导致的浏览器超时，这样真正的fetch()失败会导致期约被拒绝



```js
let r = fetch('https://api.juejin.cn/user_api/v1/user/get')
r.then(
  (response)=>{
  	console.log(response) //Response {type: "cors", url...}
  },(err)=>{
    console.log(err)
  }
)
```

##### 自定义选项

自定义选项键如下

- body
- cache
- credentials
- headers
- integrity
- keepalive
- method
- mode
- redirect
- referrer
- referrerPolicy
- signal

#### 常见的Fetch请求模式

发送请求体时必须使用一种HTTP方法

##### 发送JSON数据

```js
let payload = JSON.stringfy({foo:'bar'})
let headers = new Headers({
  'Content-Type': 'application/json'
})
fetch('send-json',{
  method: "post",
  body: payload,
  headers: headers
})
```

##### 在请求体中发送参数

```js
let payload = 'a=1&b=2'
let headers = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
})
fetch('send-params',{
  method: "post",
  body: payload,
  headers: headers
})
```

##### 发送文件

```js
let formData = new FormData

fetch('upload',{
  method: "post",
  body: formData,
})
```

##### 加载Blob文件

```js
let imgElement = document.querySelector('img')

fetch('image.png')
.then(res=>res.blob())
.then(blob=>{
  imgElement.src = URL.createObjectURL(blob)
})
```

##### 发送跨源请求

发送跨源请求会失败并抛出错误

如果代码不需要访问响应可以发送no-cors请求.这种方式适合探测请求或着提前缓存的请求

```js
let r = fetch('https://api.juejin.cn/user_api/v1/user/get1',{method:'no-cors'})
r.then(response=>console.log(response))
```

##### 中断请求

AbortController/AbortSignal可以用来中断请求

```js
let abortController = new AbortController();
fetch('wikipedia.zip',{signal: abortController.signal })
.catch(()=>console.log(aborted!))
       
setTimeout(()=>{
  abortController.abort()
},10000)
```

#### Headers对象

Headers对象是所有外发请求和入站响应头部的容器，每个外发的Request实例都包含一个空的Headers对象，可以通过Response.prototype.headers访问包含着响应头部的Headers对象。这两个属性是可以修改的，另外，也可以使用new Headers来创建一个新的实例

##### Headers 与 Map 的相似之处

```js
let h = new Headers();
//设置
h.set('foo','bar')
//检查
console.log(h.has('foo')) //true
//获取
h.get('foo') //bar
//删除
h.delete('foo')

//使用可迭代对象来创建初始值
let seed =[['foo','bar'],['baz','qux']]
let h = new Headers(seed)
h.get('foo') //bar
h.get('baz') //qux


let m = new Map();
//设置
m.set('foo','bar')
//检查
console.log(m.has('foo')) //true
//获取
m.get('foo') //bar
//删除
m.delete('foo')

//使用可迭代对象来创建初始值
let seed =[['foo','bar'],['baz','qux']]
let m = new Map(seed)
m.get('foo') //bar
m.get('baz') //qux
```

##### Headers独有的特性

Headers与Map并不是处处一样。

Headers对象初始化时还可以用键值对形式

```js
let seed = {'foo':'bar'}
let h = new Headers(seed);
h.get('foo') //bar

let m = new Map(seed)
//TypeError: object is not iterable
```

一个HTTP头部字段可以有多个值，而Headers对象通过append()方法支持添加多个值

```js
let h = new Headers()
h.append('foo','bar')
h.get('foo') //'bar'
h.append('foo','baz')
h.get('foo') //"bar, baz"
```



#### Request 对象

Request 对象是获取资源请求的接口，这个接口暴漏了请求的相关信息，也暴漏了使用请求体的不同方式

##### 创建Request 对象

```js
let r = new Request('https://foo.com',{method: 'POST'})//第二个参数位init对象
console.log(r)
//Request {
//  bodyUsed: false
//  cache: "default"
//  credentials: "same-origin"
//  destination: ""
//  headers: Headers {}
//  integrity: ""
//  isHistoryNavigation: false
//  keepalive: false
//  method: "POST"
//  mode: "cors"
//  redirect: "follow"
//  referrer: "about:client"
//  referrerPolicy: ""
//  signal: AbortSignal {aborted: false, onabort: null}
//  url: "https://foo.com/"
//}
```

##### 克隆Request

克隆有两种方式，使用Request构造函数和使用clone()方法

```js
let r1 = new Request('https://foo.com')
let r2 = new Request(r1)//也可穿入init参数，会覆盖原始对象的init参数
```

```js
let r1 = new Request('https://foo.com')
let r2 = r1.clone()
let r3 = r1.clone() //TypeError
```

在Request对象上的bodyUsed属性为**请求体是否被读取**，在已被读取的情况下，是不可以被克隆的

##### 在fetch中使用Request对象

fetch()和Request对象拥有相同的函数签名并不是巧合，在调用fetch时可以传入已经创建好的Request实例

```js
let r = new Request('https://foo.com',{method: 'POST'})
fetch(r)
```

⚠️注意：Request对象在被传入到fetch中后是被内部克隆使用

bodyUsed：在被已读取的情况下，fetch是不可被重复使用的

```js
let r = new Request('https://foo.com',{method: 'POST'})
fetch(r)
fetch(r)//TypeError
```

想基于一个Request对象多次调用fetch(),可以每次都克隆使用

```js
let r = new Request('https://foo.com',{method: 'POST'})
fetch(r.clone())
fetch(r.clone())
```

#### Response对象

Response对象是获取资源响应的接口

##### 创建Response对象

```js
let r = new Response()
// body: (...)
// bodyUsed: false
// headers: Headers {}
// ok: true
// redirected: false
// status: 200
// statusText: ""
// type: "default"
// url: ""
```

### Web Socket

Web Socket的目标是通过一个长时连接实现与服务器全双工，双向的通信。

创建Web Socket时，一个HTTP请求会发送到服务器以初始化连接。服务器响应后，连接使用http的Upgrade头部从http协议切换到Web Socket协议，这意味着Web Socket不能通过标准http服务器实现，而必须使用支持该协议的专有服务器

因为Web Socket时用了自定义协议，所以URL方案稍有变化，不再使用http://活https://而是使用**ws://**或**wss://**,前者是不安全的，后者是安全的

#### Web Socket API

```js
let socket = new WebSocket("ws://www.example.com/server.php")
```

浏览器会在初始化WebSocket对象之后立即创建连接，与XHR相似，也有一个readyState属性表示当前状态

- WebSocket.OPENING(0) 连接正在建立
- WebSocket.OPEN(1) 连接已经建立
- WebSocket.CLOSING(2) 连接正在关闭
- WebSocket.CLOSE(3) 连接已经关闭

#### 发送和接收数据

```js
let socket = new WebSocket("ws://www.example.com/server.php")

let strungData = 'hello, word!'
let arrayBufferData = uint8Array.from(['a','b','c'])
let blobData = new Blob(['a','b','c'])

//socket发送数据
socket.send(strungData)
socket.send(arrayBufferData)
socket.send(blobData)


//socket接受数据时WebSocket对象上会触发message事件
//WebSocket对象上binaryType 属性表示数据的类型可能时‘blob’或‘arraybuffer’
socket.onmessage=function(event) {
  console.log(event.data)
}
```

#### 事件

WebSocket对象在连接生命周期中有可能触发三个其他事件

- open: 在连接成功建立时触发 
- error: 在发生错误时触发
- close: 在连接关闭时触发

## 客户端存储

### cookie

最初用于在客户端存储会话信息，这个规范要求服务器在响应http请求时，通过发送Set-Cookie HTTP头部包含会话信息

```js
HTTP/1.1 200 ok
Content-type: text/html
Set-Cookie: name=value
Other-header: other-header-value
//这个HTTP响应会设置一个名为name，值为value的cookie，名和值在发送时都会经过URL编码。
```

浏览器会存储这些会话信息，并在之后的每个请求中都会通过HTTP头部cookie再将它们发回服务器

```js
GET /index.js HTTP/1.1
Cookie: name=value
Other-header: other-header-value
//这些发送回服务器的额外信息可用于发送请求的客户端的唯一标识
```

#### 限制

cookie是与特定域绑定的，设置cookie后，他只会发送到创建它的域

cookie存储在客户端机器上，cookie不会占用太多的磁盘空间（4096个字节）

#### cookie的构成

- 名称：唯一标识的名称，cookie名不区分大小写，但会经过URL编码，所以最好区分大小写

- 值：存储在cookie里的字符值，必须经过URL编码

- 域：cookie有效的域

- 路径：请求URL中包含着歌路径才会把cookie发送到服务器

  例如：指定cookie只能由'https://www.wrox.com/booke'访问，在访问'https://www.wrox.com/'下的其他页面就不会发送cookie

- 过期时间： 表示何时删除cookie的时间戳

- 安全标示：设置以后，只有在使用SSL安全连接的情况下才会把cookie发送到服务器

```js
HTTP/1.1 200 ok
Content-type: text/html
Set-Cookie: name=value; expires=Mon, ww-Jan-07 07:10:24 GMT; domain=.wrox.com
Other-header: other-header-value
```

#### javascript中的cookie

document.cookie返回包含页面中所有有效cookie的字符串，以分号分隔，也可以通过document.cookie设置值

```js
document.cookie = 'name=Nicholas'
//再好对名称和值进行编码
document.cookie = encodeURLComponent("name") + '=' + encodeURLComponent("Nicholas")
```

设置值不会覆盖之前保存的cookie，只会覆盖和新增

cookie并不是存储数据的理想方式

### Web Storage

1、提供在cookie之外的存储会话数据的途径

2、提供跨会话持久化存储大量数据的机制

#### Storage类型

Storage类型用于保存名/值对数据，直至存储空间上限(由浏览器决定)。

- clear()：删除所有值；不在Firefox中实现
- getItem(name)：取得给定name的值
- Key(index)：取得给定数值位置的名称
- removeItem(name)：删除给定name的名/值对
- setItem(name,value)：设置给定name的值

通过length属性可以确定Storage对象中保存了多少名/值对，Storage类型只能存储字符串，非字符串会被自动转换为字符串类型

⚠️**注意**：存储在sessionStorage或localStorage中的数据**特定于页面的协议**。也就是说`http://example.com` 与 `https://example.com`的sessionStorage相互隔离。大多数浏览器限制每个源为5MB

sessionStorage对象 数据只会存储到浏览器关闭

localStorage对象 数据可以长期保留

### IndexedDB

pc端50M上限，移动端5M上限

浏览器中存储结构化数据的一个方案，IndexedDB的设计几乎完全是异步的

```js
//初始化数据库（数据库名称，数据库版本），如果存在将会打开，不存在创建并打开
let request = window.indexedDB.open("admin", 1)
let db
request.onerror = event=>{console.log(event)}
request.onsuccess = event=>{
    db = event.target.result
	  //db.transaction创建事务，加载数组中包含对象存储的信息，并且指定读写权限
  	//读写权限: 'readonly'、'readwrite'、'versionchange'
    db.transaction(["users"],'readwrite')
    .objectStore("users") //访问特定的对象存储。add()新增、put()更新
    .put({
        username: '张三1',
        age: 2,
    })
    // db.transaction(["users"],'readwrite')
    // .objectStore("users")
    // .delete('张三3') //删除

    var res = db.transaction(["users"],'readwrite')
    .objectStore("users").get('张三1')//获取
    res.onsuccess=(res)=>{
        console.log('get:', res.target.result);
    }
}

//onupgradeneeded只在创建的时候触发，是唯一能声明表结构的地方
request.onupgradeneeded=(event)=>{
    db = event.target.result
    // createObjectStore方法只能在onupgradeneeded这个回调中使用
    if (!db.objectStoreNames.contains('users')) {
      //判断在不存在此表的情况下新建一张表并且设置索引为keyPath
        db.createObjectStore("users",{keyPath: "username"})
    }
    console.log('users created');
    
}



```

https://dexie.org/

```js
const db = new Dexie('MyDatabase');

db.version(1).stores({
    friends: '++id, name, age'
});
await db.friends.add({
    name: '张三',
    age: 16,
});

await db.friends.put({id: 4, name: "Foo", age: 33});
await db.friends.where('age').above(20).toArray()

//https://dexie.org/docs/API-Reference
```



## DOM2和DOM3

DOM2和DOM3是按照模块化的思路来制定标准的，每个模块之间有一定的关联，分别针对某个DOM子集

- DOM Core：在DOM1核心部分的基础上，为节点增加属性和方法。
- DOM Views：定义基于样式信息的不同视图。
- DOM Events：定义通过事件实现DOM文档交互
- DOM Style：定义以编程方式访问和修改CSS样式的接口
- DOM Traversal and Range：新增遍历DOM文档及选择文档内容的接口
- DOM HTML：在DOM1HTML部分的基础上，增加属性、方法、新接口
- DOM Mutation Observers：定义基于DOM变化触发回调的接口。这个模块是DOM4级模块，用于取代Mutation Events

### DOM的演进

#### 样式
  html中有三种定义样式的方式
  - 外部样式表（通过<link>元素）
  - 文档样式表（使用<style>元素）
  - 元素特定样式（使用style属性）
##### 存取元素样式
任何支持style属性的HTML元素在javascript中都会有一个 对应的style属性

css属性名使用连字符表示，在javascript中为驼峰大小写 的形式
    background-image  style.backgroundImage
⚠️注意：大多数属性是这样的，但是又一个是例外：float，因为float是保留 字，它对应的是cssFloat
任何时候，只要获得了有效的DOM元素，就可以通过javascript来设置样式
```js
  app.style.backgroundColor="red"
  app.style.height="100px"
  app.style.width="200px"//混杂模式下默认会加单位“px”
```
通过style属性设置的值也可以通过style对象获取
```js
  console.log(app.style.backgroundColor);//red
  console.log(app.style.width);//200px
  console.log(app.style.height);//100px
```
###### DOM样式属性和方法
DOM2 Style规范也在style对象上定义了一些属性和方法。这些属性和方法提供了元素的style属性的信息并支持修改
  - cssText 包含style属性的css代码
  - length 应用给元素的css属性数量
  - parentRule 表示css信息的CSSRule对象
  - getPropertyPriority(propertyName) 如果css属性propertyName使用了!important则返回'!important',否则返回空字符串
  - getPropertyValue(propertyName) 返回属性propertyName的字符串值
  - item(index) 返回索引为index的css属性值
  - removeProperty(propertyName) 从样式中删除css属性propertyName
  - setProperty(propertyName, value, priority)设置css属性propertyName的值为value,priority是important或空字符串

###### 计算样式
style对象中包含支持style属性的元素为这个属性设置的样式信息，但不包含从其他样式表层叠继承的同样影响该元素的样式信息。DOM2在document.defaultView上添加了getComputedStyle()方法。这个方法接受两个参数：要取得计算样式的元素和伪元素字符串(如：":after")。如果不需要查询伪元素传null，getComputedStyle()返回一个对象，包含元素的计算样式
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		#app{
			width:500px;
			height:500px;
			background:chocolate;
		}
	</style>
</head>

<body>
	<div id="app"></div>
</body>
<script>
	const computedStyle = document.defaultView.getComputedStyle(app)
	console.log(computedStyle.backgroundColor);//rgb(210, 105, 30)⚠️：不同的浏览器会返回的格式会有不同，但是值相同
	console.log(computedStyle.width);//500px
</script>
</html>
```

##### 操作样式表
CSSStyleSheet类型表示CSS样式表，包括使用<link>元素通过<style>元素定义的样式表
CSSStyleSheet属性
- disabled，布尔值，表示样式是否被禁用了（可读写）
- href 如果使用<link>包含的样式表，则返回样式表的URL，否则返回null
- media 样式表支持的媒体类型集合，这个集合有一个length属性和一个item方法
- ownerNode 指向拥有当前样式表的节点在HTML中要么是<link>要么是<style>(在XML中可以是处理指令。如果这个当前样式表是通过@import被包含在另一个样式表中，则属性值为null)
- parentStyleSheet 如果当前样式表是通过@import被包含在另一个样式表中，则这个属性指向导入它的样式表
- title ownerNode的title属性
- type 字符串，表示样式表的类型，对于css样式表来说，就是“text/css”
  以上属性除了disabled，其他都是只读的
- cssRules 当前样式表包含的样式规则的集合
- ownerRule 如果样式表是使用@import导入的，则指向导入规则，否则是null
- deleteRule(index)在指定位置删除cssRules中的规则
- insertRule(rule, index)在指定位置向cssRule中插入规则
- document.styleSheets表示文档中可用的样式表集合

###### css规则
CSSRule类型表示样式表中的一条规则。这个类型也是一个通用基类，很多类型都继承它，但其中最常用的是表示样式信息的CSSStyleRule(其他CSS规则还有@import、@font-face、@page、@charset等、不过这些规则很少需要使用脚本来操作)。
CSSStyleRule对上可用的属性
- cssText 返回整条规则的文本（⚠️这里的文本可能与样式表中实际的文本不一样，因为各浏览器内部处理样式表的方式不一样。比如：Safari字母始终会被转换为小写）
- parentRule 如果这条规则被其他规则（如@media）包含，则指向包含规则，否则就是null。
- parentStyleSheet 包含当前规则的样式表
- selectorText 返回规则的选择符文本。(⚠️ 这里的文本可能会因为浏览器处理方式的不同，而与样式表中实际的文本不一样)
- style 返回CSSStyleDeclaration对象，可以设置和获取当前规则中的样式
- type 数值常量，表示样式规则。对于样式规则，始终为1

```html
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
          #app{
            width:500px;
            height:500px;
            background:chocolate;
          }
        </style>
      </head>

      <body>
        <div id="app">
        </div>
      </body>
      <script>
        const sheet = document.styleSheets[0]
        const rule = sheet.rules[0]
        console.log(rule.parentRule); //null
        console.log(rule.parentStyleSheet); //CSSStyleSheet{}
        console.log(rule.selectorText); //#app
        console.log(rule.type); //1
        console.log(rule.style.cssText); //width: 500px; height: 500px; background: chocolate;
        console.log(rule.style.background); //chocolate
      </script>
    </html>
```
###### 创建规则
DOM规定，可以使用insertRule()方法向样式表中添加新的规则。接受两个参数：规则的文本和表示插入位置的索引值
```js
  sheet.insertRule("#app{background:#ff0000;}", sheet.rules.length) //在最后插入，否则可能会被覆盖
```
这样添加规则会很麻烦，更好的方式是动态样式和加载技术
###### 删除规则
```js
  sheet.deleteRule(0)
```
##### 元素尺寸
###### 偏移尺寸
元素在屏幕上占用的所有视觉空间。元素在页面上的视觉空间由其高度和宽度决定，包括所有内边距、滚动条和边框(但不含外边框)
- offsetHeight 元素在垂直方向上占用的像素尺寸，包括他的高度、水平滚动条高度(如果可见)和上下边框的高度
- offsetLeft 元素左边框外侧距离包含元素左边框内侧的像素数 
- offsetTop 元素上边框外侧距离包含元素上边框的像素数
- offsetWidth 元素在水平方向上占用的像素尺寸，包括它的宽度，垂直滚动条宽度(如果可见)和左右边框的宽度

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
        body{
            margin: 0;
        }
        #app{
            width: 500px;
            height: 500px;
            background: sienna;
            border: 10px solid salmon;
            overflow: hidden;
        }
        #box{
            width: 200px;
            height: 200px;
            margin: 100px;
            border: 50px solid seagreen;
            background: springgreen;
        }
    </style>
    <body>
        <div id="app">
            <div id="box"></div>
        </div>
    </body>
    <script> 
        console.log(app.offsetHeight); //520
        console.log(app.offsetWidth); //520
        console.log(app.offsetLeft); //0
        console.log(app.offsetTop); //0

        console.log(box.offsetHeight); //300
        console.log(box.offsetWidth); //300
        console.log(box.offsetLeft); //110
        console.log(box.offsetTop); //110
    </script>
</html>
```
###### 客户端尺寸
客户端尺寸包含元素内容及其内边距所占空间。客户端尺寸只有两个相关属性：clientWidth和clientHeight。
其中，clientWidth是内容区宽度加左右内边距宽度，clientHeight是内容区高度加上下内边距高度
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
        body{
            margin: 0;
        }
        #app{
            width: 500px;
            height: 500px;
            background: sienna;
            border: 10px solid salmon;
            overflow: hidden;
        }
        #box{
            width: 200px;
            height: 200px;
            margin: 50px;
            padding: 50px;
            border: 50px solid seagreen;
            background: springgreen;
        }
    </style>
    <body>
        <div id="app">
            <div id="box"></div>
        </div>
    </body>
    <script>
        console.log(app.clientWidth); //500
        console.log(app.clientHeight); //500

        console.log(box.clientWidth); //300
        console.log(box.clientHeight); //300
    </script>
</html>
```
###### 滚动尺寸
提供了元素内容滚动距离的信息
- scrolllHeight 没有出现滚动条，元素内容的总高度
- scrollHeight 没有出现滚动条时，元素内容的总宽度
- scrollLeft 内容左侧隐藏的像素数，设置这个属性可以改变元素的滚动位置
- scrollTop 内容区顶部隐藏的像素数，设置这个属性可以改变元素的滚动位置
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
        body{
            margin: 0;
        }
        #app{
            width: 500px;
            height: 500px;
            background: sienna;
            border: 10px solid salmon;
            overflow: scroll;
        }
        #box{
            width: 200px;
            height: 1200px;
            margin: 50px;
            padding: 50px;
            border: 50px solid seagreen;
            background: springgreen;
        }
    </style>
    <body>
        <div id="app">
            <div id="box"></div>
        </div>
    </body>
    <script>
        app.addEventListener('click',()=>{
            console.log(app.scrollHeight); //1500
            console.log(app.scrollWidth); //500
            console.log(app.scrollTop); //1000
            console.log(app.scrollLeft); //0
            if(app.scrollTop!=0){
              app.scrollTop=0 //回到顶部
            }
        })
    </script>
</html>
```

#### DOM遍历
DOM2模块定义了两个用于辅助顺序的遍历DOM结构。这两个类型 **NodeIterator** 和 **TreeWalker** 从某个起点开始执行对DOM结构的深度优先遍历

##### NodeIterator
通过document.createNodeIterator()方法创建实例，接受四个参数
- root 作为遍历跟节点的节点

- whatToShow 数值代码，表示应该访问那些节点
   whatToShow参数是一个位掩码，通过应用一个或多个过滤器来指定访问那些节点。这个参数对应的常量是在NodeFilter类型中定义的
  - NodeFilter.SHOW_ALL 所有节点
  - NodeFilter.SHOW_ELEMENT 元素节点
  - NodeFilter.SHOW_ATTRIBUTE 属性节点，由于DOM的结构，实际中用不到
  - NodeFilter.SHOW_TEXT 文本节点
  - NodeFilter.SHOW_CDATA_SECTION CData区块节点**不是在HTML中使用的**
  - NodeFilter.SHOW_ENTITY_REFERENCE 实体引用节点**不是在HTML中使用的**
  - NodeFilter.SHOW_ENTITY 实体节点**不是在HTML中使用的**
  - NodeFilter.SHOW_PROCESSING_INSTRUCTION 处理指令节点**不是在HTML中使用的**
  - NodeFilter.SHOW_COMMENT 注释节点
  - NodeFilter.SHOW_DOCUMENT 文档节点
  - NodeFilter.SHOW_DOCUMENT_TYPE 文档类型节点
  - NodeFilter.SHOW_DOCUMENT_FRAGMENT 文档片段节点**不是在HTML中使用的**
  - NodeFilter.SHOW_NOTATION 记号节点**不是在HTML中使用的**
  这些除了 NodeFilter.SHOW_ALL之外，都可以组合使用
  const whatToShow = NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
  
- filter NodeFilter对象或函数，表示是否接受或跳过特定节点
   
   - NodeFilter.FILTER_SKIP 表示跳过节点，访问下一个节点
   - NodeFilter.FILTER_ACCEPT 
   
   filter参数可以用来指定自定义NodeFilter对象，或者作为一个节点过滤的函数。NodeFilter对象只有一个方法acceotNode()，如果给定节点应该返回就返回NodeFilter.FILTER_ACCEPT，否则就返回NodeFilter.FILTER_SKIP.因为NodeFilter是一个抽象类型，所以不能创建它的实例。只要创建一个包含acceotNode()的对象就可以了
   
- entityReferenceExpansion 布尔值，表示是否扩展实体引用。这个参数在HTML文档中没有效果，因为实体引用永远不会扩展

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        #app{
            width: 500px;
            height: 500px;
            background: sienna;
            border: 10px solid salmon;
            overflow: scroll;
        }
        #box{
            width: 200px;
            height: 200px;
            margin: 50px;
            padding: 50px;
            border: 50px solid seagreen;
            background: springgreen;
        }
    </style>
    <body>
        <ul id="app">
            <li>
                <p></p>
                <div id="box"></div>
            </li>
            <li>
                <span></span>
            </li>
        </ul>
    </body>
    <script>
        const iterator = document.createNodeIterator(app, NodeFilter.SHOW_ELEMENT,{
            acceptNode(node){
                return node.tagName.toLowerCase() !== 'p'?//跳过p节点
                NodeFilter.FILTER_ACCEPT:
                NodeFilter.FILTER_SKIP
            }
        },false)
        let node = iterator.nextNode()
        while (node !== null ) {
            console.log(node.tagName);// 1、UL 2、LI 3、DIV 4、LI 5、SPAN
            node = iterator.nextNode()
        }
    </script>
</html>
```
##### TreeWalker
TreeWalker是NodeIterator的高级版。除了包含同样的nextNode()方法、previousNode()方法，TreeWalker还添加了如下在DOM结构中向不同方向遍历的方法
- parentNode() 遍历到当前节点的父节点
- firstChild() 遍历到当前节点的第一个字节点
- lastChild() 遍历到当前节点的最后一个字节点
- nextSibling() 遍历到当前节点的下一个同胞节点
- previousSibling() 遍历到当前节点的上一个同胞节点

TreeWalker对象要调用document.createTreeWalker()方法来创建，接受的参数与NodeIterator一样，不同的是，节点过滤器除了可以返回NodeFilter.FILTER_ACCEPT，NodeFilter.FILTER_SKIP，还可以返回NodeFilter.FILTER_REJECT表示跳过该节点的整个子树

### 范围

范围可用于在文档中选择内容，而不用考虑节点之间的界限。范围值常规DOM操作的粒度不够时可以发挥作用

#### DOM范围

DOM2在Document类型上定义了一个createRange()方法，暴漏在document对象上，用来创建DOM范围对象

​		let range = document.createRange()

与节点类似，这个新创建的范围对象是与创建它的文档关联的，不能在其文档中使用。然后可以使用这个范围在后台选择文档特点的部分。创建范围并指定它的位置之后，可以对范围的内容执行一些操作，从而实现对底层DOM树更精细的控制。

每个范围都是Range类型的实例，拥有响应的属性和方法

- startContainer 范围起点所在的节点（选区中第一个字节点的父节点）
- startOffset 范围起点在startContainer中的偏移量。如果startContainer是文本节点、注释节点、CData区块节点，则startOffset值范围起点之前跳过的字符数，否则，表示范围中第一个节点的索引
- endContainer 范围终点所在的节点（选区中最后一个字节点的父节点）
- endOffset 范围起点在startContainer中的偏移量 （与startOffset中偏移量的含义相同）
- commonAncestorContainer 文档中以 startContainer 和 endContainer 为后代的最深的节点。这些属性会在范围被放倒文档中特定位置时获得相应的值

#### 简单选择

通过范围选择文档中某个部分最简单的方式，就是selectNode()或selectNodeContents()。这两个方法都接受一个节点作为参数，并将该节点的信息添加到调用它的范围。

- selectNode 选择整个节点
- selectNodeContents 只选择节点的后代

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
        *{
            margin: 0;
            padding: 0;
        }
        #app{
            width: 500px;
            height: 500px;
            background: sienna;
            border: 10px solid salmon;
            overflow: scroll;
        }
        #box{
            width: 200px;
            height: 200px;
            margin: 50px;
            padding: 50px;
            border: 50px solid seagreen;
            background: springgreen;
        }
    </style>
    <body>
        <ul id="app">
            <li>
                <p></p>
                <div id="box">
                    <span></span>
                    <span></span>
                </div>
            </li>
            <li>
                <span></span>
            </li>
        </ul>
    </body>
    <script>
        let range1 = document.createRange()
        range1.selectNode(app)
        let range2 = document.createRange()
        range2.selectNodeContents(app)
        console.log(range1);
        //{collapsed: false
        //  commonAncestorContainer: body
        //  endContainer: body
        //  endOffset: 2
        //  startContainer: body
        //  startOffset: 1
        //}
        console.log(range2);
        //{collapsed: false
        //  commonAncestorContainer:  ul#app
        //  endContainer:  ul#app
        //  endOffset: 5
        //  startContainer:  ul#app
        //  startOffset: 0
        //}
    </script>
</html>
```

在像上面这样选定节点或节点后代之后，还可以在范围上调用相应的方法，实现对范围中选区的更精细的控制

- setStartBefore(refNode) 把范围的起点设置到refNode之前，从而让refNode成为选区的第一个字节点。startContainer属性被设置为refNode.parentNode，而startOffset属性被设置为refNode在其父节点childNodes集合中的索引
- setStartAfter(refNode) 把范围设置到refNode之后，从而将refNode排除在选区之外，让其下一个同胞节点成为选区的第一个字节点。startContainer属性被设置为refNode.parentNode，而startOffset被设置为refNode在其父节点childNodes集合中的索引+1

- setEndBefore(refNode) 把范围的终点设置到refNode之前从而将refNode排除在选区之外，让其上一个同胞节点成为选区的最后一个字节点。endContainer属性被设置为refNode.parentNode，endOffset属性被设置为refNode在其父节点childNodes集合中的索引
- setEndAfter(refNode)把范围的终点设置到refNode之后，从而让refNode成为选区的最后一个字节点。endContainer属性被设置为refNode.parentNode，endOffset属性被设置为refNode在其父节点childNodes集合中的索引+1

#### 复杂选择

创建复杂的选择需要使用setStart()和setEnd()方法。接受两个参数：参照节点、偏移量

对于setStart()参照节点会成为startContainer，而偏移量会赋值给startOffset

对于setEnd()参照节点会成为endContainer，而偏移量会赋值给endOffset

## JavaScript API