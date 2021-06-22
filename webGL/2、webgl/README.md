### getContext

getContext(type, attributes)初始化三维画笔

```js
canvas.getContext(
  "webgl",
  { 
    antialias: false,
    depth: false 
  }
);
```

- 参数

  1. 上下文类型（`type`）

     - 2d：二维渲染上下文

     - webgl 或 experimental-webgl ：三维渲染上下文。只在实现WebGL版本1（OpenGL ES 2.0）的浏览器上可用
     - webgl2 或 experimental-webg2：三维渲染上下文，只在实现WebGL版本2（OpenGL ES 3.0）的浏览器上可用
     - bitmaprenderer：这将创建一个只提供将canvas内容替换为指定[`ImageBitmap`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageBitmap)功能的

  2. 上下文属性(attributes)

     - alpha：是否包含一个alpha缓冲区
     - antialias：是否开启抗锯齿
     - depth：缓冲区是否包含一个深度至少为16的缓冲区
     - failIfMajorPerformanceCaveat：是否在一个系统性能低的环境中创建该上下文
     - powerPreference：指示浏览器在运行WebGL上下文时使用相应的GPU电源配置
       - default：自动选择，默认值。
       - high-performance：高性能模式
       - low-power：节能模式
     - premultipliedAlpha：表明排版引擎讲假设绘制缓冲区包含预混合alpha通道的
     - preserveDrawingBuffer：缓冲区将不会被清除，会保存下来，直到被清除或被使用者覆盖。
     - stencil：绘制缓冲区包含一个深度至少为8位的模版缓冲区

### gl.clearColor

gl.clearColor(red, green, blue, alpha)指定调用clear()方法时使用的颜色值。这些值在0-1范围间

```js
gl.clearColor(1, 0.5, 0.5, 1);
```

- 参数

  - red：指定红色值
  - green：指定绿色值
  - blue：指定蓝色值
  - alpha：指定透明度值

- 说明

  - 一旦指定了背景色之后，背景色就会常驻在WebGL系统中，在下一次调用gl.clearColor前不会被改变
  - webgl颜色与css颜色对应的是 0-0 1-255

  - cssColor2webglColor(一个把css的rgba颜色转换成webgl颜色的方法)

  ```js
  function cssColor2webglColor(rgbaColor) {
      const reg = RegExp(/\((.*)\)/)
      const rgbaStr = reg.exec(rgbaColor)[1]
      const rgba = rgbaStr.split(',').map(n=>parseInt(n))
      return [
          rgba[0] / 255,
          rgba[1] / 255,
          rgba[2] / 255,
          rgba[3] ,
      ]
  }
  ```

### gl.clear

gl.clear(mask)使用预设值来清空缓冲

```js
gl.clear(gl.DEPTH_BUFFER_BIT);
```

- 参数
  - mask 指定需要清楚的缓冲区
    - gl.COLOR_BUFFER_BIT：颜色缓冲区
    - gl.DEPTH_BUFFER_BIT：深度缓冲区
    - gl.STENCIL_BUFFER_BIT：模版缓冲区
- 说明
  - 如果没有指定背景色，默认使用的值为
    - 颜色缓冲区：(0.0, 0.0, 0.0, 0.0)
    - 深度缓冲区：1.0
    - 模版缓冲区：0

### gl.drawArrays

gl.drawArrays(mode, first, count) 用于从向量数组中绘制图元

```js
gl.drawArrays(gl.POINTS, 0, 1);
```

- 参数
  - mode：指定绘制图元的方式
    - gl.POINTS：绘制点
    - gl.LINE_STRIP：绘制连接的线条，上一个点连接下一个点
    - gl.LINE_LOOP：绘制一个闭合的线条，上一个连接下一个，最后一个连接第一个
    - gl.LINES：绘制单独的线段
    - gl.TRIANGLE_STRIP:绘制[三角带](https://en.wikipedia.org/wiki/Triangle_strip)
    - gl.TRIANGLE_FAN：绘制[三角扇](https://en.wikipedia.org/wiki/Triangle_fan)
    - gl.TRIANGLES：绘制三角形，三个点作为顶点
  - first：指定从那个点开始绘制
  - count：绘制需要使用到多少个点

### 同步绘图

- drawArrays只支持在一个进程内绘制，一旦进入到下一个进程后，会清除之前内容从头再来绘制
- webgl的同步绘图现象，其实是由webgl底层内置的颜色缓冲区导致的，他在电脑里会占用一块内存，在使用webgl绘图的时候是先在颜色缓冲区中画出来，然后再绘制到页面，当每次线程开始的时候会重制颜色缓冲区。

### gl.createProgram

创建和初始化一个webgl程序对象

```js
const program = gl.createProgram();

gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);

gl.linkProgram(program);
```

### gl.attachShader

gl.attachShader(program, shader);往程序对象中添加片元或顶点着色器

- 参数
  - program：程序对象
  - shader： 类型为片元或顶点的着色器

### gl.linkProgram

gl.linkProgram(program)完成顶点和片元着色器准备GPU代码的过程（连接上下文和程序对象）

- 参数
  - program：程序对像

### gl.useProgram

gl.useProgram(program);将定义好的程序对象添加到当前的渲染状态

- 参数
  - program：程序对像

### gl.createShader

gl.createShader(type) 创建一个着色器对象，该对象可以使用gl.shaderSource()和gl.compileShader()方法配置着色器代码

```js
const shader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(shader, shaderSource);
gl.compileShader(shader);
```

- 参数
  - type：`gl.VERTEX_SHADER` 或 `gl.FRAGMENT_SHADER`两者中的一个

### gl.shaderSource

gl.shaderSource(shader, source);设置着色器（顶点着色器及片元着色器）的GLSL程序代码

- 参数
  - shader：用于设置程序代码的着色器对象
  - source：包含GLSL程序代码的字符串

### gl.compileShader

gl.compileShader(shader);编译GLSL着色器，使其成为二进制数据，然后可以被程序对象使用

- 参数
  - shader：一个片元或顶点着色器

### 着色器

顶点着色器的顶点就是两个点,片元着色器的片元就是把直线画到画布上后,这两个点之间构成直线的每个像素（在webgl里片元就是像素）

- 顶点着色器:描绘顶点的特征，如位置、颜色等

- 片元着色器:进行逐片元处理，如光照

### 着色器语言

- webgl的着色语言是GLSL ES语言
- main(){ .... } 是主题函数
- 在顶点着色器中，gl_Position是顶点的位置，gl_PointSize是顶点的尺寸
- 在片元着色器中，gl_FragColor是片元的颜色
- vec4()是一个4维矢量对象,在赋值gl_Position的时候,前三个是x、y、z,第四个参数默认1.0赋值给gl_FragColor时参数为(rgba)
- ⚠️赋给gl_Position的矢量中，添加第四个分量为1.0，由四个分量组成的矢量被称为齐次坐标

#### 齐次坐标

`齐次坐标使用如下饿符号描述：(x,y,z,w)。齐次坐标等价于三维坐标(x/w, y/w, z/w)。所以如果齐次坐标的第四个分量是1，你就可以将它当作三维坐标来使用。w的值必须是大于等于0的。如果w趋近于0，那么它所表示的点将趋近无穷远，所以在齐次坐标中可以有无穷的概念。齐次坐标的存在，使得用矩阵乘法(后面介绍)来描述顶点变换成为可能，三维图形的坐标系在计算的过程中，通常使用齐次坐标来表示顶点的三维坐标`

### attribute 变量（顶点相关的存储限定符）

- attribute是存储限定符，是专门用于向外部导出与顶点相关的对象的，这类似于es6模版语法中的export

- vec4是变量类型

- a_Position是变量名，之后在js中会根据这个变量名导入变量。这个变量名是一个指针，指向实际数据的存储位置。也是说，我们如果在着色器外部改变了a_Position所指向的实际数据，那么在着色器中a_Position所对应的数据也会修改

- 在js中获取attribute 变量要用getAttribLocation()方法，传入程序对象和参数名，得到的是变量的存储空间

- 在js中修改attribute 变量要用vertexAttrib3f()方法，传入的是变量名，以及x，y，z三个坐标值

- vertexAttrib1f()方法，传入的是变量名，以及x坐标值

- vertexAttrib2f()方法，传入的是变量名，以及x，y坐标值

- vertexAttrib3f()方法，传入的是变量名，以及x，y，z坐标值

- vertexAttrib4f()方法，传入的是变量名，以及x，y，z, o坐标值

  ```js
  const VertexShader =`
      attribute vec4 a_Position;
      main(){
          gl_Position = a_Position;
          gl_PointSize = 10.0;
      }
  `
  const a_Position = gl.getAttribLocation(gl.program,'a_Position')
  gl.vertexAttrib3f(a_Position, 0, 0.5, 0)
  ```

### gl.getAttribLocation

gl.getAttribLocation(program, location);（顶点着色器及片元着色器）的GLSL程序代码

- 参数
  - program：程序对象
  - location：需要获取下标指向位置的属性参数名

### gl.vertexAttrib[1234]f[v]

**`vertexAttrib[1234]f[v]()`** 可以为顶点attibute变量赋值。

```js
gl.vertexAttrib1f(location, v0);
gl.vertexAttrib2f(location, v0, v1);
gl.vertexAttrib3f(location, v0, v1, v2);
gl.vertexAttrib4f(location, v0, v1, v2, v3);

gl.vertexAttrib1fv(location, value);
gl.vertexAttrib2fv(location, value);
gl.vertexAttrib3fv(location, value);
gl.vertexAttrib4fv(location, value);
```

- 参数
  - location：顶点attribute变量的存储位置
  -  v0, v1, v2, v3：顶点attibute变量的各分量值
  - value：Float32Array类型，用于设置顶点attibute变量的向量值。



### uniform 变量（限定颜色变量的存储限定符）

- 在js中获取uniform 变量要用getUniformLocation()方法，传入程序对象和参数名
- 在js中修改uniform 变量要用uniform4f()方法，传入的是变量名，以及r, g, b, a 四个颜色值
  - uniform4f()中4是有四个数据，f是float浮点型
  - uniform4fv()中4是有四个数据，f是float浮点型，v是vector矢量的意思，就是由四个浮点类型的分量构成的向量

### getUniformLocation

```js
gl.getUniform(program, location);
```

- 参数
  - program：程序对象
  - location：需要获取下标指向位置的属性参数名

### gl.uniform[1234]f[v]

```js
gl.uniform1f(location, v0);
gl.uniform1fv(location, value);
gl.uniform1i(location, v0);
gl.uniform1iv(location, value);

gl.uniform2f(location, v0, v1);
gl.uniform2fv(location, value);
gl.uniform2i(location, v0, v1);
gl.uniform2iv(location, value);

gl.uniform3f(location, v0, v1, v2);
gl.uniform3fv(location, value);
gl.uniform3i(location, v0, v1, v2);
gl.uniform3iv(location, value);

gl.uniform4f(location, v0, v1, v2, v3);
gl.uniform4fv(location, value);
gl.uniform4i(location, v0, v1, v2, v3);
gl.uniform4iv(location, value);
```

- 参数

  - location：顶点attribute变量的存储位置
  -  value, v0, v1, v2, v3：新的值将被用于uniform 变量. 可能的类型:
    - 浮点值（方法名f）
    - 浮点数组（例如Float32Array或Array数组）用于浮点型向量方法（方法名fv）
    - 整型值（方法名i）
    - 整形数组（方法名iv）

  

### js点击生成点位

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <canvas id="canvas"></canvas>
</body>
<script type="module">
    import {initShaders} from "./utils/utils.js"
    const VSHADER_SOURCE = `
        attribute vec4 a_Position;
        attribute float a_PointSize;
        main() {
            gl_Position = a_Position; // 设置坐标位置
            gl_PointSize = a_PointSize; // 设置尺寸
        }
    `
    const FSHADER_SOURCE = `
        precision mediump float;
        uniform vec4 u_FragColor;
        main(){
            gl_FragColor = u_FragColor; // 设置颜色
        }
    `
    canvas.width= window.innerWidth;
    canvas.height= window.innerHeight;
    // 获取WebGL绘图上下文
    const gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)
    // 指定清空canvas的颜色
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // 清空canvas
  	//获取顶点位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')
    // 获取顶点尺寸
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
    // 获取顶点颜色
    const u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')

    const Points= [
        {x: 0.5, y:0, size: 10, color:{r:Math.random(),g:Math.random(),b:Math.random(),a:1}},
        {x:-0.5, y:0, size: 50, color:{r:Math.random(),g:Math.random(),b:Math.random(),a:1}},
    ]
    canvas.addEventListener('click',e=>{
        const {offsetX, offsetY} = e
        const { width, height} = canvas.getBoundingClientRect()
        const [cssW, cssY] = [width/2, height/2]
        const [x,y] = [(offsetX-cssW)/cssW, (cssY-offsetY)/cssY]
        //由于webgl坐标系的关系，需要转换获取到的坐标位置
        Points.push({x,y,size: Math.random()*50, color:{r:Math.random(),g:Math.random(),b:Math.random(),a:1}})
        rander(Points)
    })
    rander(Points)
    function rander(arr) {
      	// 清除画布
        gl.clear(gl.COLOR_BUFFER_BIT);
        // 循环绘制
        arr.forEach(({x,y,size,color:{r,g,b,a}} )=> {
            // 设置坐标位置
            gl.vertexAttrib2f(a_Position, x,y)
            // 设置顶点尺寸
            gl.vertexAttrib1f(a_PointSize, size)
          	// 设置顶点颜色
            gl.uniform4f(u_FragColor, r,g,b,a)
            // gl.uniform4fv(u_FragColor,new Float32Array([ r,g,b,a]))
            gl.drawArrays(gl.POINTS, 0, 1)
        });
    }
    
</script>
</html>
```

### gl.enable

gl.enable(cap).  用于对该上下文开启某种特性。

- 参数
  - cap
    - gl.BLEND：激活片元的颜色融合计算. 参见 [`WebGLRenderingContext.blendFunc()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/blendFunc)
    - gl.CULL_FACE：激活多边形正反面剔除. 参见[`WebGLRenderingContext.cullFace()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/cullFace).
    - gl.DEPTH_TEST：激活深度比较，并且更新深度缓冲区。参见[`WebGLRenderingContext.depthFunc()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/depthFunc).
    - gl.DITHER：激活在写入颜色缓冲区之前，抖动颜色成分。
    - gl.POLYGON_OFFSET_FILL：激活添加多边形片段的深度值偏移。参见[`WebGLRenderingContext.polygonOffset()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/polygonOffset).
    - gl.SAMPLE_ALPHA_TO_COVERAGE：激活通过alpha值决定的临时覆盖值计算。（抗锯齿）
    - gl.SAMPLE_COVERAGE：激活使用临时覆盖值，位和运算片段的覆盖值。参见 [`WebGLRenderingContext.sampleCoverage()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/sampleCoverage).
    - gl.SCISSOR_TEST：激活剪裁测试，即丢弃在剪裁矩形范围外的片段。[`WebGLRenderingContext.scissor()`](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/scissor).
    - gl.STENCIL_TEST：激活模板测试并且更新模板缓冲区。参见[`WebGLRenderingContext.stencilFunc()` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/stencilFunc).

### gl.blendFunc

gl.blendFunc(sfactor, dfactor).  定义了一个用于混合像素算法的函数

- 参数

  - sfactor：为源混合因子指定一个乘数. 默认值是 `gl.ONE`

  - dfactor：为源目标合因子指定一个乘数. 默认值是 `gl.ZERO`

    参数可选值列表，可用于sfactor和dfactor

    | 值                            | 示例                                                 | Description                                                  |
    | :---------------------------- | :--------------------------------------------------- | :----------------------------------------------------------- |
    | `gl.ZERO`                     | 0,0,0,0                                              | 所有颜色乘0.                                                 |
    | `gl.ONE`                      | 1,1,1,1                                              | 所有颜色乘1.                                                 |
    | `gl.SRC_COLOR`                | RS, GS, BS, AS                                       | 将所有颜色乘上源颜色.                                        |
    | `gl.ONE_MINUS_SRC_COLOR`      | 1-RS, 1-GS, 1-BS, 1-AS                               | 每个源颜色所有颜色乘1 .                                      |
    | `gl.DST_COLOR`                | RD, GD, BD, AD                                       | 将所有颜色与目标颜色相乘.                                    |
    | `gl.ONE_MINUS_DST_COLOR`      | 1-RD, 1-GD, 1-BD, 1-AD                               | 将所有颜色乘以1减去每个目标颜色.                             |
    | `gl.SRC_ALPHA`                | AS, AS, AS, AS                                       | 将所有颜色乘以源alpha值.                                     |
    | `gl.ONE_MINUS_SRC_ALPHA`      | 1-AS, 1-AS, 1-AS, 1-AS                               | 将所有颜色乘以1 减去源alpha值.                               |
    | `gl.DST_ALPHA`                | AD, AD, AD, AD                                       | 将所有颜色与目标alpha值相乘.                                 |
    | `gl.ONE_MINUS_DST_ALPHA`      | 1-AD, 1-AD, 1-AD, 1-AD                               | 将所有颜色乘以1减去目标alpha值.                              |
    | `gl.CONSTANT_COLOR`           | RC, GC, BC, AC                                       | 将所有颜色乘以一个常数颜色.                                  |
    | `gl.ONE_MINUS_CONSTANT_COLOR` | 1-RC, 1-GC, 1-BC, 1-AC                               | 所有颜色乘以1减去一个常数颜色.                               |
    | `gl.CONSTANT_ALPHA`           | AC, AC, AC, AC                                       | 将所有颜色乘以一个常数.                                      |
    | `gl.ONE_MINUS_CONSTANT_ALPHA` | 1-AC, 1-AC, 1-AC, 1-AC                               | 所有颜色乘以1减去一个常数.                                   |
    | `gl.SRC_ALPHA_SATURATE`       | min(AS, 1 - AD), min(AS, 1 - AD), min(AS, 1 - AD), 1 | 将RGB颜色乘以源alpha值或1减去目标alpha值中的较小值。alpha值乘以1. |

### 缓冲区对象

可以一次性地向着色器传入多个顶点的数据。缓冲区在webgl中是一块内存区域，我们可以一次性地向缓冲区对象中填充大量的顶点数据，然后将这些数据保存在其中，供顶点着色器使用。

### gl.createBuffer

gl.createBuffer() 方法可创建并初始化一个用于储存顶点数据或着色数据的WebGLBuffer对象

### gl.bindBuffer

gl.bindBuffer(target, buffer);将给定的WebGLBuffer绑定到目标

```
gl.bindBuffer(target, buffer);
```

- 参数
  - target：指定绑定目标
    - `gl.ARRAY_BUFFER`: 包含顶点属性的Buffer，如顶点坐标，纹理坐标数据或顶点颜色数据。
    - `gl.ELEMENT_ARRAY_BUFFER`: 用于元素索引的Buffer。
  - buffer：要绑定的WebGLBuffer



### gl.bufferData

创建并初始化了Buffer对象的数据存储区

```
gl.bufferData(target, size, usage);
gl.bufferData(target, ArrayBuffer? srcData, usage);
gl.bufferData(target, ArrayBufferView srcData, usage);
```

- 参数
  - target：指定buffer绑定目标
    - `gl.ARRAY_BUFFER`: 包含顶点属性的Buffer，如顶点坐标，纹理坐标数据或顶点颜色数据。
    - `gl.ELEMENT_ARRAY_BUFFER`: 用于元素索引的Buffer。
  - size：设定buffer对象数据存储区大小
  - srcData【可选】：一个[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)，[`SharedArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) 或者 [`ArrayBufferView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 类型的数组对象，将被复制到Buffer的数据存储区。 如果为`null`，数据存储区仍会被创建，但是不会进行初始化和定义。
  - usage：指定数据存储区的使用方法
    - `gl.STATIC_DRAW`: 缓冲区的内容可能经常使用，而不会经常更改。内容被写入缓冲区，但不被读取。
    - `gl.DYNAMIC_DRAW`: 缓冲区的内容可能经常被使用，并且经常更改。内容被写入缓冲区，但不被读取。
    - `gl.STREAM_DRAW`: 缓冲区的内容可能不会经常使用。内容被写入缓冲区，但不被读取。

### gl.vertexAttribPointer

告诉显卡从当前缓冲区（bindBuffer()指定的缓冲区）中读取顶点数据

```js
gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
```

- 参数
  - index：指定要修改的顶点属性的索引
  - size：指定每个顶点属性的组成数量，必须是1，2，3，4
  - type：指定数组中每个元素的数据类型
    - gl.BYTE：有符号的8位整数
    - gl.SHORT：有符号的16位整数
    - gl.UNSIGNED_BYTE：无符号的8位整数
    - gl.UNSIGNED_SHORT：无符号的16位整数
    - gl.FLOAT：32位IEEE标准的浮点数
  - normalized：当转换为浮点数时是否应该将整数数值归一化到特定的范围
  - stride：以字节为单位指定连续顶点属性开始之间的偏移量（及数组中一行长度）。不能大于255
  - offset：指定顶点属性数组中第一部分的字节偏移量。必须是类型的字节长度的倍数

### gl.enableVertexAttribArray

打开属性数组列表中指定索引处的通用顶点属性数组

```
gl.enableVertexAttribArray(index);
```

- 参数
  - index：指向要接货的顶点属性的索引
