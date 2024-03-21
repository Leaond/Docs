<script setup>
    import LazyLoad from './lazyLoad.vue'
</script>

# 浏览器 API

## IntersectionObserver 交叉观察器

IntersectionObserver 可以用来自动监听元素是否进入了设备的可视区域之内，而不需要频繁的计算来做这个判断。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。

使用 Intersection Observer 可以实现一些常见的交互效果，比如懒加载（lazy loading）、无限滚动（infinite scrolling）、可视化统计等。它相比于传统的滚动事件监听方式，有以下优势：

- 减少性能开销：Intersection Observer 使用浏览器内部的优化机制，可以减少不必要的计算和事件触发，从而提高性能。

- 监测多个元素：你可以同时监测多个元素的交叉状态，而不需要为每个元素都绑定事件监听器。

- 异步执行回调：当元素进入或离开交叉状态时，Intersection Observer 会异步执行回调函数，不会阻塞主线程

### 语法

IntersectionObserver() 构造函数接收两个参数，callback 是可见性发现变化时的回调函数；option 是相关的配置参数。同时，new IntersectionObserver() 返回一个观察者实例。

```js
const io = new IntersectionObserver(callback, option);
```

:::tip IntersectionObserverEntry 对象的属性
callback 接收一个参数，即当前观察的元素，他是一个数组，数组中的每一项都是一个 IntersectionObserverEntry 对象。

- `boundingClientRect`：目标元素的矩形区域的信息
- `intersectionRatio`：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0
- `intersectionRect`：目标元素与视口（或根元素）的交叉区域的信息
- `isIntersecting`: 布尔值，目标元素与交集观察者的根节点是否相交（常用）
- `isVisible`: 布尔值，目标元素是否可见（该属性还在试验阶段，不建议在生产环境中使用）
- `rootBounds`：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null
- `target`：被观察的目标元素，是一个 DOM 节点对象（常用）
- `time`：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒

在观察元素的过程中我们可以通过这些属性值做出相应的操作
:::

实例身上的四个方法：

### observe 方法

observe()方法接收一个 target 参数，值是 element 元素，用来指定 被监听 的元素。

```js
// 获取元素
const target = document.getElementById("dom");

// 开始观察
io.observe(target);
```

### unobserve 方法

observe()方法接收一个 target 参数，值是 element 元素，用来指定 停止监听 的元素。

```js
// 获取元素
const target = document.getElementById("dom");

// 停止观察
io.unobserve(target);
```

### disconnect 方法

该方法不需要接收参数，用来关闭观察器

```js
// 关闭观察器
io.disconnect();
```

### takeRecords 方法

该方法不需要接收参数，返回所有被观察的对象，返回值是一个数组

```js
// 获取被观察元素
const observerList = io.takeRecords();
```

:::tip
callback 函数一般会执行两次，当元素进入视口和离开视口都会执行一次。
:::

### options

- `threshold`: 决定了什么时候触发回调函数。它是一个数组，每个成员都是一个门槛值，默认为[0]，即交叉比例（intersectionRatio）达到 0 时触发回调函数。用户可以自定义这个数组。比如，[0, 0.25, 0.5, 0.75, 1]就表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数。

- `root`: 用于观察的根元素，默认是浏览器的视口，也可以指定具体元素，指定元素的时候用于观察的元素必须是指定元素的子元素

- `rootMargin`: 用来扩大或者缩小视窗的的大小，使用 css 的定义方法，10px 10px 30px 20px 表示 top、right、bottom 和 left 的值

### 应用

针对 IntersectionObserver 的属性，我们可以实现图片懒加载、触底加载、元素吸顶、元素吸底等效果。下面就图片懒加载的应用实现一下。

### 图片懒加载

懒加载的思路是先将图片的地址用飞 src 属性存放，当观察到元素即将进入视口的时候，就将这个地址赋值给 src 属性，并且停止观察该元素。

```js
// 收集节点
const ele = document.querySelectorAll("[lazyload]");
// 创建观察器实例
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const src = entry.target.getAttribute("lazyload");
        entry.target.setAttribute("src", src);
      }
      // 解除观察
      io.unobserve(entry);
    });
  },
  {
    rootMargin: `10px 0px 0px 0px`,
  }
);
// 观察每一个元素
ele.forEach((item) => {
  io.observe(item);
});
```

<LazyLoad />
