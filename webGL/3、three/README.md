## 模型对象旋转平移缩放

点模型`Points`、线模型`Line`、网格模型`Mesh`等模型对象的基类都是Object3D,Object3D提供了一系列属性和方法对三维空间中的物体进行操纵。

### 方法

#### 平移

- translateX(distance : Float)沿着X轴将平移**distance**个单位。

- translateY(distance : Float)沿着Y轴将平移**distance**个单位。

- translateZ(distance : Float)沿着Z轴将平移**distance**个单位。

- translateOnAxis ( axis : Vector3, distance : Float ) 沿着axis平移**distance**个单位。

  axis -- 一个在局部空间中的标准化向量。
  distance -- 将要平移的距离。

  在局部空间中沿着一条轴来平移物体，假设轴已被标准化。

- .position 获取或者设置position位移属性

#### 旋转

- .rotateX ( rad : Float ) 物体绕局部空间的X轴旋转rad。

  rad - 将要旋转的角度（以弧度来表示）。

- .rotateY ( rad : Float ) 物体绕局部空间的Y轴旋转rad。

  rad - 将要旋转的角度（以弧度来表示）。

- .rotateZ( rad : Float ) 物体绕局部空间的Z轴旋转rad。

  rad - 将要旋转的角度（以弧度来表示）。

- .rotateOnAxis( axis : Vector3,  rad : Float ) 在局部空间中物体绕axis轴旋转rad。

  axis -- 一个在世界空间中的标准化向量。

  rad - 将要旋转的角度（以弧度来表示）。

- .rotateOnWorldAxis(  axis : Vector3, rad : Float ) 在世界空间中物体绕axis轴旋转rad。

  axis -- 一个在世界空间中的标准化向量。

  rad - 将要旋转的角度（以弧度来表示）。

- .rotation和.quaternion属性

### 属性

- .scale: Vector3

  物体的局部缩放，默认值是Vector3(1,1,1)

- .position: Vector3

  物体局部位置，默认值为(0,0,0)

- .rotation: Euler

  物体的局部旋转，以弧度表示

- .quaternion: Quaternion

  表示对象局部旋转的四元数

## 光源对象

1. 环境光`AmbientLight`
2. 平行光`DirectionalLight`
3. 点光源`PointLight`
4. 聚光灯光源`SpotLight`
