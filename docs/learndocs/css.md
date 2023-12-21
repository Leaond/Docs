```css
.class.nth-of-type(i){

}
```
只有满足下面两个要求才能选中目标元素：
1. 类名是 class
2. 该元素是父元素下面，同一个标签名的第i个元素。
比如：
```html
<ul>
    <li>1</li>
    <li class="test">2</li>
    <li class="test">3</li>
</ul>
```
我们要选中3这个li然后设置样式，需要：
```css
/* 正确的写法 */
.test.nth-of-type(3){
    /* css样式 */
}

/* 错误的写法 */
.test.nth-of-type(2){
    /* css样式 */
}
```




时间轴是补间的容器。它是终极的排序工具，可将动画及时放置在任何我们想要的位置，然后使用gsap提供的 pause()、play()、progress()、reverse()、timeScale()等方法轻松控制整个序列。
我们可以根据需要创建任意数量的时间轴。甚至可以嵌套它们，这对于模块化动画代码非常有用！每个动画（补间动画和时间轴）都会放置在父时间轴（默认为 globalTimeline）上。移动时间轴的播放头会通过其子级向下级联，以便播放头保持对齐。时间轴纯粹是关于对事物进行分组和协调时间/播放头 - 它实际上从未在目标上设置属性（补间处理）。
                        PLAYHEAD
|--------------timeline-----|-----------|
|--tween1--|                |
           |-----tween2-----|-----------|
使用可选的参数可以准确定义动画在时间轴中的放置位置。数字表示绝对时间（以秒为单位），带有 "+=" 或 "-=" 前缀的字符串表示相对于时间线end(结束)的偏移量。例如， "+=2" 将在结束后 2 秒，从而产生 2 秒的间隔。 "-=2" 将产生 2 秒的重叠。

使用
```js
// 首先创建一个时间轴，然后我们就可以使用to(), from(), or fromTo()这些方法来添加补间，实现动画效果
let t = gsap.timeline()
// 从时间轴的1s开始， 简单理解为1s之后触发
t.to('.green',{x:600,duration:2},1)
// 在上一个动画的开始处插入，简单理解为，上个动画开始，我也开始
t.to('.purple',{x:600,duration:2},"<")
// 在上一个动画的开始处插入，简单理解为，上个动画结束，我就开始
t.to('.purple',{x:600,duration:2},">")
// 在时间线结束后1s插入，简单理解为，上个动画结束后1s我开始
t.to('.blue',{y:200,duration:2},"+=1")
// 在时间线结束后1s插入，简单理解为，上个动画结束前的1s我开始
t.to('.blue',{y:200,duration:2},"-=1")
// 
```
默认的情况下，补间的动画将一个一个排序执行。
上面的写法我们也可以使用链式调用来简化
```js
let tl = gsap.timeline()
tl.to(".box1", { duration: 2, x: 100 })
  .to(".box2", { duration: 1, y: 200 })
  .to(".box3", { duration: 3, rotation: 360 });
//   这个例子有3个补间动画，当box1动画执行完之后box2才会执行，相应的box3最后执行
```
Tween 和 Timeline 都扩展了一个 Animation 类，该类公开了无数有用的方法和属性。以下是一些最常用的方法：
```js
pause()
play()
progress()
restart()
resume()
reverse()
seek()
time()
duration()
timeScale()
kill()
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
})
```
