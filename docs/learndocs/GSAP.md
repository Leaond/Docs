# GSAP

最初认识到 gsap 动画库是因为去浏览[airpods pro2](https://www.apple.com.cn/airpods-pro/)的时候，发现了一个惊奇的动画，耳机的动画居然可以根据滚动条的位置进行驱动播放。
GSAP 官网对于该动画的介绍说明了这个库的受欢迎程度：

- GreenSock 动画平台 （GSAP） 是一套业界知名的工具，在超过 1100 万个网站上使用，其中包括大量屡获殊荣的网站！你可以使用 GSAP 在任何框架中对 JavaScript 可以触及的几乎任何内容进行动画处理。无论您是想对 UI、SVG、Three.js 还是 React 组件进行动画处理，GSAP 都能满足您的需求。
- 核心库包含创建超快、跨浏览器友好动画所需的一切。这就是我们将在本文中逐步介绍的内容。
- 除了核心之外，还有各种插件。您无需学习它们即可开始，但它们可以帮助解决特定的动画挑战，例如基于滚动的动画、可拖动的交互、变形等。
  GSAP 的安装和使用
  :::code-group

```sh[npm]
    npm install gsap
```

```sh[CDN]
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js"></script>
```

```sh[yarn]
    yarn add gsap
```

:::

## Vue 中使用 GSAP

```js
import { gsap } from "gsap";
gsap.to(".box", { x: 200 });
// 这里的语法就是gsap提供的补间动画方法，下面将进行解释
```

## 补间

### 4 个补间方法

- `gsap.to()`，补间将从元素的当前状态开始，并对补间中定义的值进行动画处理。这是最常见的补间类型。
- `gsap.from()`，他对补间中定义的值进行“自”动画处理，并在元素的当前状态结束。
- `gsap.fromTo()`，同时定义补间的起始值和结束值。
- `gsap.set()`，立即执行补间，也就是没有动画。它的本质是 0 执行时间.to()方法。

### target 目标

所有的补间动画我们都需要告诉 gsap 动画的目标是什么，也就是 target 参数。这里的 target 可以传入一个选择器、变量、数组等

```js
// 简单选择器
gsap.to(".box", { x: 200 });

// 复杂的选择器
gsap.to("section > .box", { x: 200 });

// 变量
let box = document.querySelector(".box");
gsap.to(box, { x: 200 });

// 节点数组
let square = document.querySelector(".square");
let circle = document.querySelector(".circle");

gsap.to([square, circle], { x: 200 });
```
### The variables 变量
  vars变量包含了动画的所有相关信息，这些属性可以是定义动画的相关属性和动画的行为属性。
  GSAP几乎可以制作任何动画，没有预先确定的列表。这包括 CSS 属性、自定义对象属性，甚至 CSS 变量和复杂字符串！最常见的动画属性是变换和不透明度。
  ```info
  变换是网络动画师最好的朋友。它们可用于移动元素、放大和旋转元素。转换和不透明度的性能也非常高，因为它们不会影响布局，因此浏览器的工作量较少。
  如果可能，请对动画使用变换和不透明度，而不是使用“顶部”、“左侧”或“边距”等布局属性。你会得到更流畅的动画！
  ```

# TimeLine

时间轴是补间的容器。它是终极的排序工具，可将动画及时放置在任何我们想要的位置，然后使用 gsap 提供的 pause()、play()、progress()、reverse()、timeScale()等方法轻松控制整个序列。
我们可以根据需要创建任意数量的时间轴。甚至可以嵌套它们，这对于模块化动画代码非常有用！每个动画（补间动画和时间轴）都会放置在父时间轴（默认为 globalTimeline）上。移动时间轴的播放头会通过其子级向下级联，以便播放头保持对齐。时间轴纯粹是关于对事物进行分组和协调时间/播放头 - 它实际上从未在目标上设置属性（补间处理）。
PLAYHEAD
|--------------timeline-----|-----------|
|--tween1--| |
|-----tween2-----|-----------|
使用可选的参数可以准确定义动画在时间轴中的放置位置。数字表示绝对时间（以秒为单位），带有 "+=" 或 "-=" 前缀的字符串表示相对于时间线 end(结束)的偏移量。例如， "+=2" 将在结束后 2 秒，从而产生 2 秒的间隔。 "-=2" 将产生 2 秒的重叠。

使用

```js
// 首先创建一个时间轴，然后我们就可以使用to(), from(), or fromTo()这些方法来添加补间，实现动画效果
let t = gsap.timeline();
// 从时间轴的1s开始， 简单理解为1s之后触发
t.to(".green", { x: 600, duration: 2 }, 1);
// 在上一个动画的开始处插入，简单理解为，上个动画开始，我也开始
t.to(".purple", { x: 600, duration: 2 }, "<");
// 在上一个动画的开始处插入，简单理解为，上个动画结束，我就开始
t.to(".purple", { x: 600, duration: 2 }, ">");
// 在时间线结束后1s插入，简单理解为，上个动画结束后1s我开始
t.to(".blue", { y: 200, duration: 2 }, "+=1");
// 在时间线结束后1s插入，简单理解为，上个动画结束前的1s我开始
t.to(".blue", { y: 200, duration: 2 }, "-=1");
//
```

默认的情况下，补间的动画将一个一个排序执行。
上面的写法我们也可以使用链式调用来简化

```js
let tl = gsap.timeline();
tl.to(".box1", { duration: 2, x: 100 })
  .to(".box2", { duration: 1, y: 200 })
  .to(".box3", { duration: 3, rotation: 360 });
//   这个例子有3个补间动画，当box1动画执行完之后box2才会执行，相应的box3最后执行
```

Tween 和 Timeline 都扩展了一个 Animation 类，该类公开了无数有用的方法和属性。以下是一些最常用的方法：

```js
pause();
play();
progress();
restart();
resume();
reverse();
seek();
time();
duration();
timeScale();
kill();
```

## ScrollTrigger

ScrollTrigger 使任何人都可以用最少的代码创建令人瞠目结舌的基于滚动的动画。无限灵活。拖拽、固定、捕捉或只是触发任何与滚动相关的内容，即使它与动画无关。

```js
ScorllTrigger.create({
  // 配置项：可选
  // start:数字，方位名词，滚动触发器的起始位置，以像素为单位
  // end:数字，方位名词，滚动触发器的结束位置，以像素为单位
  // trigger：触发器元素
  // animation：与滚动触发器实例相关联的补间或者时间线
  // scrub：布尔值、数字。
  // toggleClass：字符串|对象，当scrollTragger切换活动|非活动时，向一个元素添加或者删除类
  // markers：true。开启标注功能，更加方便看滚动开始以及截止的地方
  // scroller
  // pin：是否固定元素，为true固定自身元素，为".XXX"就是指定的元素
  // animation:动画
});
```
