// 1.引入express模块
import express from "express";
// 2.创建应用对象
const app = express();
// 3.创建路由规则
app.get("/server", (request, response) => {
  // 设置响应
  response.send("HELLO Express");
});
// 测试IE浏览器get请求缓存问题
app.get("/ie", (request, response) => {
  // 设置响应头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 设置响应
  response.send("HELLO IE-2");
});
// 测试延时响应
app.get("/delay", (request, response) => {
  // 设置响应头
  response.setHeader("Access-Control-Allow-Origin", "*");
  // 设置响应
  setTimeout(() => {
      response.send("延迟响应");
  }, 2000);
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
