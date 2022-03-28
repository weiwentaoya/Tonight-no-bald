
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
