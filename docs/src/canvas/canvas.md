# canvas

canvas 元素可被用来通过 JS（Canvas API 和 WebGL API）绘制图形以及图形动画。对于 canvas 标签来说最常用的两个属性是 width 和 height 用来设置 canvas 标签元素的宽度和高度。

```html
<canvas width="300" height="150"></canvas>
```

但是我们在日常使用中，最常用的是使用 Canvas API 来满足我们的各种需求，所以下面将对 Canvas API 的使用做一些整理。

**Canvas API 提供了通过 JS 和 HTML 的 canvas 元素来绘制图形的方式。他可以用于动画、游戏动画、数据可视化、图片编辑以及实时视频处理等方面。Canvas API 主要聚焦于 2D 图形，同样使用 canvas 元素的 WebGL API 则用于绘制硬件加速的 2D 和 3D 图形。**

## 基本使用

对于 canvas API 的基本使用有统一的流程：我们需要获取 canvas 标签的 dom 元素，然后再获取这个元素的上下文。这个上下文为我们提供了操作图像和动画的方法。

```js
const canvas = document.getElementById("canvas");

if (canvas.getContext) {
  const ctx = canvas.getContext("2d");
  // TODO
}
```

Canvas 的默认大小为 300 像素 ×150 像素（宽 × 高，像素的单位是 px）。可以使用 HTML 的高度和宽度属性来自定义 Canvas 的尺寸。

:::info canvas 标签上的 width 和 height 与 css 中设置的 width 和 height 有什么区别？
当 canvas 没有设置宽度和高度的时候，canvas 会初始化宽度为 300 像素和高度为 150 像素。该元素可以使用 CSS 来定义大小，但在绘制时图像会伸缩以适应它的框架尺寸：如果 CSS 的尺寸与初始画布的比例不一致，它会出现扭曲。
:::

:::info canvas 元素中的子元素是否会在 canvas 绘制之后被替换
`<canvas>`是一个位图容器，通过 js 绘制的内容会直接渲染到画布的像素上，但是不会影响`<canvas>`标签的 DOM 子元素。默认情况下，canvas 的绘制内容会覆盖在标签的视觉区域上，因此子元素可能会被遮挡，如果希望子元素显示在 canvas 的上方可以通过 CSS 设置定位属性。

如果子元素需要与 Canvas 内容交互，需要额外处理事件委托或者使用 pointer-events: none 穿透到 Canvas。
:::

`<canvas>`元素创造了一个固定大小的画布，它公开了一个或多个渲染上下文，其可以用来绘制和处理要展示的内容。canvas 起初是空白的。为了展示，首先脚本需要找到渲染上下文，然后在他的上面绘制。

## 绘制图形

`canvas 元素默认会被网格所覆盖。通常来说网格中的一个单元相当于 canvas 元素中的一个像素。栅格的起点为左上角（坐标为 (0，0)）。所有元素的位置都相对于原点定位。`

**绘制矩形**

`canvas 只支持两种形式的图形绘制：矩形和路径。其他所有类型的图形都是通过一条或者多条路径组合而成的。`

canvas 提供了三种方法绘制矩形：

```js
// 绘制一个填充矩形
fillRect(x, y, width, height);

// 绘制一个矩形边框
strokeRect(x, y, width, height);

// 清除指定矩形区域，让清除部分完全透明
clearRect(x, y, width, height);

// 将一个矩形路径添加到当前路径上
// 当该方法执行的时候，moveTo() 方法自动设置坐标参数（0,0）
rect(x, y, width, height);
```

x 与 y 指定了在 canvas 画布上所绘制的矩形的左上角（相对于原点）的坐标。width 和 height 设置矩形的尺寸。

```js
const draw = () => {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  }
};
```

**绘制路径**

图形的基本元素是路径。路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。一个路径，甚至是一个子路径都是闭合的。
绘制路径有固定的一些步骤：

```js
// 1. 创建路径起始点。
ctx.beginPath();
// 2. 使用画图命令去画出路径。
// XXX
// 3. 路径封闭
ctx.closePath();
// 4. 路径封闭之后，通过描边或者填充路径区域来渲染图形
stroke();

fill();
```

生成路径的第一步叫做 beginPath()。本质上，路径是由很多子路径构成，这些子路径都是在一个列表中，所有的子路径(线、弧形等)构成图形。而每次这个方法调用之后，列表清空重置，然后我们就可以重新绘制新的图形。

闭合路径 closePath()不是必需的。这个方法会通过绘制一条从当前点到开始点的直线来闭合图形。如果图形是已经闭合了的，即当前点为开始点，该函数什么也不做。当调用 fill() 函数时，所有没有闭合的形状都会自动闭合，所以不需要调用 closePath() 函数。但是调用 stroke() 时不会自动闭合。

下面绘制一个填充三角形

```js
const draw = () => {
  const canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
    ctx.lineTo(100, 25);
    ctx.fillStyle = "yellow";
    ctx.fill();
  }
};
```

![三角形](/images/canvas/sanjiaoxing.png)

**移动笔触**

`moveTo(x, y)`将笔触移动到指定的坐标 (x,y)上。通常使用 moveTo()函数设置起点。也能够使用 moveTo()绘制一些不连续的路径。

**绘制直线**

`lineTo(x, y)`绘制一条从当前位置到指定(x,y)位置的直线。(x,y)代表坐标系中直线结束的点。开始点和之前的绘制路径有关，之前路径的结束点就是接下来的开始点，以此类推。开始点也可以通过 moveTo()函数改变。

**绘制圆弧**

`arc(x, y, radius, startAngle, endAngle, anticlockwise)` 画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成。
:::info
arc() 函数中表示角的单位是弧度，不是角度。角度与弧度的 js 表达式：`弧度 = (Math.PI/180) \* 角度`。
:::

**二次贝塞尔曲线及三次贝塞尔曲线**

`quadraticCurveTo(cp1x, cp1y, x, y)`绘制二次贝塞尔曲线，cp1x,cp1y 为一个控制点，x,y 为结束点。

`bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`绘制三次贝塞尔曲线，cp1x,cp1y 为控制点一，cp2x,cp2y 为控制点二，x,y 为结束点。
![贝赛尔曲线](/images/canvas/canvas_curves.png)

**Path2D 对象**

为了简化代码和提高性能，Path2D 对象用来缓存或记录绘画命令，这样就能快速地回顾路径。

Path2D 会返回一个新初始化的 Path2D 对象。

```js
new Path2D(); // 空的 Path 对象
new Path2D(path); // 克隆 Path 对象
new Path2D(d); // 从 SVG 建立 Path 对象
```

## 应用样式和色彩

**色彩**

- `fillStyle = color` : 设置图形的填充颜色。

- `strokeStyle = color` : 设置图形轮廓的颜色。

color 可以是表示 CSS 颜色值的字符串，渐变对象或者图案对象。默认情况下，线条和填充颜色都是黑色（CSS 颜色值 #000000）。

```js
// 合法的颜色值
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";
```

:::info
一旦设置了 strokeStyle 或者 fillStyle 的值，那么这个新值就会成为新绘制的图形的默认值。如果要给每个图形上不同的颜色，需要重新设置 fillStyle 或 strokeStyle 的值。
:::

下面是 MDN 上使用 fillStyle 和 strokeStyle 的示例

```js
// fillStyle
const draw = () => {
  const ctx = document.getElementById("canvas").getContext("2d");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)} ${Math.floor(
        255 - 42.5 * j
      )} 0)`;
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
};
// strokeStyle
const draw = () => {
  const ctx = document.getElementById("canvas").getContext("2d");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.strokeStyle = `rgb(0 ${Math.floor(255 - 42.5 * i)} ${Math.floor(
        255 - 42.5 * j
      )})`;
      ctx.beginPath();
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, 2 * Math.PI, true);
      ctx.stroke();
    }
  }
};
```

![调色板](/images/canvas/tiaoseban.png)
![调色板](/images/canvas/yuanquan.png)

**线型**

- `lineWidth = value` 设置线条宽度。
- `lineCap = type` 设置线条末端样式。可选值包括：
  - `butt` 线条末端呈正方形，默认值。
  - `round` 线条末端呈圆形。
  - `square` 线条末端呈方形，通过添加一个宽度与线条粗细相同且高度粗细的一半的盒子来形成。
- `lineJoin = type` 设定线条与线条间结合处的样式。
- `miterLimit = value` 限制当两条线相交时交界处最大长度；所谓交接处长度是指线条交接处内角顶点到外角顶点的长度。
- `getLineDash()` 返回一个包含当前虚线样式，长度为非负偶数的数组。
- `setLineDash(segments)`设置当前虚线样式。
- `lineDashOffset = value`设置虚线样式的起始偏移量。

**渐变**

我们可以使用下面的方法新建一个 canvasGradient 对象，并且赋值给 fillStyle 或 strokeStyle 属性。

```js
// 线性渐变 createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。
createLinearGradient(x1, y1, x2, y2);

//径向渐变 createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，
// 后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。
createRadialGradient(x1, y1, r1, x2, y2, r2);
```

创建出 canvasGradient 对象后，我们就可以使用 `addColorStop` 方法给它上色了。

```js
gradient.addColorStop(position, color);
```

addColorStop 方法接受 2 个参数，position 参数必须是一个 0.0-1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。color 参数必须是一个有效的 CSS 颜色值。
![渐变](/images/canvas/gradient.png)

**图案样式**

`createPattern(image, type)`可以用来实现图案纹理的效果。该方法接受两个参数，一个是 image 对象的引用或者是一个 canvas 对象。type 必须是下面的字符串之一：repeat，repeat-x，repeat-y 和 no-repeat。

```js
const draw = () => {
  const ctx = document.getElementById("canvas").getContext("2d");

  // 创建新 image 对象，用作图案
  const img = new Image();
  img.src = "canvas_create_pattern.png";
  img.onload = () => {
    // 创建图案
    const pattern = ctx.createPattern(img, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, 150, 150);
  };
};
```

**阴影**

- `shadowOffsetX = float`
- `shadowOffsetY = float` shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 y 轴的延伸距离，他们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，他们的默认值都是 0
- `shadowBlur = float` shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0
- `shadowColor = color` shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

```js
function draw() {
  const ctx = document.getElementById("canvas").getContext("2d");

  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgb(0 0 0 / 50%)";

  ctx.font = "20px Times New Roman";
  ctx.fillStyle = "Black";
  ctx.fillText("Sample String", 5, 30);
}
```

## 绘制文本

canvas 提供了两种方法来渲染文本。

```js
// 在指定的x,y的位置填充指定的文本，绘制的最大宽度是可选的。
fillText(text, x, y [, maxWidth])
// 在指定的x,y位置绘制文本边框，绘制的最大宽度是可选的
strokeText(text, x, y [, maxWidth])
```

**设置文本的样式**

- `font = value` 默认的字体是 10px sans-serif。
- `textBaseline = value` 文本对齐选项。可选的值包括：start, end, left, right or center. 默认值是 start。
- `direction = value` 基线对齐选项。可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。

**测量文本的宽度**

`measureText()` 将返回一个 TextMetrics 对象的宽度、所在像素，这些体现文本特性的属性。

## 使用图像

canvas 的一项特性是图像操作能力。可以用于动态的图像合成或者作为图形的背景，以及游戏界面(Sprites)等等.浏览器支持的任意格式的外部图片都可以使用，比如 PNG、GIF 或者 JPEG。我们甚至可以将统一页面中其他 canvas 元素生成的图片作为图片源。

引入图像到 canvas 里需要以下两步基本操作：

1. 获得一个指向 HTMLImageElement 的对象或者另一个 canvas 元素的引用作为源，也可以通过提供一个 URL 的方式来使用图片。
2. 使用 drawImage()函数将图片绘制到画布上。

**获得需要绘制的图片**
canvas 的 API 可以使用下面这些类型中的一种作为图片的源：

- HTMLImageElement：这些图片是由 Image()函数构造出来的，或者任何的 img 元素。
- HTMLVideoElement：用一个 HTMl 的 video 元素作为图片源，可以从视频中抓取当前帧作为一个图像。
- HTMLCanvasElement：可以使用另一个 canvas 元素作为图片源。

**绘制图片**

一旦获得了源图对象之后，我们就可以使用 drawImage 方法将它渲染到 canvas 里。

```js
// image是image或者canvas对象，x和y是其在目标canvas里的起始坐标。
drawImage(image, x, y);
//image是image或者canvas对象，x和y是其在目标canvas里的起始坐标。 width 和 height，这两个参数用来控制 当向 canvas 画入时应该缩放的大小
drawImage(image, x, y, width, height);
// 第一个参数和其他的是相同的，都是一个图像或者另一个 canvas 的引用。其他 8 个参数最好是参照右边的图解，前 4 个是定义图像源的切片位置和大小，后 4 个则是定义切片的目标显示位置和大小。
drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

例子：

```js
const draw = () => {
  var ctx = document.getElementById("canvas").getContext("2d");
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
  img.src = "backdrop.png";
};
```

TODO 图片的缩放、切片

## 变形和组合

变形是一种更强大的方法，可以将原点移动到另一点、对网络进行旋转和缩放。

**状态的保存和恢复**

```js
//保存画布 (canvas) 的所有状态
save();
// save和restore方法是用来保存和恢复canvas状态的，都没有参数。canvas的状态就是当前画面应用的所有样式和变形的一个快照。
restore();
```

Canvas 状态存储在栈中，每当 save()方法被调用后，当前的状态就被推送到栈中保存。一个绘画状态包括：

- 当前应用的变形
- 以及下面的这些属性：strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit, lineDashOffset, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation, font, textAlign, textBaseline, direction, imageSmoothingEnabled。
- 当前的裁切路径。

可以调用任意多次 save 方法。每一次调用 restore 方法，上一个保存的状态就从栈中弹出，所有设定都恢复。

**移动**
translate 方法用来移动 canvas 和它的原点到一个不同的位置。

```js
// translate方法接受两个参数。*x *是左右偏移量，y 是上下偏移量
translate(x, y);
```

在做变形之前先保存状态是一个良好的习惯。大多数情况下，调用 restore 方法比手动恢复原先的状态要简单的多。

```js
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      ctx.save();
      ctx.fillStyle = "rgb(" + 51 * i + ", " + (255 - 51 * i) + ", 255)";
      ctx.translate(10 + j * 50, 10 + i * 50);
      ctx.fillRect(0, 0, 25, 25);
      ctx.restore();
    }
  }
}
```

**旋转**
`rotate(angle)` 用于以原点为中心旋转 canvas。这个方法只接收一个参数：旋转的角度，他是顺时针方向，以弧度为单位的值。旋转的中心点始终是 canvas 的原点，如果要改变它，我们需要用到 translate 方法。
**缩放**
`scale(x, y)`缩放用来增减图形在 canvas 中的像素数目，对形状，位图进行缩小或者放大。`默认情况下，canvas的1个单位为1个像素`。scale 方法可以缩放画布的水平和垂直的单位。两个参数都是实数，可以为负数，x 为水平缩放因子，y 为垂直缩放因子，如果比 1 小会缩小图形。

画布初始情况下，是以左上角坐标为原点的第一象限。如果参数为负实数，相当于以 x 或 y 轴作为对称轴镜像反转；以 y 轴作为对称轴镜像反转，就可以得到著名的笛卡尔坐标系，左下角为原点。

**变形**
`transform(a, b, c, d, e, f)` 这个方法是将当前的变形矩阵乘上一个基于自身参数的矩阵。

如果任意一个参数是 Infinity，变形矩阵也必须被标记为无限大，否则会抛出异常。

这个函数的参数各自代表如下：

## 动画

使用 canvas 来实现动画最大的限制就是图像一旦绘制出来，它就是一直保持那样了。如果需要移动它，就不得不对所有东西进行重绘。重绘是相当费时的，而且性能很依赖于电脑的速度。

**动画的基本步骤**

可以通过下面的步骤来画出一帧：

- 清空 canvas。除非接下来要画的内容会完全充满 canvas，否则需要清空所有。最简单的做法就是 clearRect 方法。
- 保存 canvas 状态。如果要改变一些会改变 canvas 状态的设置（样式、变形之类的），又要在每画一帧之时都是原始状态的话，需要先保存一下。
- 绘制动画图形。
- 恢复 canvas 状态。如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

**操控动画**

在 canvas 上绘制内容是用 canvas 提供的或者自定义的方法，而通常，我们仅仅在脚本执行结束后才能看见结果，比如说，在 for 循环里面做完成动画师不太可能的。
因此为了实现动画，我们需要一些可以定时执行重绘的方法。首先可以通过 setInterval 和 setTimeout 方法来控制在设定的时间点上执行重绘。

## 像素操作

我们可以通过 ImageData 对象操纵像素数据，直接读取或将数据数组写入改对象中。

**ImageData 对象**

imageData 对象中存储着 canvas 对象的真实的像素数据，它包含以下几个只读属性：

- width：图片宽度，单位是像素
- height：图片高度，单位是像素
- data：`Uint8ClampedArray` 类型的一维数组，包含着 RGBA 格式的整型数据，范围在 0-255

data 属性可以被使用作为查看初始像素数据。每个像素用 4 个 1bytes 值（按照红绿蓝和透明值的顺序）来代表。每个颜色值部分用 0-255 来代表。每个部分被分配到一个在数组内连续的索引，左上角像素的红色部分在数组的索引 0 位置。像素从做到右被处理，然后往下，遍历整个数组。

Uint8ClampedArray 包含 height × width × 4 字节数据，索引值从 0 到 (height× width × 4)-1。

如果要读取图片中位于第 50 行，第 200 列的像素的蓝色部份：

```js
const blueComponent = imageData.data[50 * (imageData.width * 4) + 200 * 4 + 2];
```

lineWidth
lineCap
setLineDash
