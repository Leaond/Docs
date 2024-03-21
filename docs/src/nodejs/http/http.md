## HTTP 模块

:::tip 注意
- 已经启动的服务可以使用 `ctrl + c` 结束服务
- 使用 nodemon 可以实现js代码热更新，不用每次修改文件后重新启动
- 如果响应中，中文出现乱码。解决方式如下：
```js
response.setHeader('content-Type','text/html;charset=utf-8')
```
- HTTP协议默认端口是80，HTTPS的默认端口是334，HTTP常用的端口有3000,8000,9000等
- 如果端口被其他应用程序占用，可以使用 资源监视器 找到已经占用的端口，然后关闭即可。
:::
### URL模块
使用URL模块提取url中的路径和参数