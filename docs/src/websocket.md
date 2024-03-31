# websocket

websocket 是`基于 TCP` 的一种新的`应用层`的进行`全双工通信`的协议。websocket 使得客户端和服务器之间的通信变得更加的简单，允许服务器主动向客户端推送数据。在 websocket API 中，浏览器和服务器只需要完成`一次握手`，两者之间就可以创建`持久性的链接`，并进行`数据双向传送`。

它的最大特点就是，`服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种`。所以根据 websocket 的特点，它可以应用于获取实时数据，比如：聊天消息推送、数据大屏实时数据等。
:::tip 特点

- 建立在 TCP 协议之上；
- 与 HTTP 协议有着良好的兼容性：默认端口也是 80（ws） 和 443(wss，运行在 TLS 之上)，并且握手阶段采用 HTTP 协议；
- 较少的控制开销：连接创建后，ws 客户端、服务端进行数据交换时，协议控制的数据包头部较小，而 HTTP 协议每次通信都需要携带完整的头部；
- 可以发送文本，也可以发送二进制数据；
- 没有同源限制，客户端可以与任意服务器通信；
- 协议标识符是 ws（如果加密，则为 wss），服务器网址就是 URL；
- 支持扩展：ws 协议定义了扩展，用户可以扩展协议，或者实现自定义的子协议（比如支持自定义压缩算法等）；

:::

## websocket 的使用

我们可以通过 WebSocket() 这个构造函数创建一个实例对象，通过实例对象身上的属性和方法来完成。
当我们完成`let websocket = new WebSocket(XXXX)`之后,websocket 实例身上有如下属性：

- `binaryType`：使用二进制的数据类型连接；
- `bufferedAmount(只读)`：未发送至服务器的字节数；
- `extensions(只读)`：服务器选择的扩展；
- `onclose`：用于指定连接关闭后的回调函数；
- `onerror`：用于指定连接失败后的回调函数；
- `onmessage`：用于指定当从服务器接受到信息时的回调函数；
- `onopen`：用于指定连接成功后的回调函数；
- `protocol(只读)`：用于返回服务器端选中的子协议的名字；
- `readyState(只读)`：返回当前 WebSocket 的连接状态。共有下面的四种状态：
  - `CONNECTING`: 正在连接中，对应的值为 0；
  - `OPEN`: 已经连接并且可以通讯，对应的值为 1；
  - `CLOSING`: 连接正在关闭，对应的值为 2；
  - `CLOSED`: 连接已关闭或者没有连接成功，对应的值为 3；
- `url(只读)`：返回值为当构造函数创建 WebSocket 实例对象时 URL 的绝对路径；

```js
// 创建一个websocket变量
let websocket = null
// 判断当前环境中是否存在WebSocket对象(是否支持WebSocket)
if (typeof WebSocket === 'undefined') {
    ...
    return false
    }

// 创建实例对象
websocket = new WebSocket(`ws://127.0.0.1:${Port}`)

// 建立连接
websocket.onopen = () => {
// 发送数据
}
// 客户端接收服务端返回的数据
websocket.onmessage = res => {
    this.roll(res.data)
}
// 发生错误时
websocket.onerror = () => {

}
// 关闭连接
websocket.onclose = () => {

}

```

## websocket 的原理
