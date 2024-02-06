# Easing 补间效果

补间效果是整个变换中最重要的部分，我们只需要设置简单的属性就可以实现个性有活力的动画。

下面的这个示例就可以充分的展示使用 ease 效果和不使用 ease 之间的效果差异。当 ease 是 none 的时候，补间动画是匀速执行的；而添加了 ease 效果的时候，补间动画就可以增加可玩性了。

```js
// 下面的两个示例，一个是加了ease动画一个没有加ease
gsap.to(".green", { rotation: 360, duration: 2, ease: "none" });

gsap.to(".purple", { rotation: 360, duration: 2, ease: "bounce.out" });
```

<!-- <EaseCompareDemo/> -->

## ease 参数

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

## Staggers 交错

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