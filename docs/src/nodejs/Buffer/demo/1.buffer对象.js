// 引入 buffer对象
import {Buffer} from 'node:buffer'

//1. 分配长度为10字节的空的内存空间
const buffer = Buffer.alloc(10)
console.log("=====>>> ",buffer);//<Buffer 00 00 00 00 00 00 00 00 00 00>
console.log("=====>>> ",buffer.toString()); //

// 2.分配长度为10，全部存放1的内存空间
const buffer1 = Buffer.alloc(10,1)
console.log("=====>>> ",buffer1);//<Buffer 01 01 01 01 01 01 01 01 01 01>
console.log("=====>>> ",buffer1.toJSON());

// 3. 字符串转buffer
const buffer2 = Buffer.from('hello')
const buffer3 = Buffer.from([1,2,3])
console.log("=====>>> ",buffer2);
console.log("=====>>> ",buffer2.toString());
console.log("=====>>> ",buffer3);
console.log("=====>>> ",buffer3.toString());
