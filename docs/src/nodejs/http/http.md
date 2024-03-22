# HTTP 模块

Node.js 的 HTTP 模块是一个核心模块，它提供了一种简单的方法来创建 HTTP 服务器和客户端。

```js
// 导入模块
import http from "http";
// const http = require('http')

// 创建服务
const server = http.createServer((request, response) => {
  // 返回给客户端的信息
  response.end("Hello World!!!!");
});

// 监听端口
server.listen(9000, () => {
  console.log("=====>>>服务已经启动 ");
});
```

当客户端向服务器发送请求的时候，createServer()方法就会被触发。createServer()方法接收一个函数作为参数，这个函数接收两个参数作为参数：request、response。request 包含了客户端发送的相关请求报文；response 包含了服务要给客户端返回的响应报文。

:::tip 注意

- 已经启动的服务可以使用 `ctrl + c` 结束服务
- 使用 nodemon 可以实现 js 代码热更新，不用每次修改文件后重新启动
- 如果响应中，中文出现乱码。解决方式如下：

```js
response.setHeader("content-Type", "text/html;charset=utf-8");
```

- HTTP 协议默认端口是 80，HTTPS 的默认端口是 334，HTTP 常用的端口有 3000,8000,9000 等
- 如果端口被其他应用程序占用，可以使用 资源监视器 找到已经占用的端口，然后关闭即可。
  :::

  https://zhuanlan.zhihu.com/p/364933177

## 设置 HTTP 响应报文

在响应参数中，http 提供了一些属性供我们对响应报文进行设置。

- 设置响应状态码：response.statusCode
- 设置响应信息：response.statusMessage
- 设置响应头：response.setHeader('key','value')，response.setHeader('key',['value1','value2',...])
- 设置响应体：response.write('') 或者 response.end('')

```js
response.statusCode = 200;
response.statusMessage = "Not found";
// response.setHeader('test','1')
response.setHeader("test", ["1", "2", "3"]);
response.write("测试");
response.end("登录页面");
```

![示例]('./src/images/node/http设置响应信息.png')
更多的属性，参考[官方文档](https://nodejs.org/docs/latest/api/http.html)

:::tip
- `__filename`: 返回当前模块文件被解析过后的绝对路径,
- `__dirname`: 返回当前模块文件解析过后所在的文件夹(目录)的绝对路径
:::

## URL 模块

该 `node:url` 模块提供用于 URL 解析和解析的实用程序.我们可以使用构造函数的方式来对 URL 地址进行解析。

语法

```js
// 构造函数用于拼接地址。
new URL(input[, base])

// 示例
const myURL = new URL('/foo', 'https://example.org/');
// https://example.org/foo
```

- input:要分析的绝对或相对输入 URL。如果 input 是相对的，则 base 为必填项。如果 input 是绝对的，则忽略。 base 如果不是 input 字符串，则首先将其转换为字符串。
- base 如果 不是 input 绝对的，则要解析的基 URL。如果不是 base 字符串，则首先将其转换为字符串。

```js
// 解析地址
const myURL = new URL("https://example.org");
myURL.pathname = "/a/b/c";
myURL.search = "?d=e";
myURL.hash = "#fgh";

// 构造地址
const pathname = "/a/b/c";
const search = "?d=e";
const hash = "#fgh";
const myURL = new URL(`https://example.org${pathname}${search}${hash}`);
```

如果事先不知道是否 input 是绝对 URL 并且提供了 a base ，建议验证 origin URL 对象是否是预期的。

```js
let myURL = new URL("http://Example.com/", "https://example.org/");
// http://example.com/

myURL = new URL("https://Example.com/", "https://example.org/");
// https://example.com/

myURL = new URL("foo://Example.com/", "https://example.org/");
// foo://Example.com/

myURL = new URL("http:Example.com/", "https://example.org/");
// http://example.com/

myURL = new URL("https:Example.com/", "https://example.org/");
// https://example.org/Example.com/

myURL = new URL("foo:Example.com/", "https://example.org/");
// foo:Example.com/
```

url 实例身上提供了一些属性供我们提取 URL 地址上的参数：

- `url.hash`：获取并设置 URL 的片段部分。

```js
const myURL = new URL("https://example.org/foo#bar");
console.log(myURL.hash);
// Prints #bar

myURL.hash = "baz";
console.log(myURL.href);
// Prints https://example.org/foo#baz
```

- `url.host`: 获取和设置 URL 的主机部分。

```js
const myURL = new URL("https://example.org:81/foo");
console.log(myURL.host);
// Prints example.org:81

myURL.host = "example.com:82";
console.log(myURL.href);
// Prints https://example.com:82/foo
```

更多的属性参考[官网](https://nodejs.org/docs/latest/api/url.html)
