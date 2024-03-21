# Buffer 对象

Buffer 对象用于表示固定长度的字节序列。他的本质是一段内存空间，专门用来处理二进制数据。Buffer 大小固定并且没有办法调整。可以直接对计算机内存进行操作，每个元素的大小是 1 字节。buffer 类似于数组，可以用下标的方式来读取里面的数据。

## 语法

在 nodejs 中我们可以采用两种方式来引入 Buffer 对象

```js
// ECMA
import { Buffer } from "node:buffer";
// commonjs
const { Buffer } = require("node:buffer");
```

## Buffer.alloc

alloc()方法用于分配内存空间

```js
// 分配一个空的包含10字节的内存空间.
const buf1 = Buffer.alloc(10);

// 分配一个全部存放1的，长度为10的内存空间
const buf2 = Buffer.alloc(10, 1);
console.log(buffer1); //<Buffer 01 01 01 01 01 01 01 01 01 01>
console.log(buffer1.toJSON());
//  {
//     type: 'Buffer',
//     data: [
//       1, 1, 1, 1, 1,
//       1, 1, 1, 1, 1
//     ]
//   }
```

## Buffer.allocUnsafe

allocUnsafe()方法也用于分配内存空间，但是他比 alloc()方法要快一些。因为 allocUnsafe()方法在分配内存空间的时候，可能会覆盖掉旧的内存空间里面的数据，所以叫做 unsafe。

```js
const buf3 = Buffer.allocUnsafe(10);
```

## Buffer.from

from()方法用于通过别的类型创建 Buffer 对象。

```js
// 通过字符串创建Buffer对象.
const buffer2 = Buffer.from("hello");
console.log(buffer2); //<Buffer 68 65 6c 6c 6f>
console.log(buffer2.toString()); //hello
// 通过数组创建Buffer对象.
const buf4 = Buffer.from([1, 2, 3]); //<Buffer 01 02 03>
```

## Buffer 对象的读写

Buffer 因为类似于数组，所以可以用下标的方式进行读写。我们在读取 Buffer 对象的时候，会打印出一串二进制数，我们可以用 toString() 转为字符串再进行输出。

```js
//读取
console.log(buf_3[1]);
//修改
buf_3[1] = 97;
//查看字符串结果
console.log(buf_3.toString());
```

:::tip

- Buffer 对象分配的空间每一个字节都存放的是二进制数，并且最大只能存储 8 位 2 进制(即转换为 10 进制，最大能存放 255 的数)，当超过这个位数的时候，就会出现溢出现象，超过的位数会被舍弃。
- 对于中文的存储，中文的编码是 UTF-8，一个字符一般情况下占 3 个字节。
  :::
