# SVG
## 通用属性
    fill：定义矩形的填充颜色
    stroke-width：定义边框宽度
    stroke：定义矩形边框的颜色
    fill-opacity：定义填充颜色的不透明度（0-1取值范围）
    stroke-opacity：定义描边颜色的不透明度（0-1取值范围）
    opacity：整个元素的不透明度

## rect
    width：定义矩形的宽度
    height：定义矩形的高度
    fill：定义矩形的填充颜色
    stroke-width：定义矩形的边框宽度
    stroke：定义矩形边框的颜色
    x：定义矩形左边位置
    y：定义矩形顶部位置
    fill-opacity：定义填充颜色的不透明度（0-1取值范围）
    stroke-opacity：定义描边颜色的不透明度（0-1取值范围）
    opacity：整个元素的不透明度
    rx：定义圆角X轴方向的半径长度
    ry：定义圆角y轴方向的半径长度

## circle
    cx：定义圆形中心的X坐标
    cy：定义圆形中心的y坐标
    r：定义圆形的半径
## ellipse椭圆
    cx：定义椭圆中心的X坐标
    cy：定义椭圆中心的y坐标
    rx：定义椭圆的水平半径
    ry：定义椭圆的垂直半径

## 线条 line
    x1：定义x轴上直线的起点坐标
    y1：定义y轴上直线的起点坐标
    x2：定义x轴上直线的末端坐标
    y2：定义y轴上直线的末端坐标

## 多线条 polyline
    points：定义绘制折线所需的点，也就是两个以上的x和y的坐标对
```js
<svg width="500" height="180">
        //绘制梯形
        <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" fill="none" stroke="red" stroke-width="4"></polyline>
</svg>
```
## 多边形 polygon
    points：定义多边形每个角的x和y的坐标，它的值至少要三对坐标
```js
    <svg width="500" height="210">
      //绘制一个五角星
      <polygon points="100,10 40,198 198,78 10,78 160,198" fill="lime" stroke="purple" 
     stroke-width="5"></polygon>
</svg>
```
## 路径 path
    b:绘制路径的命令

        - M命令（moveto）定义绘制图形的起点坐标
       - L命令（lineto）用来绘制一条直线
       - q：绘制二次贝塞尔曲线
```js
//贝塞尔曲线
 <svg width="450" height="400">
        <g fill="none">
            <path d="M 100 350 l 150 -300" stroke="red" stroke-width="3"></path>
            <path d="M 250 50 l 150 300" stroke="red" stroke-width="3"></path>
            <path d="M 175 200 l 150 0" stroke="green" stroke-width="3"></path>
            <path d="M 100 350 q 150 -300 300 0" stroke="blue" stroke-width="3"></path>
        </g>
        <!-- g标签可以把元素包裹起来，在g标签上设置公共属性 -->
        <g fill="black">
            <circle cx="100" cy="350" r="3"></circle>
            <circle cx="250" cy="50" r="3"></circle>
            <circle cx="400" cy="350" r="3"></circle>
        </g>
        <g font-size="20" fill="black" text-anchor="middle">
            <text x="100" y="350" dx="-30">A</text>
            <text x="250" y="50" dx="-10">B</text>
            <text x="400" y="350" dx="30">C</text>
        </g>
   </svg>
```

## 动画属性 transform
    translate（平移）
    scale（缩放）
    rotate(旋转)
    skew（倾斜）

