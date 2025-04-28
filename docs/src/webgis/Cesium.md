# Cesium

‌CesiumJS‌ 是一个开源的 JavaScript 库，主要用于在 web 浏览器中创建 3D 地球仪和 2D 地图，无需额外插件。它利用 WebGL 进行`硬件加速`图形处理，支持跨平台和跨浏览器使用。

:::info 硬件加速
硬件加速是指利用计算机专用硬件（通常是 GPU）来执行某些计算任务，而不是依赖通用处理器（CPU）。在图形处理领域，硬件加速特指使用显卡(GPU)来加速图形渲染过程。

硬件加速的关键特点：

- 并行处理能力：GPU 拥有数百甚至数千个核心，适合并行处理图形数据
- 专用架构：专为图形计算优化的流水线架构
- 高效渲染：直接操作显存，减少 CPU-GPU 数据传输
- 特殊功能支持：如纹理映射、着色器处理、光栅化等图形专用操作

:::

主要功能和应用场景

- 3D 可视化:支持高度真实的 3D 地球场景，包括地形、地表纹理、3D 建筑、水域等；
- 多种视图模式：支持三维、二维和 2.5D 哥伦布视图，无需分别编写代码
- 动态数据可视化：通过 CZML 创建数据驱动的实践动态场景，支持高分辨率的世界地形可视化，使用 WMS、TMS、OpenStreetMap 等多种地图服务。
- 大规模数据支持：定义了 3D Tiles 数据格式，支持大规模三维模型和地形数据的加载与渲染。

::: info Cesiumjs 和 threejs 的区别
Cesium 和 Three 都是基于 WebGL 的 3D 图形库，但他们的定位、功能和应用场景都有显著的区别：Threejs 是一款通用的 3D 渲染库，专注于构建艺术化、交互式的 3D 场景，例如游戏、产品展示、数据可视化等，同时 Three 的自由度较高，提供基础的渲染器、几何体、材质、光照等底层工具，但需要开发者自行实现复杂的功能；Cesium 是一款专注于地理信息、地球科学、地图可视化设计的库，内置全球地形、卫星影像、WGS84 坐标系等，支持海量的地理数据格式，提供日照分析、地形开挖等专业 GIS 工具。
:::

## Cesium 环境搭建

基于公司项目需求，使用 Vue3 框架来进行开发。首先使用 vite 创建模版项目

```js
pnpm create vite@latest my-vue-app -- --template vue-ts
```

这里使用 vite 创建了一个初始项目，后续可以根据需要配置 ESLint、preitter 等。接下来安装 Cesium 和 vite 插件

```js
// vite-plugin-cesium让vite支持对Cesium的类型校验以及代码提示
pnpm install Cesium vite-plugin-cesium
```

在 vite.config.ts 中注册插件

```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cesium from "vite-plugin-cesium";

export default defineConfig({
  plugins: [vue(), cesium()],
});
```

新建一个组件 `MyCesium.vue `并且在 app.vue 中直接引入使用。

## 第一个 demo

我们在正式使用 Cesium 的功能之前需要去到[官网](https://cesium.com/)注册申请一个 AccessToken，后续我们调用相关的 API 需要使用到这个 token。

接下来在组件中创建一个 div 用来做 Cesium 挂载的 DOM

```vue
<template>
  <div id="cesiumContanier" class="cesium-container"></div>
</template>
```

开始使用 Cesium

```vue
<script setup lang="ts">
import { onMounted } from "vue";
import * as Cesium from "cesium";
import { CESIUM_TOKEN } from "../constants/index.ts";

Cesium.Ion.defaultAccessToken = CESIUM_TOKEN; //这里的CESIUM_TOKEN是前面提到过的再Cesium申请的token
const initCesium = () => {
  // 面使用 new Cesium.Viewer()来创建一个观察者。第一个参数为挂载节点dom的id，第二个参数为观察者的配置对象
  const viewer = new Cesium.Viewer("cesiumContanier", {
    //图层控件显隐控制
    geocoder: true, //位置查找工具
    homeButton: true, //首页位置工具
    sceneModePicker: true, //视角切换工具，可以切换2D、3D、2.5D的视图
    baseLayerPicker: true, //默认图层选择工具
    navigationHelpButton: true, //导航帮助工具
    animation: true, //动画工具，是否显示左下角动画工具
    timeline: true, //时间轴工具
    fullscreenButton: true, //全屏按钮工具
  });
};
onMounted(() => {
  initCesium();
});
</script>
```

完成上面的操作之后，我们应该可以在服务上面看到一个 3D 的地球模型了。

在 Cesium 中，每次进入的默认视角都是在美国，我们可以根据需要设置一开始默认的地理位置

```js
// 设置cesium相机的默认视角
// (西边的经度，南边的纬度，东边的经度，北边的纬度)
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  89.5,
  20.4,
  110.4,
  61.2
);
```

## 观察者(Viewer)

## 实体(Entity)

Entity 实体类是 Cesium 为开发者提供的高级绘图接口，开发者可以通过该类在 Cesium 中绘制各种空间数据，比如广告牌、文本信息、平面信息、几何体以及模型等。
···info
Cesium 有两套绘图接口，一个是 Entity，一个是 Primitive， Entity 的内部是基于 Primitive 实现的，Primitive 相对来说更底层，主要面向图形开发人员，普通开发者使用 Entity 就可以，不需要关心底层实现逻辑，如果哪天 Entity 不能满足您的绘图需求了，那么就可以开始研究使用 Primitive 绘图接口。

···
实体在三维场景中添加和控制各种三维对象，如点、线、面、模型等。我们可以利用 API 来对实体进行增删改查等操作。添加到场景中的实体都保存在 `viewer.entities` 中,我们可以使用`viewer.entities.add`方法来向场景中添加实体类型。
例如下面将在观察者中添加一个实体的点：

```js
const initCesium = () => {
  // ······
  viewer.entities.add({
    // 唯一id
    id: "point",
    name: "一个点模型",
    // 实体点的位置
    position: Cesium.Cartesian3.fromDegrees(116.38, 39.85, 0),
    // 添加点实体，value是配置对象
    point: {
      color: Cesium.Color.RED, //颜色
      pixelSize: 50, //大小
      outlineColor: Cesium.Color.GREEN, //边框颜色
      outlineWidth: 4, //边框大小
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, //
      scaleByDistance: new Cesium.NearFarScalar(1000, 1.0, 100000, 0.0), //
    },
  });
  // 相机视角追踪到该实体
  viewer.trackedEntity = entity;
  // ······
};
```

### 常用的实体类型

可以在[文档](https://cesium.com/learn/cesiumjs/ref-doc/Entity.html)中查看所有的实体类型和相关配置

在 Cesium 中提供了多达十几种的实体类型，下面将进行罗列，具体的使用情况可以翻阅文档查看。

- billboard。广告牌，类型为 BillboardGraphic
- box。盒子，类型为 BoxGraphic
- corrider。走廊
- cylinder。柱体椎体
- ellipse。椭圆
- elliposid。椭球
- label。标签
- model。模型
- path。路径
- plane。平面
- point。点
- polygon。多边形
- polyline。线
- polylineVolume。管道
- rectangle。矩形
- wall。墙
- tileset。3d 模型

### 添加实体的方式

在场景中添加实体有两种方式：一种是直接添加，一种是先创建后添加。

直接在观察者中添加实体并配置属性

```js
const viewer = new Cesium.Viewer("cesiumContainer", {
  //相关配置代码...
});
viewer.entities.add({
  id: "point",
  position: Cesium.Cartesian3.fromDegrees(116.3, 39.9),
  point: {
    pixelSize: 10, //点像素大小
    color: Cesium.Color.RED, //点颜色，不能用rgb等css方法，需要用Cesium.Color
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,
  },
});
```

先创建实体类型后，再添加到 viewer 中

```js
const viewer = new Cesium.Viewer("", {});
const point = new Cesium.Entity({
  position: Cesium.Cartesian3.fromDegrees(116.3, 39.9),
  point: {
    pixelSize: 10, //点像素大小
    color: Cesium.Color.RED, //点颜色，不能用rgb等css方法，需要用Cesium.Color
    outlineColor: Cesium.Color.WHITE,
    outlineWidth: 2,
  },
});
viewer.entities.add(point);
```

在 Cesium 中，viewer.entities.add() 方法可以接受一个 Entity 实例或一个对象字面量作为参数。如果传递的是一个对象字面量，Cesium 会自动将其转换为一个 Entity 实例。因此，即使你没有显式地使用 new Cesium.Entity() 来创建一个 Entity 实例，也可以正常运行。

### 删除实体

删除实体的方法有 remove、removeAll、removeById。

1. 删除特定的实体
   remove 方法接收一个实体参数，如果删除成功则返回 true，如果删除失败则返回 false。

```js
viewer.entities.remove(arg);
```

2. 删除所有点
   removeAll()方法，如果已删除则返回 true,如果该集合为空，则返回 false

```js
viewer.entities.removeAll();
```

3. 根据实体 id 删除点

```js
viewer.entities.removeById("box"); //如果已删除则返回true,如果该集合中不存在该实体，则返回false
```

删除的方法就上面 3 个，我们可以在项目中根据需要选择合适的 API，也可以根据需要来循环删除等操作。

```js
let list1 = [];
let list2 = [];

const box1 = new Cesium.Entity({
    id:"box",
    position: Cesium.Cartesian3.fromDegrees(114.3, 39.9, 20000),
    box: {
      dimensions: new Cesium.Cartesian3(40000, 30000, 10000), //盒子的长宽高
      material: Cesium.Color.RED, //盒子颜色
      outline: true, //边框
      outlineColor: Cesium.Color.WHITE, //边框颜色
    },
  });

viewer.entities.add(box1);
list1.push(box1);

const box2 = new Cesium.Entity({
    id:"box",
    position: Cesium.Cartesian3.fromDegrees(114.3, 39.9, 20000),
    box: {
      dimensions: new Cesium.Cartesian3(40000, 30000, 10000), //盒子的长宽高
      material: Cesium.Color.RED, //盒子颜色
      outline: true, //边框
      outlineColor: Cesium.Color.WHITE, //边框颜色
    },
  });

list2.push(box2);
viewer.entities.add(box2);

//要删除某个类别，只需要遍历对应的数组进行删除即可
list1.forEach((item)={
  viewer.entities.remove(item)；
})

//也可以在数组循环中设定条件针对删除；
list2.forEach((item)={
  if(item.id=="box"){
    viewer.entities.remove(item)；
  }
})
```

### 查询实体

在 Cesium 中我们可以通过下面的方式查询实体：

1. 通过 getById 根据 id 查询

```js
const box = viewer.entities.getById("box");
```

2. 通过 getOrCreateEntity 根据 id 查询

```js
const entity = viewer.entities.getOrCreateEntity(id);
```

3. 通过 contains 判断实体是否存在

```js
const isExist = viewer.entities.contains(entity); //如果实体存在，则返回true,否则返回false;
```

### 性能优化

在进行批量操作实体时，可以使用`viewer.entities.suspendEvents()`和`viewer.entities.resumeEvents()`方法来提高性能。这两个反复噶分别用来暂停和恢复 Cesium 实体集合的事件处理。我们可以在批量操作之前调用`viewer.entities.suspendEvents()`来暂停事件处理，然后再更新完成后调用`viewer.entities.resumeEvents()`来恢复事件处理。

- 当调用`viewer.entities.suspendEvents()`时，Cesium 会暂停实体集合的事件处理。这意味着在暂停期间不会触发与实体相关的事件，例如 definitionChanged 事件。
- 在暂停事件处理期间，用户仍然可以继续向实体集合中添加、删除或更新实体。这些操作不会受到暂停事件处理的影响。但是，在暂停事件处理期间，Cesium 不会触发与实体相关的事件。这意味着如果您在暂停期间对实体进行了更改，那么这些更改不会立即反映在场景中。
- 当用户调用 `viewer.entities.resumeEvents()` 时，Cesium 会恢复实体集合的事件处理。这意味着 Cesium 会重新开始触发与实体相关的事件。如果您在暂停期间对实体进行了更改，那么在恢复事件处理后，Cesium 会触发相应的事件来反映这些更改。

## primitive

## 材质

材质是通过漫反射、镜面反射、法线、发射和透明度等组件的组合来定义表面外观的。这些值是使用 Fabric 的 JSON 模式指定的，该模式在后台被解析病组装成 glsl 着色器代码。一些基础的材质包括但不限于颜色材质、图像材质、棋盘材质、斑马线、网格线、发光线、轮廓线、箭头线、虚线以及一些自定义材质。

### 颜色材质

Cesium.Color 颜色材质就是给 material 属性添加 cesium.color。在上面实体的讲解过程中我们已经使用过该种属性。

```js
// ...
 material: Cesium.Color.RED.withAlpha(0.5), //材质
// ...
```

### 图像材质

Cesium.ImageMaterialProperty 图像材质就是将材质替换为图像。图像材质除了能够提供图像外，还可以对图像进行颜色修改以及 s，t(s,t 方向是纹理方向)两个方向的重复次数设置等高级控制。还支持在运行时动态更新材质的属性，实现动画效果。

### 棋盘

Cesium.CheckerboardMaterialProperty。棋盘主要由 evenColor 和 oddColor 两个属性控制，分别代表棋盘上的两种颜色，它们默认为黑白色。

```js
material: new Cesium.CheckerboardMaterialProperty({
        evenColor: Cesium.Color.GREEN, //默认白色，棋盘的第一个颜色
        oddColor: Cesium.Color.BLUE, //默认黑色，第二个颜色
        repeat: new Cesium.Cartesian2(8, 4) //重复次数,四行八列
      }),

```

### 斑马纹

Cesium.StripeMaterialProperty

```js
material: new Cesium.StripeMaterialProperty({
        evenColor: Cesium.Color.WHITE, //默认白色，棋盘的第一个颜色
        oddColor: Cesium.Color.BLACK, //默认黑色，第二个颜色
        repeat: 100, //条纹重复次数
        offset: 20, //偏移量
        orientation: Cesium.StripeOrientation.VERTICAL //定义斑马线的朝向
      }),
```

其中有一个 offset 属性，是用来设置条纹偏移量的，也就是条纹从起始位置开始偏移多少个条纹，这个效果在条纹数多的时候比较难以分辨，大家如果想看看什么效果，推荐将条纹数设置较少，也就是 repeat 数小，然后修改 offset 来看效果，大概就是不同颜色的条纹交换位置的效果。

### 网格线

网格线可以定义网格的行列数（lineCount），网格的颜色(color)，以及网格的透明度(cellAlpha),线粗细（lineThickness），以及线偏移（lineoffset）

```js
material: new Cesium.GridMaterialProperty({
  color: Cesium.Color.YELLOW, //网格颜色
  cellAlpha: 0.2, //单元格透明度
  lineCount: new Cesium.Cartesian2(8, 8), // 行列个数
  lineThickness: new Cesium.Cartesian2(2.0, 2.0), //线粗细
  lineOffset: new Cesium.Cartesian2(2.0, 2.0), // 线偏移
});
```

### 自定义材质

CustomMaterial？？？？

地形数据加载，我们可以使用各大地图服务提供商的地形资源，也可以在其他平台上面下载一些地图资源然后在本地进行导入。

## Cartesian3

Cesium 中的 Cartesian3 和 Cartesian2 是表示 3D 和 2D 坐标的核心类。

创建方法

```js
// 从直角坐标创建
const position1 = new Cesium.Cartesian3(x, y, z);
// 从经纬度创建，高度height默认为0
const position2 = new Cesium.Cartesian3.fromDegress(longtitude, latitude, [
  height,
]);
// 从弧度制 经纬度创建
const position3 = new Cesium.Cartesian3.fromRadians(
  longtitudeRad,
  latitudeRad,
  [height]
);
// 从数组创建
const position4 = new Cesium.Cartesian3.fromArray([x, y, z]);
```

常用的计算方法

```js
// 向量加法
const resultAdd = Cesium.Cartesian3.add(left, right, new Cesium.Cartesian3());
// 向量减法
const resultSubtract = Cesium.Cartesian3.subtract(
  left,
  right,
  new Cesium.Cartesian3()
);
// 向量点积
const dotProduct = Cesium.Cartesian3.dot(left, right);

// 向量叉积
const crossProduct = Cesium.Cartesian3.cross(
  left,
  right,
  new Cesium.Cartesian3()
);

// 向量归一化(单位向量)
const normalized = Cesium.Cartesian3.normalize(vector, new Cesium.Cartesian3());

// 计算两点间距离
const distance = Cesium.Cartesian3.distance(point1, point2);

// 计算中点
const midpoint = Cesium.Cartesian3.midpoint(
  start,
  end,
  new Cesium.Cartesian3()
);
```

几种变换方法

```js
// 向量缩放
const scaled = Cesium.Cartesian3.multiplyByScalar(
  vector,
  scalar,
  new Cesium.Cartesian3()
);

// 线性插值
const lerped = Cesium.Cartesian3.lerp(start, end, t, new Cesium.Cartesian3());

// 矩阵变换
const transformed = Cesium.Matrix4.multiplyByPoint(
  matrix,
  cartesian,
  new Cesium.Cartesian3()
);
```

其他实用方法

```js
// 克隆坐标
const clone = Cesium.Cartesian3.clone(original);

// 比较坐标是否相等
const isEqual = Cesium.Cartesian3.equals(left, right);

// 计算向量的长度(模)
const magnitude = Cesium.Cartesian3.magnitude(vector);

// 计算两点间距离的平方(性能更高)
const distanceSquared = Cesium.Cartesian3.distanceSquared(left, right);
```

## Cartesian2

创建方法

```js
// 从直角坐标创建
const position1 = new Cesium.Cartesian2(x, y);

// 从数组创建
const position2 = Cesium.Cartesian2.fromArray([x, y]);
```

常用的计算方法

```js
// 向量加法
const resultAdd = Cesium.Cartesian2.add(left, right, new Cesium.Cartesian2());

// 向量减法
const resultSubtract = Cesium.Cartesian2.subtract(
  left,
  right,
  new Cesium.Cartesian2()
);

// 向量点积
const dotProduct = Cesium.Cartesian2.dot(left, right);

// 向量归一化
const normalized = Cesium.Cartesian2.normalize(vector, new Cesium.Cartesian2());

// 计算两点间距离
const distance = Cesium.Cartesian2.distance(point1, point2);
```

实用方法

```js
// 克隆坐标
const clone = Cesium.Cartesian2.clone(original);

// 比较坐标是否相等
const isEqual = Cesium.Cartesian2.equals(left, right);

// 计算向量的长度(模)
const magnitude = Cesium.Cartesian2.magnitude(vector);

// 计算向量的角度(弧度)
const angle = Cesium.Cartesian2.angleBetween(vector1, vector2);
```

### 转换方法

坐标系统转换

```js
// 3D转屏幕坐标(需要scene对象)
const screenPos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
  scene,
  cartesian3
);

// 屏幕坐标转3D射线(用于拾取)
const ray = viewer.camera.getPickRay(screenPos);
```

与其他坐标类型转换

```js
// Cartesian3转Cartographic(经纬度)
const cartographic = Cesium.Cartographic.fromCartesian(cartesian3);

// Cartesian3转数组
const array = Cesium.Cartesian3.toArray(cartesian3);

// Cartesian2转数组
const array2 = Cesium.Cartesian2.toArray(cartesian2);
```
