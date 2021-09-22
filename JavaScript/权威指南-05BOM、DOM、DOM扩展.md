
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



