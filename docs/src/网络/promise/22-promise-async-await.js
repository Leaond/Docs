/***
 * 连续读取文件内容的例子
 */

// 1.常规的回调函数方式
// 如何捕获异常
import fs from "fs";
fs.readFile("", (err1, data1) => {
  if (err1) throw err1;
  fs.readFile("", (err2, data2) => {
    if (err2) throw err2;
    fs.readFile("", (err3, data3) => {
      if (err3) throw err3;
      console.log("********", data1 + data2 + data3);
    });
  });
});

// 2.async-await方式
import fs from "fs";
import util from "util";
const mineReadFile = util.promisfiy(fs.readFile());
async function main() {
  try {
    let res1 = await mineReadFile("./file/test.txt");
    let res2 = await mineReadFile("./file/test.txt");
    let res3 = await mineReadFile("./file/test.txt");
    console.log("********", res1 + res2 + res3);
  } catch (error) {
    console.warn(error);
  }
}
