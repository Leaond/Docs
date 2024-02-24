import fs from 'fs';
// 回调函数的形式
// fs.readFile('./test.txt',(error,data)=>{
//     if(error) throw error;
//     console.log("读取到文件：",data.toString());
// })

// 使用promise的方式封装
let p = new Promise((resolve,reject)=>{
    fs.readFile('./file/test.txt',(error,data)=>{
        if(error) reject(error);//
        resolve(data);//
    })
})
// 获取p的状态
p.then(value=>{
console.log("读取文件成功：",value.toString());
},reason=>{
    console.log("读取文件失败：",reason);
})