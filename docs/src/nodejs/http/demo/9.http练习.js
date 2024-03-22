/**
 * 需求：搭建一个服务，响应一个4行3列的表格，并且要求表格有斑马纹效果，且点击能有高亮的效果
 */

/**
 * 练习，根据请求地址的不同返回不同的页面
 */

import http from "http";

const server = http.createServer((request, response) => {
  const { method } = request;
  const { pathname } = new URL(request.url, "http://127.0.0.1");
  if (method === "GET" && pathname === "/table") {
    response.end(`  
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    td{
        width:100px;
        height:20px;
        border:1px solid blue;
    }
    tr:nth-of-type(odd){
        background-color: blue;
    }
    </style>
</head>
<body>
    <table>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
        <tr>
            <td>1</td>
            <td>2</td>
            <td>3</td>
        </tr>
    </table>
</body>
</html>

    `);
  }
});

server.listen(9000, () => {
  console.log("服务已经启动");
});
