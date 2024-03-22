/**
 * 需求：搭建一个服务，响应一个4行3列的表格，并且要求表格有斑马纹效果，且点击能有高亮的效果,
 * 单独将html部分用html文件写，使用fs模块进行优化
 */

import http from "http";
import fs from "fs";

const server = http.createServer((request, response) => {
  const { method } = request;
  const { pathname } = new URL(request.url, "http://127.0.0.1");
  if (method === "GET" && pathname === "/table") {
    let file = fs.readFileSync('./10.http练习-优化.html');
    response.end(file);
  }
});

server.listen(9000, () => {
  console.log("服务已经启动");
});
