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