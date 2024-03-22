# PATH 模块

node:path 模块提供了用于处理文件和目录路径的实用程序。

语法

```js
const path = require("node:path");
```

## path 的常用方法

## path.basename

path.basename() 方法返回 path 的最后一部分。尾随目录分隔符将被忽略。

```js
path.basename(path[, suffix])

path.basename('/foo/bar/baz/asdf/quux.html');
// Returns: 'quux.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// Returns: 'quux'
```

尽管 Windows 通常以不区分大小写的方式处理文件名（包括文件扩展名），但此函数不会。例如， C:\\foo.html 引用 C:\\foo.HTML 同一文件，但 basename 将扩展名视为区分大小写的字符串：

```js
path.win32.basename("C:\\foo.html", ".html");
// Returns: 'foo'

path.win32.basename("C:\\foo.HTML", ".html");
// Returns: 'foo.HTML'
```

## path.dirname

path.dirname() 方法返回 path 的目录名。尾随目录分隔符将被忽略.

```js
path.dirname(path);

// 示例
path.dirname("/foo/bar/baz/asdf/quux");
// Returns: '/foo/bar/baz/asdf'
```

## path.extname

path.extname() 方法返回 path 的扩展名，从上次出现的 . （句点） 字符到 的 字符串末尾。 path . 如果 path 的最后一部分没有，或者除了 path （see path.basename() ） 的基名的第一个字符之外没有其他 . 字符，则返回一个空字符串。

```js
path.extname(path);
```

示例

```js
path.extname("index.html");
// Returns: '.html'

path.extname("index.coffee.md");
// Returns: '.md'

path.extname("index.");
// Returns: '.'

path.extname("index");
// Returns: ''

path.extname(".index");
// Returns: ''

path.extname(".index.md");
// Returns: '.md'
```

## path.parse

path.parse() 方法返回一个对象，其属性表示 的重要元素。 path 尾随目录分隔符将被忽略.

返回的对象具有以下的属性:

- dir
- root
- base
- name
- ext

```js
path.parse("C:\\path\\dir\\file.txt");
// Returns:
// { root: 'C:\\',
//   dir: 'C:\\path\\dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

```js
path.parse(path);
```

## path.resolve

path.resolve() 方法将一系列路径或路径段解析为绝对路径。

```js
path.resolve([...paths]);
```

- 给定的路径序列从右到左进行处理，每个后续 path 路径都预置在前面，直到构造出绝对路径。例如，给定路径段的序列： /foo 、、 /bar baz 、 path.resolve('/foo', '/bar', 'baz') /bar/baz 'baz' '/bar' + '/' + 'baz'
- 如果在处理完所有给定 path 段后，尚未生成绝对路径，则使用当前工作目录。
- 生成的路径被规范化，尾部斜杠被删除，除非 path 解析为根目录。
- 零长度 path 段将被忽略。
- 如果未 path 传递任何段， path.resolve() 则返回当前工作目录的绝对路径。

```js
path.resolve("/foo/bar", "./baz");
// Returns: '/foo/bar/baz'

path.resolve("/foo/bar", "/tmp/file/");
// Returns: '/tmp/file'

path.resolve("wwwroot", "static_files/png/", "../gif/image.gif");
// If the current working directory is /home/myself/node,
// this returns '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

## 更多

更多的方法,参考[官网](https://nodejs.org/docs/latest/api/path.html)
