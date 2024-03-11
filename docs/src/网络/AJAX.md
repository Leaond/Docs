# AJAX

AJAX 即 Asynchronous JavaScript and XML. Ajax 专门用来做前后端数据交互。通过 AJAX 可以在浏览器中向服务器发送异步请求，可以实现`无刷新获取数据`。

Ajax 出现的原因：在 Ajax 之前只有 form 中的表单能向后端提交数据，但是 form 提交数据的时候页面会进行跳转，前端也拿不到后端的数据，所以就出现了 Ajax。

## AJAX 的特点

### 优点

- 可以无刷新页面与服务器进行通信
- 允许根据用户事件来更新部分网页

### 缺点

- 没有浏览历史，不能不退
- 存在跨域问题
- SEO 不友好

## Ajax 和 fetch 的区别

ajax 是最早出现的发送后端请求的技术，它依赖于 xmlhttpRequest 对象。fetch 是基于 Promise 设计的，fetch 不是 ajax 的进一步封装，而是原生的 JavaScript。

- fetch 只对网络请求才会报错，对于 400、500 都当做成功请求，服务器返回 400,500 错误码的时候并不会 rejected。

针对这个问题，我们可以用 catch() 来进行捕获这类错误：

```js
fetch("http://localhost:3000/posts", { method: "GET" })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network response was not ok.");
  })
  .then((json) => console.log(json))
  .catch((error) => console.error("error:", error));
```

- 默认情况下，fetch 不会携带 cookie 信息。但是我们可以添加配置项来解决这个问题：`fetch(url, {credentials: 'include'})`
- fetch 不能取消请求，也没有直接设置超时时间的属性。可以通过封装 Promise 然后使用 setTimeout()来设置一个超时时间。
- fetch 没有办法原生监测请求的进度，但是 XHR 可以。

```js
function getData() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/posts", { method: "get" })
      .then((response) => {
        return response.json();
      })
      .then((r) => {
        resolve(r);
      });
    setTimeout(() => {
      reject("请求超时");
    }, 1000 * 10);
  });
}
getData()
  .then((res) => {
    console.log("=====>>> ", res);
  })
  .catch((error) => {
    console.log("=====>>> ", error);
  });

// fetch会和setTimeout同时执行，因为fetch是异步的，不会堵塞后面setTimeout的执行。
```

## 创建原生 Ajax 的 4 个步骤

1.  创建一个 Ajax 对象

```js
const xhr = new xmlhttpRequest();
```

2.  初始化 设置请求方式和请求地址

```js
//获取后台的地址，并且使用open方法与服务器建立连接
xhr.open(请求方式，请求地址，是否异步)
```

Ajax 根据前端请求方式的不同会对数据进行不同方式的拼接发送给后端，所以需要先对请求方式进行判断，再进行数据处理(下面的例子是调用封装的数据处理函数 toval())

```js
if (obj.method.toLowerCase() === "get") {
  // get请求方式传递的数据会直接拼接在URL上面传递给后端
  xhr.open("get", obj.url + "?" + toVal(obj.data), obj.async);
  xhr.send();
} else if (obj.method.toLowerCase() === "post") {
  xhr.open("post", obj.url, obj.async);
  // post方式需要配置请求头
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  // post请求方式传递的数据会放在请求体（request body）里面进行传输
  xhr.send(toVal(obj.data));
}
```

3. 向服务器发送数据

```js
xhr.send();
```

4. 监听状态 onreadystatechange

当 ajax 的状态发生改变时即 xhr 实例的状态发生改变时会触发 onreadystatechange 函数。所以我们通过监听这个状态就能做响应的处理。关于 ajax 的状态后面会讲到。

```js
xhr.onreadystatechange = function () {
  // 判断Ajax是否已经是最后一个状态
  if (xhr.readyState === 4) {
    // xhr.status:状态码
    // xhr.statusText:状态字符串
    // xhr.getAllResponseHeaders():所有响应头
    // xhr.response:响应体
    // 传输正确结束，判断服务器返回来的code码。
    if ((xhr.status >= 200 && xhr.status <= 300) || xhr.status === 304) {
      // http的状态正确，判断登录是否过期
      if (JSON.parse(xhr.responseText).code === 201) {
        // 登录已经过期，直接跳转到登录界面
        alert("登录已经过期");
        location.href = "../login.html";
      } else {
        // 登录没有过期，向前端返回数据
        obj.sucess(JSON.parse(xhr.responseText));
      }
    } else {
      obj.error("服务器繁忙");
    }
  }
};
```

## Ajax 进行数据传输的五个状态(xhr.readystate)

- `readyState = 0`: Ajax 刚开始创建(new xmlhttpRequest() 执行完)
- `readyState = 1`: Ajax 和后台服务器刚建立起联系(xhr.open()执行完)
- `readyState = 2`: Ajax 发送数据(xhr.send() 执行完)
- `readyState = 3`: Ajax 开始接收数据。这里 ajax 已经接收了部分数据，并且正在解析数据
- `readyState = 4`: Ajax 接收数据完毕，已经接收到全部的相应数据，解析也已经完成

Ajax 接收服务器响应的数据(即 res.response)会以字符串格式存放在 xhr.responseText() 中。可以使用 JSON.parse() 转换成对象。

## nodemon 插件

这个插件可以让 node 服务器在更新代码的时候自动重新启动服务器实现热加载。

```js
// 1.下载模块
npm install -g nodemon # or using yarn: yarn global add nodemon
// 2.使用
nodemon [your node app]
```

## IE 浏览器 GET 请求缓存问题

浏览器的第一次请求需要从服务器获得许多 css、img、js 等相关的文件，如果每次请求都把相关的资源文件加载一次，对 带宽、服务器资源、用户等待时间 都有严重的损耗。浏览器有做优化处理：其把 css、img、js 等文件在第一次请求成功后就在本地保留一个缓存备份，后续的每次请求就在本身获得相关的缓存资源文件读取就可以了，可以明显地加快用户的访问速度。css、img、js 等文件可以缓存，但是动态程序文件 例如 php 文件不能缓存，即使缓存我们也不要其缓存效果。`仅有IE浏览器仅在get请求下会缓存动态程序文件,post请求不会缓存`

一个简单的例子：

```html
<!-- IE缓存问题.html -->
<body>
  <div>
    <button id="btn">点击发送请求</button>
    <div class="result" id="result"></div>
  </div>
  <script>
    let btn = document.getElementById("btn");
    let result = document.getElementById("result");
    btn.addEventListener("click", function () {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:8000/ie");
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status <= 300) {
            result.innerHTML = xhr.response;
          }
        }
      };
    });
  </script>
</body>
```

```js
// server.js

// 1.引入express模块
import express from "express";
// 2.创建应用对象
const app = express();
// 3.创建路由规则
app.get("/server", (request, response) => {
  // 设置响应
  response.send("HELLO Express");
});
app.get("/ie", (request, response) => {
  // 设置响应头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 设置响应
  response.send("HELLO IE-2");
});
app.post("/server", (request, response) => {
  // 设置响应
  response.send("HELLO Express");
});
app.all("/", (request, response) => {
  // 设置响应
  response.send("HELLO Express");
});
// 4.监听端口，启动服务
app.listen(8000, () => {
  console.log("服务已经启动，监听8000端口中···");
});
```

上面的例子中：在第一次完成请求渲染之后，当改变 /ie 接口的响应体的时候，其他的浏览器都能够正常返回新的响应体。但是在 IE 浏览器中，返回值并不会更新到最新的响应体，而是从浏览器缓存当中取的缓存数据。

### 解决

我们可以在请求地址上拼接一个时间戳，这样就让请求 URL 每次都不一样了，那么 IE 浏览器也就不会走缓存了。

```js
xhr.open("GET", "http://localhost:8000/ie?t=" + Date.now());
```

## 请求超时与网络异常

```html
<body>
  <div>
    <button id="btn1">点击发送请求</button>
    <button id="btn2">点击取消请求</button>
    <div class="result" id="result"></div>
  </div>
  <script>
    let btn1 = document.getElementById("btn1");
    let btn2 = document.getElementById("btn2");
    let result = document.getElementById("result");
    let xhr = null;
    // 发送请求
    btn1.addEventListener("click", function () {
      xhr = new XMLHttpRequest();
      xhr.open("GET", "http://localhost:8000/delay");
      xhr.send();
    });
    // 取消请求
    btn2.addEventListener("click", function () {
      xhr.abort();
    });
  </script>
</body>
```

```js
app.get("/delay", (request, response) => {
  // 设置响应头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 设置响应
  setTimeout(() => {
    response.send("延迟响应");
  }, 2000);
});
```

## 重复请求问题

正常情况下，如果我们不做任何的处理，那么我们每点一次按钮，就会发送一次请求。这对服务器来说压力是很大的，因此我们可以针对同一个请求进行处理：等待上一个请求完成再发送新的请求或者取消上一个请求重新创建新的请求。

```html
<div>
  <button id="btn1">点击发送请求</button>
</div>
<script>
  let btn1 = document.getElementById("btn1");
  let xhr = null;
  // 判断是否正在请求中
  let isSending = false;
  // 发送请求
  btn1.addEventListener("click", function () {
    if (isSending) xhr.abort(); //如果存在一个请求，则取消上一个请求，重新创建请求
    // if (isSending) return; //也可以直接返回等待上一个请求完成
    xhr = new XMLHttpRequest();
    isSending = true; //正在请求中
    xhr.open("GET", "http://localhost:8000/delay");
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        isSending = false; //请求已经完成
      }
    };
  });
</script>
```

server.js

```js
app.get("/delay", (request, response) => {
  // 设置响应头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 设置响应
  setTimeout(() => {
    response.send("延迟响应");
  }, 2000);
});
```

:::tip
Ajax 默认响应回来的数据(ResponseText)是文本类型，必须通过 JSON.parse()对数据进行处理，转成 JSON 对象.
:::

## jsonp 发送请求

jsonp 发送的请求，返回的数据必须是函数的执行结果或者是 html 标签才能被浏览器正常识别。

```html
<body>
  <div>
    <button id="btn1">点击发送请求</button>
    <div id="result"></div>
  </div>
  <script>
    function handle(data) {
      const result = document.getElementById("result");
      result.innerHTML = data.name;
    }
  </script>
  <script src="http://localhost:8000/jsonp-server"></script>
</body>
```

server.js

```js
// jsonp服务
app.all("/jsonp-server", (request, response) => {
  // 设置响应
  const data = {
    name: "这是一个jsonp-serve返回的数据",
  };
  response.end(`handle(${JSON.stringify(data)})`);
});
```

## get 和 post 请求的区别

- 发送 get 请求时，请求的内容会拼接在 URL 后面；发送 post 请求时，请求的内容会放在请求体当中。
  :::tip
  请求：请求都分为请求头（RequestHeaders）和请求体（Requestbody）
  请求头：里面会存放请求的类型、数据类型、请求的规范，类似于 html 文件的 head 里面的内容。
  :::

- get 请求安全性较低，所有人都能够看到 URL 中拼接的数据；post 的安全性较高;get 请求的容量比较小，大概只有 32k；post 请求的容量比较大，可能会达到 1G;get 请求一般用于查询、下载，post 一般用于增删改、上传。

- 在对 Ajax 进行封装的时候，如果请求的方式是 post，那么还需要在 xhr.open 之后设置请求头的格式（RequestHeaders） xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
- get 请求对请求参数有缓存，post 请求没有缓存。

## 请求头信息设置

请求头信息可以设置预定义的头，也可以设置自定义头信息，自定义头需要服务端设置进行配合。

设置方式

```js
xhr.setRequestHeader("", "");
```

常见的预定义头

1. Content-Type:指定请求体的媒体类型，浏览器会根据这个响应的媒体类型，进行相关的解析。常见的值有：

- application/json：用于指定发送 JSON 格式的数据
- application/x-www-form-urlencoded：用于发送表单数据(默认值)
- multipart/form-data：用于发送包含文件上传的表单数据
- application/octet-stream：显示数据是字节流类型的，浏览器会按照下载类型来处理该请求。

2. Accept：指定客户端可以接受的响应内容的媒体类型，常见的值有：

- application/json：表示客户端希望接收 JSON 格式的响应
- text/html：标识客户端希望接收 HTMl 格式的响应
- /：表示客户端可以接收任意类型的响应

3. Authorization：身份验证凭证，常见的值有：

- Basic+Base64 编码的用户名和密码：用于基本身份验证
- Bearer + 访问令牌：用于 OAuth 和令牌身份验证

4. X-Requested-With：表示请求是否为 AJAX 请求，常见的值有：

- XMLHttpRequest：通常由 JavaScript 库自动设置

5. User-Agent：指示发起请求的用户代理信息，常见的值有：

- Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
- Chrome/93.0.4577.63 Safari/537.36：Chrome 浏览器的用户代理信息。

## Ajax 跨域

### 域

指的是一个请求地址的协议、域名、端口这三部分，判断两个域是否相同，需要比较这三部分是否一致，只要有一个不满足那么就是两个不同的域。

### 跨域

跨域指的是访问请求的协议、域名、端口与所请求的资源的协议、域名、端口不一致。

在前后端分离的模式下，当前端调用后台接口的时候，由于是在非同一个域下面的请求，从而会触发浏览器的自我安全保护机制（同源策略），最终的结果是接口成功请求并响应，但是前端不能正常处理返回的数据。

### 跨域出现的原因：同源策略

跨域是浏览器里面同源策略的安全限制，如果没有这个策略，那么所有的地址都可以访问任何一台服务器文件。

### 如何解决 Ajax 跨域

## HTTP

HTTP (HyperText Transfer Protocol)，即超文本运输协议，是实现网络通信的一种规范。

### HTTP 特点

- 简单快速：客户向服务器请求服务时，只需传送请求方法和路径。由于 HTTP 协议简单，使得 HTTP 服务器的程序规模小，因而通信速度很快
  支持客户/服务器模式
- 灵活：HTTP 允许传输任意类型的数据对象。正在传输的类型由 Content-Type 加以标记
- 无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间
- 无状态：HTTP 协议无法根据之前的状态进行本次的请求处理（下面有解决方式）

### HTTP 状态码

HTTP 状态码(HTTP Status Code)，是用以表示网页服务器超文本传输协议响应状态的 3 位数字代码。

#### 常见的 14 种 HTTP 状态码

- 1XX:信息状态吗
- 100（继续请求）：客户端在发起 POST 请求给服务器，征询服务器的状态，查看服务器是否处理 post 请求
- 2XX：成功状态码
- 200（成功）：表示从客户端发送给服务器的请求被正常处理并且返回。
- 201（已创建）：请求成功并且服务器创建了新的资源
- 202（已创建）：服务器已经接收请求，但是尚未处理
- 203（未授权信息）：服务器已经成功接收请求，但是返回的数据可能来自另一个源
- 204（无内容）：表示客户端发送给服务器的请求得到了成功处理，但是返回的报文中不包含实体的主体部分（没有资源可以返回）
- 205（重置内容）：服务器成功处理请求，但是没有返回内容
- 206（部分内容）：表示客户端进行了范围请求，并且服务器成功执行了这部分的 get 请求，响应报文中包含由 Content-Range 执行范围的实体内容。

- 302（临时重定向）：服务器目前从不同位置的页面响应请求，但请求者应继续使用原有位置来进行以后的请求。
- 303（查看其他位置）：表示请求的资源被分配了新的 url，请求者应该对不同的位置使用单独的 GET 请求来检索响应，服务器返回此代码。
- 304（未修改）：上次请求之后，请求的页面没有修改过。服务器返回此响应，不会返回网页内容。
- 305（使用代理）：请求者只能使用代理访问请求的网页，如果服务器返回此响应，表示请求者应该继续使用代理

- 4XX：客户端错误状态码
- 400（错误请求）：表示请求报文中存在错误语法，服务器不理解请求的语法
- 401（未授权）：未经许可，需要通过 http 认证。请求要求身份验证。对于需要登录的页面，服务器返回此状态码
- 403（禁止）：服务器拒绝响应该次请求，访问权限出现问题。
- 404（未找到）：服务器找不到请求的资源，也可以在服务器拒绝请求但是不想给拒绝原因时使用。
- 405（方法禁用）：禁止请求中指定的方法
- 406（不接受）：无法使用请求的内容特来响应请求的网页
- 407（需要代理授权）：与 401 类似，但指定请求者应当授权使用代理
- 408（请求超时）：服务器在等候请求时发生超时

- 5XX：服务器错误状态码
- 500（请求错误）：表示服务器在执行请求时遇到错误，也可能是 web 应用存在问题，无法完成请求
- 501（尚未实施）：服务器不具备完成请求的功能
- 503（服务不可用）：表示服务器目前不可用（处于超载或者停机维护）
- 504（网关超时）：服务器作为网关或代理，但是没有及时从上游服务器收到请求
- 505（http 版本不支持）：服务器不支持请求中所用到的 HTTP 协议版本

:::tip 总结
以 2 开头的状态码代表请求是成功的（304 也是成功的，重定向走缓存）

以 3 和 4 开头的状态码基本上都是前端的问题；

以 5 和 6 开头的状态码，基本上都是后端的问题。
:::
:::tip 304 重定向

当第一次发送 get 请求成功后，浏览器会有缓存。第二次 get 请求如果与第一次 get 请求的参数都是一样的并且服务器返回的数据也是一样的，那么浏览器不会再去请求服务器，而是走浏览器缓存返回数据。

缺点：当发送第一次 get 请求之后，如果数据库里面的数据有变化。第二次 get 请求时会走缓存而不去访问服务器，这就导致了获取不到最新的数据库数据。

解决方式：给每一个请求加一个时间戳。
:::

### HTTP 中包含的数据

请求报文、响应报文。需要掌握以下：

- Request URL:请求地址
- Request Method：请求方式
- Status Code：状态码
- Remote Address：
- Content-Type：告诉浏览器应该以什么编码格式来解析代码
- application/x-www-form-urlencoded ：数据被编码为 "名/值" 对，是默认的数据格式。当 action 为 get 时，客户端把 form 数据转换成一个字串 append 到 url 后面，用'?'分割。当 action 为 post 时候，浏览器把 form 数据封装到 http body 中，然后发送到 server。（可以取消 post 请求的预检请求）
- multipart/form-data：文件类型。需要在表单中进行文件上传时，就需要使用改格式。
- application/json：消息主体是序列化后的 JSON 字符串。用来告诉服务器请求的主体内容是 JSON 格式的字符串，服务器会对 json 字符串进行解析。

### 解决 HTTP 无状态的问题

前端在发送请求的时候，需要将登录信息携带一起传递给服务器。后端在进行数据处理的时候判断请求是否携带登录信息，如果携带信息就可以访问数据；如果没有携带登录信息，服务器就拒绝访问数据。

## Token、session、cookie

### cookie

cookie 是一个非常具体的东西，指的就是浏览器里面永久存储的一种数据，仅仅是浏览器实现的一种数据存储模式。

cookie 是服务器生成的，发送给浏览器，浏览器把 cookie 以 key=value 的形式保存到某个目录下面的文件夹里面，下一次请求同一个网站的时候会把该 cookie 发送给服务器。由于 cookie 是存在客户端的，所以浏览器加了一些限制确保 cookie 不会被恶意使用，同时不会占据太多磁盘空间，每个域的 cookie 数量是有限的的，一般浏览器都限制 20 个 cookie。

cookie 一般与特定的 web 网站关联在一起，保存了该客户端访问这个 web 网站的信息。由于 cookie 可以保存在客户端，所以我们可以用来实现记录用户个人信息的功能，例如记住密码，自动登录等。

缺点：不安全，能够被所有人看到信息，用户还可以自己去更改

原生使用 cookie

```js
// 设置 cookie
let oDate = new Date(); //获取系统当前时间
oDate.setDate(oDate.getDate() + 30); // 设置距离当前时间多少天后 cookit 过期
// 设置 cookie 及过期时间
document.cookie = "userName=hello;expires=" + oDate;
document.cookie = "password=123456;expires=" + oDate;
alert(document.cookie);
//获取 cookie
let oCookie = document.cookie.split("; ");
for (let i = 0; i < oCookie.length; i++) {
  let temp = oCookie[i].split("=");
  if (i == 1) {
    document.getElementById("userName").value = temp[1];
  }
  if (i == 0) {
    document.getElementById("password").value = temp[1];
  }
}
```

Vue 中使用 cookie

```js
// 1.下载模块：
npm install -s vue-cookie

// 2.配置 main.js
import cookie from 'vue-cookie'
Vue.prototype.$cookie = cookie

// 3.在组件中使用cookie
this.$cookie.set("name",name)//存 cookie
this.$cookie.get("name")//取 cookie
```

### session

Session 就是服务器用来判定对话的身份的，通过 session 来识别请求的身份。服务器使用 session 来把用户的信息临时保存在了服务器上，用户离开网站后 session 会被销毁。这种用户存储信息方式比 cookie 更加的安全。但是 session 有一个缺点：如果 web 服务器做了负载均衡，那么下一个请求到了另一个服务器，那么 session 就会丢失。

### Token

Token 是服务器生成的一串字符串，以做客户端进行请求的一个令牌当第一次登录后，服务器生成了一个 token，之后将次 token 返回给客户端，以后每次发送请求的时候，用户只需要鞋带上这个 token 即可，不再需要鞋带上自己的账号密码这列身份信息。最简单的一个 token 组成：uid（用户唯一的身份标识）、time（当前时间的时间戳）、sign（签名，由 token 的前几位+盐）。

Token 是用在客户端频繁的向服务器发送请求，服务器频繁的去数据库查询用户信息和相关数据，并给出响应的情景。token 的使用目的是为了减轻服务器的压力，减少频繁的查询数据库，是服务器更加健硕。

:::tip
Cookie 和 Session 的区别

- Cookie 数据存放在客户端上，Session 数据存放在服务端上。
- Cookie 不是很安全，别人可以分析存储在本地的 cookie 进行 cookie 欺骗。
- Session 会在一段时间内保存在服务器上。当访问增多，会比较占用服务器的性能。
- 单个 cookie 存放的数据不能超过 4K，很多浏览器都限制 cookie 存放的个数不超过 20 个。
  :::
