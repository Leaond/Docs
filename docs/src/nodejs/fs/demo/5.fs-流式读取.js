/**
 * 读取一个流文件
 */

// 引入模块
import fs from 'fs'
// 创建读取流对象
const rs = fs.createReadStream('稻香-周杰伦.mp3')
// 绑定data事件
rs.on('data', chunk=>{
    console.log(data.length);// 65536字节 ==> 64KB
})
// 读取完成
rs.on('end',()=>{
    console.log("读取完成");
})
