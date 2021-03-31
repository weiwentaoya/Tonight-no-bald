- getContext('webgl') 初始化三位画笔
- clearColor(0,0,0,1) 声明一个颜色在颜色缓冲区（webgl颜色与css颜色对应的是 0-0 1-255）
- clear(gl.COLOR_BUFFER_BIT); 刷底色 （gl.COLOR_BUFFER_BIT）颜色缓冲区的颜色
  - cssColor2webglColor(一个把css的rgba颜色转换成webgl颜色的方法)
      ``` js
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
  - three也提供了color转换库
    ```js
        import { Color } from "https://cdn.bootcdn.net/ajax/libs/three.js/r126/three.module.js"
        const rgbaColor = "rgba(255,100,0,1)"
        const color = new Color(rgbaColor)
        console.log(color);//{b: 0, g: 0.39215686274509803, r: 1}
    ```
- 着色器
    顶点着色器的顶点就是两个点,片元着色器的片元就是把直线画到画布上后,这两个点之间构成直线的每个像素（在webgl里片元就是像素）
  - 顶点着色器:描绘顶点的特征，如位置、颜色等
    
  - 片元着色器:进行逐片元处理，如光照
 
- drawArrays
  - drawArrays只支持在一个进程内绘制，一旦进入到下一个进程后，会清除之前内容从头再来绘制
   
- 着色器语言
   - webgl的着色语言是GLSL ES语言
   - void main(){ .... } 是主题函数
   - 在顶点着色器中，gl_Position是顶点的位置，gl_PointSize是顶点的尺寸
   - 在片元着色器中，gl_FragColor是片元的颜色
   - vec4()是一个4维矢量对象,在赋值gl_Position的时候,前三个是x、y、z,第四个参数默认1.0赋值给gl_FragColor时参数为(rgba)

- attribute 变量（顶点相关的存储限定符）
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
        void main(){
            gl_Position = a_Position;
            gl_PointSize = 10.0;
        }
    `
    const a_Position = gl.getAttribLocation(gl.program,'a_Position')
    gl.vertexAttrib3f(a_Position, 0, 0.5, 0)
    ```
- uniform 变量（限定颜色变量的存储限定符）
  - 在js中获取uniform 变量要用getUniformLocation()方法，传入程序对象和参数名
  - 在js中修改uniform 变量要用uniform4f()方法，传入的是变量名，以及r, g, b, a 四个颜色值

- gl_PointCoord 片元在一个点中的位置
- distance 计算两个点的距离
- discard 丢弃，放弃渲染