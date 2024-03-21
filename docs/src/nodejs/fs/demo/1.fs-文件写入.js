/**
 * 新建一个文件，座右铭.txt，并且想里面写入内容
 */

// 引入模块
import fs from "fs";
console.log("开始执行");
// // 1.同步 写入文件
// fs.writeFile("test.txt", "写入一个文件", (err) => {
//   console.log(err);
// });

// // 2.异步写入文件
// fs.writeFileSync("text1.txt","异步写入一个文件")

// 文档写法
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

const data = new Uint8Array(Buffer.from('Hello Node.js'));
writeFile('message.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
}); 

console.log("执行完毕");
