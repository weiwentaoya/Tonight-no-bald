
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
