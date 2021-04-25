

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

### Atomics 与 SharedArrayBuffer

多个上下文访问SharedArrayBuffer时，如果同时对缓冲区执行操作，就可能出现资源争用问题。Atomics API通过强制同一时刻只能对缓冲区执行一个操作，可以让多个上下文安全地读写一个SharedArrayBuffer。Atomics API是ES2017中定义的

仔细研究会发现Atomics API非常像一个简化版的指令集架构，这并非意外。原子操作的本质会排斥操作系统或计算机硬件通常会自动执行的优化（比如指令重新排序）。原子操作也让并发访问内存变得不可能，如果应用不当就可能导致程序执行变慢。为此，Atomics API的设计初衷是在最少但很稳定的原子行为基础之上，构建复杂的多线程JavaScript程序

#### SharedArrayBuffer

SharedArrayBuffer 与 ArrayBuffer具有相同的API。二者的主要区别是ArrayBuffer必须在不同执行上下文间切换，SharedArrayBuffer则可以被任意多个执行上下文同时使用。

在多个执行上下文间共享内存意味着并发线程成为了可能。传统JavaScript操作对于并发内存访问导致的资源争用没有提供保护，

**线程不安全的例子**

```js
const workerScript = `
  self.onmessage =({data})=>{
    const view = new Uint32Array(data);
		//执行了100000次加1操作
    for(let i=0; i<100000; i++){
      view[0]+=1
    }
    self.postMessage(null);
    };
`;

const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]))
const workers = []
//创建了四个工作线程
for(let i=0; i<4; i++ ) {
  workers.push(new Worker(workerScriptBlobUrl))
}
let responseCount = 0;
for(let worker of workers) {
  worker.onmessage = ()=>{
    //如果是最后一个工作线程完成后打印结果
    if(++responseCount == workers.length){
      //这里如果是100次，view[0]是401（或者较小次数的加1操作）
      //这里如果是100000次，view[0]是不确定的（或者较大次数的加1操作）
      console.log(`Final buffer value ${view[0]}`); //Final buffer value 317659
    }
  }
}
const sharedArrayBuffer = new SharedArrayBuffer(4);
const view = new Uint32Array(sharedArrayBuffer);
view[0] = 1;
// 把sharedArrayBuffer发送到每个工作线程
for (const worker of workers) {
  worker.postMessage(sharedArrayBuffer)
}
```

为了解决以上问题，Atomics API应运而生。Atomics API可以保证SharedArrayBuffer上的JavaScript线程操作是安全的

#### 原子操作基础

任何全局上下文中都有Atomics对象，这个对象上暴漏了用于执行线程安全操作的一套静态方法，其中多数方法以一个TypedArray实例（一个SharedArrayBuffer的引用）作为一个参数，以相关操作数作为后续参数

##### 算数及位操作方法

Atomics API提供了一套简单的方法用于执行就地修改操作。在ECMA规范中，这些方法被定义为AtomicReadModifyWrite操作。在底层，这些方法都会从SharedArrayBuffer中某个位置读取值，然后执行算数或位操作，最后再把计算结果写回相同的位置。这些操作的原子本质意味着上述读取、修改、写回操作会按照顺序执行，不会被其他线程中断。

**所属方法实操**

```js
const sharedArrayBuffer = new SharedArrayBuffer(1)
const typedArray = new Uint8Array(sharedArrayBuffer)

//算数方法加减

console.log(typedArray); //Uint8Array [0]
//对索引0处的值执行原子加5
Atomics.add(typedArray,0, 5 )
console.log(typedArray); //Uint8Array [5]
//对索引0处的值执行原子减3
Atomics.sub(typedArray,0, 3)
console.log(typedArray); //Uint8Array [2]

// 位方法

//对索引0处的值执行原子或0b1111
Atomics.or(typedArray, 0, 0b1111)
console.log(typedArray); //Uint8Array [15]

//对索引0处的值执行原子与0b1100
Atomics.and(typedArray, 0, 0b1100)
console.log(typedArray); //Uint8Array [12]

//对索引0处的值执行原子异或0b1111
Atomics.xor(typedArray, 0, 0b1111)
console.log(typedArray); //Uint8Array [3]
```



**解决前面线程不安全的列子**

```js
const workerScript = `
  self.onmessage =({data})=>{
    const view = new Uint32Array(data);
		//执行了100000次加1操作
    for(let i=0; i<10000000; i++){
      //view[0]+=1
			Atomics.add(view, 0, 1)
    }
    self.postMessage(null);
    };
`;

const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]))
const workers = []
//创建了四个工作线程
for(let i=0; i<4; i++ ) {
  workers.push(new Worker(workerScriptBlobUrl))
}
let responseCount = 0;
for(let worker of workers) {
  worker.onmessage = ()=>{
    //如果是最后一个工作线程完成后打印结果
    if(++responseCount == workers.length){
      //这里不管线程内执行了多少次加操作，代码都是会被安全的执行的，所以view[0]会是确定的值
      console.log(`Final buffer value ${view[0]}`); //Final buffer value 40000001
    }
  }
}
//创建大小为4的缓冲区
const sharedArrayBuffer = new SharedArrayBuffer(4);
const view = new Uint32Array(sharedArrayBuffer);
view[0] = 1;
// 把sharedArrayBuffer发送到每个工作线程
for (const worker of workers) {
  worker.postMessage(sharedArrayBuffer)
}
```

##### 原子读和写

浏览器的JavaScript编译器和CPU架构本身都有权限重拍指令以提升程序效率。正常情况下，JavaScript的单线程环境可以随时进行这种优化。但多线程下的指令重拍可能会导致资源争用

Atomics API通过两种主要方式解决了这个问题

- 所有原子指令互相之间的顺序永远不会重排
- 使用原子读或原子写保证所有指令（包括原子或非原子指令）都不会相对原子读/写重新排序。这意味着位于原子读/写之前的所有指令会在原子读/写完成之前发生，而位于原子读/写之后所有的指令会在原子读/写完成后才会开始。

除了读写缓冲区的值，Atomics.load() 和 Atomics.store()还可以构建‘代码围栏’JavaScript引擎保证非原子指令可以相对于load() 或store() 本地重排，但这个重排不会侵犯原子读/写的边界

```js
const sharedArrayBuffer = new SharedArrayBuffer(4)
const view = new Uint32Array(sharedArrayBuffer)
// 执行非原子写
view[0] = 1
// 非原子写可以保证在这个读操作之前完成，因此这里读到的一定是1
console.log(Atomics.load(view,0));
// 执行原子写
Atomics.store(view, 0, 2)
// 非原子读可以保证在原子写完成后发生，因此这里一定会读到2
console.log( view[0]);

```

##### 原子交换

为了保证连续、不间断的先读后写，Atomics API提供了两种方法：exchange()和compareExchange()。Atomics.exchange()执行简单的交换，以保证其他线程不会中断值的交换

```js
const sharedArrayBuffer = new SharedArrayBuffer(4)
const view = new Uint32Array(sharedArrayBuffer)
// 在索引0处写入3
Atomics.store(view,0,3)
// 从索引0处读取值，然后早索引0处写入4
Atomics.exchange(view,0,4)
console.log(Atomics.load(view, 0));//4
```

再多线程中，一个线程可能只希望在上次读取某个值之后没有其他线程修改该值的情况下才对共享缓冲区执行写操作。如果这个值没有被修改，这个线程就可以安全地写入更新后的值；如果这个值被修改了，那么执行写操作将会破坏其他线程计算的值。对于这种任务，Atomics API提供了compareExchange()方法。这个方法只在目标索引处的值与预期值匹配时才会执行写操作

```js
 const sharedArrayBuffer = new SharedArrayBuffer(4)
 const view = new Uint32Array(sharedArrayBuffer)
 // 在索引0处写入5
 Atomics.store(view,0,5)
const initial = Atomics.load(view, 0)
console.log(initial);//5
const res = initial**2
console.log(Atomics.load(view, 0)); //5
//只在缓冲区未被修改的情况下才会向缓冲区写入新值
Atomics.compareExchange(view, 0, initial, res)
console.log(Atomics.load(view, 0)); //25
```

如果值不匹配compareExchange()调用则什么都不做

```js
const sharedArrayBuffer = new SharedArrayBuffer(4)
const view = new Uint32Array(sharedArrayBuffer)
// 在索引0处写入5
Atomics.store(view,0,5)
const initial = Atomics.load(view, 0)
console.log(initial);//5
const res = initial**2
console.log(Atomics.load(view, 0)); //5
//只在缓冲区未被修改的情况下才会向缓冲区写入新值,但是值是不匹配的
Atomics.compareExchange(view, 0, 4, res)
console.log(Atomics.load(view, 0)); //5
```

##### 原子Futex操作与加锁

如果没有某种锁机制，多线程就无法支持复杂需求。为此，Atomics API提供了模仿Linux Futex(快速用户空间互斥量，fast user-space mutex)的方法。这些方法本身虽然非常简单，但可以作为更复杂锁机制的基本组件

**⚠️所有原子Futex操作只能用于Int32Array视图，而且，只能用在工作线程内部。**

Atomics.wait()和Atomics.notify()

```js
const workerScript = `
    self.onmessage = ({data})=>{
    const view = new Int32Array(data)
    console.log('waiting to obtain lock');
    //遇到初始值则停止 100000 毫秒
    Atomics.wait(view, 0, 0, 100000)
    console.log('obtained lock');
    Atomics.add(view, 0, 1)
    console.log('Releasing lock');
    Atomics.notify(view, 0, 1)
    self.postMessage(null)
  }
`
const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]))
const workers = []
for (let i = 0; i < 4; ++i) {
  workers.push(new Worker(workerScriptBlobUrl))
}
let responseCount = 0
workers.forEach(work=>{
  work.onmessage=()=>{
    if (++responseCount == workers.length) {
      console.log(`value ${view[0]}`);
    }
  }
})

const sharedArrayBuffer = new SharedArrayBuffer(8)
const view = new Int32Array(sharedArrayBuffer)
for (const worker of workers) {
  worker.postMessage(sharedArrayBuffer)
}
setTimeout(()=>{
  Atomics.notify(view, 0, 1)
},3000)
```

因为是用0来初始化SharedArrayBuffer，所以每个工作线程都会到达 Atomics.wait(view, 0, 0, 100000)并停止执行。在停止状态下，执行线程存在于一个等待队列中，在经过指定时间或在相应索引上调用Atomics.notify(view, 0, 1)之前，一直保持暂停状态，1000毫秒之后，定时器内部会调用Atomics.notify(view, 0, 1)释放其中的一个等待线程，这个线程执行完毕后会再次调用Atomics.notify(view, 0, 1)释放另一个线程。这个过程持续到所有线程完成并通过postMessage传出最终的值

### 跨上下文消息

跨文档消息(有时候也简称XDM)，是一种在不同执行上下文(如不同工作线程或不同源的页面)间传递信息的能力。例如，www.worx.com上的页面想要与包含在内嵌窗口中的www.worxxxx.com上面的页面通信

XDM的核心是postMessage()方法。除了XDM，还在HTML5中很多地方用到过，但是目的都是传送数据

postMessage()方法接受三个参数：消息、表示目标接受源的字符串和可选传输对象的数组(只与工作线程相关)。第二个参数对于安全非常重要，可以限制浏览器交付数据的目标

```js
let iframeWindow = document.getElementById("myframe").contentWindow;
iframeWindow.postMessage("A secret", "http://www.worx.com")
//给源为 "http://www.worx.com"的内嵌窗口发送一条消息，如果源匹配消息将会交付到内嵌窗口，否则，什么也不做。这个限制可以保护信息不会因为地址的改变而泄漏
```

接受到XDM消息后，window对象上会触发message事件。这个事件是异步的。

```js
window.addEventlistener("message",event=>{
  //确保来自预期发送者
  if(event.origin == "http://www.worx.com"){
    //对数据进行一些处理
    processMessage(event.data)
    //可选：向来源窗口发送一条信息
    event.source.postMessage("Received!", "http://p2p.work.com")
  }
})
```

event对象包含三个重要信息

- data: 作为第一个参数传递给postMessage()的字符串数据
- origin：发送消息的文档源
- source：发送消息的文档中window的代理对象

### Encoding API

Encoding API主要用于实现字符串与定型数组之间的转换。

规范新增了4个用于执行转换的全局类：TextEncoder、TextEncoderStream、TextDecoder、TextDecoderStream

#### 文本编码

Encoding API提供了两种将字符串转换为定型数组二进制格式的方法：批量编码和流编码。把字符串转换为定型数组时，编码器始终使用UTF-8

##### 批量编码

JavaScript引擎会同步编码整个字符串，通过TextEncoder()的实例完成

实例上有encode()方法，接受一个字符串，返回Uint8Array格式的字符UTF-8编码

```js
const textEncoder = new TextEncoder();
const encodedText = textEncoder.encode('foo')
console.log(encodedText);//Uint8Array(3) [102, 111, 111]
```

编码器实例还有一个encodeInto方法，该方法接受一个字符串和目标Unit8Array，返回一个字典，包含read和written属性，分别表示成功从源字符串读取了多少字符和向目标数组写入了多少字符

```js
const textEncoder = new TextEncoder();
const fooArr = new Uint8Array(3)
const fooResult = textEncoder.encodeInto('foo', fooArr)
console.log(fooArr);//Uint8Array(3) [102, 111, 111]
console.log(fooResult);//{read: 3, written: 3}

const foArr = new Uint8Array(2)
const foResult = textEncoder.encodeInto('fooooo', foArr)
console.log(foArr);//Uint8Array(3) [102, 111]
console.log(foResult);//{read: 2, written: 2}
```

##### 流编码

TextEncoderStream其实就是TransformStream形式的TextEncoder。将解码后的文本流通过管道输入流编码器会得到编码后文本快的流

```js
async function* chars() {
  const decodedText = "foo"
  for (const char of decodedText) {
    yield await new Promise((resolve)=>setTimeout(resolve, 1000, char))
  }
}

const decodedTextStream = new ReadableStream({
  async start(controller){
    for await (let chunk  of chars()) {
      controller.enqueue(chunk)
    }
    controller.close()
  }
})

const encodeTextStream = decodedTextStream.pipeThrough(new TextEncoderStream())
console.log(encodeTextStream);
const readableStreamDefaultReader = encodeTextStream.getReader()
console.log(readableStreamDefaultReader);
(async function () {
  while (true) {
    const {done, value} = await readableStreamDefaultReader.read()
    if (done) {
      break
    }else{
      console.log(value);
    }
  }
})()
//Uint8Array [102]
//Uint8Array [111]
//Uint8Array [111]
```

#### 文本解码

##### 批量解码

JavaScript引擎会同步解码整个字符串，通过TextDecoder()的实例完成

实例上有decode()方法，接受一个定型数组参数，返回解码后的字符串

```js
const textDecoder = new TextDecoder()
const encodedText = Uint8Array.of(102,111,111)
const decodedText = textDecoder.decode(encodedText)
console.log(decodedText); //foo
```

### File API 与 Blob API

Web程序的一个主要的痛点是无法操作用户计算机上的文件。2000年以前，处理文件的唯一方式是<input type="file">

#### File类型

File API仍然以表单中的文件输入字段为基础，但是增加了直接访问文件信息的能力。HTML5在DOM上为文件输入元素添加了files集合。包含一组file对象，表示选中的文件。每个file对象上都有一些只读属性

- name：本地系统中的文件名
- size：以字节计的文件大小
- type：包含文件MIME类型的字符串
- lastModifiedDate：表示文件最后修改时间的字符串。**⚠️这个属性只有Chome实现了**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <input type="file"  id="files" multiple>
    </body>
    <script>
        files.addEventListener('change',event=>{
            for (const file of event.target.files) {
                console.log(file);
            }
        })
    </script>
</html>
```

#### FileReader 类型

FileReader 类型表示一种异步文件读取机制。可以把FileReader 想象成XMLHttpRequest，只不过是用于从文件系统读取文件，而不是从服务器读取数据。FileReader 类型提供了几个读取文件数据的方法

- readAsText(file, encoding)：从文件中读取纯文本内容并保存在result属性中。第二个参数表示编码，是可选的
- readAsDataURL(file)：读取文件并将内容的数据URL保存在result属性中
- readAsBinaryString(file)：读取文件并将每个字符的二进制数据保存在result属性中
- readAsArrayBuffer(file)：读取文件并将文件内容以ArrayBuffer形式保存在result属性

这些读取方法是异步的，所以每个FileReader会发布几个事件

- progress：表示还有更多数据

  progress事件每50毫秒触发一次，其与XHR的progress事件具有相同的信息：

- error：发生错误

  触发error事件时会包含错误信息code值

  - 1、未找到
  - 2、安全错误
  - 3、读取被中断
  - 4、文件不可读
  - 5、编码错误

- load：读取完成

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <input type="file"  id="files" multiple>
    </body>
    <script>
        files.addEventListener('change', event =>{
            let files = event.target.files,
                reader = new FileReader();
                reader.readAsDataURL(files[0])
            
            reader.onerror = function () {
                console.log(reader.error);
            }
            reader.onprogress = function (event) {
                console.log(event.loaded/event.total);//获取到当前进度
            }
            reader.onload = function () {
                console.log(reader.result);//获取到读取完成文件的地址
            }
            console.log('FileReader');
        })
    </script>
</html>
```

#### FileReaderSync 类型

FileReaderSync 类型就是 FileReader 的同步版本。这个类型拥有与FileReader 相同的方法，只有在整个文件都加载到内存之后才会继续执行。**FileReaderSync只在工作线程中可用**，因为读取整个文件耗时太长会影响全局

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <input type="file"  id="files" multiple>
    </body>
    <script>
        const workerScript = `
            self.onmessage = ({data})=>{
               const syncReader = new FileReaderSync();
               console.log(syncReader)
               const result = syncReader.readAsDataURL(data)
               console.log(result)
               self.postMessage(result)
            }
        `
        const workerScriptBlobUrl = URL.createObjectURL(new Blob([workerScript]))
        
        files.addEventListener('change', event =>{
            let files = event.target.files
            //开启一个工作线程
            const worker = new Worker(workerScriptBlobUrl)
            //将选中的文件发送到线程内部
            worker.postMessage(files[0])
            //接受线程发送的数据
            worker.onmessage=e=>{
                console.log(e);
                app.innerHTML = `<img src="${e.data}">`
            }
           
        })
    </script>
</html>
```

#### Blob与部分读取

某些情况下，可能读取的事部分文件，而不是整个文件，因此File对象提供了一个slice()方法。接受两个参数(起始字节、要读组的字节数)

返回一个Blob的实例，而Blob实际上是File的超类。

Blob表示二进制大对象，是JavaScript对象不可修改的二进制数据的封装类型。包含字符串的数组、ArrayBuffer、ArrayBufferViews、甚至其他Blob都可以用来创建Blob。Blob构造函数可以接受一个options参数，并在其中指定MIME类型

```js
console.log(new Blob(['foo'])); //Blob {size: 3, type: ""}
console.log(new Blob(['{"a": "b"}'])); //Blob {size: 10, type: ""}
console.log(new Blob(['<p>foo</p>', '<p>bar</p>'])); //Blob {size: 20, type: ""}
```

Blob 对象还有一个slice()方法用于进一步切分数据，也可以使用FileReader从Blob中读取数据

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <input type="file"  id="files" multiple>
    </body>
    <script>
        files.addEventListener('change', event =>{
            let files = event.target.files
            let reader = new FileReader()
            // let blob = blobSlice(files[0],0,32)
            let blob = files[0].slice(0,32)
            console.log(blob);
            if (blob) {
                reader.readAsText(blob)
                reader.onload = function () {
                    console.log(reader.result);
                }
            }
        })
    </script>
</html>
```

#### 对象URL与Blob

对象URL有时候也称作Blob URL，是指引用存储在File或Blob中数据的URL。对象URL的优点是不用把文件内容读取到JavaScript也可以使用文件。只要在适当位置提供对象URL即可。要创建对象URL，可以使用window.URL.createObjectURL()方法并传入File或Blob对象。这个函数返回的值是一个指向内存中地址的字符串。因为这个字符串是URL，所以可以在DOM中直接使用

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <ul id="app">
        </ul>
        <input type="file"  id="files" multiple>
    </body>
    <script>
        
        files.addEventListener('change', event =>{
            let files = event.target.files,
            url = URL.createObjectURL(files[0])
            console.log(url);
            app.innerHTML = `<img src="${url}">`
        })
    </script>
</html>
```

如果把对象URL直接放到<img>标签，就不需要先把数据读到Javascript中了，<img>标签可以直接从相应的内存位置把数据读取到页面上。

使用完数据之后，最好能释放与之关联的内存。只要对象URL在使用中，就不能释放内存。如果想表明不在使用某个对象URL，则可以把它传给window.URL.revokeObjectURL().页面卸载时，所有对象URL占用的内存都会被释放。不过，最好在不使用时就立即释放内存，以便尽可能保持页面占用最少资源。

#### 读取拖拽文件

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <style>
        #app{
            width: 500px;
            height: 500px;
        }
        
    </style>
    <body>
        <div id="app">
        </div>
    </body>
    <script>
        app.addEventListener('dragenter', handleEvent)
        app.addEventListener('dragover', handleEvent)
        app.addEventListener('drop', handleEvent)
        function handleEvent(event) {
            console.log(event);
            event.preventDefault();
            let info
            if(event.type === 'drop'){
                for (const file of event.dataTransfer.files) {
                    info+=`${file.name}<br>`
                }
                app.innerHTML = info
            }
        }
    </script>
</html>
```

### 媒体元素

HTML5新增两个与媒体相关的元素，即<video>,<audio>

```html
<!--嵌入视频-->
<video src="conference.mpg" id="myVideo">Video player not available</video>
<!--嵌入音频-->
<audeo src="song.mp3" id="myAudeo">Audeo player not available</audeo>
<!--如果浏览器不支持则会显示标签之间的内容-->
```

由于浏览器支持的媒体格式不同，因此可以指定多个不同的媒体源

```html
<!--嵌入视频-->
<video id="myVideo">
  <source src="song.webm" type="video/webm" codecs='vp8, vorbis'>
  <source src="song.ogv" type="video/ogg" codecs='theora, vorbis'>
  <source src="conference.mpg">
  Video player not available
</video>
<!--嵌入音频-->
<audio id="myAudeo">
  <source src="song.ogg" type="audio/ogg">
  <source src="song.mp3" type="audio/mp3">
  Audeo player not available
</audio>
```

#### 属性

- autoplay 取得或设置autoplay标签
- buffered 对象，表示已下载缓冲的时间范围
- bufferedBytes 对象，表示已下载缓冲的字节范围
- bufferingThrottled 表示缓冲是否被浏览器截流
- controls 取得或设置controls属性，用于显示或隐藏浏览器内置控件
- currentLoop 媒体已经循环播放的循环次数
- currentSrc 媒体的URL
- currentTime 已经播放的秒数
- defaultPlaybackRate 取得或设置默认回放速率，默认为1.0秒
- duration 媒体的总秒数
- ended 媒体是否播放完成
- loop 取得或设置媒体是否循环播放
- muted 取得或设置媒体是否静音
- networkState 表示媒体当前网络连接状态。1:空 1:加载中 2:加载元数据 3:加载了第一帧 4:加载完成
- paused 表示播放器是否暂停
- playbackRate 取得或设置当前播放速率。
- played 目前为止已经播放的时间范围
- readyState 媒体是否已经准备就绪。0:不可用 1:可以显示当前帧 2:媒体可以开始播放 3:媒体可以播放完成
- seekable 可以跳转的时间范围
- seeking 表示播放器是否正移动到媒体文件的新位置
- src 文件源
- start 取得或设置媒体文件中的位置，以秒为单位，从该处播放
- totalBytes 资源需要的字节总数
- videoHeight 视频高度
- videoWidth 视频宽度
- volume 取得或设置当前音量，值范围为0.0-1.0

#### 事件

- abort 下载被中断
- canplay  回放可以开始，readyState为2
- canplaythough  回放可以继续，不应该中断，readState为3
- canshowcurrentframe  已经下载当前帧，readyState为1
- dataunavailable 不能回放，因为没有数据，readyState为0
- durationchange  duration属性的值发生了变化
- emptied  网络连接关闭了
- empty  发生了错误，阻止了媒体下载
- ended 媒体已经播放完一遍，且停止了
- error 下载期间发生了网络错误
- load 所有媒体已经下载完毕⚠️已被废弃
- loadeddata  媒体的第一帧已经下载
- loadedmetadata  媒体的元数据已经下载
- loadstart  下载开始
- pause  回放已经暂停
- play  媒体收到开始播放的请求
- playing 媒体已经播放了
- progress 下载中
- ratechange  媒体播放速率发生了变化
- seeked  跳转已结束
- seeking  回放以移动到新位置
- stalled  浏览器尝试下载，但未收到数据
- timeupdate currentTime被非常规或意外更改
- volumechange volume或muted属性值发生了变化
- waiting 回放暂停

#### 检测编解码器

媒体元素都有一个名为canPlayTyp的方法，该方法接受一个格式/编解码器字符串，返回一个字符串值 'probably'、 'maybe'、 '  '

#### 音频类型

```js
const audio = new Audio('https://mp3.9ku.com/mp3/541/540085.mp3')
app.addEventListener('click',()=>{
  audio.play()
})
```

### 原生拖放

#### 拖放事件

拖放事件几乎可以让开发者控制拖放操作的方方面面。关键的部分是确定每个事件是在哪里触发的。有的事件是在被拖放元素上触发，有的事件则是在放置目标上触发。

**在元素被拖动时会按顺序触发以下事件**

1. dragstart    鼠标按住不放并开始移动时触发
2. drag            目标被移动时会持续触发
3. dragend     当拖动停止时

**在把元素拖动到一个有效的放置目标上时，会依次触发以下事件**

1. dragenter 只要把元素拖动到放置目标上就会触发
2. dragover  dragenter事件触发以后会立即触发，并且元素在放置目标范围内被拖动会持续触发
3. dragleave或drop 当元素被拖动到放置目标之外时会触发dragleave，如果元素被放倒目标上，会触发drop



#### 自定义放置目标

默认元素是不允许放置目标，想让元素成为有效的放置目标要去覆盖默认的事件

```js
app.addEventListener('dragover',event=>{
  event.preventDefault()
})
app.addEventListener('dragenter',event=>{
  event.preventDefault()
})
//drop是针对Firefox，Firefox中放置时间默认是导航到当前文件地址
app.addEventListener('drop',event=>{
  event.preventDefault()
})
```

#### dataTransfer对象

除非数据受影响，否则简单的拖放并没有实际意义。dataTransfer对象有两个方法 getData()和setData()用于获取和设置值

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
    </style>
    <body>
        <img id="wf" src="./wf.jpeg" width="200">

        <div id="app">
        </div>
    </body>
    <script>
        wf.addEventListener('dragstart',event=>{
            event.dataTransfer.setData("text", "这是一张王菲的照片")
            const text = event.dataTransfer.getData("text")
            console.log(text); //这是一张王菲的照片
        })
        app.addEventListener('dragover',event=>{
            event.preventDefault()
        })
        app.addEventListener('dragenter',event=>{
            event.preventDefault()
        })
        app.addEventListener('drop',event=>{
            event.preventDefault()
            var data = event.dataTransfer.getData("text");
            console.log(data); //这是一张王菲的照片
        })
    </script>
</html>
```

#### dropEffect 与 effectAllowed

dataTransfer对象不仅可以同于实现简单的数据传输，还可以用于确定能够被拖动元素和放置目标执行什么操作

##### dropEffect属性可以告诉浏览器允许那种放置行为

- "none" 被拖动元素不能放置在这里
- "move"  被拖动元素应该移动到放置目标
- "copy"  被拖动元素应该复制到放置目标
- "link"   放置目标会导航到被拖动元素（仅在它是URL的情况下）

使用dropEffect属性，必须在放置目标的dragenter事件处理程序中设置它

effectAllowed属性表示对被拖动元素是否允许dropEffect

- "uninitialized" 没有给被拖动元素设置动作
- "none" 被拖动元素上没有允许的操作
- "copy" 只允许copy
- "link" 只允许link
- "move" 只允许move
- "copyLink" 只允许copyLink
- "copyMove"只允许copyMove
- "linkMove"只允许linkMove
- "all" 允许所有

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
    </style>
    <body>
        <img id="wf" src="./wf.jpeg" width="200">
        <div id="app">
        </div>
    </body>
    <script>
        wf.addEventListener('dragstart',event=>{
            event.dataTransfer.setData("text", event.target.id)
            event.dataTransfer.effectAllowed = "move";
        })
        app.addEventListener('dragover',event=>{
            event.preventDefault()
            event.dataTransfer.dropEffect = "move"
        })
        app.addEventListener('dragenter',event=>{
            event.preventDefault()
        })
        app.addEventListener('drop',event=>{
            event.preventDefault()
            var data = event.dataTransfer.getData("text");
            event.target.appendChild(document.getElementById(data))
        })
    </script>
</html>
```

#### 可拖动能力

默认只有图片、链接、文本是可拖动的，也可设置元素的draggable属性

```html
<!--禁止拖动图片-->
<img id="wf" draggable="false" src="./wf.jpeg" width="200">
<!--让元素可以拖动-->
<div id="app" draggable="true">
```

#### 其他成员

HTML5规范还为dataTransfer对象定义了以下方法

- addElement(element) 为拖动操作添加元素。这是为了传输数据，不会影响拖动操作的外观。浏览器还未实现该方法
- clearData(format) 清楚以特定格式存储的数据
- setDragImage(element, x, y)允许指定拖动发生时显示在光标下的图片
- types: 当前存储的数据类型列表

### Notifications API

Notifications API用于向用户显示通知。类似alert对话框Notifications API在Service Worker中非常有用。渐进Web应用通过触发通知可以在页面不活跃时向用户显示消息

#### 通知权限

⚠️本地调试不会出现通知，需要HTTPS

Notifications API有被滥用的可能，因此默认会开启两项安全措施

- 通知只能在运行在安全上下文的代码中被触发
- 通知必须按照每个源的原则明确得到用户允许

```js
Notification.requestPermission().then(res=>{console.log(res)})
//default表示允许 denied表示拒绝
```

如果用户拒绝授权，就无法通过编程方式挽回，因此不可能在触发授权提示

```js
const n = new Notification('这是一条通知信息',{
  body:'bodybodybody', //自定义主题内容
  image: "./wf.jpeg", //自定义图片
  vibrate: true //是否震动
})
```

#### Page Visibility API

Page Visibility API旨在为开发者提供页面对用户是否可见的信息

- document.visibilityState值
  - 页面在后台标签页或浏览器中最小化了
  - 页面在前台标签页中
  - 实际页面隐藏，但对页面的预览时可见的
  - 页面在屏外预渲染
- visibilitychange事件，在文档隐藏可见切换时触发
- document.hidder 布尔值，表示页面是否隐藏

### Streams API

Streams API是为了解决一个简单但又基础的问题而生的：Web应用如何消费有序的小信息快而不是大信息块

- 大块数据可能不会一次性都可用。网络请求的响应就是一个典型的例子。网络负载是以连续信息包形式交付的，而流式处理可以让应用在数据一到达就使用，而不必等到所有的数据都加载完毕
- 大块数据可能需要分小部分处理。视频处理、数据压缩、图像编码和JSON解析都是可以分成小部分处理，而不必等到所有数据都在内存中时再处理的例子

⚠️**Fetch API已经得到所有主流浏览器支持，但Streams API则没有那么快得到支持**

#### 理解流

JavaScript中的流借用了管道相关的概念，因为原理是相同的Streams API定义了三种流

- 可读流：可以通过某个公共接口读取数据块的流。数据在底部从底层源进入流，然后由消费者进行处理
- 可写流：可以通过某个公共接口写入数据块的流。生产者将数据写入流，数据在内部传入底层数据槽
- 转换流：有两种流组成，可写流用于接收数据，可读流用于输出数据，这两个流之间是转换程序，可以根据需要检查和修改流内容

##### 块、内部队列、反压

流的基本单位是块（chunk）块可是任意数据类型，但通常是定型数据。每个块都是离散的流片段，可以作为一个整体来处理。更重要的是，块不是固定大小的，也不一定按固定间隔到达。在理想的流当中，块的大小通常近似相同，到达的间隔也近似相同。不过好的流实现需要考虑边界情况

由于数据进出速率不同，可能会出现不匹配的情况。为此流平衡可能出现如下三种情形

- 流出口处处理数据的速度比入口提供数据的速度快。流出口经常空闲（可能意味着流入口效率较低），但只会浪费一点内存或计算资源，因此这种流的不平衡是可以接受的
- 流入和流出均衡。这是理想状态。
- 流入口提供数据的速度比出口处理数据的速度快，这种流不平衡是固有的问题。此时一定会在某个地方出现数据积压，流必须相应作出处理

#### 可读流

可读流是对底层数据源的封装。底层数据源可以将数据填充到流中，允许消费者通过流的公共接口读取数据

##### ReadableStreamDefaultController & ReadableStreamDefaultReader

```js
 async function* ints() {
   for (let i = 0; i < 5; i++) {
     yield await new Promise((resolve)=> setTimeout(resolve, 1000, i))
   }
 }
const readableStream = new ReadableStream({ //创建ReadableStream实例
  async start(controller) {
    console.log(controller);
    for await(const chunk of ints()) {
      controller.enqueue(chunk) //把值传入控制器
    }
    controller.close() //关闭流
  }
})
const ReadableStreamDefaultReader = readableStream.getReader();//返回ReadableStreamDefaultReader实例
(async ()=>{
  while (true) {
    const {done, value} =await ReadableStreamDefaultReader.read()//read()方法可以读取值
    if (done) {
      break
    }else{
      console.log(done, value);
    }
  }
})()
```

#### 可写流

```js
async function* ints() {
  for (let i = 0; i < 5; i++) {
    yield await new Promise((resolve)=> setTimeout(resolve, 1000, i))
  }
}
const writableStream = new WritableStream({ //创建WritableStream实例
  write(value){
    console.log(value);
  }
})
const writableStreamDefaultWrite = writableStream.getWriter();//返回writableStreamDefaultWrite实例
(async ()=>{
  for await(const chunk of ints()) {
    await writableStreamDefaultWrite.ready;
    writableStreamDefaultWrite.write(chunk)
  }
  writableStreamDefaultWrite.close()
})()
```

#### 转换流

转换流用于组合可读流和可写流。数据块在两个流之间的转换是通过transform()完成的

```js
 async function* ints() {
   for (let i = 0; i < 5; i++) {
     yield await new Promise((resolve)=> setTimeout(resolve, 1000, i))
   }
 }
//转换流
const {readable, writable} =  new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk*2)
  }
})
const ReadableStreamDefaultReader = readable.getReader();//返回ReadableStreamDefaultReader实例
const writableStreamDefaultWrite = writable.getWriter();//返回writableStreamDefaultWrite实例
//读取流
(async ()=>{
  while (true) {
    const {done, value} =await ReadableStreamDefaultReader.read()//read()方法可以读取值
    if (done) {
      break
    }else{
      console.log(done, value);
    }
  }
})()
//写入流
console.log(writableStreamDefaultWrite);
(async ()=>{
  for await(let chunk of ints()) {
    await writableStreamDefaultWrite.ready;
    writableStreamDefaultWrite.write(chunk)
  }
  writableStreamDefaultWrite.close()
})()
```

#### 通过管道连接流

流可以通过管道连接成一串。最常见的用例是使用pipeThrough()方法把ReadableStream接入TransformStream.

从内部看，ReadableStream先把自己的值传给TransformStream内部的WritableStream，然后执行转换，接着转换后的值又在新的ReadableStream上出现。

```js
async function* ints() {
  for (let i = 0; i < 5; i++) {
    yield await new Promise((resolve)=> setTimeout(resolve, 1000, i))
  }
}

const doublingStream =  new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk*2)
  }
})

const integerStream = new ReadableStream({
  async start(controller){
    for await(const chunk of ints()) {
      controller.enqueue(chunk)
    }
    controller.close()
  }
})
//通过管道连接流
const pipedStream = integerStream.pipeThrough(doublingStream)
//从连接流的输出获得读取器
const pipedStreamDefaultReader = pipedStream.getReader()
console.log(pipedStreamDefaultReader);
(async ()=>{
  while (true) {
    const {done, value} =await pipedStreamDefaultReader.read()//read()方法可以读取值
    if (done) {
      break
    }else{
      console.log(done, value);
    }
  }
})()
        
```

### 计时API

#### High Resolution Time API

Date.now()方法只适用于日期时间相关操作,而且是不要求计时精度的操作

```js
function ints() {
  for (let i = 0; i < 5; i++) {
    setTimeout(()=>{}, 100, i)
  }
}
const t0 = Date.now()
ints()
const t1 = Date.now()
console.log(t1-t0); //0
```

 Date.now()只有毫秒级精度，如果ints执行的够快，则这两个时间戳的值会相等

为了准确的度量时间的流逝，performance.now()

```js
function ints() {
  for (let i = 0; i < 5; i++) {
    setTimeout(()=>{}, 100, i)
  }
}
const t0 = performance.now()
ints()
const t1 = performance.now()
console.log(t1-t0);//0.12999982573091984
```

#### Performance Timeline API

Performance Timeline API使用一套用于度量客户端延迟的工具扩展了performance接口。性能度量将会采用计算结束开始时间差的形式。这些开始和结束时间会被记录为DOMHighResTimeStamp值，而封装这个时间戳的对象是PerformanceEntry的实例

浏览器会自动记录各种 PerformanceEntry 对象，而使用oerformance.mark()也可以记录自定义的PerformanceEntry对象。在一个执行上下文中被记录的所有性能条目可以通过performance.getEntries()获取

### Web 组件

这里所说的Web组建指的是一套用于增强DOM行为的工具，包括影子DOM、自定义元素和HTML模版。这一套浏览器API特别混乱

- 并没有统一的 Web Components 规范：每个Web组件都在一个不同的规范中定义
- 有些Web组件如影子DOM和自定义元素，已经出现了想后不兼容的版本问题
- 浏览器实现及其不一致

由于存在这些问题，因此使用Web组件通常需要引入一个Web组件库，比如Polymer。这种库可以作为腻子脚本，模拟浏览器缺失的Web组件

#### HTML模版

在Web组件之前，一直缺少基于HTML解析构建DOM子树，然后在需要时再把这个子树渲染出来的机制。

两种间接方案

- innerHTML 把标记字符串转换为DOM元素，但这种方式存在严重的安全隐患
- document.createElement()构建每个元素，然后逐个添加，这样做特别麻烦

<template>标签正是为这个目的而生的

```html
<template id="foo">
  <p>这里是 template</p>
</template>
```

##### DocumentFragment

在浏览器渲染时，上面的文本不会被渲染到页面上。因为<template>的内容不属于活动文档，所以document.querySelector()等DOM查询方法不会发现其中的p标签。这是因为p标签存在于一个包含在HTML模版中的DocumentFragment节点内

在浏览器开发中工具检查网页内容时，可以看到<template>中的DocumentFragment

```html
<template id="foo">
  #document-fragment
  <p>这里是 template</p>
</template>
<script>
  const fragment = document.querySelector("#foo").content  //#document-fragment
  document.querySelector("p") //null
  fragment.querySelector("p") //<p>这里是 template</p>
</script>

```

此时的DocumentFragment就像一个对应子树的最小化document对象。

DocumentFragment也是批量向HTML中添加元素的高效工具。

比如，我们想以最快的方式给某个HTML元素添加多个子元素。如果连续调用documen.appendChild()，则不仅费时，还会导致多次布局重排，而使用DocumentFragment可以一次性添加所有的子节点，最多只会有一次布局重排

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <template id="foo">
          </template>
        <div id="app">
        </div>
    </body>
    <script>
        const fragment = document.querySelector("#foo").content 
        for (let i = 0; i < 10; i++) {
            const element = document.createElement('p')
            element.appendChild(document.createTextNode(i))
            fragment.appendChild(element)
        }
        console.log(fragment.children.length); //10
        app.appendChild(fragment)
        console.log(fragment.children.length); //0
    </script>
</html>
```

##### template标签

上面过程同样也可以用template标签来实现

如果模版想要复制，可以使用importNode()方法克隆DocumentFragment

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <template id="foo">
            <p>0</p>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
        </template>
        </template>
        <img id="wf" src="./wf.jpeg" width="200">
        <div id="app">
        </div>
    </body>
    <script>
        const fragment = document.querySelector("#foo").content 
        setTimeout(()=>{
            app.appendChild(fragment)
        },1000)
    </script>
</html>
```

#### 影子DOM

概念上讲，影子DOM Web组件相当直观，通过它可以将一个完整的DOM树作为节点添加到父DOM树。这样可以实现DOM封装，意味着CSS样式和CSS选择符可以限制在影子DOM子树而不是整个顶级DOM树中。

影子DOM与HTML模版相似,因为他们都是类似document的结构，并允许与顶级DOM有一定程度的分离。不过，影子DOM与HTML模版还是有区别的，主要表现在影子DOM的内容会实际渲染到页面上，而HTML模版的内容不会

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
        .red{
           color: red;
        }
        .green{
           color: green;
        }
        .blue{
           color: blue;
        }
    </style>
    <body>
        <div class="red">
            <p>red rext</p>
        </div>
        <div class="green">
            <p>green rext</p>
        </div>
        <div class="blue">
            <p>blue rext</p>
        </div>
    </body>
</html>
```

为了给每个子树应用唯一样式，需要给每个子树一个唯一的类名，尽管知道这些样式与其他地方无关，但是css样式还是会应用到整个DOM。为此要保持CSS选择符足够特别，以防这些样式渗透到其他地方，但这也仅是一个折中的办法而已。理想情况下，应该能够把CSS限制在使用他们的DOM上：这正是DOM最初的使用场景



attachShadow()方法创建并添加给有效HTML元素。容纳影子DOM的元素被称为影子宿主。影子DOM的根节点被称为影子根

attachShadow()方法需要一个shadowRootInit对象，返回影子DOM实例。shadowRootInit对象包含一个mode属性，值为'open','closed'.对'open'影子dom的引用可以通过shadowRoot属性在HTML元素上获得，而对'closed'影子DOM的引用无法这样获取

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    </body>
    <script>
        for (const color of ['red','green','blue']) {
            const div = document.createElement('div')
            document.body.appendChild(div)
            const shadowDOM = div.attachShadow({mode: 'open'})
            shadowDOM.innerHTML = `
                <p> this is ${color}</p>
                <style>
                p{
                    color: ${color}
                }    
                </style>
            `
        }
    </script>
</html>
```

虽然使用相同的选择符应用了3种不同的颜色，但每个选择符只会把样式应用到他们所在的影子DOM上

#### 自定义元素

浏览器会尝试将无法识别的元素作为通用元素整合进DOM。当然，这些元素默认不会任何通用HTML元素不能做的事，但是会变成一个HTMLElement实例

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
        
    </style>
    <body>
        <div id="app">
            
        </div>
    </body>
    <script>
        app.innerHTML = `
            <x-foo>
                Foo   
            </x-foo>
        `
       console.log(document.querySelector('x-foo') instanceof HTMLElement); //true
    </script>
</html>
```

自定义元素在此基础上更进一步。利用自定义元素，可以在自定义标签出现时为它定义复杂的行为，同样也可以在DOM中将其纳入元素生命周期管理。自定义元素要使用全局属性customElements，这个属性会返回CustomElementRegistry对象。

调用customElements.define()方法可以创建自定义元素

```js
class FooElement extends HTMLElement {
  constructor(){
    super()
    console.log('x-foo');
  }
}
customElements.define('x-foo', FooElement)
app.innerHTML = `
  <x-foo>  Foo  </x-foo>
  <x-foo>  Foo  </x-foo>
`
//'x-foo'
//'x-foo'
```

**⚠️在自定义元素的构造函数中必须始终先调用super()。如果元素继承了HTMLElement或相似类型而不会覆盖构造函数，则没有必要调用super()，因为原型构造函数默认会做这件事。很少有创建自定义元素而不继承HTMLElement的。**

##### 添加Web组件内容

给自定义元素添加影子DOM并将内容添加到这个影子DOM中

```js
class FooElement extends HTMLElement {
  constructor(){
    super()
    this.attachShadow({mode: 'open'})
    this.shadowRoot.innerHTML = '这里是影子DOM'
  }
}
customElements.define('x-foo', FooElement)
app.innerHTML = `
<x-foo> </x-foo>
`
// <div id="app">
//     <x-foo> 
//      #shadow-root (open)
//      "这里是影子DOM"
//     </x-foo>
// </div>
```

##### 使用自定义元素生命周期方法

- constructor() 在创建元素实例或将已有DOM元素升级为自定义元素时调用
- connectedCallnack() 在每次将这个自定义元素添加到DOM中时调用
- disconnectedCallback()在每次将这个自定义元素实例从DOM中移除时调用
- attributeChangedCallback() 在每次可观察属性值发生变化时调用。在元素实例初始化时，初始值的定义也算是一次变化
- adoptedCallback() 在通过document.adoptNode()将这个自定义元素实例移动到新文档对象时调用

```js
class FooElement extends HTMLElement {
  constructor(){
    super()
    console.log('ctor');
  }
  connectedCallback(){
    console.log('connected');
  }
  disconnectedCallback(){
    console.log('disconnected');
  }
}
customElements.define('x-foo', FooElement)

const foo = document.createElement('x-foo') //ctor
app.appendChild(foo) //connected
app.removeChild(foo) //disconnected

```

##### 反射自定义元素属性

自定义元素即使DOM实体又是JavaScript对象，因此两者之间应该同步变化

```js
class FooElement extends HTMLElement {
  constructor(){
    super()
    this.bar = true
  }
  get bar(){
    console.log(this.getAttribute('bar'));
    return this.getAttribute('bar')
  }
  set bar(value){
    console.log(value);
    this.setAttribute('bar', value)
  }
}
customElements.define('x-foo', FooElement)

// const foo = document.createElement('x-foo') 
// app.appendChild(foo) 
app.innerHTML=`
<x-foo bar="foo">foo</x-foo>
` //true
console.log(app.innerHTML); // <x-foo bar="true">foo</x-foo>
```

从DOM到JavaScript对象需要给相应的属性添加监听器。为此，可以使用observedAttributes()获取函数让自定义元素的属性值每次改变时都调用attributeChangedCallback()

```js
class FooElement extends HTMLElement {
  constructor(){
    super()
  }
  get bar(){
    return this.getAttribute('bar')
  }
  set bar(value){
    this.setAttribute('bar', value)
  }
  static get observedAttributes(){
    return ['bar']
  }
  attributeChangedCallback(name, oldv, newv){
    if (oldv !== newv) {
      console.log(oldv,'=>', newv);
      this[name] = newv
    }
  }
}
customElements.define('x-foo', FooElement)

app.innerHTML=`
<x-foo bar="false">foo</x-foo>
` //1⃣️
btn.addEventListener('click',()=>{
  document.querySelector('x-foo').setAttribute('bar', true)//2⃣️
})
//null "=>" "false"
//false => true
```

### Web Cryptography API

Web Cryptography API描述了一套密码学工具，规范了JavaScript如何以安全和符合规范的方式实现加密。这些工具包括生成、使用、应用加密密钥对，加密和解密消息，以及可靠地生成随机数

#### 生成随机数

在生成随机值时，一般用Math.random().这个方法在浏览器是以伪随机数生成器(PRNG)方式实现的。所谓**伪**值的是生成值的过程不是真的随机。PRNG生成的值只是模拟了随机的特性。

密码学安全伪随机数生成器(CSPRNG)额外增加了一个熵作为输入，例如测试硬件时间或其他无法预计行为的系统特性。这样一来，计算速度明显比常规PRNG慢很多，但CSPRNG生成的值就很难预测，可以用于加密了。

这个CSPRNG可以通过crypto.getRandomValues()在全局Crypto对象上访问。与Math.random()返回一个介于0和1之间的浮点数不同，getRandomValues()会把随机值写入作为参数传给它的定型数组。定型数组的类不重要，因为底层缓冲区会被随机的二进制位填充

```js
const array = new Uint8Array(1)
for (let i = 0; i < 5; i++) {
  console.log(crypto.getRandomValues(array));
}
//Uint8Array [51]
//Uint8Array [53]
//Uint8Array [167]
//Uint8Array [199]
//Uint8Array [153]
```

getRandomValues()最多生成2的16次方字节（65 536）,超出则会抛出错误

```js
const array = new Uint8Array(2**16)
console.log(crypto.getRandomValues(array)); //Uint8Array(65536) [...]
const array1 = new Uint8Array((2**16)+1)
console.log(crypto.getRandomValues(array1)); //Error
```

下面可以生成随机数

```js
function randomFloat() {
  const array = new Uint32Array(1)
  const maxUnit32 = 0xFFFFFFFF;
  return crypto.getRandomValues(array)[0]/maxUnit32
}
console.log(randomFloat());
```

#### 使用SubtleCrypto对象

Web Cryptography API重头特性都暴漏在SubtleCrypto对象上，可以通过window.crypto.subtle访问

**⚠️SubtleCrypto对象只能在安全上下文（https）中使用。在不安全的上下文中，window.crypto.subtle属性是undefined。**

这个对象包含一组方法，用于执行常见的密码学功能，如加密、散列、签名、生成密钥。因为所有密码学操作都在原始二进制数据上执行，所以SubtleCrypto的每个方法都要用到ArrayBuffer和ArrayBufferView类型。由于字符串是密码学操作的重要场景，因此TextEncoder和TextDecoder是经常与SubtleCrypto一起使用的类，用于实现二进制数据与字符串之间的相互转换。

##### 生成密码学摘要

计算数据的密码学摘要是非常常用的密码学操作。这个规范支持4种摘要算法：SHA-1 和三种SHA-2

- SHA-1: 架构类似MD5的散列函数，接受任意大小的输入，生成160位消息列表。由于容易收到碰撞攻击，这个算法已经不在安全
- SHA-2: 构建与相同耐碰撞单向压缩函数之上的一套散列函数。规范支持其中3种SHA-256、SHA-384、SHA-512.生成的消息摘要可以是256位（SHA-256）、是384位（SHA-384）、是512位（SHA-512）。这个算法被认为是安全的，广泛应用于很多领域和协议，包括TLS、PGP、加密货币（如比特币）

SubtleCrypto.digest()方法用于生成摘要。要使用的散列算法通过字符串SHA-1、SHA-256、SHA-384、SHA-512指定

通常在使用时，二进制的消息摘要会转换为十六进制字符串格式。通过将二进制数据按8位进行分割，然后再调用toString(16)就可以把任何数组缓冲区转换为十六进制字符串

```js
(
  async function () {
    const textEncoder = new TextEncoder()
    const message = textEncoder.encode('foo')
    console.log(message);
    const messageDigest =await window.crypto.subtle.digest('SHA-256', message)
    console.log(new Uint32Array(messageDigest));
    //Uint32Array(8) [1806968364, 2412183400, 1011194873, 876687389, 1882014227, 2696905572, 2287897337, 2934400610]
    const hexDifest = Array.from(new Uint8Array(messageDigest))
    .map(x=>x.toString(16).padStart(2,'0')).join('')
    console.log(hexDifest);
    //2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae
  }
)()
```

##### CryptoKey算法

如果没了密钥，那密码学也就没有什么意义了。SubtleCrypto对象使用CryptoKey类的实例来生成密钥。CryptoKey类支持多种加密算法，允许控制密钥抽取和使用

##### 生成CryptoKey

SubtleCrypto.generateKey()方法可以生成随机CryptoKey，这个方法返回一个契约，解决为一个或多个CryptoKey实例。使用时需要给这个方法传入一个指定目标算法的参数对象、一个密钥是否可以从CryptoKey对象中提取出来的布尔值，以及一个表示这个密钥可以与那个SubtleCrypto 方法一起使用的字符串数组（keyUsages）

```js
(
  async function () {
    const params ={
      name: 'AES-CTR',
      length: 128
    }
    const keyUsages = ['encrypt','decrypt']
    const key = await crypto.subtle.generateKey(params, false , keyUsages)
    console.log(key);
    //CryptoKey {type: "secret", extractable: false, algorithm: {…}, usages: Array(2)}
  }
)()
```

## 错误处理与调试

### 错误处理

有一个良好的错误处理策略可以让用户知道到底发生了什么。为此，必须理解各种捕获和处理错误的方式

#### try/catch语句

```js
try {
  //可能出错的代码
  
} catch (error) {
  //出错时要做什么
}
```

如果try块中有代码发生错误，代码会立即推出执行，并跳到catch块中.catch块此时接受到一个对象，该对象包含发生错误的相关信息。错误对象中暴露的实际信息因浏览器而异，但至少包含错误信息的message属性

##### finally语句

try/catch语句中可选的finally语句始终执行，不论是try块中的代码是否执行错误

```js
function testFinally() {
  try {
    return 1
  } catch (error) {
    return 2
  }finally {
    return 0
  }
}
console.log(testFinally());
```
以上代码按道理不出错返回1，出错返回2，但是finally的存在导致这个函数始终会返回0

##### try/catch的用法

当try/catch中发生错误时，浏览器会认为错误被处理了，因此就不会使用机制报告错误。
try/catch最好用在自己无法控制的错误上。如果明确知道自己的代码会发生某种错误，那么久不适合使用try/catch

#### 抛出错误

与try/catch语句对应的一个机制是 throw 操作符，用于在任何时候抛出自定义错误.不限制数据类型

```js
throw 12345
throw "hello word"
throw true
throw {name: "javaScript"}
```

#### error事件

任何没有被try/catch语句处理的错误都会在window对象上触发error事件。

```js
window.onerror = (message, url, line)=>{
  console.log(message, url, line);
  //Uncaught ReferenceError: a is not defined 
  //file:///Users/weiwentao/studyEveryday/test/demo.html 
  //25
  return false
}
console.log(a);
```

**⚠️浏览器在使用这个事件处理错误时存在明显差异。在IE中发生error事件时，正常代码会继续执行，所有变量和数据会保持，且可以在onerror事件处理程序中访问。在Firefox中，正常代码的执行会终止，错误发生之前的所有变量和数据会被销毁，导致很难分析处理错误**





## 变量、作用域、内存

JavaScript变量是松散类型的，而且变量不过就是特定时间点一个特定值的名称而已。由于没有规则定义变量包含什么数据类型，变量的值和数据类型在脚本生命周期内可以改变。

### 原始值与引用值

ECMAScript变量包含两种不同类型的数据

- 原始值

  原始值就是最简单的数据

  Undefined、Null、Boolean、Number、String、Symbol

- 引用值

  引用值是由多个值构成的对象

  引用值是保存在内存中的对象。在操作对象时，实际上操作的是对该对象的引用而非实际的对象本身。为此，保存引用值的变量时按引用访问的

#### 动态属性

原始值和引用值的定义方式类似，都是创建了一个变量，然后赋值。不过在变量保存了这个值之后，可以对这个值做什么，则大有不同

⚠️原始类型的初始化可以只使用原始字面量形式。如果使用的是new关键字，则JavaScript会创建一个Object类型的实例

```js
let name1 = 'foo'
let name2 = new String('foo')
name1.age = 18
name2.age = 18
console.log(name1.age); //undefined
console.log(name2.age); //18
console.log(typeof name1); //string
console.log(typeof name2); //object
```

#### 复制值

再通过变量把一个原始值赋值到另一个变量时，原始值会被复制到新变量的位置

在把引用值从一个变量赋值给另一个变量时，存储在变量中的值也会被复制到新变量所在的位置，区别在于，这里复制的值实际上是一个指针，它指向存储在堆内存中的对象。操作完成后，两个变量实际上指向同一个对象，因此一个对象上的变化会在另一个对象上反应出来

```js
 let obj1 = {}
 let obj2 = obj1
 obj1.name = 'foo'
console.log(obj2);//{name: "foo"}
```

#### 传递参数

ECMAScript中所有函数的参数都是按值传递的。这意味着函数外的值会被复制到函数内部的参数中，就像一个变量复制到另一个变量一样。

```js
function addTen(num) {
  num+=10
  return num
}
let count = 20
let result = addTen(count)
console.log(count); //20
console.log(result); //30



function setName(obj) {
  obj.name = 'foo'
  return obj
}
let person = new Object()
let res = setName(person)
console.log(res); //{name: "foo"}
console.log(person); //{name: "foo"}
```

#### 确定类型

typeof是判断一个变量是否为字符串、数值、布尔值、undefined的最好方式。

**typeof判断 null、array、object会返回object**

**typeof判断函数、正则会返回'function'（任何实现内部[[call]]方法的对象）**

typeof虽然对原始值很有用，但他对引用值的用处不大所以用 instanceof

```js
const name = 'foo'
const person = {}
const color = []
const pattern = /\./
console.log(name instanceof Object); //false
console.log(person instanceof Object); //true
console.log(color instanceof Array); //true
console.log(pattern instanceof RegExp); //true
```

### 执行上下文与作用域

变量或函数的上下文决定了它们可以访问那些数据，以及他们的行为。每个上下文都有一个关联的变量对象，而这个上下文中定义的所有变量和函数都存在于这个对象上。虽然无法通过代码访问变量对象，但后台处理数据会用到它。

通过var定义的全局变量和函数都会成为window对象的属性和方法。使用let和const的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的。上下文在其所有代码执行完毕后会被销毁

每个函数调用都有自己的上下文。当代码执行流进入函数时，函数的上下文被推倒一个上下文栈上。在函数执行完之后，上下文栈会弹出该函数的上下文。将控制器返还给之前的执行上下文。

上下文中的代码在执行的时候，会创建变量对象的一个作用域链。这个作用域链决定了各级上下文中的代码在访问变量和函数时的顺序。代码正在执行的上下文的变量对象始终位于作用域链的最前端。如果上下文是函数，则其活动对象用作变量对象，活动对象最初只有一个定义变量：arguments(全局上下文中没有这个变量)。

#### 作用域链增强

执行上下文主要有全局上下文和函数上下文两种（eval()调用内部存在第三种上下文）。但有其他方式来增强作用域链。某些语句会导致在作用域链前端临时添加一个上下文，这个上下文在代码执行后会被删除。通常在两种情况下会出现这个现象

- try/catch
- with语句

这两种情况下，都会在作用域链前端添加一个变量对象。对with语句来说，会向作用域链前端添加指定的对象；对catch语句而言，则会创建一个新的变量对象，这个变量对象会包含要抛出的错误对象的声明

```js
function buildUrl() {
  let qs = "?debug=true"
  with(location){
    var url = href + qs
    }
  return url
}
console.log(buildUrl());
```

#### 变量声明

var 和 ES6新增let、const

##### 使用var的函数作用域声明

在使用var声明时，变量会被自动添加到最接近的上下文

```js
var name = "jake"

//等价于

name = "jake"

var name //默认变量会被提升到上下文顶部
```

##### 使用let的快级作用域

let的作用域是块级的。块级作用域由最近的一对花括号{ }界定。

```js
if (true) {
   let a = 'a'
}
console.log(a); //Uncaught ReferenceError: a is not defined a没有定义
```

##### const 的常量声明

const声明的变量必须同时初始化这个值。一经声明，在其生命周期的任何时候都不能再重新赋值

⚠️**如果想让对象不能修改可以使用Object.freeze()**

##### 标示符查找

在特定的上下文中为读取或写入而引用一个标识符时，必须通过搜索确定这个表示符表示什么。搜索开始于作用域链前端，以给定的名称搜索对应的标识符。如果在局部上下文中找到该标识符，则搜索停止，变量确定，如果没有找到，则继续沿着作用域链搜索。(⚠️作用域链中的对象也有一个原型链，因此搜索可能涉及每个对象的原型链)这个过程一直持续到搜索至全局上下文的变量对象。如果仍然没有找到，说明其未生明

```js
let color = "blue"
function getColor() {
  return color
}
console.log(getColor()); //blue
```

```js
let color = "blue"
function getColor() {
  let color = "red"
  return color
}
console.log(getColor()); //red
```

```js
let color = "blue"
function getColor() {
  let color = "red"
  {
    let color = "green"
    return color
  }
}
console.log(getColor()); //green
```

访问局部变量比访问全局变量要快，因为不切换作用域。不过。将来这个差异可能就微不足道了

### 垃圾回收♻️

JavaScript是使用垃圾回收的语言，也就是说执行环境负责在代码执行时管理内存，通过自动内存管理实现内存分配和闲置资源回收。

**思路：**确定那个变量不会再使用，然后释放它占用的内存。这个过程是周期性的，即垃圾回收程序每隔一定时间就会自动运行。

垃圾回收过程是一个近似且不完美的方案，因为某块内存是否还有用，属于“不可判定的”问题

#### 标记清理

JavaScript最常用的垃圾回收策略是标记清理。当变量进入上下文，比如在函数内部声明一个变量时，这个变量会被加上存在于上下文中的标记。而在上下文中的变量，逻辑上讲，永远不应该释放他们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时，也会被加上离开上下文的标记。

#### 引用计数

另一种不常用的垃圾回收策略是引用计数。其思路是对每个值都记录它被引用的次数。声明变量并给它一个引用值1，如果同一个值又被赋给另一个变量，那么引用数+1.类似的，如果保存的变量会被其他值给覆盖了，那么引用值-1.当一个值的引用值为0时。就说明可以收回了

⚠️

```js
function problem() {
  let objectA= new Object()
  let objectB= new Object()
  objectA.otherObject = objectB
  objectB.otherObject = objectA
}
```

在这个例子中 objectA与objectB通过各自的属性相互引用，意味着他们的引用数都是2.在标记清理的策略下函数结束后，这两个对象都不在作用域中，而在引用计数策略下，他们的引用值一直不会变成0

### 内存管理

将内存占用量保持在一个较小的值可以让页面性能更好。优化内存占用的最佳手段就是保证在执行代码时只保存必要的数据。如果数据不再必要，那么把它设置为null，从而释放其引用。这也叫解除引用。这个建议最适合全局变量和全局对象的属性

```js
function createPerson(name) {
  let localPerson= new Object()
  localPerson.name = name
  return localPerson
}
let globalPerson = createPerson()
//解除globalPerson的引用
globalPerson=null
```

解除对一个值的引用并不会自动导致相关内存被回收。解除引用的关键在于确保相关的值已经不在上下文里了，因此它在下次垃圾回收时被回收。

##### 通过const和let声明提升性能

ES6增加这两个关键字不仅有助于改善代码风格，而且同样有助于改进垃圾回收的过程。因为const和let都以快（而非函数）为作用域，所以相比于使用var，使用这两个关键字可能会更早的让垃圾回收程序介入。

##### 内存泄漏

在内存有限的设备上，或者在函数被多次调用的情况下，内存泄漏可能是个大问题。JavaScript中的内存泄漏大部分时由不合理的引用导致的。

1. 意外的声明全局变量是最常见的内存泄漏问题

   ```js
   function setName() {
     name = 'jake'
   }
   ```

   没有使用关键字声明的变量会当作window的属性来创建，只要window本身不被清理就不会消失。这个问题只要加上关键字就会解决，变量在函数执行完毕后离开作用域

2. 定时器引用全局变量

   ```js
   let  name = 'jake'
   setTimeout(()=>{
     console.log(name);
   },1000)
   ```

   只要定时器一直运行，回调函数中的引用就会一直占用内存

3. 使用JavaScript闭包也会造成内存泄漏

   ```js
   let outer =  () => {
     let name = 'jake'
     return ()=>{
       return name
     }
   }
   ```

   调用outer()会导致分配给name的内存被泄漏。以上代码执行后创建了一个内部闭包，只要返回的函数存在就不能清理name，因为闭包一直在引用它。假如name的内容很大（一大堆很长的字符串），那就是个很大的问题

   ##### 静态分配与对象池

   浏览器决定何时运行垃圾回收程序的一个标准就是对象更替的速度，如果有很多的对象被初始化，然后一下子又都超出了作用域，那么浏览器就会采用激进的方式调度垃圾回收程序运行

   ```js
   function addVector(a,b) {
     let resultant = new Vector();
     resultant.x = a.x + b.x
     resultant.y = a.y + b.y
     return resultant
   }
   ```

   在这个函数被频繁调用，相应的就会频繁的创建一个新对象，然后修改它，在返回。在这个对象生命周期很短的情况下，他很快的就会失去引用，成为可被垃圾回收机制回收的值。在垃圾回收调度程序发现这里对象更替的速度很快的时候就会更频繁地安排垃圾回收。

   ```js
   function addVector(a,b,resultant) {
     resultant.x = a.x + b.x
     resultant.y = a.y + b.y
     return resultant
   }
   ```

   解决方案时不要去动态创建矢量对象

## 迭代器与生成器

### 理解迭代

**迭代之前需要事先知道如何使用数据结构**。数组中的每一项都只能先通过引用取得数组对象，然后再通过[]操作符取的特定索引位置上的项。这种情况并不适用于所有数据结构

**遍历顺序并不是数据结构固有的。**通过递增索引来访问数据是特定于数组类型的方式，并不适用于其他具有隐士顺序的数据结构

### 迭代器模式

迭代器模式描述一个方案，即可以把有些结构称为“可迭代对象”因为它们实现了正式的Iterable接口，而且可以通过迭代器Iterator消费。

任何实现Iterable接口的数据结构都可以被实现Iterator接口的结构消费。迭代器是按需创建的一次性对象。每个迭代器都会关联一个可迭代对象，而迭代器会暴露迭代其关联可迭代对象的API，迭代器无需了解与其关联的可迭代对象的结构，只需知道如何取得连续的值。这种概念上的分离正是Iterable和Iterator的强大之处。

#### 可迭代协议

实现Iterable接口（可迭代协议）要求同时具备两种能力：支持迭代的自我识别能力和创建实现Iterator接口的对象的能力。

在ECMAScript中，这意味着必须暴露一个属性作为“默认迭代器”而且这个属性必须使用特殊的Symbol.iterator作为键。这个默认迭代器属性必须引用一个迭代器工厂函数，调用这个工厂函数必须返回一个新迭代器。

内置类型实现可Iterable接口：

- 字符串
- 数组
- 映射
- 集合
- arguments 对象
- NodeList等DOM集合类型

检查数据是否存在默认迭代器属性

```js
const num = 1
const obj = {}
const str = "hello word"
const arr = [1, 2, 3, 4]
const map = new Map().set('a',1).set('b',2)
const set = new Set().add('a').add('b')
const els = document.querySelectorAll('div')

console.log(num[Symbol.iterator]); //undefined
console.log(obj[Symbol.iterator]); //undefined
console.log(str[Symbol.iterator]); //ƒ [Symbol.iterator]() { [native code] }
console.log(arr[Symbol.iterator]); //ƒ values() { [native code] }
console.log(map[Symbol.iterator]); //ƒ entries() { [native code] }
console.log(set[Symbol.iterator]); //ƒ values() { [native code] }
console.log(els[Symbol.iterator]); //ƒ values() { [native code] }
```

实际写代码过程中，不需要显示调用这个工厂函数来生成迭代器。实现可迭代协议的所有类型都会自动兼容接受可迭代对象的任何语言特性。接受可迭代对象的原生语言特性包括：

- For-of 循环
- 数组解构
- 扩展操作符
- Array.from()
- 创建集合
- 创建映射
- Promise.all() 接受由期约组成的可迭代对象
- Promise.race() 接受由期约组成的可迭代对象
- yield*操作符，在生成器中使用

```js
const str = "hello word"
const arr = [1, 2, 3]
const map = new Map().set('a',1).set('b',2)
const set = new Set().add('a').add('b')
const els = document.querySelectorAll('div')

// for - of 循环
for (const el of arr) {
  console.log(el);
}
//数组解构
const [ a, b, c ] =arr
console.log(a, b, c); //1 2 3
//扩展运算符
const arr2 = [...arr]
console.log(arr2); //[1, 2, 3]
//Array.from()
const arr3 = Array.from(arr)
console.log(arr3); //[1, 2, 3]
//Set构造函数
const set1 = new Set(arr)
console.log(set); // Set(2) {"a", "b"}
//Map构造函数
const map1 = new Map([["a",1],["b",2]])
console.log(map1);  //Map(2) {"a" => 1, "b" => 2}
```

#### 迭代器协议

迭代器是一种一次性使用的对象，用于迭代与其关联的可迭代对象。迭代器API使用next()方法在可迭代对象中遍历数据。每次成功调用next(),都会返回一个IteratorResult对象，其中包括迭代器返回的下一个值。若不调用next()，则无法知道迭代器的当前位置

next()方法返回的迭代器对象IteratorResult包含两个属性：done和value。done是一个布尔值。表示是否还可以调用next()取得下一个值；value包含可迭代对象的下一个值（done为false），或者undefined（done为true）。done: true状态称为“耗尽”

```js
const arr = [1, 2, 3]
let iter = arr[Symbol.iterator]()
console.log(iter.next()); //{value: 1, done: false}
console.log(iter.next()); //{value: 2, done: false}
console.log(iter.next()); //{value: 3, done: false}
console.log(iter.next()); //{value: undefined, done: true}
```

每个迭代器都表示可迭代对象的一次性有序遍历。不同的迭代器实例之间互相没有联系

```js
const arr = [1, 2]
let iter1 = arr[Symbol.iterator]()
let iter2 = arr[Symbol.iterator]()
console.log(iter1.next()); //{value: 1, done: false}
console.log(iter1.next()); //{value: 2, done: false}
console.log(iter2.next()); //{value: 1, done: false}
console.log(iter2.next()); //{value: 2, done: false}
console.log(iter2.next()); //{value: undefined, done: true}
console.log(iter1.next()); //{value: undefined, done: true}
```

迭代器并不与可迭代对象某个时刻的快照绑定，而仅仅是使用游标来记录可迭代对象的历程。如果可迭代对象在迭代期间被修改了，迭代器也会反映响应的变化

```js
const arr = [1, 2]
let iter1 = arr[Symbol.iterator]()
console.log(iter1.next()); //{value: 1, done: false}
arr.splice(1,0,3)
console.log(iter1.next()); //{value: 3, done: false}
console.log(iter1.next()); //{value: 2, done: false}
console.log(iter1.next()); //{value: undefined, done: true}
```

#### 自定义迭代器

```js
class Counter {
  constructor(limit){
    this.limit =limit
  }
  [Symbol.iterator] (){
    let count = 1
    const limit = this.limit
    return{
      next() {
        if (count < limit) {
          return {done:false, value: count++}
        }else{
          return {done:true, value: undefined}
        }
      }
    }
  }
}
const counter = new Counter(3)
for (const i of counter) {
  console.log(i); 
}
//1
//2
for (const i of counter) {
  console.log(i);
}
//1
//2
```

#### 提前终止迭代器

可选的return()方法用于指定在迭代器提前关闭时执行的逻辑。

提前关闭的操作情况

- for-of循环通过break、continue、return、throw提前退出
- 解构操作并为消费所有值

```js
class Counter {
  constructor(limit){
    this.limit =limit
  }
  [Symbol.iterator] (){
    let count = 0
    const limit = this.limit
    return{
      next() {
        if (count < limit) {
          return {done:false, value: count++}
        }else{
          return {done:true, value: undefined}
        }
      },
      return(){
        console.log('Exiting early');
        return {done:true}
      }
    }
  }
}
const counter = new Counter(5)
for (const i of counter) {
  if (i>2) {
    break
  }
  console.log(i); 

}
//0
//1
//2
//Exiting early
```

### 生成器

生成器时ECMAScript6新增的一个极为灵活的结构，拥有在一个函数块内暂停和恢复代码执行能力。这种能力具有深远的影响，比如，使用生成器可以自定义迭代器和实现协程。

#### 生成器基础

生成器的形式是一个函数，函数名称前面加一个星号*****表示他是一个生成器。只要是可以定义函数的地方，就可以定义生成器。

**⚠️ 箭头函数不能用来定义生成器函数**

```js
//生成器函数声明
function *generatorFn(params) {}
//生成器函数表达式
const generatorFn = function* () { }
//字面量方式
const foo = {
  * generatorFn() { }
}
//作为类方法
class Foo {
  * generatorFn() { }

}
//作为类静态方法
class Foo {
  static * generatorFn() { }
}
```

调用生成器函数会产生一个生成器对象。生成器对象一开始处于暂停执行的状态。与迭代器相似，生成器对象也实现了Iterator接口，因此具有next()方法。调用会让生成器开始或恢复执行。

next()方法的返回值类似于迭代器，有一个done属性和一个value属性。函数体为空的生成器函数中间不会停留，调用一次next()就会达到done：true状态

```js
function *generatorFn() {
  return 'foo'
}
const g = generatorFn()
console.log(g.next());//{value: "foo", done: true}
console.log(g.next());//{value: undefined, done: true}
```

#### yield中断执行

yield关键字可以让生成器停止或开始执行，也是生成器最有用的地方。生成器遇到yield关键字之前会正常执行，遇到这个关键字后，执行会停止，函数作用域的状态会被保留。停止执行的生成器函数只能通过在生成器对象上调用next()方法来恢复执行

```js
function *generatorFn() {
  yield 'foo'
  yield 'bar'
}
const g = generatorFn()
console.log(g.next());//{value: "foo", done: true}
console.log(g.next());//{value: "bar", done: true}
console.log(g.next());//{value: undefined, done: true}
```

生成器函数内部的执行流程会针对每个生成器对象区分作用域，在一个生成器对象上调用next()不会影响其他生成器

```js
function *generatorFn() {
  yield 'foo'
  yield 'bar'
}
const g1 = generatorFn()
const g2 = generatorFn()
console.log(g1.next());//{value: "foo", done: true}
console.log(g2.next());//{value: "foo", done: true}
console.log(g1.next());//{value: "bar", done: true}
console.log(g2.next());//{value: "bar", done: true}
```

##### 生成器对象作为可迭代对象

```js
function *generatorFn() {
  yield 1
  yield 2
  yield 3
}
const g = generatorFn()
for (const i of g) {
  console.log(i);
}
//1
//2
//3
```

在自定义迭代对象时，使用生成器对象会非常有用

```js
function *nTimes(n) {
  while (n--) {
    yield n
  }
}
for (const i of nTimes(5)) {
  console.log(i);
}
//4
//3
//2
//1
//0
```

##### 使用yield实现输入和输出

除了可以作为函数的中间返回语句，yield关键字还可以作为函数的中间函数使用。上一次让生成器函数暂停的yield关键字会接受到传给next()方法的第一个值。

**⚠️第一次调用next()传入的值不会被使用，因为第一次调用是为了开始执行生成器函数**

```js
function *generatorFn(initial) {
  console.log(initial); //1
  console.log(yield); //3
  console.log(yield); //4
}
const g = generatorFn('1')
g.next('2')//第一次调用next()传入的值不会被使用，因为第一次调用是为了开始执行生成器函数
g.next('3')
g.next('4')
```

##### 产生可迭代对象

可以使用星号增强yield的行为，让它能够迭代一个可迭代对象，从而一次产出一个值

```js
// function *generatorFn() {
//    for (const x of [1,2,3]) {
//        yield x
//    }
// }
// 等价与
function *generatorFn() {
  yield* [1,2,3]
}
for (const x of generatorFn()) {
  console.log(x);
}
//1
//2
//3
```

yield*实际上只是将一个可迭代对象序列化为一连串可以单独产出的值，所有这和多个yield没什么不同

```js
function *generatorFn() {
  yield* [1,2,3]
  yield* [4,5,6]
}
for (const x of generatorFn()) {
  console.log(x);
}
//1
//2
//3
//4
//5
//6
```

##### yield*实现递归算法

yield*最有用的地方是实现递归操作，此时生成器可以产生自身

```js
function *nTimes(n) {
  if (n>0) {
    yield* nTimes(n-1)
    yield n-1
  }
}
for (const x of nTimes(3)) {
  console.log(x);
}
//0
//1
//2
```

在这个例子中，每个生成器首先都会从新创建的生成器对象产出每个值，然后在产出一个整数。结果就是生成器函数会递归地减少计数器值，并实例化另一个生成器函数。从顶层来看，这就相当于创建一个可迭代对象并返回递增的整数。





### 生成器作为默认迭代器

因为生成器对象实现了Iterable接口，而且生成器函数和默认迭代器被调用之后都产生迭代器，所以生成器格外适合作为默认迭代器

```js
class Foo {
  constructor(){
    this.values = [1,2,3]
  }
  *[Symbol.iterator](){
    yield * this.values
  }
}
const f = new Foo()
for (const x of f) {
  console.log(x);
}
//1
//2
//3
```

#### 提前终止生成器

与迭代器类似，生成器也支持“可关闭”的概念。一个实现Iterator接口的对象一定有next()方法，还有一个可选的return()方法用于提前终止迭代器。生成器对象还有第三个方法：throw()

return()和throw()方法都可以用于强制生成器进入关闭状态

```js
function *generatorFn() {
}
const g = generatorFn()
console.log(g.next); //next() { [native code] }
console.log(g.return); //return() { [native code] }
console.log(g.throw); //throw() { [native code] }
```



##### return()

return()方法会强制生成器进入关闭状态。提供给return()方法的值，就是终止迭代器对象的值

```js
function *generatorFn() {
  yield* [1,2,3]
}
const g = generatorFn()
console.log(g.next()); 
console.log(g.return(4)); 
console.log(g.next()); 
console.log(g.next()); 
console.log(g.next()); 
```

```js
function *generatorFn() {
  yield* [1,2,3]
}
const g = generatorFn()
for (const x of g) {
  if (x>1) {
    g.return(4)
  }
  console.log(x);
}
//1
//2
```

##### throw()

throw()方法会在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器就会关闭

```js
function *generatorFn() {
  yield* [1,2,3]
}
const g = generatorFn()
console.log(g); //generatorFn {<suspended>}
try {
  g.throw(4)
} catch (error) {
  console.log(error); //4
}
console.log(g); //generatorFn {<closed>}
```

不过，假如生成器函数内部处理了这个错误，那么生成器就不会关闭，而且还可以恢复执行。错误处理会跳过对应的yield

```js
function *generatorFn() {
  for (const x of [1,2,3]) {
    try {
      yield x
    } catch (e) {}
  }
}
const g = generatorFn()
console.log(g.next()); //{value: 1, done: false}
console.log(g.next()); //{value: 3, done: false}
```

## 对象、类与面向对象编程

### 理解对象

#### 属性的类型

ECMA 使用一些内部特征来描述属性的特征。这些特性是由为JavaScript实现引擎的规范定义的。因此，开发者不能在JavaScript中直接访问。为了将某个特性标识为内部特性，规范会用两个中括号把特性的名称括起来，比如[Enumerable].

属性分为两种：数据属性和访问器属性

##### 数据属性

数据属性包含一个保存数据值的位置。值会从这个位置读取，也会写入到这个位置

- [[Configurable]]：表示属性是否可以通过delede删除并重新自定义，是否可以修改他的特性，以及是否可以把它改为访问器属性。默认为true
- [[Enumerable]]：表示是否可以通过for-in循环返回。默认为true
- [[Writeble]]：表示属性的值是否可以被修改。默认为true
- [[Value]]：包含属性实际的值。默认为undefined

要修改属性的默认特性，就必要使用Object.defineProperty()方法。这个方法接受三个参数：要给其添加属性的对象、属性的名称和一个描述符对象（描述符对象可以包含value、writeble、enumerable、configurable）跟相关特性的名称一一对应

```js
const person = {
  name: "张三"
}
Object.defineProperty(person, "name",{
  value: "李四",
  configurable: false,
  writable: false
})
console.log(person.name); //李四
person.name = "张三"
console.log(person.name); //李四
delete person.name
console.log(person.name); //李四
//
Object.defineProperty(person, "name",{ //抛出错误
  configurable: true,
})
```

在configurable被设置为false之后在多次调用Object.defineProperty()就会报错

##### 访问器属性

访问器属性不包含数据值。相反，他们包含一个获取（getter）函数和一个设置（setter）函数，不过这两个函数不是必须的。在读取访问器属性时，会调用获取函数，这个函数的责任就是返回一个有效的值。在写入访问器属性时，会调用设置函数并传入新值

- [[Get]]：获取函数，在读取属性时调用。默认为undefined
- [[Set]]：设置函数，在写入函数时调用。默认为undefined
- [[Configurable]]：表示属性是否可以通过delede删除并重新自定义，是否可以修改他的特性，以及是否可以把它改为访问器属性。默认为true
- [[Enumerable]]：表示是否可以通过for-in循环返回。默认为true

访问器属性是不能直接定义的，也必须使用Object.defineProperty()

```js
const book = {
  year_: 2017,
  edition: 1
}
Object.defineProperty(book, "year",{
  get(){
    return this.year
  },
  set(newValue){
    if (newValue>2017) {
      this.year_ = newValue
      this.edition = newValue - 2017
    }
  }
})
book.year=2020
console.log(book);//{year_: 2020, edition: 3}
```

ECMAScript还提供了Object.defineProperties()方法，可以一次性定义多个属性。接受两个参数：对象和描述对象

```js
const book = {}
Object.defineProperties(book,{
  year_: {
    value: 2017,
    writable:true
  },
  edition: {
    value: 1,
    writable: true
  },
  year:{
    get() {
      return this.year_
    },
    set(newValue) {
      if (newValue>2017) {
        this.year_ = newValue
        this.edition += newValue- 2017
      }
    }
  }
})
book.year=2020
console.log(book);//{year_: 2020, edition: 3}
```

#### 读取属性的特性

使用Object.getOwnPropertyDescriptor()方法可以取得指定属性的属性描述符。接受两个参数：属性所在的对象和要取得其描述符的属性名。返回值是一个对象

```js
const book = {}
Object.defineProperties(book,{
  year_: {
    value: 2017,
    writable:true
  },

})
book.year=2020
const descriptor = Object.getOwnPropertyDescriptor(book, 'year')
console.log(descriptor.configurable);  //false
console.log(descriptor.enumerable);   //false
console.log(typeof descriptor.set);  //function
```

ES-2017新增了Object.getOwnPropertyDescriptors()静态方法。

```js
const book = {}
Object.defineProperties(book,{
  year_: {
    value: 2017,
    writable:true
  },
  edition: {
    value: 1,
    writable: true
  },
  year:{
    get() {
      return this.year_
    },
    set(newValue) {
      if (newValue>2017) {
        this.year_ = newValue
        this.edition += newValue- 2017
      }
    }
  }
})
book.year=2020
const descriptor = Object.getOwnPropertyDescriptors(book)
console.log(descriptor);  
// {
//     edition: {
//         configurable: false
//         enumerable: false
//         value: 4
//         writable: true
//     },
//     year: {
//         configurable: false
//         enumerable: false
//         get: ƒ get()
//         set: ƒ set(newValue)
//     },
//     year_: { 
//         configurable: false
//         enumerable: false
//         value: 2020
//         writable: true
//     }
// }
```

#### 合并对象

ECMAScript6为合并对象提供了Object.assign()方法。这个方法接受一个目标对象和一个或多个源对象作为参数,然后将每个源对象中可枚举（Object.propertyIsEnumerable()返回true）和自有(object.hasOwnProperty()返回true)属性复制到目标对象。以字符串和符号为键的属性会被复制。对每个符合条件的属性，这个方法会使用源对象上的[[Get]]去的属性的值。然后使用目标对象上的[[Set]]设置属性的值。**并且返回修改后的目标对象**

```js
const dest = {name: 'dest'}
const src = {id: 'src'}
const result = Object.assign(dest, src)
console.log(dest); //{name: "dest", id: "src"}
console.log(src); //{id: "src"}
console.log(result); //{name: "dest", id: "src"}
```

Object.assign()实际上对每个源对象执行的是浅复制。如果多个源对象都有相同的属性，则使用最后一个复制的值。此外，从源对象访问器属性取得的值，比如获取函数，会作为一个静态值赋给目标对象。 **不能在两个对象间转移获取函数和设置函数**

```js
const dest = {
  name: 'dest',
  //可以在目标对象上设置函数观察覆盖的全过程
  set id(x){
    console.log(x);
    //src
    //noId
  }
}
const src = {id: 'src'}
const result = Object.assign(dest, src, {id: 'noId'})
console.log(result); //{name: "dest", id: "noId"}
```

浅复制意味着只会复制对象的引用

```js
const dest = {
}
const src = {a: {}}
const result = Object.assign(dest, src,)
console.log(result); //{a: {}}
console.log(result.a === src.a); //true
```

#### 对象标识及相等判定

Object.is()这个方法与===很像，但同时也考虑了一些边界情况。这个方法接受两个参数

```js
console.log(Object.is(1,true)); //false
console.log(Object.is(0,+0));   //true
console.log(Object.is(-0,+0));  //false
console.log(Object.is(NaN,NaN)); //true
```

#### 增强的对象语法

ECMAScript为定义和操作对象新增了很多极其有用的语法糖特性。这些特性都没有改变现有引擎的行为，但极大地提升了处理对象的方便程度

##### 属性值简写

简写属性名只要使用变量名（不再用写冒号）就会自动被解释为同名的属性键。如果没有找到同名变量，则会抛出ReferenceError

```js
let name = "Matt"
let person = {
  name
}
console.log(person); //{name: "Matt"}
```

##### 可计算属性

**在引入可计算属性之前**，如果想使用变量的值作为属性，就必须先声明对象，然后使用中括号语法来添加属性。不能再对象字面量中直接动态命名属性

```js
let nameKey = "name"
let ageKey = "age"
let jobKey = "job"
let person = {}
person[nameKey] = 'rose'
person[ageKey] = '17'
person[jobKey] = 'jump'
console.log(person); //{name: "rose", age: "17", job: "jump"}
```

可计算属性可以再对象中完成动态属性赋值。中括号包围的对象属性键告诉运行时将其作为JavaScript表达式而不是字符串来求职

```js
let nameKey = "name"
let ageKey = "age"
let jobKey = "job"
let person = {
  [nameKey]: 'rose',
  [ageKey]: '17',
  [jobKey]: 'jump',
}
console.log(person); //{name: "rose", age: "17", job: "jump"}
```

⚠️可计算属性表达式中抛出任何错误都会中断对象创建。如果计算属性的表达式有副作用，就得小心了。

#### 对象解构

对象解构语法，可以在一条语句中使用嵌套数据实现一个或多个赋值操作。也就是使用与对象匹配的结构来实现对象属性赋值。

```js
let person = {
  name: 'rose',
  age: 17
}
let {name:personName, age: personAge} = person
console.log(personName); //rose
console.log(personAge); //17
```

使用解构，可以在一个类似对象字面量的结构中，声明多个变量，同时执行多个赋值操作。如果想让变量直接使用属性的名称，那么可以使用简写语法

```js
let person = {
  name: 'rose',
  age: 17
}
let {name, age} = person
console.log(name); //rose
console.log(age); //17
```

也可以在解构赋值的同时定义默认值，这适用于引用的属性不存在于源对象中的情况

```js
let person = {
  name: 'rose',
  age: 17
}
let {name, age, job="jump"} = person
console.log(name); //rose
console.log(age); //17
console.log(job); //jump
```

解构在内部使用函数ToObject()（不能在运行时环境中直接访问）把源数据结构转换为对象。这意味着在对象解构的上下文中。原始值会被当成对象。这也意味着（根据ToObject()的定义）null和undefined不能被解构，否则会抛出错误。

```js
let { length } = 'hello'
console.log(length); //5
let { constructor } = 4
console.log(constructor === Number); //true
let { _ } = null //TypeError
let { _ } = undefined //TypeError
```

**⚠️解构并不要求变量必须在解构表达式中声明。不过，如果是给事先声明的变量赋值，复制表达式必须在一对括号内**

```js
let personName, personAge;
let person = {
  name: 'rose',
  age: 17
};//主要这里的;是必须的
({name: personName, age: personAge} = person)
console.log(personName, personAge); //rose 17
```

##### ToObject

ToObject 运算符根据下表将其参数转换为对象类型的值：

| 输入类型  |                             结果                             |
| :-------: | :----------------------------------------------------------: |
| Undefined |                    抛出 TypeError 异常。                     |
|   Null    |                    抛出 TypeError 异常。                     |
|  Boolean  | 创建一个新的Boolean对象，其 [[PrimitiveValue]]属性被设为该布尔值的值。 |
|  Number   | 创建一个新的Number对象，其[[PrimitiveValue]]属性被设为该数字值。 |
|  String   | 创建一个新的String对象，其 [[PrimitiveValue]] 属性被设为该字符串值。 |
|  Object   |                 结果是输入的参数（不转换）。                 |

### 创建对象

使用Object构造函数或对象字面量可以方便地创建对象，但这些方式也有明显不足：创建具有同样接口的多个对象需要重复编写很多代码。

#### 概述

ECMAScript5.1并没有正式支持面向对象的结构，比如类或继承。但是可以运用原型式继承模拟同样的行为

ECMAScript6开始正式的支持类和继承。ES6的类旨在完全涵盖之前规范设计的基于原型的继承模式。

**ES6的类仅仅是封装了ES5.1构造函数加原型继承的语法糖而已。**

#### 工厂模式

工厂模式用于抽象创建特定对象的过程

```js
function createPerson(name,age,job) {
  let o = new Object();
  o.name=name
  o.age=age
  o.job=job
  o.sayName=function(){
    console.log(this.name);
  }
  return o
}
let person1 = createPerson('jake', '20', '画画')
let person2 = createPerson('rose', '18', '💃')
```

这种工厂模式虽然可以解决创建多个类似对象的问题，但是没有解决对象标识问题（即创建的对象是什么类型）。

#### 构造函数模式

ECMAScript中的构造函数是用于创建特定类型的对象的。像Object和Array这样的原生构造函数，运行时可以直接在执行环境中使用。也可以自定义构造函数，以函数的形式为自己的对象类型定义属性和方法

```js
function Person(name,age,job) {
  this.name=name
  this.age=age
  this.job=job
  this.sayName=function(){
    console.log(this.name);
  }
}
let person1 = new Person('jake', '20', '画画')
let person2 = new Person('rose', '18', '💃')
person1.sayName() //jake
person2.sayName() //rose
```

上述中构造函数内部的代码和工厂模式中的代码基本一样，但是区别是

- 没有显示创建对象
- 属性和方法直接赋值给了this
- 没有return

创建Person实例，要使用new操作符。这个调用构造函数的方式会执行以下操作

- 在内存中创建一个新对象
- 这个新对象内部[[Prototype]]特性被赋值为构造函数的prototype属性
- 构造函数内部的this被赋值为这个新对象
- 执行构造函数内部的代码
- 如果构造函数返回非空对象，则返回该对象，否则，返回刚创建的对象

上面的例子person1和person2分别保存着Person的不同的实例。这两个对象都有一个constructor属性指向了Person

constructor本来是用于表示对象类型的。不过，一般认为instanceof操作符是确定对象类型更可靠的方式。前面例子中的每个对象都是Object的实例，同时也是Person的实例

```js
console.log(person1.constructor === person2.constructor); //true
console.log(person1 instanceof Person); //true
console.log(person1 instanceof Object); //true
console.log(person2 instanceof Person); //true
console.log(person2 instanceof Object); //true
```

##### 构造函数也是函数

构造函数与普通函数唯一的区别就是调用方式不同。除此之外，构造函数也是函数。任何函数只要使用new操作符调用就是构造函数，而不使用new操作符调用的函数就是普通函数。**需注意普通调用的this执行问题**

##### 构造函数的问题

构造函数的问题是其定义的方法会在每个实例上都创建一遍，对于前面的例子person1和person2都有名为sayName的方法，这这两个方法不是同一个Function实例。每次定义函数时，都会初始化一个对象.

```js
function Person() {
  this.sayName=new Function("console.log(this.name);")
}
```

因为都是做同一件事，所以没必要定义两个不同的Function实例。

#### 原型模式

每个函数都会创建一个prototype属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。实际上，这个对象就是通过调用构造函数创建的对象的原型。使用原型对象的好处是，在它上面定义的属性和方法可以被对象实例共享。

```js
function Person() {}
Person.prototype.name='jake'
Person.prototype.age='18'
Person.prototype.job='画画'
Person.prototype.sayName=function(){
  console.log(this.name);
}
let person1 = new Person()
let person2 = new Person()
person1.sayName() //jake
person2.sayName() //jake
```

##### 理解原型

创建一个函数时，就会按照特定的规则为这个函数创建一个prototype属性（指向原型对象）。默认情况下，所有原型对象自动获得一个名为constructor属性，指回与之关联的构造函数.

```js
function Person() {} //Person.prototype.constructor指向了Person
console.log(Person.prototype.constructor); //ƒ Person() {}
```

在自定义构造函数时，原型对象默认只会获得constructor属性，其他的方法都继承自Object。每次调用构造函数创建一个新实例，这个实例的内部[[prototype]]指针就会被赋值为构造函数的原型对象。

脚本中没有访问这个[[prototype]]特性的标准方法，但Firefox、Safari、Chrome会在每个对象上暴漏\_\_proto\_\_属性，通过这个属性可以访问对象的原型。

正常的原型链都会终止于Object的原型对象

```js
function Person() {}
console.log(Person.prototype.__proto__ === Object.prototype); //true
console.log(Person.prototype.__proto__.constructor === Object); //true
console.log(Person.prototype.__proto__.__proto__); //null
```

实例通过\_\_proto\_\_链接到原型对象，实际上指向隐藏特性[[prototype]]

构造函数通过prototype属性链接到原型对象

实例与构造函数没有直接联系，与原型对象有直接联系

```js
function Person() {}
let person = new Person
Person.prototype.id = "PersonID"
console.log(Person.prototype); //{id: "PersonID", constructor: ƒ}
console.log(person.__proto__); //{id: "PersonID", constructor: ƒ}
```

同一个构造函数创建的两个实例共享同一个原型对象

```js
function Person() {}
Person.prototype.id = "PersonID"

let person1 = new Person
let person2 = new Person
console.log(person1.__proto__ === person2.__proto__); //true
console.log(person1 instanceof Person); //true
console.log(person2 instanceof Person); //true
console.log(person2 instanceof Object); //true
console.log(Person instanceof Object); //true
```

检查原型对象

```js
function Person() {}
Person.prototype.id = "PersonID"

let person1 = new Person
let person2 = new Person
//检查原型对象
console.log(Person.prototype.isPrototypeOf(person1)); //true
console.log(Object.prototype.isPrototypeOf(person2)); //true
// 获取原型对象
console.log(Object.getPrototypeOf(person1));//{id: "PersonID", constructor: ƒ}
console.log(Object.getPrototypeOf(person2));//{id: "PersonID", constructor: ƒ}
```

Object类型还有setPrototypeOf()方法，可以向实例的私有特性[[prototype]]写入一个新值，重写对象的原型继承关系（**可能会严重影响代码性能**），不推荐使用

避免使用setPrototypeOf()可能造成的性能下降，可以通过Object.create()来创建一个新对象

**`Object.create()`**方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 （请打开浏览器控制台以查看运行结果。）

```js
const person = {
  isHuman: false,
};
const me = Object.create(person);
console.log(Object.getPrototypeOf(me)) //{isHuman: false}指向了person
```

##### 原型层级

在通过对象访问属性时，会按照属性的名称开始搜索。实例本身=》原型对象。 找到就会返回。

**constructor属性可以通过实例对象也是可以访问的**

```js
function Person() {}
Person.prototype.name='jake'
Person.prototype.age='18'
Person.prototype.job='画画'
Person.prototype.sayName=function(){
  console.log(this.name);
}
let person = new Person()
person.name = 'rose'
person.sayName() //rose
delete person.name
person.sayName() //jake
```

hasOwnProperty()方法用于检测一个属性是否来自实例

```js
function Person() {}
Person.prototype.age='18'
Person.prototype.job='画画'

let person = new Person()
person.name = 'rose'
console.log(person.hasOwnProperty('name')); //true 来自实例
console.log(person.hasOwnProperty('age')); //false 来自原型
```

getOwnPropertyDescriptor()方法用于获取对象上的自有属性

```js
function Person() {}
Person.prototype.age='18'
Person.prototype.job='画画'

let person = new Person()
person.name = 'rose'
console.log(Object.getOwnPropertyDescriptor(person,'name')); //{value: "rose", writable: true, enumerable: true, configurable: true}
console.log(Object.getOwnPropertyDescriptor(person,'age')); //undefined
```

##### 原型和in操作符

有两种方式使用in操作符：单独使用和在for-in循环中使用。在单独使用时，in操作符会在可以通过对象访问指定属性时返回true

```js
function Person() {}
Person.prototype.age='18'
Person.prototype.job='画画'

let person = new Person()
person.name = 'rose'

console.log(person.hasOwnProperty("name"));//true
console.log(person.hasOwnProperty("age"));//false
console.log("name" in person);//true
console.log("age" in person);//true
```

在for-in循环中使用in操作符时，可以通过对象访问且可以被枚举的属性都会返回，包括实例属性和原型属性。屏蔽原型中不可枚举（[[Enumerable]]特性被设置为false）属性的实例属性也会在for-in循环中返回。

Object.keys()方法用来获取对象上可枚举属性名称的数组

Object.getOwnPropertyNames()方法用来获取所有实例属性，无论是否可以枚举

```js
function Person() {}
Person.prototype.age='18'
Person.prototype.seyName=function () {
  console.log(this.name);
}

let person = new Person()
person.name = 'rose'
Object.defineProperty(person,'job',{
  enumerable:false
})
for (const key in person) {
  console.log(key); 
  //name  age   job
}
const keys1 = Object.keys(person) 
console.log(keys1); //["name"]
const key2 = Object.getOwnPropertyNames(person) 
console.log(key2); //["name", "job"]
```

在ECMAScript6新增Symbol类型之后，相应地出现了Object.getOwnPropertySymbols()

```js
let person = new Person()
person[Symbol('k1')]="k1"
person[Symbol('k2')]="k2"
const keys = Object.getOwnPropertySymbols(person)
console.log(keys); //[Symbol(k1), Symbol(k2)]
```

##### 属性枚举顺序

- for-in循环和Object.keys()的枚举顺序是不确定的，取决于JavaScript引擎，可能因浏览器而异。
- Object.getOwnPropertyNames()、Object.assign()、Object.getOwnPropertySymbols()的枚举顺序是确定性的。先以升序枚举数值键，然后以插入顺序枚举字符和符号量

#### 对象迭代

在Javascript有史以来的大部分时间内，迭代对象属性都是一个难题。ECMAScript2017新增了两个静态方法，用于将对象内容转换为序列化、更重要的是可迭代的**格式**。

⚠️非字符串属性会被转换为字符串输出，这两个方法执行对象的浅复制。 (Symbol属性会被忽略)

- object.values() 接受一个对象，返回内容数组
- object.entries() 接受一个对象，返回键/值对的数组

```js
let o = {
  name: 'rose',
  age: 17,
  job: "jump",
  [Symbol('k1')]: 'k1',
  o1:{
    name: "o1"
  }
}
console.log(Object.values(o)); //["rose", 17, "jump", {name: "o1"}]
console.log(Object.entries(o));  //[["name", "rose"], ["age", 17], ["job", "jump"], ["o1", {name: "o1"}]]
```

##### 其他原型写法

```js
function Person() {}
Person.prototype = {
  name: 'rose',
  age: 17,
  sayName(){
    console.log(this.name);
  }
}
let person = new Person()
person.sayName() //rose
```

在把Person.prototype设置为等于一个通过对象字面量创建的新对象.最终的结果是一样的，但是有个问题：这样重写以后Person.prototype的constructor属性就不指向Person了

在创建函数时，也会创建他的prototype对象，同时会自动给这个原型的constructor属性赋值

```js
console.log(person instanceof Person); //true
console.log(person instanceof Object); //true
console.log(person.constructor == Person); //false
console.log(person.constructor == Object); //true
```

如果需要可以专门设置constructor的值

```js
function Person() {}
Person.prototype = {
  constructor: Person,
  name: 'rose',
  age: 17,
  sayName(){
    console.log(this.name);
  }
}
let person = new Person()
console.log(person.constructor == Person); //true
console.log(person.constructor == Person); //true
```

但是这种方式恢复的constructor属性会创建一个可迭代的值，而默认constructor是不可迭代的

```js
function Person() {}
Person.prototype = {
  name: 'rose',
  age: 17,
  sayName(){
    console.log(this.name);
  }
}
Object.defineProperty(Person.prototype, "constructor",{
  enumerable: false,
  value: Person
})
let person = new Person()
console.log(person.constructor == Person); //true
console.log(person.constructor == Person); //true
```

##### 原型的动态性

从原型上搜索值的过程是动态的，任何时候对原型对象所做的修改也会反映出来

```js
function Person() {}
Person.prototype = {
  name: 'rose',
  age: 17,
  sayName(){
    console.log(this.name);
  }
}

let person = new Person()
person.sayName()//rose
Person.prototype.sayName=function () {
  console.log(this.age);
}
person.sayName()//17
```

虽然实例和原型之间是松散的联系，但是这跟重写整个原型是两回事.

重写构造函数上的原型之后再创建的实例才会引用新的原型。而在此之前创建的实例任然会引用最初的原型

```js
function Person() {}
let person = new Person()
Person.prototype = {
  name: 'rose',
  age: 17,
  sayName(){
    console.log(this.name);
  }
}
person.sayName()//错误
```

##### 原生对象原型

所有原生引用类型的构造函数都在原型上定义了实例方法,

也可以修改和定义新的方法(**⚠️并不太推荐修改原生对象原型，可能会造成误会**)

```js
console.log(String.prototype.slice)//ƒ slice() { [native code] }

String.prototype.startsWith = function (text) {
  return this.indexOf(text) ===0
}
const meg = "Hello word!"
console.log(meg.startsWith('Hello')); //true
```

##### 原型的问题

原型模式的问题

- 弱化了向构造函数传递初始化参数的能力
- 由于原型上的所有属性在实例间共享，对于包含引用值类型的属性会有很大的问题

```js
function Person() {}
Person.prototype = {
  constructor: Person,
  name: 'rose',
  friends:['jake', 'tom']
}
const person1 = new Person
const person2 = new Person
person1.friends.push('张三') //这里只是在person1实例的friends添加了参数
console.log(person1.friends); //["jake", "tom", "张三"]
console.log(person2.friends); //["jake", "tom", "张三"]
```

### 继承

ECMAScript中因为函数没有签名，所以唯一支持的继承方式是通过原型链实现的。

#### 原型链

原型链是ECMAScript的主要继承方式。其基本思想就是通过原型继承多个引用类型的属性和方法。

构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针指向原型。如果原型是另一个实例，那就意味着这个原型本身有一个内部指针指向另一个原型，相应地另一个原型也有一个指针指向另一个构造函数。这样就是在实例和原型之间构造了一条原型链

```js
function Parent() {
  this.id = "parentId"
}
Parent.prototype.getValue=function(){
  return this.id
}

function Child() {
  this.id = "childId"
}
//继承Parent
Child.prototype = new Parent

let instance = new Child

console.log(instance.getValue()); //childId
```

上面代码Child通过创建Parent的实例并将其赋值给自己的原型**Child.prototype**实现了对**Parent的继承**这个赋值重写了Child最初的原型，将其替换为**Parent的实例**。

这意味着Parent实例可以访问的所有属性和方法，Child也可以访问。

##### 默认原型

默认情况下，所有引用类型都继承自Object，这也是通过原型链实现的。任何函数的默认原型都是一个Object实例，这意味着这个实例有一个内部指针指向Object.prototype。这也是为什么自定义类型能够继承包括toString()、valueOf()在内的所有默认方法的原因

因此上面的例子还有额外一层继承关系

```js
function Parent() { this.id = "parentId" }
Parent.prototype.getValue=function(){
  return this.id
}

function Child() {
  this.id = "childId"
}
Child.prototype = new Parent

let instance = new Child
console.log(instance.__proto__); //Parent {id: "parentId"}
console.log(instance.__proto__.__proto__.constructor); //Parent() { this.id = "parentId" }
console.log(instance.__proto__.__proto__.__proto__.constructor); //Object() { [native code] }
```

##### 原型与继承关系

原型与实例的关系通过两种方式来确定。第一种方式是instanceof()操作符，如果一个实例的原型链中有相应的构造函数，则返回true

```js
console.log(instance instanceof Child); //true
console.log(instance instanceof Parent); //true
console.log(instance instanceof Object); //true
```

第二种方式是使用isPrototrpeOf()。原型链中每个原型都可以调用，只要原型链中包含这个原型，就会返回true

```js
 console.log(Child.prototype.isPrototypeOf(instance)); //true
console.log(Parent.prototype.isPrototypeOf(instance)); //true
console.log(Object.prototype.isPrototypeOf(instance)); //true
```

##### 原型链的问题

原型链虽然是继承的工具，但也有和原型一样的引用值问题

```js
function Parent() { this.friend = ['jack','rose'] }
function Child() {}
Child.prototype = new Parent

let child1 = new Child
let child2 = new Child
child1.friend.push('张三')
console.log(child1.friend);// ["jack", "rose", "张三"]
console.log(child2.friend);// ["jack", "rose", "张三"]
```

还有**子类型在实例化时不能给父类型的构造函数传参**

#### 盗用构造函数

为了解决上述问题，就有了这种技术（"对象伪装"或者叫做"经典继承"）。基本思路很简单：在子类构造函数中调用父类构造函数。并且用call()和apple()改变上下文

```js
function Parent(id) {
  this.id = id
  this.friend = ['jack','rose'] 
}
function Child(id) {
  Parent.call(this,id)
}

let child1 = new Child('child1')
let child2 = new Child('child2')
child1.friend.push('张三')
console.log(child1);//{id: "child1", ["jack", "rose", "张三"]}
console.log(child2);//{id: "child2", ["jack", "rose"]}
```

上述中。通过**Parent.call(this)**Parent构造函数在为Child的实例创建新对象的上下文中执行了。这就相当于在Child对象中运行了所有Parent函数中的所有出事代码。结果就是每个实例都有了自己的colors属性。

盗用构造函数的主要缺点，也是使用构造函数模式自定义类型的问题：必须在构造函数中定义方法，因此函数不能重用。此外，子类也不能访问父类原型上定义的方法，因此所以类型只能使用构造函数模式。

```js
function Parent(id) {
  this.id = id
  this.friend = ['jack','rose'] 
}
Parent.prototype.sayName= function () {
  console.log(this.id);
}
function Child(id) {
  Parent.call(this,id)
}

let child1 = new Child('child1')
let child2 = new Child('child2')
child1.sayName() // child1.sayName is not a function
```



#### 组合继承

组合继承组合了原型链和盗用构造函数，将两者优点集中了起来

```js
function Parent(id) {
  this.id = id
  this.friend = ['jack','rose'] 
}
Parent.prototype.sayName= function () {
  console.log(this.id);
}
function Child(id) {
  Parent.call(this,id)
}
Child.prototype = new Parent

let child1 = new Child('child1')
let child2 = new Child('child2')
child1.sayName() // child1
child2.sayName() // child2
child1.friend.push("张三")
console.log(child1.friend); //["jack", "rose", "张三"]
console.log(child2.friend); // ["jack", "rose"]
```

上述中child实例都会有自己的属性，包括引用值，同时还可以共享相同的方法

#### 原型式继承

```js
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
```

这个函数回创建一个临时构造函数，将传入的对象赋值给这个构造函数的原型，然后返回这个临时类型的一个实例

```js
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
const Child = {
  name:'child',
  friends:['jack','rose']
}
const child1  = object(Child) 
const child2  = object(Child) 
child1.friends.push('张三')
console.log(child1.friends);// ["jack", "rose", "张三"]
console.log(child2.friends);// ["jack", "rose", "张三"]
```

ECMAScript5通过增加Object.create()方法将原型式继承概念规范化了

```js
const Child = {
  name:'child',
  friends:['jack','rose']
}
const child1  = Object.create(Child) 
const child2  = Object.create(Child) 
child1.friends.push('张三')
console.log(child1.friends);// ["jack", "rose", "张三"]
console.log(child2.friends);// ["jack", "rose", "张三"]
```

#### 寄生式继承

寄生式继承的思路类似于寄生构造函数和工厂模式：创建一个实现继承的函数，以某种方式增强对象，然后返回这个对象。

```js
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function create(original) {
  const clone = object(original)
  clone.sayHi = function () {
    console.log('Hi');
  }
  return clone
}
const Child = {
  name:'child',
  friends:['jack','rose']
}
const child1  = create(Child) 
const child2  = create(Child) 
child1.friends.push('张三')
child1.sayHi() //Hi
console.log(child1.friends);// ["jack", "rose", "张三"]
console.log(child2.friends);// ["jack", "rose", "张三"]
```

通过寄生式继承给对象添加函数会导致函数难以重用。

#### 寄生式组合继承

组合继承其实也存在问题。最主要的效率问题就是父类构造函数始终会被调用两次：一次是在创建子类原型时调用，另一次是子类构造函数中调用。

```js
function Parent(id) {
  this.id = id
  this.friend = ['jack','rose'] 
}
Parent.prototype.sayName= function () {
  console.log(this.id);
}
function Child(id) {
  Parent.call(this,id)
}
Child.prototype = new Parent

let child1 = new Child('child1')
let child2 = new Child('child2')
console.log(child1); // {id: "child1",friend: ["jack", "rose"]}
console.log(child1.__proto__); // {id: undefined,friend: ["jack", "rose"]}
console.log(child2); //  {id: "child2",friend: ["jack", "rose"]}
console.log(child2.__proto__); // {id: undefined,friend: ["jack", "rose"]}
```

上述中可以发现，在Child实例中和原型中都存在id和friend两个属性。

寄生式组合继承通过盗用构造函数继承属性，但使用混合式原型链继承方法。基本思路是不通过调用父类构造函数给子类原型赋值，而是取得父类原型的一个副本。

```js
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}
function inheritPrototype(child, parent ) {
  const prototype = object(parent.prototype) //创建对象
  prototype.constructor = child	//增强对象
  child.prototype = prototype	//赋值对象
}
function Parent(id) {
  this.id = id
  this.friend = ['jack','rose'] 
}
Parent.prototype.sayName= function () {
  console.log(this.id);
}
function Child(id) {
  Parent.call(this,id)
}
inheritPrototype(Child, Parent)

let child1 = new Child('child1')
let child2 = new Child('child2')
console.log(child1); // {id: "child1",friend: ["jack", "rose"]}
console.log(child1.__proto__); // Parent {constructor: ƒ}
console.log(child2); //  {id: "child2",friend: ["jack", "rose"]}
console.log(child2.__proto__); // Parent {constructor: ƒ}
```

这里只调用了一次Parent构造函数，避免了Child.prototype上出现不必要的属性



























## javaScript最佳实践

