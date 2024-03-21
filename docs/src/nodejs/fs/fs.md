# file system 文件系统

Nodejs 中的 file System 用于处理文件系统的交互。fs 模块允许我们读取、写入、修改、删除文件，以及创建和读取目录。文件系统模块提供了同步和异步的方法，可以根据需要选择合适的方法中的方法均有异步和同步两个版本，同时还有文件流的方法。

## 语法

```js
// commomjs
const fs = require("fs");
// ECMA
import fs from "fs";
```

## 文件的写入

fs 模块文件的写入 writeFile、writeFilesync、appendfile、appendfilesync。

### writeFile 和 writeFilesync

writeFile() 和 writeFilesync()用于向目标文件写入内容，如果源文件不存在，则创建文件后再进行写入，如果源文件存在，则会直接进行写入，并且覆盖掉原来的内容。

语法

```js
// 同步写入
fs.writeFile(file, data[, options], callback)
// 异步写入，没有callback回调函数
fs.writeFileSync(file, data[, options])
```

- file：文件名或者文件路径，
- data：文件内容
- option：配置对象
  - encoding：文件编码格式，默认是 UTF-8
  - mode：
  - flag：
  - flush：
  - signal
- callback：写入失败的回调函数

```js
// 引入模块
import fs from "fs";

// 同步方式
fs.writeFile("test.txt", "写入一个文件", (err) => {
  console.log(err);
});

// 异步方式
fs.writeFileSync("text1.txt", "异步写入一个文件");
```

下面是 node 文档的写法

```js
import { writeFile, writeFileSync } from "node:fs";
import { Buffer } from "node:buffer";

const data = new Uint8Array(Buffer.from("Hello Node.js"));
writeFile("message.txt", data, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});

try {
  writeFileSync("message.txt", data);
} catch (err) {}
```

### appendfile 和 appendfilesync

appendfile() 和 appendfilesync()用于在文件末尾追加写入内容，如果源文件不存在，则会创建一个文件然后再在末尾进行写入。

语法

```js
// 同步
fs.appendFile(path, data[, options], callback)
// 异步
fs.appendfilesync(path, data[, options])
```

- file：文件名或者文件路径，
- data：文件内容
- option：配置对象
  - encoding：文件编码格式，默认是 UTF-8
  - mode：
  - flag：
  - flush：
  - signal
- callback：写入失败的回调函数

```js
import fs from "fs";
// 同步
fs.appendFile("test.txt", "同步追加写入", (err) => {
  if (err) throw err;
  console.log("同步追加写入完成");
});
// 同步
fs.appendFileSync("test.txt", "异步追加写入");
```

官方文档示例

```js
import { appendFile, appendFileSync } from "node:fs";
// 同步
appendFile("message.txt", "data to append", (err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!');
});

// 异步方法
try {
  appendFileSync("message.txt", "data to append");
  console.log('The "data to append" was appended to file!');
} catch (err) {
  /* Handle the error */
}
```

## 文件的读取

fs.readFile() 和 fs.readFileSync()用于对文件内容的读取。

语法

```js
fs.readFile(path[, options], callback)
fs.readFileSync(path[, options])
```

- path：文件名或者文件路径
- options：配置对象
  - encoding
  - flag
  - signal
- callback
  - err
  - data

```js
// 引入模块
import fs from "fs";
// 读取文件
fs.readFile("message.txt", (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

// 异步读取
try {
  let data = fs.readFileSync("message.txt");
  console.log(data.toString());
} catch (error) {
  //
}
```

文档示例

```js
import { readFile, readFileSync } from "node:fs";

readFile("/etc/passwd", (err, data) => {
  if (err) throw err;
  console.log(data);
});

// 异步
let data = readFileSync("<directory>");
```

## 流式读取(createReadStream) 和 流式写入(createWriteStream)

```js
// 引入模块
import fs from "fs";
// 创建读取流对象
const rs = fs.createReadStream("稻香-周杰伦.mp3");
// 绑定data事件
rs.on("data", (chunk) => {
  console.log(data.length); // 65536字节 ==> 64KB
});
// 读取完成
rs.on("end", () => {
  console.log("读取完成");
});
```

## 文件移动与重命名

fs.rename() 和 fs.renameSync()用于文件的重命名和移动。

语法

- oldPath：源文件路径
- newPath ：目标路径
- callback
  - err

## 文件删除

fs.unlink() 和 fs.unlinkSync()用于删除文件操作。

语法

```js
// 异步删除
fs.unlink(path, callback);
// 同步删除
fs.unlinkSync(path);
```

- path:文件路径
- callback:回调函数，失败时接受一个错误参数。

官方示例

```js
import { unlink } from "node:fs";
// Assuming that 'path/file.txt' is a regular file.
unlink("path/file.txt", (err) => {
  if (err) throw err;
  console.log("path/file.txt was deleted");
});
```

fs.unlink() 和 fs.unlinkSync()无法对文件夹进行操作，无论该文件夹是空的或者其他的类型。

### fs.rm 和 fs.rmdir

异步删除文件和文件夹

语法

```js
fs.rm(path[, options], callback)
fs.rmdir(path[, options], callback)
```

## 文件夹操作

nodejs 提供了对文件夹的创建、读取、删除等操作。
mkdir、mkdirsync、readdir、readdirsync、rmdir、rmdirsync

## 文件的状态资源 stat

stat 和 statsync 用于查看资源的详细信息
