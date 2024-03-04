# JS字符串编码和解码
  最近在公司做H5的项目，需要和APP的前端进行对接。业务流程就相当于我要在我的H5界面调用APP提供的方法来获取token，然后再用这个token去请求后端的数据。本该是一个简单的流程，但是因为调用app方法只能在app上进行测试，所以这样增加了难度。最后做出来的效果是安卓系统能展示，但是IOS展示不了。通过对token进行对比，发现了IOS的token中的"/"没有进行转义。
  JS中对文字进行编码有3种方式：escape、encodeURI、encodeURIComponent；对应的解码方式为unescape、decodeURL、decodeURLComponent。
  ## escape函数
    escape函数用于对字符串进行编码，该方法不会对ASCII字母和数字进行编码，也不会对ASCII标点符号进行编码（* @ - _ + . /）。其他所有的字符都会被转移序列替换。
```js
let str = 'test中文!@#$%$^、/_/'
        let str1 = escape(str) //test%u4E2D%u6587%21@%23%24%25%24%5E%u3001/_/
        let str2 = unescape(str1) //test中文!@#$%$^、/_/
```
 这个方法现在很少使用了，后面有可能被废弃。
## encodeURI
  encodeURI()函数可以把字符串作为URL进行编码。对于在URL中有特殊含义的ACSII标点符号(, / ? : @ & = + $ # )，encodeRUL是不会对其进行编码的。
```js
let str = 'test中文!@#$%$^、/_/'
        let str1 = encodeURI(str) //test%E4%B8%AD%E6%96%87!@#$%25$%5E%E3%80%81/_/
        let str2 = decodeURI(str1) //test中文!@#$%$^、/_/
```
## encodeURIComponent
  encodeURIComponent()函数可以把字符串作为URL组件进行编码，该方法不会对ASCII字母和数字进行编码，也不会对- _ . ! ~ * ' ( )这些ASCII标点符号进行编码。其他的字符，比如：;/?:@&=+$,# 都是由一个或者多个十六进制的转义序列进行替换。
  ```js
let str = 'test中文!@#$%$^、/_/'
        let str1 = encodeURIComponent(str) //test%E4%B8%AD%E6%96%87!%40%23%24%25%24%5E%E3%80%81%2F_%2F
        let str2 = decodeURIComponent(str1) //test中文!@#$%$^、/_/
```

encodeURI()和 encodeURIComponent()的区别是：encodeRUIComponent()用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。因此，; / ? : @ & = + $ , # 这些字符在encodeURI中不会被编码，但是在encodeURIComponent中都会被编码。编码的规则这两个函数都是一样的。

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
跨域
跨域问题的根本原因是来自浏览器的同源策略：他用于限制Origin的文档或者它加载的脚本如何能与另一个源的资源进行交互，其中Origin指Web文档的来源，Web内容的来源取决于访问的URL方案（协议）、主机（域名、IP地址）和端口定义。
有了浏览器的同源策略，向不同源（即URL、IP地址、端口号有一个不同）发送XHR请求时，浏览器认为该请求是不受信任的，可能存在安全隐患，禁止该请求，并做出不正常的响应。
跨域的问题在项目的开发中尤为常见，当我们本地启动项目之后，当前页面的域名和后台服务域名不一样，就会产生跨域的问题；而在项目上线之后，会通过统一的域、后端配置域名白名单等方式避免跨域。
解决跨域问题的方案：
 JSONP、ProxyServer
 JSONP
 在项目的开发中常常会引入外链的图片、样式文件、插件等资源，但这些请求并没有导致跨域错误，因为这些请求属于http请求，并不会引发跨域问题的XHR请求。简单来说script标签没有跨域限制的特性，把script脚本的src改成我们需要跨域请求的url，就能实现跨域获取资源，且不触发浏览器的同源策略，这就是JSONP的原理。
 ```js
 //前端
<script>
    window.callback = function (res) {
      console.log(res)
    }
  </script>
  <script src =' http://127.0.0.1:8080/jsonp?username=111&callback=callback'> </script>
 ```
 ```js
 //后端
const express = require('express')

const router = express.Router()
const app = express()
router.get('/jsonp', (req, res) => {
  const { callback, username } = req.query

  if (username === '111') {
    const requestData = {
      code: 200,
      status: '登录成功'
    }
    res.send(`${callback}(${JSON.stringify(requestData)})`)
  }

  
})

app.use(router)

app.listen('8080', () => {
  console.log('api server running at http://127.0.0.1:8080')
})
 ```

ProxyServer
 同源策略主要是限制浏览器和服务器之间的请求，服务器与服务器之间并不存在跨域问题。所以根据这样的问题，前端就可以将请求发送给同源或者设置好跨域的代理服务器，代理服务器收到代理请求后，将真正的请求转发到目标服务器，并接受真正服务器的响应，再把收到的结果响应给前端。

console对象身上的方法
console.assert()
如果第一个参数为false, 则将消息和堆栈跟踪记录到控制台
console.clear()
清空控制台, 并输出console was cleared.
console.count()
以参数为标记记录调用的次数, 调用时在控制台打印标识以及调用次数
console.countReset()
重置指定标签的计数器值。
console.debug()
在控制台打印一条debug级别的消息。
console.dir()
显示一个由特定的 Javascript 对象列表组成的可交互列表。这个列表可以使用三角形隐藏和显示来审查子对象的内容.
console.dirxml()
打印 XML/HTML 元素表示的指定对象，否则显示 JavaScript 对象视图.
console.error()
打印一条错误信息
console.exception()
error()方法的别称
console.group()
创建一个新的内联 group, 后续所有打印内容将会以子层级的形式展示。调用 groupEnd()来闭合组。
console.groupCollapsed()
创建一个新的内联 group。使用方法和 group() 相同，不同的是，groupCollapsed() 方法打印出来的内容默认是折叠的。调用groupEnd()来闭合组。
console.groupEnd()
闭合当前内联 group。
console.info()
打印资讯类说明信息.
console.log()
打印内容的通用方法
console.profile()
console.profileEnd()
console.table()
将列表型的数据打印成表格。
console.time()
启动一个以入参作为特定名称的计时器，在显示页面中可同时运行的计时器上限为10,000.
console.timeEnd()
结束特定的 计时器 并以豪秒打印其从开始到结束所用的时间。
console.timeLog()
打印特定 计时器 所运行的时间。
console.timeStamp()
添加一个标记到浏览器的 Timeline 或 Waterfall 工具。
console.trace()
输出一个 stack trace。
console.warn()
打印一个警告信息，可以使用 string substitution 和额外的参数。
