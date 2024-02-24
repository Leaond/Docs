# TimeLine 时间轴

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

## 在时间轴中定位动画

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

## Nesting 嵌套

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

## 其他的时间线功能

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

## 时间线是如何工作的？

每个动画（补间和时间轴）都放置在父时间轴上。从某种意义上说，它们都有自己的播放头（这就是它的“时间”所指的，或者“totalTime”，除了它包括重复和重复延迟之外，它是相同的），当父母的播放头移动到新位置时，它也会更新孩子的播放头（除非它们被暂停）。

当时间轴在特定时间渲染时，它会循环遍历其子项并说“好吧，您应该渲染，就好像您的播放头位于 \_\_\_\_”，如果该子项是有子项的时间轴，它会对它的子项执行相同的操作，就在下行。因此，播放头通常保持同步。

当您取消暂停动画 （ resume() 或 play() ） 时，它基本上会拿起播放头并移动它，以便其内部播放头与父级播放头在那一刻所在的位置同步，因此播放非常流畅。也就是说，除非时间线 smoothChildTiming false 是在这种情况下，那个孩子不会移动 - 它将 startTime 保持锁定在原来的位置。

所以基本上什么时候 smoothChildTiming ， true 引擎会即时重新排列内容，以确保播放头对齐，使播放感觉无缝流畅。当您 reverse() 或更改 timeScale 时也会发生同样的事情 ，等等 - 动画的 startTime 会自动移动。但有时您可能不希望这种行为 - 这是在父时间线上方便的时候 smoothChildTiming: false 。

再举一个例子：假设你有一个 10 秒的补间，它正好位于根时间轴上，而你已经进入了补间 2 秒。让我们假设它从根的 0 开始，以方便操作，然后当它在 2 秒时，你这样做 tween.seek(5) 。根的播放头不受影响 - 它像往常一样继续播放，但为了让补间跳到 5 秒并适当播放，补间 startTime 被更改为 -3。这样，补间的播放头和根播放头就可以完美对齐。

## Control and Callbacks 控制和回调

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

## Callbacks 回调

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