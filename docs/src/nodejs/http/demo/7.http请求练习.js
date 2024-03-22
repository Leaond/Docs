/**
 * 练习，根据请求地址的不同返回不同的页面
 */

import http from "http";

const server = http.createServer((request, response) => {
  // 获取请求方法
  const { method } = request;

  //   获取请求路径
  // console.log("=====>>> ",new URL(request.url, "http://127.0.0.1"));
  console.log("request.url=====>>> ",request.url);
  const { pathname } = new URL(request.url, "http://127.0.0.1");

  response.setHeader("content-Type", "text/html;charset=utf-8")
  if (method === "GET" && pathname === "/login") {
    // 登录
    response.end("登录页面");
  } else if (method === "GET" && pathname === "/reg") {
    // 登录
    response.end("注册页面");
  } else {
    // 404
    response.end("404 NOT FOUND！");
  }
});

server.listen(9000, () => {
  console.log("服务已经启动");
});
