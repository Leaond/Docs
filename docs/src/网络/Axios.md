# Axios

## 前置准备： json-server

    json-server是github上一个开源的服务框架，我们可以按照官方教程进行搭建，方便后面我们与axios配合发请求。

### 安装以及使用

```js
//    install
npm install json-server
//    Create a db.json or db.json5 file
{
"posts": [
 { "id": "1", "title": "a title", "views": 100 },
 { "id": "2", "title": "another title", "views": 200 }
],
"comments": [
 { "id": "1", "text": "a comment about post 1", "postId": "1" },
 { "id": "2", "text": "another comment about post 1", "postId": "1" }
],
"profile": {
 "name": "typicode"
}
}
// 启动
json-server --watch db.json
```

## Axios的特点
可以在浏览器中发送XMLHttpRequest请求
可以在nodejs中发送请求
支持Promise API
请求和响应拦截器
取消请求
帮助我们对请求和相应数据进行转换
自动转换json数据
···

Axios的安装
```js
npm install axios
```

## Axios的使用

```js
axios.request()
axios.post()
```

## axios的响应体
config
    header
    data
    adapter
data
headers
request
status
statusText

## axios的配置对象
## axios的默认配置
 重复配置的统一编写，减少代码的重复

## axios实例对象
·这里创建的对象其实就是axios的配置对象

## 拦截器 Interceptors
    拦截器就是一些函数，分为两大类：请求拦截器和响应拦截器

    两个拦截器的执行顺序？拦截器和Promise的关系？

## axios取消请求