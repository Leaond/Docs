# CSS
## :is :has :where的使用
  ### :is
   :is允许在is后面的规则中包含多个选择器
```css

```
### :where
  :where和:is都允许传入选择器或者匹配规则来简化css代码，但是where的优先级是最低的
```css
```
 ### :has
  :has可以根据后代元素来匹配父级元素
```css
```
## nth-of-type和nth-of-child的使用
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
# 媒体查询(media)和容器查询(container)
## 媒体查询 @media
    媒体查询是CSS3中引入的特性，可以根据设备的特性，例如屏幕的宽度、设备的类型、分辨率等进行动态的调整网页的样式和布局。
### 媒体查询的语法
```css
 @media symbol type query{
    /* 重载样式 */
 }
```
 #### symbol 运算符
  - not: 取反运算符
    - 如果满足media query则不生效，否则生效；
    - 如果出现在以逗号分隔的查询列表中，它将仅否定应用了该查询的特定查询；
    - 必须指定媒体类型；
  - only 运算符
    - 仅在整个查询匹配时才用于应用样式
    - 必须指定媒体类型
  - ，逗号运算符
    - 用于将多个媒体查询合并为一个规则
    - 如果列表中的任何查询为true，则整个media语句均返回true
  - and运算符
    - 用于将多个媒体查询规则组合成单条媒体查询，当每个查询规则都为true时，则该条媒体查询为true
    - 还用于将媒体功能与媒体类型结合在一起
  #### type 媒体类型
   - all用于所有设备
   - screen用于电脑屏幕、平板电脑、智能手机等
   - print 用于打印机和打印预览
   - speech 应用于屏幕阅读器等发声设备。

举个栗子
```css
/* 下面3个媒体查询语句是等价的 */
 @media only screen and (query){

 }
 @media all and (query){

 }
 @media (query){

 }
```
## 常见的query
  - 对长款进行限制
  - 对屏幕方向进行限制
  - 对纵横比进行限制
 
## 容器查询 @container
    容器查询可以让我们根据元素容器的大小将样式应用于元素。
```css
/* Default heading styles for the card title */
.card h2 {
  font-size: 1em;
}

/* If the container is larger than 700px */
@container (min-width: 700px) {
  .card h2 {
    font-size: 2em;
  }
}
/* You can then target this containment context using the @container at-rule:  */
@container sidebar (min-width: 700px) {
  .card {
    font-size: 2em;
  }
}
```

  

