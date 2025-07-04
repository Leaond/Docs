# Potree

Potree 是一个开源的基于 WebGL 的开源点云渲染库，专门用于在浏览器中高效渲染大规模点云数据。

## 拉取项目

在 github 上拉取项目

```bash
# 克隆 Potree 仓库
git clone https://github.com/potree/potree.git
cd potree

# 安装依赖
npm install

# 开发模式运行
npm run start
```

## Potree 常用方法

### 加载点云与管理

**加载点云**

```js
// Potree.loadPointCloud(url, name, viewer, callback)
// 方式1：使用 Potree.loadPointCloud()
Potree.loadPointCloud("path/to/cloud.js", "pointcloud-name", viewer).then(
  (pointcloud) => {
    viewer.scene.addPointCloud(pointcloud);
  }
);

// 方式2：通过 viewer 直接加载（简化版）
viewer.loadPointCloud("path/to/cloud.js", "pointcloud-name", callback);
```

**移除点云**

```js
// 移除单个点云
viewer.scene.removePointCloud(pointcloud);

// 移除所有点云
viewer.scene.pointclouds.forEach((pc) => viewer.scene.removePointCloud(pc));
```

### 场景与视图控制

**视角导航**

```js
// 飞向点云
viewer.fitToScreen(); // 自适应全部点云
viewer.flyTo(pointcloud.position); // 飞向特定位置

// 手动设置相机
viewer.scene.view.setView(
  [x, y, z], // 相机位置
  [tx, ty, tz] // 目标位置
);
```

**渲染设置**

```js
// 背景与显示
viewer.setBackground("skybox"); // 或 "gradient"/"black"/"white"
viewer.setEDLEnabled(true); // 启用眼依赖光照
viewer.setFOV(60); // 设置视野角度（度）

// 点云样式
pointcloud.material.size = 2.0; // 点大小
pointcloud.material.pointColorType = Potree.PointColorType.RGB; // 使用RGB颜色
```

### 测量工具

```js
// 距离测量
viewer.setMeasureDistances();
viewer.setMeasureArea(); // 面积测量
viewer.setMeasureHeight(); // 高度测量
viewer.setMeasureClip(); // 裁剪工具
viewer.clearMeasurements(); // 清除所有测量
```

### 截图与动画

```js
// 截图
viewer.takeScreenshot().then((dataUrl) => {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "screenshot.png";
  link.click();
});

// 录制动画路径
viewer.startAnimation();
viewer.stopAnimation();
```

### 地图控制

```js
viewer.mapView.showSources(true); // 显示/隐藏数据源（如点云边界）
viewer.toggleMap(); // 显示/隐藏地图面板
viewer.mapView.setBackground("osm"); // 设置地图底图（"osm"/"google"）
```

### 事件监听

```js
// 点云点击事件
viewer.addEventListener("pointcloud_click", (e) => {
  console.log("点击坐标:", e.position);
});

// 相机移动事件
viewer.scene.view.onCameraChanged.addListener(() => {
  console.log("相机位置:", viewer.scene.view.position);
});
```

### 性能优化

```js
// 控制细节级别
pointcloud.pointBudget = 1_000_000; // 设置最大渲染点数
viewer.setMinNodeSize(50); // 最小节点像素大小

// 冻结渲染（静态查看时提升性能）
viewer.setFreeze(true);
```

## Viewer 类常用方法

Potree 中的 Viewer 类是核心类之一，负责管理 3D 点云场景的渲染和交互。以下是 Viewer 类中常用的方法：

### 基本控制方法

- `loadPointCloud(url, name, callback)` - 加载点云数据
- `setFOV(fov)` - 设置视野角度
- `setBackground(color)` - 设置背景颜色
- `toggleSidebar()` - 切换侧边栏显示/隐藏
- `toggleMap()` - 切换地图显示/隐藏

### 场景导航方法

- `flyTo(position, lookAt)` - 飞向指定位置和视角
- `moveTo(position, lookAt)` - 移动到指定位置和视角
- `zoomTo(position, radius)` - 缩放到包含指定位置和半径的区域
- `fitToScreen()` - 调整视图使所有点云适合屏幕

### 点云操作方法

- `scene.addPointCloud(pointcloud)` - 添加点云到场景
- `scene.removePointCloud(pointcloud)` - 从场景移除点云
- `getPointClouds()` - 获取所有加载的点云
- `setEDLEnabled(enabled)` - 启用/禁用 EDL(眼依赖光照)效果
- `setMaterial(activeMaterial)` - 设置点云材质

### 测量工具方法

- `setMeasureDistances()` - 启用距离测量模式
- `setMeasureArea()` - 启用面积测量模式
- `setMeasureHeight()` - 启用高度测量模式
- `setMeasureAngle()` - 启用角度测量模式
- `setMeasureClip()` - 启用裁剪测量模式
- `clearMeasurements()` - 清除所有测量

### 渲染控制方法

- `setMinNodeSize(size)` - 设置最小节点大小
- `setShowBoundingBox(enabled)` - 显示/隐藏包围盒
- `setFreeze(enabled)` - 冻结/解冻渲染
- `setSize(width, height)` - 设置视图大小

### 其他实用方法

- `takeScreenshot()` - 截取当前视图
- `getCamera()` - 获取当前相机状态
- `setCamera(camera)` - 设置相机状态
- `update()` - 手动触发视图更新

这些方法可以通过 Potree.Viewer 实例调用，例如：

```javascript
viewer.loadPointCloud("pointclouds/example/cloud.js", "example", function (e) {
  console.log("点云加载完成");
});
```

关于 potree 的界面操作
https://blog.csdn.net/huhuan123456/article/details/139162481
