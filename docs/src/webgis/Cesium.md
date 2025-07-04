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

:::info CZML 文件
czml 是 cesium 中的一种基于 JSON 的数据格式，用于描述时间动态的地理空间场景。它可以用来定义实体的属性，并支持时间动态变化。CZML 文件是一个 JSON 数组，其中每个对象描述一个实体或场景的属性。

```json
// 比如
[
  {
    "id": "document",
    "name": "CZML Example",
    "version": "1.0"
  },
  {
    "id": "point1",
    "name": "Red Point",
    "position": {
      "cartographicDegrees": [104.0665, 30.5728, 1000]
    },
    "point": {
      "color": {
        "rgba": [255, 0, 0, 255]
      },
      "pixelSize": 10
    }
  }
]
```

#### CZML 的特点

1. 时间动态：支持描述随时间变化的属性，例如位置、颜色、大小等。适用于轨迹动画、动态数据可视化等场景。
2. 基于 JSON：CZML 是一种 JSON 格式，易于阅读和解析。可以通过 HTTP 加载，也可以直接嵌入到代码中。
3. CZML 是为 Cesium 量身定制的，Cesium 原生提供了支持。

:::

下面一张图是概括 Cesium 核心知识的关系图：

![Cesium核心知识图](/images/gis/Cesium核心.jpg)

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
  // 使用 new Cesium.Viewer()来创建一个观察者。第一个参数为挂载节点dom的id，第二个参数为观察者的配置对象
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
    shouldAnimation: true, //是否开启动画，true进入页面自动播放动画
  });
};
onMounted(() => {
  initCesium();
});
</script>
```

完成上面的操作之后，我们应该可以在服务上面看到一个 3D 的地球模型了。
![初始化](/images/gis/demo1.png)

在 Cesium 中，每次进入的默认视角都是在美国，我们可以根据需要设置一开始默认的地理位置

```js
// 设置cesium相机的默认视角
// (西边的经度，南边的纬度，东边的经度，北边的纬度)
Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
  73.66, // 中国最西端经度（约新疆帕米尔高原）
  18.16, // 中国最南端纬度（约曾母暗沙）
  135.05, // 中国最东端经度（约黑龙江抚远）
  53.56 // 中国最北端纬度（约漠河）
);
```

<!-- ## 观察者(Viewer) -->

## 实体(Entity)

实体是指具有形状、属性和时序特征的空间对象，它是对存在于自然世界中地理实体的抽象。

Entity 实体类是 Cesium 为开发者提供的高级绘图接口，开发者可以通过该类在 Cesium 中绘制各种空间数据，比如广告牌、文本信息、平面信息、几何体以及模型等。
:::info Cesium 绘图接口
Cesium 有两套绘图接口，一个是 Entity，一个是 Primitive。Entity 的内部是基于 Primitive 实现的，Primitive 相对来说更底层，主要面向图形开发人员，普通开发者使用 Entity 就可以，不需要关心底层实现逻辑，如果哪天 Entity 不能满足您的绘图需求了，那么就可以开始研究使用 Primitive 绘图接口。

:::
实体可以让我们在三维场景中添加和控制各种三维对象，如点、线、面、模型等。我们可以利用 API 来对实体进行增删改查等操作。添加到场景中的实体都保存在 `viewer.entities` 中,我们可以使用`viewer.entities.add`方法来向场景中添加实体类型。
例如下面将在观察者中添加一个实体的点：

```js
const initCesium = () => {
  // ······
  // 添加一个实体对象
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

在 Cesium 中提供了多达十几种的实体类型，下面将进行罗列，具体的使用情况可以翻阅[文档](https://cesium.com/learn/cesiumjs/ref-doc/Entity.html)查看。

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

1. 直接在 Viewer 的实例中添加实体并配置属性

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

2. 先创建实体类型后，再添加到 viewer 中

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

2. 删除所有实体
   removeAll()方法，如果已删除则返回 true,如果该集合为空，则返回 false

```js
viewer.entities.removeAll();
```

3. 根据实体 id 删除

```js
//如果已删除则返回true,如果该集合中不存在该实体，则返回false
viewer.entities.removeById("box");
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
// 根据指定的 id 查找实体，若存在则返回该实体；若不存在则新建一个实体并添加到 viewer.entities 中，同时绑定该 id。
const entity = viewer.entities.getOrCreateEntity(id);
```

3. 通过 contains 判断实体是否存在

```js
//如果实体存在，则返回true,否则返回false;
const isExist = viewer.entities.contains(entity);
```

### 性能优化

在进行批量操作实体时，可以使用`viewer.entities.suspendEvents()`和`viewer.entities.resumeEvents()`方法来提高性能。这两个方法分别用来暂停和恢复 Cesium 实体集合的事件处理。我们可以在批量操作之前调用`viewer.entities.suspendEvents()`来暂停事件处理，然后再更新完成后调用`viewer.entities.resumeEvents()`来恢复事件处理。

- 当调用`viewer.entities.suspendEvents()`时，Cesium 会暂停实体集合的事件处理。这意味着在暂停期间不会触发与实体相关的事件，例如 definitionChanged 事件。
- 在暂停事件处理期间，用户仍然可以继续向实体集合中添加、删除或更新实体。这些操作不会受到暂停事件处理的影响。但是，在暂停事件处理期间，Cesium 不会触发与实体相关的事件。这意味着如果您在暂停期间对实体进行了更改，那么这些更改不会立即反映在场景中。
- 当用户调用 `viewer.entities.resumeEvents()` 时，Cesium 会恢复实体集合的事件处理。这意味着 Cesium 会重新开始触发与实体相关的事件。如果您在暂停期间对实体进行了更改，那么在恢复事件处理后，Cesium 会触发相应的事件来反映这些更改。

## 图元（primitive）

在 Cesium 中，**Primitive（图元）** 是底层渲染的核心对象，用于高效绘制地理空间数据（如点、线、面、3D 模型等）。与高级的 **Entity API** 不同，Primitive 直接操作图形渲染管线，提供更细粒度的控制和更高的性能，适合大规模或动态数据可视化。以下是 Primitive 的详细解析：

---

### **1. Primitive 的核心特点**

| **特性**       | **说明**                                                                  |
| -------------- | ------------------------------------------------------------------------- |
| **高性能**     | 直接调用 WebGL 渲染，跳过 Entity 的抽象层，适合海量数据（如百万级点云）。 |
| **低层级控制** | 可自定义着色器（Shader）、几何体（Geometry）和外观（Appearance）。        |
| **灵活性**     | 支持动态更新几何属性（如实时修改顶点坐标）。                              |
| **无自动聚合** | 需手动管理实例化（如合并相同类型的 Primitive 以减少 Draw Call）。         |

---

### **2. Primitive 的主要类型**

Cesium 提供多种 Primitive 子类，适应不同渲染需求：

#### **(1) 基础 Primitive**

| **类名**              | **用途**                       | **示例场景**         |
| --------------------- | ------------------------------ | -------------------- |
| `Primitive`           | 通用图元，自定义几何体与外观。 | 动态地形、自定义网格 |
| `GroundPrimitive`     | 贴地 Primitive（随地形起伏）。 | 贴地路径、区域填充   |
| `BillboardCollection` | 2D 图标（如标记点）。          | 气象符号、POI 点     |
| `LabelCollection`     | 文本标签。                     | 地名标注             |
| `PolylineCollection`  | 多段线。                       | 轨迹线、边界线       |

#### **(2) 3D 数据专用**

| **类名**                   | **用途**                           | **示例场景**         |
| -------------------------- | ---------------------------------- | -------------------- |
| `Model`                    | 加载 3D 模型（glTF/GLB 格式）。    | 建筑模型、车辆模型   |
| `Cesium3DTileset`          | 流式加载海量 3D 瓦片数据。         | 城市级 3D 建筑、点云 |
| `PointPrimitiveCollection` | 高效渲染点数据（支持颜色和大小）。 | 传感器数据、散点图   |

---

### **3. Primitive 的核心组成**

每个 Primitive 由两部分构成：

#### **(1) 几何体（Geometry）**

定义形状的顶点、索引和属性（如位置、颜色、法线）。

- **内置几何体**：`BoxGeometry`、`PolygonGeometry`、`PolylineGeometry` 等。
- **自定义几何体**：通过 `Geometry` 和 `GeometryAttributes` 构建。

#### **(2) 外观（Appearance）**

控制渲染样式（如材质、着色器、渲染状态）。

- **内置外观**：
  - `MaterialAppearance`：支持材质（如颜色、贴图）。
  - `PolylineMaterialAppearance`：带材质的线。
  - `PerInstanceColorAppearance`：每个实例单独着色。
- **自定义外观**：通过 `FragmentShaderSource` 和 `VertexShaderSource` 编写 GLSL 代码。

---

### **4. 创建 Primitive 的完整流程**

#### **(1) 定义几何体**

```javascript
// 创建一个三角形几何体
const geometry = new Cesium.Geometry({
  attributes: {
    position: new Cesium.GeometryAttribute({
      componentDatatype: Cesium.ComponentDatatype.FLOAT,
      componentsPerAttribute: 3,
      values: new Float32Array([
        0.0,
        0.0,
        0.0, // 顶点1
        1.0,
        0.0,
        0.0, // 顶点2
        0.0,
        1.0,
        0.0, // 顶点3
      ]),
    }),
  },
  indices: new Uint16Array([0, 1, 2]), // 三角形索引
  primitiveType: Cesium.PrimitiveType.TRIANGLES,
});
```

#### **(2) 定义外观**

```javascript
const appearance = new Cesium.MaterialAppearance({
  material: Cesium.Material.fromType("Color", {
    color: Cesium.Color.RED,
  }),
  translucent: false,
});
```

#### **(3) 创建 Primitive 并添加到场景**

```javascript
const primitive = new Cesium.Primitive({
  geometryInstances: new Cesium.GeometryInstance({
    geometry: geometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED),
    },
  }),
  appearance: appearance,
  asynchronous: false, // 同步加载（适合简单几何体）
});
viewer.scene.primitives.add(primitive);
```

---

### **5. Primitive vs. Entity**

| **对比项**     | **Primitive**                      | **Entity**                                  |
| -------------- | ---------------------------------- | ------------------------------------------- |
| **性能**       | 更高（直接操作 WebGL）。           | 较低（依赖动态属性更新）。                  |
| **灵活性**     | 可完全自定义渲染管线。             | 受限（通过预定义属性如 `point`、`label`）。 |
| **开发复杂度** | 高（需理解几何体、着色器）。       | 低（声明式 API，易上手）。                  |
| **适用场景**   | 大规模数据、动态效果、自定义渲染。 | 交互式实体、简单可视化。                    |

---

### **6. 性能优化技巧**

1. **合并几何体**：  
   使用 `GeometryInstance` 合并相同外观的几何体，减少 Draw Call：

   ```javascript
   const instances = [
       new Cesium.GeometryInstance({ geometry: box1, attributes: { color: /* ... */ } }),
       new Cesium.GeometryInstance({ geometry: box2, attributes: { color: /* ... */ } })
   ];
   viewer.scene.primitives.add(new Cesium.Primitive({
       geometryInstances: instances,
       appearance: appearance
   }));
   ```

2. 实例化渲染：  
   对重复对象（如树木）使用 `Primitive` 的 `modelMatrix` 属性实现 GPU 实例化。

3. \*\*动态数据更新：  
   通过 `primitive.geometryInstances` 的 `attributes` 实时修改顶点数据（需调用 `primitive.dirty = true`）。

---

### 7. 实际应用示例

#### (1) 动态更新折线

```javascript
const positions = [];
const polyline = new Cesium.Primitive({
  geometryInstances: new Cesium.GeometryInstance({
    geometry: new Cesium.PolylineGeometry({
      positions: new Cesium.CallbackProperty(() => positions, false),
      width: 5.0,
    }),
  }),
  appearance: new Cesium.PolylineMaterialAppearance({
    material: Cesium.Material.fromType("PolylineGlow", {
      color: Cesium.Color.BLUE,
    }),
  }),
});
viewer.scene.primitives.add(polyline);

// 动态添加点
setInterval(() => {
  positions.push(
    Cesium.Cartesian3.fromDegrees(
      Math.random() * 360 - 180,
      Math.random() * 180 - 90
    )
  );
}, 1000);
```

#### (2) 自定义着色器

```javascript
const appearance = new Cesium.MaterialAppearance({
  fragmentShaderSource: `
        void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
            material.diffuse = vec3(0.0, 1.0, 0.0); // 强制绿色
        }
    `,
});
```

## 材质

材质是通过漫反射、镜面反射、法线、发射和透明度等组件的组合来定义表面外观的。这些值是使用 Fabric 的 JSON 模式指定的，该模式在后台被解析病组装成 glsl 着色器代码。一些基础的材质包括但不限于颜色材质、图像材质、棋盘材质、斑马线、网格线、发光线、轮廓线、箭头线、虚线以及一些自定义材质。

### 颜色材质

`Cesium.Color(颜色材质) `就是给 material 属性添加 cesium.color。在上面实体的讲解过程中我们已经使用过该种属性。

```js
// ...
 material: Cesium.Color.RED.withAlpha(0.5), //材质
// ...
```

### 图像材质

`Cesium.ImageMaterialProperty (图像材质)`就是将材质替换为图像。图像材质除了能够提供图像外，还可以对图像进行颜色修改以及 s，t(s,t 方向是纹理方向)两个方向的重复次数设置等高级控制。还支持在运行时动态更新材质的属性，实现动画效果。

```js
import dog from "../assets/img1.jpeg";
const box = new Cesium.Entity({
  id: "box",
  position: Cesium.Cartesian3.fromDegrees(104.065837, 30.657349, 100),
  box: {
    show: true,
    // 外观：长宽高
    dimensions: new Cesium.Cartesian3(100, 100, 100),
    // 是否填充
    fill: true,
    // 图像材质
    material: new Cesium.ImageMaterialProperty({
      image: dog,
      repeat: new Cesium.Cartesian2(2.0, 2.0), // 重复次数
      // transparent: true,// 是否透明
      // color: Cesium.Color.YELLOW,// 颜色
      // imageSubRegion: new Cesium.BoundingRectangle(0, 0, 100, 100), // 纹理偏移
    }),
    outline: true,
    outlineColor: Cesium.Color.RED,
    outlineWidth: 20,
    shadows: Cesium.ShadowMode.RECEIVE_ONLY, // 阴影模式
  },
});
```

![图像材质](/images/gis/图像材质.png)

### 棋盘

`Cesium.CheckerboardMaterialProperty(棋盘)`主要由 evenColor 和 oddColor 两个属性控制，分别代表棋盘上的两种颜色，它们默认为黑白色。

```js
material: new Cesium.CheckerboardMaterialProperty({
        evenColor: Cesium.Color.GREEN, //默认白色，棋盘的第一个颜色
        oddColor: Cesium.Color.BLUE, //默认黑色，第二个颜色
        repeat: new Cesium.Cartesian2(8, 4) //重复次数,四行八列
      }),

```

![棋盘材质](/images/gis/棋盘材质.png)

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
![斑马纹材质](/images/gis/斑马纹材质.png)

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

![网格线材质](/images/gis/网格线材质.png)

### 自定义材质（Custom Material）

在 Cesium 中，自定义材质（Custom Material） 允许开发者通过 GLSL 着色器（Shader）完全控制几何体的渲染效果，实现高级视觉效果（如动态水面、热力图、扫描线等）。

关于自定义材质目前还不太能看懂，后续时机成熟再补充。

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

## viewer.scene

在 Cesium 中，Viewer 的实例身上的 scene 是 Scene 类的实例，它是 Cesium 3D 的核心对象，负责管理场景中所有图形元素、相机和视觉效果。

### Scene 的基本职责

1. 管理 3D 场景中所有的图元（Primitives）和实体（Entities）
2. 控制场景渲染
3. 处理相机和视图
4. 管理光照和视觉效果
5. 处理场景的拾取和碰撞检测

### Scene 常用方法

渲染相关

- render() - 手动触发场景渲染。
- requestRender() - 请求下一帧
- pick(position) - 在屏幕坐标中拾取场景中的对象
- pickPosition(position) - 获取屏幕坐标对应的世界坐标

相机控制

- screenSpaceCameraController - 获取屏幕空间相机控制器
- camera - 获取当前相机实例
- preUpdate/postUpdate - 渲染前/后的回调

场景状态

- mode - 获取或设置场景模式 (3D, 2D, Columbus View)
- globe - 获取地球实例
- groundPrimitives - 获取地面图元集合
- primitives - 获取场景中的图元集合

视觉效果

- skyBox - 设置天空盒
- sun - 控制太阳位置和外观
- moon - 控制月亮
- skyAtmosphere - 控制大气效果
- fog - 控制雾效
- backgroundColor - 设置背景色

实用方法

- canvas - 获取渲染画布
- frameState - 获取当前帧状态
- debugShowFramesPerSecond - 显示帧率
- completeMorph() - 完成场景模式转换

### 示例

```js
const viewer = new Cesium.Viewer("cesiumContainer");

// 获取scene实例
const scene = viewer.scene;

// 示例1：设置背景色
scene.backgroundColor = Cesium.Color.LIGHTBLUE;

// 示例2：拾取对象
const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction(function (movement) {
  const pickedObject = scene.pick(movement.endPosition);
  if (Cesium.defined(pickedObject)) {
    console.log("Picked object:", pickedObject.id);
  }
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

// 示例3：控制相机
scene.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(116.4, 39.9, 10000),
  orientation: {
    // 控制相机的朝向，
    // 单位是弧度，
    // 0 表示朝向正北，正值表示顺时针旋转，负值表示逆时针旋转。
    heading: Cesium.Math.toRadians(0),
    // 表示相机或对象的俯仰角（垂直旋转角度），
    // 单位是弧度，
    // 0 表示水平视角，正值表示向上倾斜，负值表示向下倾斜。
    pitch: Cesium.Math.toRadians(-45),
    // 表示相机或对象的滚转角（围绕视线轴的旋转角度）。
    // 单位是弧度。
    // 0 表示没有滚转，正值表示顺时针滚转，负值表示逆时针滚转
    roll: 0,
  },
});
```

## Cesium.konckout

Cesium.konckout 是 Cesium 对流行的 MVVM 框架 Knockoutjs 的集成封装，主要用于实现数据的双向绑定功能，特别是在 Cesium 的界面控件和数据可视化方面。

### 主要作用

- 实现数据双向绑定：将 Cesium 实体属性与 UI 元素绑定 -自动更新视图：当 Cesium 实体属性发生变化的时候自动更新界面
- 创建动态界面：用于构建 Cesium 的交互式控制面板
- 简化 UI 开发：减少手动 DOM 操作代码

### 核心方法和属性

1. 绑定方法

- Cesium.knockout.track(viewModel, propertyNames) 使普通对象可观察(observable)

```js
const viewModel = { alpha: 0.5 };
Cesium.knockout.track(viewModel, ["alpha"]);
```

- Cesium.knockout.defineProperty(viewModel, name, descriptor) 定义可观察属性

```js
Cesium.knockout.defineProperty(viewModel, "beta", {
  get: function () {
    /*...*/
  },
  set: function (value) {
    /*...*/
  },
});
```

2. 绑定应用方法

- Cesium.knockout.applyBindings(viewModel, domElement) 将视图模型绑定到 DOM 元素

```js
Cesium.knockout.applyBindings(viewModel, document.getElementById("panel"));
```

- Cesium.knockout.cleanNode(domElement) 清除元素的绑定

3. 工具方法

- Cesium.knockout.getObservable(viewModel, propertyName) 获取属性的 observable 对象。
- Cesium.knockout.observable(initialValue) 创建可观察变量

```js
const obsValue = Cesium.knockout.observable(10);
```

- Cesium.knockout.computed(calculator) 创建计算属性

```js
const compValue = Cesium.knockout.computed(() => obsValue() * 2);
```

## Cesium.CallbackProperty

Cesium.CallbackProperty 是 Cesium 的一种`动态属性机制`，它允许开发者通过回调函数实时计算实体的属性值，而不是直接存储静态值。这种设计在需要频繁更新或复杂计算的场景中非常有用。
核心作用

- 动态属性计算，在每一帧渲染时，Cesium 自动调用回调函数获取最新属性值。
- 性能优化，避免手动频繁更新实体属性，由引擎内部统一调度
- 响应式集成，完美适配需要随时间\交互变化的属性。

基本语法

```js
// callback函数，返回当前属性值，isConstant是一个布尔值表示属性是否永不变化
//回调返回新的平面参数（法向量 + 距离），但不创建新对象。
new Cesium.CallbackProperty(callback, isConstant);
```

## Cesium.Plane

Cesium.Plane 是 Cesium 中用于定义无限延伸的平面的数学对象，广泛应用与裁剪、碰撞检测、空间分析等场景。

- 平面方程：定义为 normal · (point - origin) = distance（normal 是法向量，distance 是沿法向量到原点的有符号距离）
- 无限延伸：没有边界，适用于全局空间计算
- 方向性：法向量决定平面的真面和背面

```js
// normal是平面的单位法向量，distance表示从原点沿法向量到平面的距离
new Cesium.Plane(normal, distance);

// 示例
// 创建一个平行于XY平面，且沿Z轴正向偏移100米的平面
const normal = new Cesium.Cartesian3(0, 0, 1);
const plane = new Cesium.Plane(normal, -100);
```

## 相机定位的几种方式

在 Cesium 中将相机定位到特定位置有很多种方法，根据不同的交互需求和场景复杂度，可以选择最合适的方式。

### 1. viewer.camera.flyTo(options)

以动画的形式飞向目标位置，适合场景切换或用户引导。

```js
// 1.飞行到一个具体的位置
// 相机最终定位的坐标
    destination: Cesium.Cartesian3.fromDegrees(104.0665, 30.5728, 2000),
    // 相机的飞行持续时间，如果不设置则会自动计算合适的时间
    duration: 3,
    //控制相机角度参数
    orientation: {
      roll: Cesium.Math.toRadians(roll.value), // 相机的滚转角度
      pitch: Cesium.Math.toRadians(pitch.value), // 相机的俯仰角度
      heading: Cesium.Math.toRadians(heading.value), // 相机的偏航角度
    },
    // 飞行完要执行的函数
    complete: function () {
      console.log("飞行完成");
    },
    // 飞行取消执行的函数
    cancel: function () {
      console.log("飞行取消");
    },


    // 2. 飞到一个矩形区域，并以俯视角(top-down view)查看该区域
viewer.camera.flyTo({
    // destination : Cesium.Rectangle.fromDegrees(west, south, east, north)
    destination: Cesium.Rectangle.fromDegrees(102.0, 28.0, 108.0, 34.0) // 四川省的大致范围
});
```

### 2. viewer.camera.setView(options)

立即跳转到目标视角，无动画效果，适合快速切换。

```js
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(104.0665, 30.5728, 2000),
});
```

### 3. viewer.zoomTo(target);

viewer.zoomTo 是 Cesium 中用于自动调整相机视角的方法，它会自动计算最佳视角以完整显示目标，如实体或 3D 模型等。

```js
const entity = viewer.entities.add({
  position: Cesium.Cartesian3.fromDegrees(104.0665, 30.5728, 1000),
  point: { pixelSize: 10, color: Cesium.Color.RED },
});
viewer.zoomTo(entity);
```

### 4. viewer.camera.lookAt(target, offset)

将相机围绕某个`固定目标点`旋转观察。target 是目标点的位置，offset 是相机相对于目标点的偏移量，这个偏移量定义了相机与目标点之间的距离和方向。

```js
viewer.value.camera.lookAt(
  Cesium.Cartesian3.fromDegrees(104.0665, 30.5728, 0), // 目标点（成都市中心）
  new Cesium.Cartesian3(0.0, -5000.0, 3000.0) // 偏移量（距离目标点的方向和距离）
);
```

如果需要恢复相机的自由控制，可以调用 viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)，将相机从目标点解绑。

### 5. 通过相机坐标系精准控制

使用相机局部坐标系进行毫米级定位，适合高级应用。

```js
const center = Cesium.Cartesian3.fromDegrees(116.4, 39.9);
viewer.camera.lookAt(
  center, // 目标点坐标
  new Cesium.HeadingPitchRange( // 观察参数
    Cesium.Math.toRadians(45), // 方位角
    Cesium.Math.toRadians(-30), // 俯仰角
    2000 // 距离
  )
);
```

### 6. 绑定到实体跟踪(动态跟踪)

相机持续跟踪移动中的实体，如车辆、飞机等。

```js
const camera = viewer.camera;
const position = Cesium.Cartesian3.fromDegrees(116.4, 39.9, 100);
const direction = Cesium.Cartesian3.normalize(
  Cesium.Cartesian3.subtract(
    position,
    camera.position,
    new Cesium.Cartesian3()
  ),
  new Cesium.Cartesian3()
);

viewer.trackedEntity = viewer.eneities;
```

关于相机方法的更多参数配置[参考](https://cesium.com/learn/cesiumjs/ref-doc/Camera.html)
地形数据加载，我们可以使用各大地图服务提供商的地形资源，也可以在其他平台上面下载一些地图资源然后在本地进行导入。

## 其他的方法

### Cesium.HeadingPitchRange

Cesium.HeadingPitchRange 是 Cesium 中的一个类，用于表示相对于某个位置的观察视角和距离，通常用于相机定位、视图控制等场景。

```js
new Cesium.HeadingPitchRange(heading, pitch, range);
```

- heading: 航向角，偏航角。单位是弧度。表示观察者相对于正北方向的旋转角度。范围：0 表示正北，π/2 表示正东，π 表示正南，3π/2 表示正西
- pitch：俯仰角，单位是弧度。表示观察者向上或向下看的倾斜角度。0 表示水平，正数表示向上看，负数表示向下看
- range：距离（范围），单位是米。表示观察者与目标位置之间的直线距离

## viewer.scene.drillPick

drillPick 是 Cesium 中一个非常实用的场景拾取方法，它可以从屏幕坐标点"钻取"所有在该位置重叠的图元(Primitive)和实体(Entity)。

返回一个包含所有被拾取到的对象的数组

```js
viewer.scene.drillPick(windowPosition, limit, width, height);
```

- windowPosition:Cartesian2,屏幕坐标位置（像素坐标）
- limit 返回结果的最大数量限制
- width。默认值 3 拾取区域的宽度（像素）
- height，默认 3 拾取区域的高度（像素）
