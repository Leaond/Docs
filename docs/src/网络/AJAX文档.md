在这里记录一下 ajax 的整个执行流程。

# AJAX 的流程

AJAX 即 Asynchronous JavaScript and XML.Ajax 专门用来做前后端数据交互。Ajax 出现的原因：在 Ajax 之前只有 form 中的表单能向后端提交数据，但是 form 提交数据的时候页面会进行跳转，前端也拿不到后端的数据，所以就出现了 Ajax。

## 创建原生 Ajax 的 4 个步骤

1.  创建一个 Ajax，即建立一个 xmlhttpRequest 对象

```js
let xhr = new xmlhttpRequest（）//获取后台的地址，并且使用open方法与服务器建立连接
```

2.  xhr.open（请求方式，请求地址，是否异步）
    Ajax 根据前端请求方式的不同会对数据进行不同方式的拼接发送给后端，所以需要先对请求方式进行判断，再进行数据处理（下面的例子是调用封装的数据处理函数 toval()）

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
xhr.send（）
通过Ajax监听从后台发送过来的数据（通过绑定事件onreadystatechange，当ajax状态发生变化时触发该事件）
```

4. 监听状态

```js
xhr.onreadystatechange = function () {
  // 判断Ajax是否已经是最后一个状态
  if (xhr.readyState === 4) {
    // 传输正确结束，判断服务器返回来的code码
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

1. Ajax 刚开始创建（new xmlhttpRequest 执行完）
2. Ajax 和后台服务器刚建立起联系（xhr.open（）执行完）
3. Ajax 发送数据（xhr.send 执行完）
4. Ajax 开始接收数据，已经接收部分数据，正在解析数据
5. Ajax 接收数据完毕，已经接收到全部的相应数据，解析也已经完成
  Ajax 接收服务器响应的数据（即 res.response）会以字符串格式存放在 xhr.responseText 中。可以使用 JSON.parse 转换成对象

## Ajax 注意事项

- Ajax 默认响应回来的数据(ResponseText)是文本类型，必须通过 JSON.parse（）对数据进行处理，转成 JSON 对象

## get 和 post 请求的区别

get 请求和 post 请求的区别

- 发送 get 请求时，请求的内容会拼接在 URL 后面；发送 post 请求时，请求的内容会放在请求体当中。
  请求：请求都分为请求头（RequestHeaders）和请求体（Requestbody）
  请求头：里面会存放请求的类型、数据类型、请求的规范，类似于 html 文件的 head 里面的内容。
- 请求体：
  get 请求安全性较低，所有人都能够看到 URL 中拼接的数据；post 的安全性较高
  get 请求的容量比较小，大概只有 32k；post 请求的容量比较大，可能会达到 1G
  get 请求一般用于查询、下载，post 一般用于增删改、上传。
  在对 Ajax 进行封装的时候，如果请求的方式是 post，那么还需要在 xhr.open 之后设置请求头的格式（RequestHeaders）
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
  get 请求对请求参数有缓存，post 请求没有缓存。

## Ajax 跨域

域：指的是一个请求地址的协议、域名、端口这三部分，判断两个域是否相同，需要比较这三部分是否一致。
跨域：在前后盾分离的模式下，当前端调用后台接口的时候，由于是在非同一个域下面的请求，从而会触发浏览器的自我安全保护机制（同源策略），最终的结果是接口成功请求并响应，但是前端不能正常处理返回的数据。跨域指的是访问请求的协议、域名、端口与所请求的资源的协议、域名、端口不一致。
跨域出现的原因：跨域是浏览器里面同源策略的额安全限制，如果没有这个策略，那么所有的地址都可以访问任何一台服务器文件。
解决 Ajax 跨域：使用 cors 模块
HTTP
HTTP 简介
HTTP (HyperText Transfer Protocol)，即超文本运输协议，是实现网络通信的一种规范。
HTTP 特点
简单快速：客户向服务器请求服务时，只需传送请求方法和路径。由于 HTTP 协议简单，使得 HTTP 服务器的程序规模小，因而通信速度很快
支持客户/服务器模式
灵活：HTTP 允许传输任意类型的数据对象。正在传输的类型由 Content-Type 加以标记
无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间
无状态：HTTP 协议无法根据之前的状态进行本次的请求处理（下面有解决方式）

## HTTP 状态码

HTTP 状态码（英语：HTTP Status Code），是用以表示网页服务器超文本传输协议响应状态的 3 位数字代码。

### 常见的 14 种 HTTP 状态码

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

以 2 开头的状态码代表请求是成功的（304 也是成功的，重定向走缓存）；以 3 和 4 开头的状态码基本上都是前端的问题；以 5 和 6 开头的状态码，基本上都是后端的问题。
304 重定向：当第一次发送 get 请求成功后，浏览器会有缓存。第二次 get 请求如果与第一次 get 请求的参数都是一样的并且服务器返回的数据也是一样的，那么浏览器不会再去请求服务器，而是走浏览器缓存返回数据。
缺点：当发送第一次 get 请求之后，如果数据库里面的数据有变化。第二次 get 请求时会走缓存而不去访问服务器，这就导致了获取不到最新的数据库数据。
解决方式：给每一个请求加一个时间戳。
HTTP 中包含的数据
HTTP 状态码：需要记住常见的 http 状态码
请求报文、响应报文。需要掌握以下：
Request URL
Request Method
Status Code
Remote Address
Content-Type：告诉浏览器应该以什么编码格式来解析代码
application/x-www-form-urlencoded ：数据被编码为 "名/值" 对，是默认的数据格式。当 action 为 get 时，客户端把 form 数据转换成一个字串 append 到 url 后面，用'?'分割。当 action 为 post 时候，浏览器把 form 数据封装到 http body 中，然后发送到 server。（可以取消 post 请求的预检请求）
multipart/form-data：文件类型。需要在表单中进行文件上传时，就需要使用改格式。
application/json：消息主体是序列化后的 JSON 字符串。用来告诉服务器请求的主体内容是 JSON 格式的字符串，服务器会对 json 字符串进行解析。
解决 HTTP 无状态的问题
前端在发送请求的时候，需要将登录信息携带一起传递给服务器。后端在进行数据处理的时候判断请求是否携带登录信息，如果携带信息就可以访问数据；如果没有携带登录信息，服务器就拒绝访问数据
cookie：将登录的用户数据存在浏览器中，再次发送请求的时候，会自己携带 cookie 里面的数据。
缺点：不安全，能够被所有人看到信息，用户还可以自己去更改
session：通过后端去配置，将用户登录信息存放在服务器的 cookie 里面，这个信息是一串加密过后的乱码，只有服务器能够解析（具体配置方式在 node_js 里面）
Token、session、cookie
cookie
cookie 是一个非常具体的东西，指的就是浏览器里面永久存储的一种数据，仅仅是浏览器实现的一种数据存储模式。
cookie 是服务器生成的，发送给浏览器，浏览器把 cookie 以 key=value 的形式保存到某个目录下面的文件夹里面，下一次请求同一个网站的时候会把该 cookie 发送给服务器。由于 cookie 是存在客户端的，所以浏览器加了一些限制确保 cookie 不会被恶意使用，同时不会占据太多磁盘空间，每个域的 cookie 数量是有限的的，一般浏览器都限制 20 个 cookie。
cookie 一般与特定的 web 网站关联在一起，保存了该客户端访问这个 web 网站的信息。由于 cookie 可以保存在客户端，所以我们可以用来实现记录用户个人信息的功能，例如记住密码，自动登录等。
//原生使用 cookie
// 设置 cookie
var oDate = new Date();//获取系统当前时间
oDate.setDate(oDate.getDate() + 30); // 设置距离当前时间多少天后 cookit 过期
// 设置 cookie 及过期时间
document.cookie = "userName=hello;expires=" + oDate;
document.cookie = "password=123456;expires=" + oDate;
alert(document.cookie);
//获取 cookie  
 var oCookie = document.cookie.split('; ');
for (var i = 0; i < oCookie.length; i++) {
var temp = oCookie[i].split('=');
if (i == 1) {
document.getElementById('userName').value = temp[1];
};
if (i == 0) {
document.getElementById('password').value = temp[1];
};
}
}

//Vue 中使用 cookie 1.下载模块：npm install -s vue-cookie 2.配置 main.js
import cookie from 'vue-cookie'
Vue.prototype.$cookie = cookie
3.在组件中使用cookie
    this.$cookie.set("name",name)//存 cookie
this.$cookie.get("name")//取 cookie

Session
Session 就是服务器用来判定对话的身份的，通过 session 来识别请求的身份。服务器使用 session 来把用户的信息临时保存在了服务器上，用户离开网站后 session 会被销毁。这种用户存储信息方式比 cookie 更加的安全。但是 session 有一个缺点：如果 web 服务器做了负载均衡，那么下一个请求到了另一个服务器，那么 session 就会丢失。
Token
Token 是用在客户端频繁的向服务器发送请求，服务器频繁的去数据库查询用户信息和相关数据，并给出响应的情景。
Token 是服务器生成的一串字符串，以做客户端进行请求的一个令牌当第一次登录后，服务器生成了一个 token，之后将次 token 返回给客户端，以后每次发送请求的时候，用户只需要鞋带上这个 token 即可，不再需要鞋带上自己的账号密码这列身份信息。最简单的一个 token 组成：uid（用户唯一的身份标识）、time（当前时间的时间戳）、sign（签名，由 token 的前几位+盐）。
token 的使用目的是为了减轻服务器的压力，减少频繁的查询数据库，是服务器更加健硕。
Cookie 和 Session 的区别
Cookie 数据存放在客户端上，Session 数据存放在服务端上。
Cookie 不是很安全，别人可以分析存储在本地的 cookie 进行 cookie 欺骗。
Session 会在一段时间内保存在服务器上。当访问增多，会比较占用服务器的性能。
单个 cookie 存放的数据不能超过 4K，很多浏览器都限制 cookie 存放的个数不超过 20 个。
