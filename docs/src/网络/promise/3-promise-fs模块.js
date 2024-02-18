/**
 * 封装一个函数读取文件内容
 * 参数：path文件路径
 * 返回：promise对象
 */
import fs from 'fs'
function mineReadFile(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,(error,data)=>{
            if(error) reject(error);
            resolve(data)
        })
    })
}

mineReadFile('./file/test.txt').then(value=>{
    console.log("*****value***",value.toString());
},reason=>{
    console.log("****reason****",reason);
})