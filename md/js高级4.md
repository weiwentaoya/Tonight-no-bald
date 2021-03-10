# js高级4

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

