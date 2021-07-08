# Scene(场景)

```js
const scene = new Scene() // 创建场景对象
```

### 构造器

Scene()

## 属性

- .fog

  一个fog实例定义了影响场景中每个物体的雾的类型。默认为null。

- .overrideMaterial

  如果不为空，它将强制场景中每个物体都适用这里的材质来渲染。默认为null。

- .autoUpdate

  默认为true，若设置这个值，则渲染器会检查每一帧是否需要更新场景及其中物体的矩阵。当设为false时，你必须亲自手动维护场景中的矩阵

- .background 

  若不为空，在渲染场景的时候将设置背景，且背景总是先被渲染的，可以设置一个用于clear的Color（颜色）、一个覆盖canvas的Texture（纹理），或是一个CubeTexture。默认为null

## 方法

- .toJSON

  meta--包含元数据的对象，例如场景中的纹理或图片。将scene对象转换为three.js JSON Object/Scene format

- .dispose()

  清楚WebGLRenderer内部缓存的场景相关的数据

  

