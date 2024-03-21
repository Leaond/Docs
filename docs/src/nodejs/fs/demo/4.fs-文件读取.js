/**
 * 新建一个文件，座右铭.txt，并且想里面写入内容
 */

// 引入模块
import fs from 'fs'
// 读取文件
// fs.readFile('message.txt',(err,data)=>{
//     if(err) throw err
//     console.log(data.toString());
// })

// 异步读取
try {
  let data = fs.readFileSync('../message.txt')
  console.log(data.toString());
} catch (error) {
    // 
    // console.log("=====>>> ",error);
}