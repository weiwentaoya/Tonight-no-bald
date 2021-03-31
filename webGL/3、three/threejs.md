### 初始化渲染器

```js
renderer=new THREE.WebGLRenderer();//实例话渲染器
renderer.setSize(window.innerWidth,window.innerHeight)//设置宽和高
document.body.appendChild(renderer.domElement);//添加到dom
```

### 初始化场景

```js
scene = new THREE.Scene()//初始化场景
```

### 初始化相机

```js
//实例华相机
//1、视野，值越大，渲染出来的内容越多
//2、宽高比：默认是按照画布与显示的宽高来设置，如果设置的不对，内容会被拉伸
//3、近裁面和远裁面，设置相机可以看到场景内容的范围，如果场景内的内容位置不在范围内，将不会显示
camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 200)
camera.position.set(4, 4, 15)//放置相机的位置x,y,z
```

### 初始化物体

```js
 geometry = new THREE.BoxGeometry(2,2,2)//创建几何体
 material= new THREE.MeshNormalMaterial()//创建材质
 mesh = new THREE.Mesh(geometry, material)//创建网格
```

#### 初始化一个立方体

```js
//初始化一个立方体
new THREE.BoxGeometry(width,height,depth,widthSegments,HeightSegments,depthSegments)
```

1. width：沿x轴的宽度,默认值为1
2. height：沿y轴的宽度,默认值为1
3. depth：沿z轴的宽度,默认值为1
4. widthSegments：可选，沿着变得**宽度**的分割面的数量，默认值为1
5. HeightSegments：可选，沿着变得**高度**的分割面的数量，默认值为1
6. depthSegments：可选，沿着变得**深度**的分割面的数量，默认值为1

#### 初始化一个圆

```js
new THREE.CircleGeometry(ridus, segments, thetaStart, thetaLength)
```

1. ridus：圆的半径
2. segments：段数，最小值为3，默认值为8（有多少个三角形组成）
3. thetaStart：第一段的起始角度
4. thetaLength：圆形扇形的中心角，通常称为theta。默认值为2*PI，画出一个整圆