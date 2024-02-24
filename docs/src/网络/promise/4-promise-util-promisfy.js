/**
 * util.promisfy方法
 */
import util from 'util'
import fs from 'fs'

let mineReadFile = util.promisify(fs.readFile)

mineReadFile('./file/test.txt').then(value=>{
console.log("***value*****",value.toString());
},reason=>{
console.log("****reason****",reason);
})