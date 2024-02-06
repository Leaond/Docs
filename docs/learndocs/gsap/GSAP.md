<!-- <script setup>
import tweenDemo from './gsap-demos/tweenDemo.vue'
import SvgTweenDemo from './gsap-demos/svgTweenDemo.vue'
import EaseCompareDemo from './gsap-demos/easeCompareDemo.vue'
import StaggerDemo1 from './gsap-demos/staggerDemo1.vue'
import TimeLineDemo1 from './gsap-demos/timeLineDemo1.vue'
import TimeLineDemo2 from './gsap-demos/timeLineDemo2.vue'
import TimeLineDemo3 from './gsap-demos/timeLineDemo3.vue'
import TimeLineDemo4 from './gsap-demos/timeLineDemo4.vue'
import scrollTriggerDemo1 from './gsap-demos/scrollTriggerDemo1.vue'
import scrollTriggerDemo2 from './gsap-demos/scrollTriggerDemo2.vue'
</script> -->

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

```js
// circle从当前位置向右移动40px，填充色同时变为blue
gsap.to(".circle", { x: 40, fill: "blue" });
```

- `gsap.from()`，他对补间中定义的值进行“自”动画处理，并在元素的当前状态结束。

```js
// circle从当前位置，向左移动40px，填充色同时变为blue
gsap.from(".circle", { x: -40, fill: "blue" });
```

- `gsap.fromTo()`，同时定义补间的起始值和结束值。

```js
// circle从-40px的位置向右移动到40px的位置
gsap.fromTo(".circle", { x: -40, fill: "blue" }, { x: 40, fill: "green" });
```

- `gsap.set()`，立即执行补间，也就是没有动画。它的本质是 0 执行时间.to()方法。

```js
// circle立即向右移动40px，无补间动画
gsap.set(".circle", { x: 40, fill: "blue" });
```

<!-- ![语法](/docs/LearnDocs/gsap/images/tween-diagram.png') -->

一个简单的例子：

```vue
<template>
  <div class="contain">
    <button @click="startGsap">播放</button>
    <div class="box"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
const startGsap = () => {
  gsap.to(".box", {
    x: "+200",
    background: "blue",
    rotation: 360,
  });
};
</script>
<style scoped lang="scss">
body {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  margin: 0;
  overflow: hidden;
}

.contain {
  position: relative;

  button {
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .box {
    display: block;
    width: 75px;
    height: 75px;
    background: #28a92b;
    border-radius: 12px;
  }
}
</style>
```

<!-- <tweenDemo /> -->

### target 动画对象

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

### variables 配置变量

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

### SVG 属性

同样的，SVG 元素也可以使用变换速记进行动画处理。还可以使用 attr 对象对 SVG 属性（如 `width`、`height`、`fill`、 `stroke`、`cx`、`opacity` 甚至 `SVG viewBox` 本身）进行动画处理。

```js
gsap.to(".svgBox", {
  duration: 2,
  x: 100, // use transform shorthand (this is now using SVG units not px, the SVG viewBox is 100 units wide)
  xPercent: -100,
  // or target SVG attributes
  attr: {
    fill: "#8d3dae",
    rx: 50,
  },
});
```

<!-- <SvgTweenDemo /> -->

## Easing 补间效果

补间效果是整个变换中最重要的部分，我们只需要设置简单的属性就可以实现个性有活力的动画。

下面的这个示例就可以充分的展示使用 ease 效果和不使用 ease 之间的效果差异。当 ease 是 none 的时候，补间动画是匀速执行的；而添加了 ease 效果的时候，补间动画就可以增加可玩性了。

```js
// 下面的两个示例，一个是加了ease动画一个没有加ease
gsap.to(".green", { rotation: 360, duration: 2, ease: "none" });

gsap.to(".purple", { rotation: 360, duration: 2, ease: "bounce.out" });
```

<!-- <EaseCompareDemo/> -->

### ease 参数

ease 可以让动画更加的流畅和灵动，增加一些动画的过渡效果。ease 有 3 中类型`in`、`out`、`inOut`。

```js
ease: "power1.in";
// start slow and end faster, like a heavy object falling

ease: "power1.out";
// start fast and end slower, like a rolling ball slowly coming to a stop

ease: "power1.inOut";
// start slow and end slow, like a car accelerating and decelerating
```

gsap 官方提供了众多的 ease 属性值。更多的 ease 设置参考 [官方文档](https://gsap.com/resources/getting-started/Easing)

### Staggers 交错

staggers 的效果简单来说：如果补间有多个目标，则可以轻松地在每个动画开始之间添加一些延迟。

```js
gsap.to(".box", {
  duration: 1,
  opacity: 0,
  y: -100,
  stagger: 0.5, //0.5 seconds between when each ".box" element starts animating
  ease: "back.in",
});
// 值 stagger: 0.5 将导致每个补间的开始时间之间有 0.1 秒间隙。负值将执行相同的操作，但向后执行，以便最后一个元素首先开始。
```

<!-- <StaggerDemo1 /> -->

所有的补间都识别一个 stagger 属性，stagger 可以是数字、对象、函数。

高级配置示例：

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
如果不使用时间轴，我们想要动画依次执行的话，就只能在补间添加 delay 属性来延迟执行动画：

```js
// WITHOUT Timelines (only using tweens with delays):
gsap.to("#id", { x: 100, duration: 1 });
gsap.to("#id", { y: 50, duration: 1, delay: 1 }); //wait 1 second
gsap.to("#id", { opacity: 0, duration: 1, delay: 2 }); //wait 2 seconds
```

如果你想把第一个动画做得更长怎么办？此后，您需要调整每个延迟。如果您想即时 pause() 播放整个序列或它或 restart() reverse() 它或重复两次怎么办？这可能会变得非常混乱，但 GSAP 的时间表使它变得非常简单：

```js
//WITH Timelines (cleaner, more versatile)
var tl = gsap.timeline({repeat: 2, repeatDelay: 1});
tl.to("#id", {x: 100, duration: 1});
tl.to("#id", {y: 50, duration: 1});
tl.to("#id", {opacity: 0, duration: 1});

// then we can control the whole thing easily...
tl.pause();
tl.resume();
tl.seek(1.5);
tl.reverse();
...
```

我们可以根据需要创建任意数量的时间轴,甚至可以嵌套它们，这对于模块化动画代码非常有用！每个动画（补间动画和时间轴）都会放置在父时间轴（默认为 globalTimeline）上。移动时间轴的播放头会通过其子级向下级联，以便播放头保持对齐。时间轴纯粹是关于对事物进行分组和协调时间/播放头 - 它实际上从未在目标上设置属性（补间处理）。
:::info
时间轴是创建易于调整、有弹性的动画序列的关键。当我们将补间添加到时间线时，默认情况下，它们将按照添加顺序一个接一个地播放
:::

使用可选的参数可以准确定义动画在时间轴中的放置位置。数字表示绝对时间（以秒为单位），带有 "+=" 或 "-=" 前缀的字符串表示相对于时间线 end(结束)的偏移量。例如， "+=2" 将在结束后 2 秒，从而产生 2 秒的间隔。 "-=2" 将产生 2 秒的重叠。
例如：

```js
let tl = gsap.timeline();

tl.to(".blue1", {
  rotation: 360,
  duration: 3,
});
tl.to(
  ".purple3",
  {
    rotation: 360,
  },
  "+=2"
);
```

<!-- <TimeLineDemo1 /> -->

### 在时间轴中定位动画

默认情况下，动画会添加到时间轴的末尾，以便它们一个接一个地排序，但是我们可以使用`position`参数来精确控制动画的放置位置。它通常位于`vars`参数之后，它使用具有以下选项的灵活语法：

1. `绝对时间`：从时间线开始测量的绝对时间（以秒为单位），以数字形式表示。

```js
tl.to(".class", { x: 100 }, 3);
```

2. `标签`：以一个标签作为参考，当该标签执行完之后开始执行，如果标签不存在，则将添加到时间线的末尾。

```js
tl.to(".class", { x: 100 }, "someLabel");
```

例如：

```vue
<template>
  <div class="timeline-container">
    <div @click="startGsap" class="box5 blue2">click me</div>
    <div class="box5 purple4"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
let tl = gsap.timeline();
const startGsap = () => {
  tl.to(".blue2", {
    rotation: 360,
    duration: 3,
    repeat: 2,
  });
  tl.to(
    ".purple4",
    {
      rotation: 360,
    },
    ".blue2"
  );
};
</script>
```

<!-- <TimeLineDemo2 /> -->

3. `运算符`：这里可以理解为通过`<`、`>`、`+`、`-`、`=`这几种运算符的组合来控制动画的执行时机。

   - `<`：在上一个动画开始的时候开始。可以理解为将"<"指向上一个动画开头的指针。
   - `>`：在上一个动画结束的时候开始。可以理解为将">"指向上一个动画结尾的指针。
     :::info
     一个复杂的字符串，其中 "+=" 和 "-=" 前缀表示相对值。当一个数字跟在 "<" 或 ">" 后面时，它被解释为相对的，因此 "<2" 与 "<+=2" 相同。
     :::
   - `+=1`：在上一个动画结束后 1s 的时候开始执行动画。间隔 1s
   - `-=1`：在上一个动画结束前 1s 的时候开始执行动画。重叠 1s
   - `myLabel+=2`：在 myLabel 动画结束后 2s 的时候开始执行动画。间隔 2s
   - `<+=3`：在上一个动画开始后的 3s 的时候开始执行动画。
   - `<3`：在上一个动画结束前 3s 的时候开始执行动画。重叠 3s
   - `>-0.5`：在上一个动画结束前 0.5s 的时候开始执行动画。重叠 0.5s

4. `百分比`：基于百分比的复杂字符串。紧跟在 "+=" 或 "-=" 前缀之后时，百分比基于插入的动画的总持续时间。紧跟 "<" 或 ">" 时，它基于上一个动画的总持续时间。注意：总持续时间包括 `repeat` | `yoyo`。
   - `-=25%`：与时间线末尾重叠插入动画总持续时间的 25%。

:::tip
如果时间轴动画中用重复的属性，那么我们可以使用 defaults 属性。添加到时间轴中 defaults 对象的任何属性都将由使用 to()、from()和 fromTo()等便捷方法创建的所有子项继承。

```js
let tl = gsap.timeline({ defaults: { duration: 1 } });

//no more repetition of duration: 1!
tl.to(".green", { x: 200 })
  .to(".purple", { x: 200, scale: 0.2 })
  .to(".orange", { x: 200, scale: 2, y: 20 });
```

<!-- <TimeLineDemo3 /> -->

:::

### Nesting 嵌套

我们可以根据需要，嵌套使用时间线，将不同的时间线分别进行模块化定义，之后再添加到主时间线中，这将使我们的代码更加的容易维护，增加可读性。

例如：

```js
const intro = () => {
  let tl = gsap.timeline();
  tl.to(".green", {
    rotation: 360,
  });
  return tl;
};
const middle = () => {
  let tl = gsap.timeline();
  tl.to(".purple", {
    rotation: 360,
  });
  return tl;
};
const conclusion = () => {
  let tl = gsap.timeline();
  tl.to(".orange", {
    rotation: 360,
  });
  return tl;
};
// stitch them together in a master timeline...
let master = gsap.timeline();
const startGsap = () => {
  master
    .add(intro())
    .add(middle(), "+=2") //with a gap of 2 seconds
    .add(conclusion(), "-=1"); //overlap by 1 second
};
```

<!-- <TimeLineDemo4/> -->

### 其他的时间线功能

- 使用 timeScale()方法加快或减慢整个时间线。我们甚至可以补间以逐渐加快或减慢动画的流畅性！
- 使用 progress()或者 totalProgress()方法获取或设置时间线的进度（totalProgress()仅包含任何重复项）。例如，要跳到中途点，请设置 myTimeline.progress(0.5);
- 补间 、 time() 、 totalTime() progress() 或 快进或 totalProgress() 快退时间线。您甚至可以将滑块附加到其中一个，以使用户能够在时间轴上向前或向后拖动。
- 使用构造函数的对象添加 onComplete 、 onStart 、 onUpdate onRepeat 和/或 onReverseComplete 回调，例如 var tl = gsap.timeline({onComplete: myFunction});
- 使用 killTweensOf(target) 杀死时间线内特定对象的补间，或获取 getTweensOf() 对象的补间，或获取 getChildren() 时间线中的所有补间和时间线。
- 将时间线设置为重复任意次数或无限期重复。您甚至可以在每个重复周期之间设置延迟和/或使重复周期变成溜溜球，似乎每隔一个周期就会反转方向。
- 获取 currentLabel() 或查找时间线中不同位置的标签，使用 nextLabel() 和 previousLabel().

例如：

```js
//create the timeline that repeats 3 times with 1 second between each repeat and then call myFunction() when it completes
var tl = gsap.timeline({ repeat: 3, repeatDelay: 1, onComplete: myFunction });

//add a tween
tl.to(".class", { duration: 1, x: 200, y: 100 });

//add another tween 0.5 seconds after the end of the timeline (makes sequencing easy)
tl.to("#id", { duration: 0.8, opacity: 0 }, "+=0.5");

//reverse anytime
tl.reverse();

//Add a "spin" label 3-seconds into the timeline
tl.addLabel("spin", 3);

//insert a rotation tween at the "spin" label (you could also define the insertion point as the time instead of a label)
tl.to(".class", { duration: 2, rotation: "+=360" }, "spin");

//go to the "spin" label and play the timeline from there
tl.play("spin");

//nest another timeline inside your timeline...
var nested = gsap.timeline();
nested.to(".class2", { duration: 1, x: 200 });
tl.add(nested, "+=3"); //add nested timeline after a 3-second gap
```

### 时间线是如何工作的？

每个动画（补间和时间轴）都放置在父时间轴上。从某种意义上说，它们都有自己的播放头（这就是它的“时间”所指的，或者“totalTime”，除了它包括重复和重复延迟之外，它是相同的），当父母的播放头移动到新位置时，它也会更新孩子的播放头（除非它们被暂停）。

当时间轴在特定时间渲染时，它会循环遍历其子项并说“好吧，您应该渲染，就好像您的播放头位于 \_\_\_\_”，如果该子项是有子项的时间轴，它会对它的子项执行相同的操作，就在下行。因此，播放头通常保持同步。

当您取消暂停动画 （ resume() 或 play() ） 时，它基本上会拿起播放头并移动它，以便其内部播放头与父级播放头在那一刻所在的位置同步，因此播放非常流畅。也就是说，除非时间线 smoothChildTiming false 是在这种情况下，那个孩子不会移动 - 它将 startTime 保持锁定在原来的位置。

所以基本上什么时候 smoothChildTiming ， true 引擎会即时重新排列内容，以确保播放头对齐，使播放感觉无缝流畅。当您 reverse() 或更改 timeScale 时也会发生同样的事情 ，等等 - 动画的 startTime 会自动移动。但有时您可能不希望这种行为 - 这是在父时间线上方便的时候 smoothChildTiming: false 。

再举一个例子：假设你有一个 10 秒的补间，它正好位于根时间轴上，而你已经进入了补间 2 秒。让我们假设它从根的 0 开始，以方便操作，然后当它在 2 秒时，你这样做 tween.seek(5) 。根的播放头不受影响 - 它像往常一样继续播放，但为了让补间跳到 5 秒并适当播放，补间 startTime 被更改为 -3。这样，补间的播放头和根播放头就可以完美对齐。

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

gsap 提供了众多的插件。

### 插件的注册和使用

```js
import gsap from "gsap";
// get other plugins:
import ScrollTrigger from "gsap/all";
import Flip from "gsap/Flip";
import Draggable from "gsap/Draggable";

// or all tools are exported from the "all" file (excluding members-only plugins):
import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";

// don't forget to register plugins
gsap.registerPlugin(ScrollTrigger, Draggable, Flip, MotionPathPlugin);
```

### `ScrollTrigger` 滚动条触发器插件

ScrollTrigger 使任何人都可以用最少的代码创建令人瞠目结舌的`基于滚动的动画`,无限灵活。拖拽、固定、捕捉或只是触发任何与滚动相关的内容，即使它与动画无关。

一个简单的例子：

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);
gsap.to(".box", {
  rotation: 7200,
  x: 200,
  scrollTrigger: {
    scrub: true,
    trigger: ".box",
  },
});
```

<!-- <scrollTriggerDemo1 /> -->

#### ScrollTrigger 特征

:::tip

- ScrollTrigger 可以将任何动画链接到任何特定元素，以便仅当该元素位于视口中时才播放。这样可以提高性能，并确保我们的动画真正被看到！
- ScrollTriggers 可以在 进入|离开 定义区域时对动画执行操作(play, pause, resume, restart, reverse, complete, reset)，或将其直接链接到滚动条，使其像滚动条一样来回执行动画 (scrub: true)。
- 可以使动画和滚动条之间的触发关系更加的柔和，这样可以让动画看起来需要一定的时间才能"追赶上"滚动条的速度，例如设置`scrub:10`。

```js
gsap.to(".box", {
  rotation: 7200,
  x: 200,
  scrollTrigger: {
    scrub: 5,
    trigger: ".box8",
  },
});
```
这里可以对比一下`scrub:10`和上面的`scrub:true`的效果区别
<!-- <scrollTriggerDemo2 /> -->

- ......
  :::

#### 配置对象 属性

```js
scrollTrigger: {
    trigger: ".container",//触发器的目标对象
    endTrigger:"",//
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
    animation:'',//这里的animation可以接受补 间|时间轴 动画实例，并且由ScrollTrigger来控制实例。每个ScrollTrigger只能控制一个动画。如果有需求，可以将动画包装在单个时间轴中(官方推荐),或者根据需要创建多个ScrollTrigger。
    markers:true,//是否显示ScrollTrigger的起始位置标记
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
