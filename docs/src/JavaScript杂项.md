# JavaScript 杂记

## JS 字符串编码和解码

最近在公司做 H5 的项目，需要和 APP 的前端进行对接。业务流程就相当于我要在我的 H5 界面调用 APP 提供的方法来获取 token，然后再用这个 token 去请求后端的数据。本该是一个简单的流程，但是因为调用 app 方法只能在 app 上进行测试，所以这样增加了难度。最后做出来的效果是安卓系统能展示，但是 IOS 展示不了。通过对 token 进行对比，发现了 IOS 的 token 中的"/"没有进行转义。
JS 中对文字进行编码有 3 种方式：escape、encodeURI、encodeURIComponent；对应的解码方式为 unescape、decodeURL、decodeURLComponent。

### escape 函数

    escape函数用于对字符串进行编码，该方法不会对ASCII字母和数字进行编码，也不会对ASCII标点符号进行编码（* @ - _ + . /）。其他所有的字符都会被转移序列替换。

```js
let str = "test中文!@#$%$^、/_/";
let str1 = escape(str); //test%u4E2D%u6587%21@%23%24%25%24%5E%u3001/_/
let str2 = unescape(str1); //test中文!@#$%$^、/_/
```

这个方法现在很少使用了，后面有可能被废弃。

### encodeURI

encodeURI()函数可以把字符串作为 URL 进行编码。对于在 URL 中有特殊含义的 ACSII 标点符号(, / ? : @ & = + $ # )，encodeRUL 是不会对其进行编码的。

```js
let str = "test中文!@#$%$^、/_/";
let str1 = encodeURI(str); //test%E4%B8%AD%E6%96%87!@#$%25$%5E%E3%80%81/_/
let str2 = decodeURI(str1); //test中文!@#$%$^、/_/
```

### encodeURIComponent

encodeURIComponent()函数可以把字符串作为 URL 组件进行编码，该方法不会对 ASCII 字母和数字进行编码，也不会对- \_ . ! ~ \* ' ( )这些 ASCII 标点符号进行编码。其他的字符，比如：;/?:@&=+$,# 都是由一个或者多个十六进制的转义序列进行替换。

```js
let str = "test中文!@#$%$^、/_/";
let str1 = encodeURIComponent(str); //test%E4%B8%AD%E6%96%87!%40%23%24%25%24%5E%E3%80%81%2F_%2F
let str2 = decodeURIComponent(str1); //test中文!@#$%$^、/_/
```

encodeURI()和 encodeURIComponent()的区别是：encodeRUIComponent()用于对 URL 的组成部分进行个别编码，而不用于对整个 URL 进行编码。因此，; / ? : @ & = + $ , # 这些字符在 encodeURI 中不会被编码，但是在 encodeURIComponent 中都会被编码。编码的规则这两个函数都是一样的。

[参考](https://blog.csdn.net/weixin_44058725/article/details/117255585)

```js
::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 0px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 0px;
      }

      ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 50px;
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #878e9b;
      }

      ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        border-radius: 10px;
        background: none;
      }
```

## console 对象身上的方法

- console.assert()。如果第一个参数为 false, 则将消息和堆栈跟踪记录到控制台
- console.clear()。清空控制台, 并输出 console was cleared.
- console.count()。以参数为标记记录调用的次数, 调用时在控制台打印标识以及调用次数
- console.countReset()。重置指定标签的计数器值。
- console.debug()。在控制台打印一条 debug 级别的消息。
- console.dir()。显示一个由特定的 Javascript 对象列表组成的可交互列表。这个列表可以使用三角形隐藏和显示来审查子对象的内容.
- console.dirxml()。打印 XML/HTML 元素表示的指定对象，否则显示 JavaScript 对象视图.
- console.error()。打印一条错误信息
- console.exception()。error()方法的别称
- console.group()。创建一个新的内联 group, 后续所有打印内容将会以子层级的形式展示。调用 groupEnd()来闭合组。
- console.groupCollapsed()。创建一个新的内联 group。使用方法和 group() 相同，不同的是，groupCollapsed() 方法打印出来的内容默认是折叠的。调用 groupEnd()来闭合组。
- console.groupEnd()。闭合当前内联 group。
- console.info()。打印资讯类说明信息.
- console.log()。打印内容的通用方法
- console.profile()
- console.profileEnd()
- console.table()。将列表型的数据打印成表格。
- console.time()。启动一个以入参作为特定名称的计时器，在显示页面中可同时运行的计时器上限为 10,000.
- console.timeEnd()。结束特定的 计时器 并以豪秒打印其从开始到结束所用的时间。
- console.timeLog()。打印特定 计时器 所运行的时间。
- console.timeStamp()。添加一个标记到浏览器的 Timeline 或 Waterfall 工具。
- console.trace()。输出一个 stack trace,输出函数调用关系。
- console.warn()。打印一个警告信息，可以使用 string substitution 和额外的参数。

## BFC

项目优化 1.首屏速度优化-体积体积重点
异步引入把一些不需要在首页中渲染的 js 代码，延后加载
利用构建工具，压缩，tree-shaking
gzip 2.大数据量渲染优化， 3. 体验优化：渲染骨架屏、loading、操作反馈、兜底图片 4. 组件的可拓展性 5. 接口的出错处理、并发处理

难点：大文件上传、断点续传、文件分片
