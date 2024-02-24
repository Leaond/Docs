# Plugins 插件

插件为 gsap 提供了额外的功能。这允许 GSAP 核心保持相对较小的规模，并允许您仅在需要时添加功能。所有的插件都只是 JS 文件——就像核心库一样。您可以使用脚本标签、npm、yarn 甚至 tgz 文件来安装它们。

gsap 提供了众多的插件。

## 插件的注册和使用

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

## `ScrollTrigger` 滚动条触发器插件

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

## ScrollTrigger 特征

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

## 配置对象 属性

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