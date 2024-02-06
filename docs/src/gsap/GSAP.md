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








