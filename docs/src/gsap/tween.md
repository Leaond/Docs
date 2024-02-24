# Tween 补间

补间就是一种动画，可以把它想象成一个高性能的属性设置器。只要输入目标（要进行动画处理的对象）、持续时间以及希望其进行动画的任何属性，当补间进入执行时机，目标就会自动的根据设置的补间完成相应的动画。

## 补间的 4 种类型

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

## target 动画对象

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

## variables 配置变量

vars 变量包含了动画的所有相关信息，这些属性可以是定义动画的相关属性和动画的行为属性。
GSAP 几乎可以制作任何动画，没有预先确定的列表。这包括 CSS 属性、自定义对象属性，甚至 CSS 变量和复杂字符串！最常见的动画属性是变换和不透明度。

:::tip
变换是动画最好的朋友。它们可用于移动元素、放大和旋转元素。转换和不透明度的性能也非常高，因为它们不会影响布局，因此浏览器的工作量较少。
如果可能，请对动画使用变换和不透明度，而不是使用“top”、“left”或“margin”等布局属性。你会得到更流畅的动画！
:::

## 常见的变换参数以及对应的 CSS 属性

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

## SVG 属性

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