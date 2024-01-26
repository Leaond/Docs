# GSAP

## 介绍

最初认识到 gsap 动画库是因为去浏览[airpods pro2](https://www.apple.com.cn/airpods-pro/)的时候，发现了一个惊奇的动画，耳机的动画居然可以根据滚动条的位置进行驱动播放。
[GSAP 官网](https://gsap.com/) 对于该动画的介绍说明了这个库的受欢迎程度：

- GreenSock 动画平台 （GSAP） 是一套业界知名的工具，在超过 1100 万个网站上使用，其中包括大量屡获殊荣的网站！你可以使用 GSAP 在任何框架中对 JavaScript 可以触及的几乎任何内容进行动画处理。无论您是想对 UI、SVG、Three.js 还是 React 组件进行动画处理，GSAP 都能满足您的需求。
- 核心库包含创建超快、跨浏览器友好动画所需的一切。这就是我们将在本文中逐步介绍的内容。
- 除了核心之外，还有各种插件。您无需学习它们即可开始，但它们可以帮助解决特定的动画挑战，例如基于滚动的动画、可拖动的交互、变形等。

## GSAP 的安装

::: code-group

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

## Tween 补间
补间就是一种动画，可以把它想象成一个高性能的属性设置器。只要输入目标（要进行动画处理的对象）、持续时间以及希望其进行动画的任何属性，当补间进入执行时机，目标就会自动的根据设置的补间完成相应的动画。

### 补间的 4 种类型

- `gsap.to()`，补间将从元素的当前状态开始，并对补间中定义的值进行动画处理。这是最常见的补间类型。
- `gsap.from()`，他对补间中定义的值进行“自”动画处理，并在元素的当前状态结束。
- `gsap.fromTo()`，同时定义补间的起始值和结束值。
- `gsap.set()`，立即执行补间，也就是没有动画。它的本质是 0 执行时间.to()方法。

### target 目标
GSAP 使用 document.querySelectorAll() ，因此对于 HTML 或 SVG 目标，我们可以使用选择器文本，例如 ".class" 和 "#id" 。或者你可以传入一个变量，甚至一个数组。
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

vars 变量包含了动画的所有相关信息，这些属性可以是定义动画的相关属性和动画的行为属性。
GSAP 几乎可以制作任何动画，没有预先确定的列表。这包括 CSS 属性、自定义对象属性，甚至 CSS 变量和复杂字符串！最常见的动画属性是变换和不透明度。

:::tip
变换是动画最好的朋友。它们可用于移动元素、放大和旋转元素。转换和不透明度的性能也非常高，因为它们不会影响布局，因此浏览器的工作量较少。
如果可能，请对动画使用变换和不透明度，而不是使用“top”、“left”或“margin”等布局属性。你会得到更流畅的动画！
:::

### 常见的变换参数以及对应的 CSS 属性

|             GSAP             |                 CSS                 |
| :--------------------------: | :---------------------------------: |
|            x:100             |     transform:translateX(100px)     |
|            y:100             |     transform:translateY(100px)     |
|         xPercent:50          |      transform:translateX(50%)      |
|         yPercent:50          |      transform:translateY(50%)      |
|           scale:2            |         transform:scale(2)          |
|           scaleX:2           |         transform:scaleX(2)         |
|           scaleY:2           |         transform:scaleY(2)         |
|         rotation:90          |       transform:rotate(90deg)       |
|      rotation:"1.23rad"      | Using Radians - no CSS alternative  |
|           skew:30            |        transform:skew(30deg)        |
|           skewX:30           |       transform:skewX(30deg)        |
|           skewY:30           |       transform:skewY(30deg)        |
| transformOrigin:"center 40%" |     transform-origin:center 40%     |
|          opacity:0           |     adjust the elements opacity     |
|         autoAlpha:0          | shorthand for opacity & visibility  |
|          duration:1          |       animation-duration: 1s        |
|          repeat: -1          | animation-iteration-count: infinite |
|          repeat: 2           |    animation-iteration-count: 2     |
|           delay: 2           |         animation-delay: 2          |
|          yoyo: true          |   animation-direction: alternate    |

:::tip
默认情况下，GSAP 将使用 px 和度数进行转换，但您可以使用其他单位，如 vw、弧度，甚至可以进行自己的 JS 计算或相对值！

```js
x: 200, // use default of px
x: "+=200" // relative values
x: '40vw', // or pass in a string with a different unit for GSAP to parse
x: () => window.innerWidth / 2, // you can even use functional values to do a calculation!

rotation: 360 // use default of degrees
rotation: "1.25rad" // use radians
```

:::

GSAP 机会可以处理任何的 css 属性，但是在书写的时候需要把 css 属性转换成小驼峰写法：`background-color ==> backgroundColor `.
:::warning
尽管 GSAP 几乎可以对每个 CSS 属性进行动画处理，但我们建议尽可能坚持使用转换和不透明度。filter 和 boxShadow 等属性对于浏览器呈现来说会占用大量 CPU 资源。谨慎制作动画，并确保在低端设备上进行测试。
:::

## Easing 补间效果

补间效果是整个变换中最重要的部分，我们只需要设置简单的属性就可以实现个性有活力的动画。

```js
// 下面的两个示例，一个是加了ease动画一个没有加ease
gsap.to(".green", { rotation: 360, duration: 2, ease: "none" });

gsap.to(".purple", { rotation: 360, duration: 2, ease: "bounce.out" });
```

### ease 参数

ease可以让动画更加的流畅和灵动，增加一些动画的过渡效果。ease有3中类型`in`、`out`、`inOut`。

```js
ease: "power1.in";
// start slow and end faster, like a heavy object falling

ease: "power1.out";
// start fast and end slower, like a rolling ball slowly coming to a stop

ease: "power1.inOut";
// start slow and end slow, like a car accelerating and decelerating
```

更多的 ease 设置参考 [官方文档](https://gsap.com/resources/getting-started/Easing)

### Staggers 交错

staggers 的效果简单来说：如果补间有多个目标，则可以轻松地在每个动画开始之间添加一些延迟。

[GSAP 例子](https://codepen.io/GreenSock/pen/LYdzaoz)

```js
gsap.to(".box", {
  y: 100,
  stagger: 0.1, // 0.1 seconds between when each ".box" element starts animating
});
// 值 stagger: 0.1 将导致每个补间的开始时间之间有 0.1 秒。负值将执行相同的操作，但向后执行，以便最后一个元素首先开始。
```

所有的补间都识别一个 stagger 属性，stagger 可以是数字、对象、函数。
高级配置

```js
gsap.to(".box", {
  y: 100,
  stagger: {
    // wrap advanced options in an object
    each: 0.1,
    from: "center",
    grid: "auto",
    ease: "power2.inOut",
    repeat: -1, // Repeats immediately, not waiting for the other staggered animations to finish
  },
});
```

## TimeLine 时间轴

`时间轴是一种强大的排序工具，可以充当补间和其他时间轴的容器`.他可将动画及时放置在任何我们想要的位置，然后使用 gsap 提供的 `pause()、play()、progress()、reverse()、timeScale()`等方法轻松控制整个动画序列。
我们可以根据需要创建任意数量的时间轴,甚至可以嵌套它们，这对于模块化动画代码非常有用！每个动画（补间动画和时间轴）都会放置在父时间轴（默认为 globalTimeline）上。移动时间轴的播放头会通过其子级向下级联，以便播放头保持对齐。时间轴纯粹是关于对事物进行分组和协调时间/播放头 - 它实际上从未在目标上设置属性（补间处理）。
:::info
时间轴是创建易于调整、有弹性的动画序列的关键。当我们将补间添加到时间线时，默认情况下，它们将按照添加顺序一个接一个地播放
:::

### 语法

```js

```

使用可选的参数可以准确定义动画在时间轴中的放置位置。数字表示绝对时间（以秒为单位），带有 "+=" 或 "-=" 前缀的字符串表示相对于时间线 end(结束)的偏移量。例如， "+=2" 将在结束后 2 秒，从而产生 2 秒的间隔。 "-=2" 将产生 2 秒的重叠。

### 时间轴的参数

最常用的参数如下：

1. 从时间轴开始测量的绝对时间，以秒为单位。

```js
// 1.从时间轴开始测量绝对时间的1s开始， 简单理解为1s之后触发
t.to(".green", { x: 600, duration: 2 }, 1);
```

2. gap 间隔

```js
// 2.在时间线结束后1s插入，简单理解为，上个动画结束后1s我开始
t.to(".blue", { y: 200, duration: 2 }, "+=1");
//  1 second after the end of the timeline (usually the previously inserted animation)
tl.to(".class", { x: 100 }, "+=1");
// beyond the end of the timeline by 50% of the inserting animation's total duration
tl.to(".class", { x: 100 }, "+=50%");
```

3. An Overlap 重叠

```js
//  1 second after the end of the timeline (usually the previously inserted animation)
tl.to(".class", { x: 100 }, "+=1");
// beyond the end of the timeline by 50% of the inserting animation's total duration
tl.to(".class", { x: 100 }, "+=50%");
```

```js
// 首先创建一个时间轴，然后我们就可以使用to(), from(), or fromTo()这些方法来添加补间，实现动画效果
let t = gsap.timeline();

// 在上一个动画的开始处插入，简单理解为，上个动画开始，我也开始
t.to(".purple", { x: 600, duration: 2 }, "<");
// 在上一个动画的开始处插入，简单理解为，上个动画结束，我就开始
t.to(".purple", { x: 600, duration: 2 }, ">");

// 在时间线结束后1s插入，简单理解为，上个动画结束前的1s我开始
t.to(".blue", { y: 200, duration: 2 }, "-=1");
//
```

:::tip
如果时间轴动画中用重复的属性，那么我们可以使用 defaults。添加到时间轴中 defaults 对象的任何属性都将由使用 to()、from()和 fromTo()等便捷方法创建的所有子项继承。

```js
let tl = gsap.timeline({ defaults: { duration: 1 } });

//no more repetition of duration: 1!
tl.to(".green", { x: 200 })
  .to(".purple", { x: 200, scale: 0.2 })
  .to(".orange", { x: 200, scale: 2, y: 20 });
```

:::

:::tip
默认的情况下，补间的动画将一个一个排序执行。
上面的写法我们也可以使用链式调用来简化

```js
let tl = gsap.timeline();
tl.to(".box1", { duration: 2, x: 100 })
  .to(".box2", { duration: 1, y: 200 })
  .to(".box3", { duration: 3, rotation: 360 });
//   这个例子有3个补间动画，当box1动画执行完之后box2才会执行，相应的box3最后执行
```

:::

### Control and Callbacks 控制和回调

控制方法可用于补间和时间线，并允许您播放、暂停、反转甚至加速动画！

```js
// store the tween or timeline in a variable
let tween = gsap.to("#logo", { duration: 1, x: 100 });

//播放
tween.play();

//暂停
tween.pause();

//重新播放
tween.restart();

//resume (honors direction - reversed or not)
tween.resume();

//反转
tween.reverse();

//jump to exactly 0.5 seconds into the tween
tween.seek(0.5);

//jump to exacty 1/4th into the tween 's progress:
tween.progress(0.25);

//make the tween go half-speed，
tween.timeScale(0.5);

//make the tween go double-speed
tween.timeScale(2);

//immediately kill the tween and make it eligible for garbage collection
tween.kill();

// You can even chain control methods
// Play the timeline at double speed - in reverse.
tween.timeScale(2).reverse();
```

:::tip
timeScale 在加速或减慢复杂的动画时间线方面非常方便，而无需更改大量持续时间和延迟。
:::

### Callbacks 回调

如果我们需要知道动画何时完成或者需要在动画完成后执行一些回操作，我们可以使用回调来实现。所有的补间和时间轴都提供了下面的几种回调。

- onComplete：动画完成时调用。
- onStart：动画开始时调用
- onUpdate：每次动画更新时调用（动画处于活动状态时的每一帧）。
- onRepeat：每次动画重复时调用。
- onReverseComplete：当动画到达其开始时再次反转时调用。

```js
gsap.to(".class", {
  duration: 1,
  x: 100,
  // arrow functions are handy for concise callbacks
  onComplete: () => console.log("the tween is complete"),
});

// If your function doesn't fit neatly on one line, no worries.
// you can write a regular function and reference it
gsap.timeline({ onComplete: tlComplete }); // <- no () after the reference!

function tlComplete() {
  console.log("the tl is complete");
  // more code
}
```

## Plugins 插件

插件为 gsap 提供了额外的功能。这允许 GSAP 核心保持相对较小的规模，并允许您仅在需要时添加功能。所有的插件都只是 JS 文件——就像核心库一样。您可以使用脚本标签、npm、yarn 甚至 tgz 文件来安装它们。

### ScrollTrigger 滚动条触发器插件

ScrollTrigger 使任何人都可以用最少的代码创建令人瞠目结舌的基于滚动的动画。无限灵活。拖拽、固定、捕捉或只是触发任何与滚动相关的内容，即使它与动画无关。

注册方式：

```js
// npm地址给的安装注册示例
// typical import
import gsap from "gsap";

// get other plugins:
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import Draggable from "gsap/Draggable";

// or all tools are exported from the "all" file (excluding members-only plugins):
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";

// don't forget to register plugins
gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin);
```

配置对象 属性

```js
scrollTrigger: {
    trigger: ".container",//触发器的对象
    pin: true, // pin the trigger element while active
    start: "top top", // when the top of the trigger hits the top of the viewport
    end: "+=500", //string|number|function。 ScrollTrigger的结束位置。 end after scrolling 500px beyond the start
    scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
    snap: {
      snapTo: "labels", // snap to the closest label in the timeline
      duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
      delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
      ease: "power1.inOut", // the ease of the snap animation ("power3" by default)
    },
    animation:'',//这里的animation可以接受补间|时间轴实例，并且由ScrollTrigger来控制实例。每个ScrollTrigger只能控制一个动画。
    markers:'',//是否显示ScrollTrigger的起始位置标记
    once:true,//只触发一次，并在出发完成后自我销毁，停止监听滚动条事件，进入垃圾回收。
    horizontal:true,//boolean,默认情况下是竖直方向上的滚动，设置为true可以改为水平滚动。
    // 下面是一些回调函数
    onEnter:'',//当scrollTrigger进入start的时候触发
    onEnterBack:'',//当scrollTrigger重新进入start的时候触发。即向后进入start的时候触发
    onLeave:'',//当scrollTrigger结束的时候触发
    onLeaveBack:'',//当scrollTrigger重新结束的时候触发
    onRefresh:'',//当scrollTrigger刷新的时候触发
    onUpdate:'',//当scrollTrigger更新的时候触发
    onScrubComplete:'',//当Scrub完成的时候触发
    onSnapComplete :'',//当Snap完成的时候触发
    onToggle:'',//
}
```
