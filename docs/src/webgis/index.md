# WebGIS

WebGIS(网络地理信息系统)是基于互联网技术的地理信息系统(GIS),它允许用户通过浏览器或移动设备访问、交互、分析和共享地理空间数据。

核心特点：

- 在线访问：无需安装专业软件，通过浏览器即可使用。
- 跨平台：支持 PC、手机、平板等多种设备。
- 实时数据：可支持动态数据，如交通、天气等
- 协作共享：支持多用户协同编辑与数据共享。

<!-- ## 投影 -->

:::info 什么是 GIS
作为一门学科。是描述、存储、分析和输出空间信息的理论和方法的一门的交叉学科。
作为一个技术系统。是综合处理和分析空间数据的一种技术系统。在计算机硬、软件系统支持下，对整个或部分地球表层(包括大气层)空间中的有关地理分布数据进行采集、储存、管理、运算、分析、显示和描述的技术系统。
地理信息系统与其他信息系统的主要区别在于其存储和处理的信息是经过地理编码的，地理位置及与该位置有关的地物属性信息成为信息检索的重要部分。在地理信息系统中，现实世界被表达成系列的地理要素和地理现象，这些地理特征至少有`空间位置参考信息`和`非位置信息`两个组成部分。

:::

## 拓扑关系

空间实体之间存在着多种空间关系，包括拓扑关系、顺序/方位关系、度量关系等，通过空间关系查询和定位空间实体是 GIS 的特殊之处。`拓扑空间关系指图形保持连续状态下变形，但图形关系不变的性质，它只考虑物体间的位置关系而不考虑它们的形状和大小`。
![拓扑关系](/images/gis/拓扑关系.jpeg)

### 九交模型

九交模型是 OGC 制定的一套适用于空间查询的一套模型，用来表示平面几何图形的拓扑关系。九交模型把空间几何要素划分为内部(interior)、边界(boundary)、外部(exterior)三个部分，通过对任意两个几何要素这三部分的相交关系判断，来表示要素之间的拓扑空间关系。
![九交模型](/images/gis/九交模型.png)

## 图层（Layer）

在 webgis 中，图层是核心概念之一，用于组织和管理地理空间数据。简单来说，`图层是将不同类型或不同来源的空间数据分层叠加显示的机制`，类似于透明胶片叠加的效果。

### 定义

`图层是地理数据的逻辑容器，每个图层包含同一类别的空间要素(如道路、建筑、河流)及其属性信息`。

作用：

- 数据分类：将复杂的地理信息按主题分类，如行政区划分、交通层、植被层。
- 独立控制：可单独设置图层的可见性、样式、透明度、交互行为等。
- 高效渲染：按需加载或隐藏图层，优化地图性能和用户体验。

### 常见的图层

- 基础底图图层(Basemap Layer)：提供背景底图(如卫星图像、街道图)，通常为栅格或矢量切片，不可编辑。如卫星地图和街道图层。
- 矢量图层(Vector Layer)，包含点、线、面等要素，可动态修改样式、支持交互。数据格式 GeoJSON、Shapefile 等。
- 栅格图层(Raster Layer),显示遥感影像、高程模型、热力图等
- 动态服务图层(WMS/WMTS/WFS)
- 三维图层(3D Layer)

### 图层的典型操作

- 控制可见性：显示、隐藏特定图层
- 调整顺序：上层图层会遮盖下层
- 样式配置：修改颜色、线宽、填充图案等
- 交互设置：绑定点击事件。

## 瓦片（Tile）

在 GIS 中，瓦片和瓦片数据是优化地图或 3D 场景渲染性能的关键技术，尤其在 Web 地图和全球 3D 可视化中广泛应用。

### 什么是瓦片

`瓦片是将地图或地形数据切割成若干小块，通常是正方形或矩形，每个小块称为一个瓦片。通过分块加载和动态调度，实现快速渲染和按需加载，避免一次性处理海量数据，造成页面卡顿或加载慢等问题`。

瓦片按缩放级别组织，低级别显示粗略数据（如国家轮廓），高级别显示细节（如街道）。每个瓦片通过行列号(x,y)和缩放级别(z)唯一标识，仅加载当前视野范围内的瓦片，减少网络和计算压力。

### 瓦片数据(Tile Data)

瓦片数据（Tile Data） 是高效渲染大规模 3D 地理空间数据的关键技术，它采用分层分块（Hierarchical Tile Pyramid）的方式组织数据，以实现动态加载和流畅可视化。

::: info 分层和分块

- 分块(Tiling)是将大规模地理数据切割成小块，每一块覆盖特定的地理范围。
- 分层(Level of Detail, LOD)是指将数据按照不同层级组织，高层级(低细节)显示全局视图，低层级(高细节)在放大时动态加载。
- 动态加载是指仅加载当前视角可见的瓦片，减少内存和计算压力。
  :::

瓦片可以包含多种数据类型，常见的形式包括：栅格瓦片、矢量瓦片、3D 瓦片、地形瓦片。

- 栅格瓦片（Raster Tiles）。栅格瓦片主要的形式是与渲染的图片，用于传统的 Web 地图。如：`https://tile.openstreetmap.org/{z}/{x}/{y}.png`。
- 矢量瓦片（Vector Tiles）。矢量瓦片存储在压缩后的矢量数据。支持动态样式，数据体积小，适合高分辨率显示。
- 3D 瓦片（3D tiles）。3D 瓦片存储三维模型，支持层次化细节(LOD)和实例化。格式为 glTF 的扩展。
- 地形瓦片（Terrain Tiles）。地形瓦片存储高程数据，用于生成 3D 地形。

### 瓦片数据的生成流程

1. 数据预处理：将地图图像切割成小块，如果是矢量数据需要按空间范围切分并编码。
2. 金字塔构建：为每个缩放级别生成不同精度的瓦片(低级别=合并，高级别=细分)。
3. 存储与发布：直接托管瓦片数据，通过瓦片服务器实时生成。

在 Cesium 中加载瓦片数据:

```js
// 1. 加载影像瓦片（WMTS 服务）
const imagery = new Cesium.WebMapTileServiceImageryProvider({
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  layer: "osm",
  style: "default",
  format: "image/png",
  tileMatrixSetID: "GoogleMapsCompatible",
});
viewer.imageryLayers.addImageryProvider(imagery);

// 2. 加载 3D Tiles（建筑模型）
const tileset = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: "https://example.com/tileset/tileset.json",
  })
);

// 3. 加载地形瓦片（Cesium 官方地形）
viewer.terrainProvider = Cesium.createWorldTerrain({
  requestWaterMask: true, // 显示水面效果
});
```

## WMS 和 WMTS

WMS（Web Map Service,动态地图服务）和 WMTS（Web Map Tile Service，静态瓦片服务）是两种主流的 **OGC（开放地理空间联盟）** 标准网络地图服务，用于在 Web 环境下发布和访问地图数据。它们的主要区别在于数据组织方式和适用场景。

### **WMS（Web Map Service）**

#### **特点**

- **动态地图服务**：每次请求时，服务器实时生成地图图片（PNG/JPEG/SVG）。
- **支持交互查询**：可获取地图要素信息（`GetFeatureInfo`）。
- **灵活性高**：可自定义样式、图层叠加、坐标参考系统（CRS）。
- **适合小范围或动态数据**：如气象、实时交通。

#### **主要请求参数**

| 参数                       | 说明               |
| -------------------------- | ------------------ |
| `SERVICE=WMS`              | 指定服务类型       |
| `REQUEST=GetMap`           | 请求地图图片       |
| `LAYERS=layer1,layer2`     | 指定图层           |
| `BBOX=xmin,ymin,xmax,ymax` | 地图范围（边界框） |
| `WIDTH=800&HEIGHT=600`     | 输出图片尺寸       |
| `FORMAT=image/png`         | 图片格式           |

#### **示例请求**

```plaintext
http://example.com/wms?SERVICE=WMS&REQUEST=GetMap&LAYERS=roads,rivers&BBOX=116.3,39.9,116.5,40.1&WIDTH=800&HEIGHT=600&FORMAT=image/png
```

### **WMTS（Web Map Tile Service）**

#### **特点**

- **静态瓦片服务**：地图被预切割成固定大小的瓦片（如 256×256 像素），客户端按需加载。
- **高性能**：适合大范围地图（如 Google Maps、天地图）。
- **缓存优化**：瓦片可 CDN 加速，减少服务器压力。
- **标准化层级**：使用 `TileMatrix`（缩放级别）、`TileRow`（行）、`TileCol`（列）索引瓦片。

#### **主要请求参数**

| 参数               | 说明         |
| ------------------ | ------------ |
| `SERVICE=WMTS`     | 指定服务类型 |
| `REQUEST=GetTile`  | 请求瓦片     |
| `LAYER=basemap`    | 图层名称     |
| `TILEMATRIX=10`    | 缩放级别     |
| `TILEROW=512`      | 瓦片行号     |
| `TILECOL=1024`     | 瓦片列号     |
| `FORMAT=image/png` | 瓦片格式     |

#### **示例请求**

```plaintext
http://example.com/wmts?SERVICE=WMTS&REQUEST=GetTile&LAYER=basemap&TILEMATRIX=10&TILEROW=512&TILECOL=1024&FORMAT=image/png
```

### **WMS vs. WMTS 对比**

| **对比项**     | **WMS**                | **WMTS**             |
| -------------- | ---------------------- | -------------------- |
| **数据组织**   | 动态生成               | 预切瓦片             |
| **性能**       | 较慢（实时渲染）       | 快（缓存优化）       |
| **适用场景**   | 小范围、动态数据       | 大范围、静态地图     |
| **交互性**     | 支持点击查询           | 仅支持瓦片加载       |
| **缩放平滑度** | 可能模糊（需重新请求） | 无缝切换（多级缓存） |

---

### **其他常见地图服务类型**

除了 WMS 和 WMTS，OGC 还定义了多种地理信息服务标准：

#### **（1）WFS（Web Feature Service）**

- **提供矢量数据**（如 GeoJSON、GML），支持增删改查（CRUD）。
- 适用场景：GIS 分析、数据编辑。
- 示例请求：
  ```plaintext
  http://example.com/wfs?
    SERVICE=WFS&
    REQUEST=GetFeature&
    TYPENAME=roads&
    OUTPUTFORMAT=GeoJSON
  ```

#### **（2）WCS（Web Coverage Service）**

- **提供栅格数据**（如 DEM、遥感影像），支持波段查询。
- 适用场景：科学计算、高程分析。
- 示例请求：
  ```plaintext
  http://example.com/wcs?
    SERVICE=WCS&
    REQUEST=GetCoverage&
    COVERAGE=dem&
    FORMAT=GeoTIFF
  ```

#### **（3）TMS（Tile Map Service）**

- **类似 WMTS，但非 OGC 标准**，常见于开源地图（如 OpenStreetMap）。
- 瓦片坐标规则不同（Y 轴可能反向）。
- 示例请求：
  ```plaintext
  http://example.com/tms/1.0.0/basemap/10/512/1024.png
  ```

#### **（4）XYZ 瓦片服务**

- **行业约定**（如 Google Maps、Mapbox），URL 格式为 `/{z}/{x}/{y}.png`。
- 示例请求：
  ```plaintext
  http://example.com/maps/10/1024/512.png
  ```

---

### **如何选择地图服务？**

| **需求**                       | **推荐服务** |
| ------------------------------ | ------------ |
| 显示动态数据（如实时天气）     | WMS          |
| 高性能全球地图（如在线导航）   | WMTS / XYZ   |
| 需要交互查询（如点击获取属性） | WMS / WFS    |
| 下载矢量数据（如道路网络）     | WFS          |
| 获取栅格数据（如高程模型）     | WCS          |

---

### **总结**

- **WMS**：适合动态、交互式地图。
- **WMTS**：适合高性能、静态瓦片地图。
- **WFS/WCS**：用于数据获取与分析。
- **TMS/XYZ**：开源地图常用，非 OGC 标准但广泛支持。

如果需要具体实现（如 Leaflet/OpenLayers 调用这些服务），可以进一步探讨！

## 点云数据

点云数据是指在一个三维坐标系统中的一组向量的集合，通常由三维扫描仪等设备获取，用于表示物体或场景的三维形状和表面特性。

### 定义和组成

点云数据由多个三维坐标点组成的集合，每个点不仅包含位置信息，还可能携带颜色（RGB）、反射强度、分类值、时间戳等附加属性。这些点通过离散采样物体或场景表面获得，可以视为目标表面特性的海量点集合。

### 生成方式

- 三维激光扫描：利用激光束测量物体表面点的位置，获取三维坐标和反射强度等信息。
- 结构光技术：通过投射结构光并测量其与物体表面的交点位置生成点云
- 摄影测量与无人机航拍：通过多角度拍摄并结合算法生成点云数据。

### 主要特点

- 高度灵活性：能够表示规则或不规则的三维形状。
- 数据密度可变：从稀疏的孤点到包含数百万点的高密度点云均可实现。
- 信息丰富：除了三维坐标，还可能包含颜色、强度、时间等属性。

## 缓冲区

缓冲区分析是地理信息系统中常用的空间分析工具之一，用于解决邻近度问题。它以点、线、面实体为基础。自动建立其周围一定宽度范围内的缓冲区多边形图层，然后通过与目标图层的叠加分析得到所需结果。
![缓冲区](/images/gis/缓冲区.jpg)

### 缓冲区产生的情况

1. 基于点要素的缓冲区，通常是以点为圆心，以一定的距离作为半径的圆。例如，以学校为点要素，建立半径为 500m 的缓冲区，可以用来分析学校周边 500m 范围内的相关情况，如商业设施分布等。
2. 基于线要素的缓冲区，通常是以线为中心轴线，距中心轴线一定距离的平行条带多边形。比如，以河流为线要素，创建一定宽度的缓冲区，能帮助确定河流附近受影响的区域，如洪水可能淹没的范围。
3. 基于面要素多边形边界的缓冲区，向外或向内扩展一定距离以生成新的多边形。例如，对于一个城市的建成区面要素，向外扩展一定距离建立缓冲区，用于研究城市的发展空间或规划城市周边的基础设施。

缓冲区分析在交通、林业、资源管理、城市规划等领域有着广泛的应用。比如在交通规划中，可为道路建立缓冲区来确定道路两侧的建筑控制区域；在林业资源管理中，能围绕森林保护区建立缓冲区，防止人类活动过度干扰；在城市规划中，可通过对公共设施建立缓冲区来评估其服务覆盖范围。

### 解决思路

缓冲区分析的解决思路主要包括以下步骤：

1. 确定分析对象 ：明确要进行缓冲区分析的地理实体，是点、线还是面要素。
2. 设定缓冲距离 ：根据具体需求和实际情况，确定缓冲区的宽度或半径。这可能基于专业知识、法规要求、研究目的等因素来确定。例如，在规划自然保护区时，根据保护物种的活动范围和生态需求来设定缓冲区距离。
3. 选择缓冲类型 ：根据实际需要选择合适的缓冲类型，如圆头（圆形）、平头（方形或矩形）、单边或双边缓冲区等。不同的缓冲类型适用于不同的场景。例如，对于道路的缓冲区分析，可能选择双边平头缓冲区来表示道路两侧的 4 影响范围；而对于点状的重要设施，如核电站，可能选择圆形的圆头缓冲区。
4. 进行缓冲区创建 ：使用 GIS 软件或相关工具的缓冲区分析功能，基于确定的分析对象和缓冲距离、类型，创建缓冲区多边形图层。
5. 叠加分析（可选） ：如果需要进一步分析缓冲区与其他图层的关系，可以将缓冲区图层与目标图层进行叠加分析。例如，将道路缓冲区图层与土地利用图层叠加，以确定哪些土地利用类型在道路缓冲区范围内。
6. 结果解释与应用 ：对缓冲区分析的结果进行解释和评估，根据结果做出决策或为后续研究提供依据。比如，根据城市公共设施缓冲区分析的结果，合理规划新的公共设施布局，以提高服务覆盖率和居民生活便利性

## 边界框（bounding box）

边界框是一个矩形区域，用于表示地理空间数据的范围。它由四个坐标点定义：西南角的经纬度（xmin, ymin）和东北角的经纬度（xmax, ymax）。边界框可以用于地图的缩放和定位，确保地图显示的内容始终包含用户感兴趣的区域。通过设置边界框，可以实现地图的自动缩放和定位，提高用户体验 ‌。

### 边界框的应用场景

‌1. 地图缩放和定位 ‌：通过设置边界框，可以实现地图的自动缩放和定位，确保用户始终可以看到感兴趣的区域。例如，在 WebGIS 应用中，用户可以通过设置边界框来定位到特定的地理区域。
‌2. 数据查询和分析 ‌：在地理信息系统（GIS）中，边界框可以用于筛选和查询特定区域内的数据。通过设定边界框，可以快速找到位于该区域内的所有地理对象，并进行进一步的分析和处理。
‌3. 地图可视化 ‌：在地图可视化中，边界框用于确定地图的显示范围。通过设定合理的边界框，可以确保地图的显示效果更加合理和美观。

## 向量（Vector）

向量是数学和计算机图形学中的基础概念，在 Cesium 等 3D 地理可视化系统中扮演着核心角色。以下是向量的系统知识：

## 一、向量的基本概念

### 1. 向量的定义

- **数学表示**：具有大小（模）和方向的量
- **图形表示**：带箭头的线段，长度代表大小，箭头指示方向
- **与标量区别**：标量只有大小没有方向（如温度、质量）

### 2. 向量的维度

- **2D 向量**：(x, y) - Cesium.Cartesian2
- **3D 向量**：(x, y, z) - Cesium.Cartesian3
- **4D 向量**：(x, y, z, w) - 常用于齐次坐标

## 二、向量的基本运算

### 1. 向量加减法

```javascript
// Cesium实现示例
const v1 = new Cesium.Cartesian3(1, 2, 3);
const v2 = new Cesium.Cartesian3(4, 5, 6);

// 加法
const sum = Cesium.Cartesian3.add(v1, v2, new Cesium.Cartesian3());

// 减法
const diff = Cesium.Cartesian3.subtract(v2, v1, new Cesium.Cartesian3());
```

### 2. 向量数乘（缩放）

```javascript
const scalar = 2.5;
const scaled = Cesium.Cartesian3.multiplyByScalar(
  v1,
  scalar,
  new Cesium.Cartesian3()
);
```

### 3. 点积（内积）

- 结果：标量
- 几何意义：投影长度 × 原向量长度
- 应用：计算夹角、判断正交性

```javascript
const dot = Cesium.Cartesian3.dot(v1, v2);
const angle = Math.acos(
  dot / (Cesium.Cartesian3.magnitude(v1) * Cesium.Cartesian3.magnitude(v2))
);
```

### 4. 叉积（外积）

- 结果：新向量（垂直于原向量平面）
- 几何意义：平行四边形面积
- 应用：计算法向量、扭矩

```javascript
const cross = Cesium.Cartesian3.cross(v1, v2, new Cesium.Cartesian3());
```

## 三、向量的重要特性

### 1. 模（长度）计算

```javascript
const length = Cesium.Cartesian3.magnitude(v1);
// 或更高效的平方长度
const lengthSquared = Cesium.Cartesian3.magnitudeSquared(v1);
```

### 2. 单位向量（归一化）

```javascript
const normalized = Cesium.Cartesian3.normalize(v1, new Cesium.Cartesian3());
```

### 3. 距离计算

```javascript
const distance = Cesium.Cartesian3.distance(v1, v2);
```

## 四、在 3D 图形中的应用

### 1. 位置表示

- 点位置：绝对坐标 (x, y, z)
- 相对位移：向量差值

### 2. 方向表示

- 相机朝向
- 光照方向
- 表面法线

### 3. 变换操作

- **平移**：向量加法
- **旋转**：矩阵/四元数乘法
- **缩放**：分量乘法

## 五、Cesium 中的特殊向量方法

### 1. 插值运算

```javascript
const lerped = Cesium.Cartesian3.lerp(start, end, t, new Cesium.Cartesian3());
```

### 2. 坐标系转换

```javascript
// WGS84转笛卡尔
const cartesian = Cesium.Cartesian3.fromDegrees(lon, lat, height);

// 笛卡尔转WGS84
const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
```

### 3. 向量投影

```javascript
const projected = Cesium.Cartesian3.projectVector(
  a,
  b,
  new Cesium.Cartesian3()
);
```

### 法线

在几何学和 3D 图形学中，平面法线是一个非常重要的概念，它定义了平面的方向和朝向。`平面法线是一个垂直于平面表面的单位向量(长度为1的向量)，它指明了平面的正面方向`。

## 六、几何应用案例

### 1. 计算三角形法线

```javascript
function computeNormal(p0, p1, p2) {
  const v1 = Cesium.Cartesian3.subtract(p1, p0, new Cesium.Cartesian3());
  const v2 = Cesium.Cartesian3.subtract(p2, p0, new Cesium.Cartesian3());
  return Cesium.Cartesian3.cross(v1, v2, new Cesium.Cartesian3());
}
```

### 2. 判断点是否在平面内

```javascript
function isPointOnPlane(point, planePoint, planeNormal) {
  const v = Cesium.Cartesian3.subtract(
    point,
    planePoint,
    new Cesium.Cartesian3()
  );
  return Math.abs(Cesium.Cartesian3.dot(v, planeNormal)) < 1e-10;
}
```

### 3. 创建圆形路径

```javascript
function createCirclePoints(center, radius, pointsCount) {
  const positions = [];
  for (let i = 0; i < pointsCount; i++) {
    const angle = (i / pointsCount) * Math.PI * 2;
    const x = center.x + radius * Math.cos(angle);
    const z = center.z + radius * Math.sin(angle);
    positions.push(new Cesium.Cartesian3(x, center.y, z));
  }
  return positions;
}
```

掌握这些向量知识可以帮助您更高效地开发 Cesium 应用，处理各种 3D 空间计算和图形渲染问题。

正射影像、三维模型、光谱影像、三维云点？？？？
