/**
 * 新建一个文件，座右铭.txt，并且想里面写入内容
 */

// 引入模块
// import fs from "fs";
// console.log("=====>>> 1",);
// // 同步
// fs.appendFile("test.txt", "同步追加写入", (err) => {
//   if (err) throw err;
//   console.log("同步追加写入完成");
// });
// // 同步
// fs.appendFileSync('test.txt','异步追加写入')

// 官方文档示例
import { appendFile } from 'node:fs';

appendFile('message.txt', 'data to append', (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});
