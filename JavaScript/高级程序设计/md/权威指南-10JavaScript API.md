
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
