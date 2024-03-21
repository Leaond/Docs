// 导入模块
import http from "http";
// const http = require('http')

// 创建服务
const server = http.createServer((request, response) => {
  response.end("Hello World!!!!");
});

// 监听端口
server.listen(9000, () => {
  console.log("=====>>>服务已经启动 ");
});
