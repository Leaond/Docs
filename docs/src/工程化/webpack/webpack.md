# webpack

webpack 是一个用于现代 JavaScript 应用程序的 `静态模块打包工具`。当 webpack 处理应用程序时，他会在内部从 一个或多个入口构建 依赖图。然后将你在项目里面所需的每一个模块组合成一个或多个 bundles，他们均是静态资源，用于展示你的内容。

:::tip 依赖图 dependency graph
每当一个文件依赖另一个文件时，webpack 都会将文件视为直接存在 依赖关系。这使得 webpack 可以获取非代码资源，如 images 或 web 字体等。并会把他们作为 依赖 提供给应用程序。

当 webpack 处理应用程序时，它会根据命令行参数中或配置文件中定义的模块列表开始处理。从 入口 开始，webpack 会递归的构建一个 依赖关系图，这个依赖图包含着应用程序中所需的每个模块，然后将所有模块打包为少量的 bundle， 通常只有一个 ，可由浏览器加载。
:::

## 为什么需要打包工具

解决开发与生产的矛盾

1. 开发的时候我们为了方便以及解耦或者其他原因呢，我们会使用模块化的思想进行开发，将代码拆分成一个个模块。但是浏览器自身是无法解析模块化的，所以就需要使用打包工具将我们的在开发阶段的写代码合成一个或多个浏览器能解析的文件。
2. 我们在开发的时候会使用很多的框架 vue、react 或者新的语法(es6 之类的)，但是浏览器并不认识这些语法也不能识别这些后缀的文件，浏览器只能够解析 js 文件，这时候就需要打包工具将我们的代码打包成浏览器认识的语法。

## webpack 的相关概念

### 入口(entry)

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为 webpack 构建其内部关系依赖图的开始。进入入口起点后，webpack 会找出有哪些模块或库是入口起点依赖的。

默认值是`./src/index.js`,我们也可以在 webpack configuration 中配置 entry 属性，来指定一个或多个起点。

```js
// webpack.config.js
module.exports = {
  entry: "./path/to/my/entry/file.js",
};
```

### 输出(output)

output 属性可以告诉 webpack 在哪里输出他所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 `./dist/main.js`,其他生成文件默认放置在`./dist`文件夹中。
我们也可以通过配置来指定 output 字段。

```js
// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./path/to/my/entry/file.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
};
```

### loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱自用的自带能力。loader 能够去处理其他类型的文件，并将他们转换为有效 模块。以提供应用程序使用，以及被添加到依赖图中。

在 webpack 的配置中，loader 有两个属性：

- test 属性，识别出那些文件会被转换
- use 属性，定义在进行转换时，应该使用哪个 loader。

```js
// webpack.config.js
const path = require("path");

module.exports = {
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  // 下面对一个单独的module对象定义了 rules 属性，里面包含两个必须属性：test 和 use。
  module: {
    // 这句话的意思是，当碰到 在require或者import语句中被解析为 '.txt'的路径时，在打包之前，先使用 raw-loader 转换一下。
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
};
```

### 插件(plugin)

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

如果想要使用一个插件，我们只需要`require()`它，然后把他添加到`plugins`数组中。多数插件可以通过选项(option)自定义。我们也可以在一个配置文件中多次使用同一个插件，这个时候就需要使用 `new` 操作符来创建一个插件实例。

```js
// webpack.config.js
// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // 用于访问内置插件

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
  // 创建插件实例
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
```

### 模式(mode)

通过选择 `development`，`production` 或 `none` 之中的一个，可以来设置 mode 参数，我们可以启用 webpack 内置在相应环境下的优化。默认值是 development。

```js
module.exports = {
  mode: "production",
};
```

以上就是针对 webpack 的各项基本配置的一个简单介绍。更多详细的配置请参考[webpack 中文网](https://www.webpackjs.com)

## 一个简单的例子

1. 新建一个空的项目文件夹，运行 `npm init -y` 生成 `package.json` 文件

2. 全局安装 webpack 以及 webpack 脚手架 , `npm install webpack webpack-cli -g`

3. 在项目中新建一个文件：webpack.config.js 作为 webpack 的打包配置文件，默认打包是根目录下的这个文件。也可以命名为其他的文件。但是打包的时候需要用命令指定配置文件：`webpack --config webpack.config1111.js`

webpack.config.js

```js
// 一定要使用commonjs语法
module.exports = {
  // webpack4之后需要指定开发模式mode:"development" | "production" | "none"
  mode: "production",
  // entry指定入口文件、名字
  // entery:'./app.js',
  // entery:['./app.js',...],多入口
  entry: {
    app1: "./app.js",
    // app2:'./app.js'多入口和入口别名
  },
  // 输出配置
  output: {
    // __dirname表示当前目录所在的绝对路径
    path: __dirname + "/dist", //lujng
    filename: "[name].[hash:4].bundle.js", //文件名,这里可以写死，也可以根据入口文件名动态命名,也可以加上hash值
    // filename:'bundle.js'//文件名,这里可以写死，也可以根据入口文件名动态命名
  },
  resolve: {},
  devServer: {},
  //   压缩相关
  optimization: {},
  //   loader的写法：module对象黄总，使用rules数组包裹，里面一个对象就是一个loader
  module: {
    rules: [
      // loader格式，test表示匹配什么文件，loader表示使用那个loader
      {
        test: /\.js$/,
        // loader:"babel-loader",
        // use:[],
        use: {
          loader: "babel-loader",
          options: {
            // presets:
          },
        },
      },
    ],
  },
  //   插件:用数组装，所有的插件都要用new plugins注册
  plugins: [
    // new plugins(),
  ],
};
```

4. 上面对 webpack 进行了简单的配置，配置完成之后我们就可以进行打包了。运行`webpack`命令就能打包成功了。

下面将对上面介绍的每个配置项进行语法介绍

## 入口起点(entry points)

### 单个入口语法

用法：`entry: string | [string]`

```js
// webpack.config.js
module.exports = {
  entry: "./path/to/my/entry/file.js",
};

// 下面是上面写法的完整语法
module.exports = {
  entry: {
    main: "./path/to/my/entry/file.js",
  },
};
```

entry 也可以接受一个文件路径数组，这将创建一个所谓的 "multi-main entry".如果我们想要一次注入多个依赖文件，并且将他们的依赖关系绘制在一个 "chunk" 中时，就可以选择这种配置方式。

```js
// webpack.config.js
module.exports = {
  entry: ["./src/file_1.js", "./src/file_2.js"],
  output: {
    filename: "bundle.js",
  },
};
```

### 对象语法

用法：`entry: { <entryChunkName> string | [string] } | {}`

```js
// webpack.config.js
module.exports = {
  entry: {
    app: "./src/app.js",
    adminApp: "./src/adminApp.js",
  },
};
```

对象语法相比较单个入口的语法要繁琐一些，但是却是最可扩展的方式。
:::tip
`webpack 配置的可扩展`是指，这些配置可以重复使用，并且可以与其他配置组合使用。这是一种流行的技术，用于将关注点从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如 webpack-merge）将它们合并起来。
:::

### 描述入口的对象

通常可以使用下面的属性来描述入口文件对象：

- `dependOn`: 当前入口所依赖的入口。它们必须在该入口被加载前被加载。

- `filename`: 指定要输出的文件名称。

- `import`: 启动时需加载的模块。

- `library`: 指定 library 选项，为当前 entry 构建一个 library。

- `runtime`: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。

- `publicPath`: 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址。请查看 output.publicPath。

## 输出(output)

可以通过配置 output 选项，告知 webpack 如何向硬盘写入编译文件。即使可以存在多个 entry 起点，但是只能指定一个 output 配置。

在 webpack 配置中，output 属性的最低要求是，将他的值设置为一个对象，然后为将输出文件的文件名配置为一个`output.filename`:

```js
module.exports = {
  output: {
    // 将一个单独的 bundle.js，文件输出到dist目录中
    filename: "bundle.js",
  },
};
```

多个入口起点

如果配置中创建出多于一个 "chunk"（例如，使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件），则应该使用 占位符(substitutions) 来确保每个文件具有唯一的名称。

```js
module.exports = {
  entry: {
    app: "./src/app.js",
    search: "./src/search.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
};

// 写入到硬盘：./dist/app.js, ./dist/search.js
```

## loader

loader 用于对模块的源代码进行转换。loader 可以让我们在 import 或者 load 模块时预处理文件。因此，loader 类似于其他构建工具中的 task，并提供了处理前端构建步骤的得力方式。loader 可以将文件从不同的语言 转换为 JavaScript 或将 内联图像 转换为 data URL。

一个栗子：

```js
// 安装css loader
npm install --save-dev css-loader ts-loader

// 在webpack中对loader进行配置
module.exports = {
  module: {
    //指示 webpack 对每个 .css 使用 css-loader，以及对所有 .ts 文件使用 ts-loader
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
};

```

### 使用 loader

在应用程序中，有两种方式使用 loader：

- 配置方式。在 webpack.config.js 文件中指定 loader。
- 内敛方式。在每个 import 语句中显式指定 loader。

#### 配置方式

`module.rules`允许我们在 webpack 配置中指定多个 loader。loader 从`右到左 | 从下到上`的取值/执行。

在下面的示例中，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};
```

#### 内联方式

### loader 特性

- loader 支持链式调用。链中的每个 loader 会将转换应用在已处理过的资源上。一组链式的 loader 将按照相反的顺序执行。链中的第一个 loader 将其结果（也就是应用过转换后的资源）传递给下一个 loader，依此类推。最后，链中的最后一个 loader，返回 webpack 所期望的 JavaScript。
- loader 可以是同步的，也可以是异步的。
- loader 运行在 Node.js 中，并且能够执行任何操作。
- loader 可以通过 `options` 对象配置（仍然支持使用 `query` 参数来设置选项，但是这种方式已被废弃）。
- 除了常见的通过 `package.json` 的 `main` 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块。
- 插件(plugin)可以为 loader 带来更多特性。
- loader 能够产生额外的任意文件。

### 解析 loader

loader 遵循标准 模块解析 规则。多数情况下，loader 将从 模块路径 加载。通常是从 npm install node_modules 进行加载。

预期 loader 模块导出为一个函数，并且编写为 Node.js 兼容的 JavaScript。通常使用 npm 进行管理 loader，但是也可以将应用程序中的文件作为自定义 loader。按照约定，loader 通常被命名为 xxx-loader（例如 json-loader）。

## plugin

插件是 webpack 的`支柱功能`。插件目的在于解决 loader 无法实现的其他事。webpacck 提供了很多开箱即用的插件。

### 剖析

`webpack插件`是一个具有`apply()`方法的 js 对象。apply 方法会被 webpack compiler 调用，并且在整个编译生命周期都可以访问 compiler 对象。

```js
// ConsoleLogOnBuildWebpackPlugin.js
const pluginName = "ConsoleLogOnBuildWebpackPlugin";

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log("webpack 构建正在启动！");
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```

### 用法

由于插件可以携带参数/选项，必须在 webpack 配置中，向 plugins 属性传入一个 new 实例。取决于 webpack 的写法，对应有多种使用插件的方式。

### 配置方式

```js
// webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // 访问内置的插件
const path = require("path");

module.exports = {
  entry: "./path/to/my/entry/file.js",
  output: {
    filename: "my-first-webpack.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
};
```

ProgressPlugin 用于自定义编译过程中的进度报告，HtmlWebpackPlugin 将生成一个 HTML 文件，并在其中使用 script 引入一个名为 my-first-webpack.bundle.js 的 JS 文件。

## 模块热替换(HMR - hot module replacement)

模块热替换功能会在应用程序运行过程中，替换、添加或删除模块，而无需重新加载整个页面。

主要是通过以下几种方式，来显著加快开发速度：

- 保留在完全重新加载页面期间丢失的应用程序状态。
- 只更新变更内容，以节省宝贵的开发时间。
- 在源代码中 CSS/JS 产生修改时，会立刻在浏览器中进行更新，这几乎相当于在浏览器 devtools 直接更改样式。

### 如何运行 HMR 的

下面将通过 应用程序、compiler、模块、runtime 这四个角度来了解 HMR 的工作原理。

#### 应用程序

通过以下步骤，可以做到在应用程序中置换模块：

1. 应用程序要求 HMR runtime 检查更新。
2. HMR runtime 异步地下载更新，然后通知应用程序。
3. 应用程序要求 HMR runtime 应用更新。
4. HMR runtime 同步地应用更新。

可以通过设置 HMR，以使此进程自动触发更新，或者可以选择要求在用户交互时进行更新。

#### compiler

除了普通资源，compiler 需要发出 "update"，将之前的版本更新到新的版本。update 由两部分组成：

1. 更新后的 manifest(JSON)
2. 一个或多个 updated chunk(JavaScript)

manifest 包括新的 compilation hash 和所有的 updated chunk 列表。每个 chunk 都包含着全部更新模块的更新代码。compiler 会确保在这些构建之间的模块 ID 和 chunk ID 保持一致。通常将这些 ID 存储在内存中，但是也可能将他们存储在一个 JSON 文件中。

#### 模块

HMR 是可选功能，只会影响包含 HMR 代码的模块。

#### runtime

## 内部原理

打包，是指处理某些文件并将其输出为其他文件的能力。但是在输入和输出之间，还包括有 模块、入口起点、chunk、chunk 组和许多其他中间部分。

项目中使用的每个文件都是一个模块。通过项目引用，这些模块会行程一个图数据结构。在打包过程中，模块会被合并成 chunk。chunk 合并成 chunk 组，并形成 一个通过模块相互连接的图。

```js
// ./webpack.config.js
// 下面的代码会创建一个名为main的chunk组(main是入口起点的默认名称)。这个chunk组包含 ./index.js模块。
module.exports = {
  entry: "./index.js",
};

// 下面的代码会创建两个名为home和about的chunk组。每个chunk组都有一个包含一个模块的chunk：./home.js 对应 home，./about.js 对应 about。
module.exports = {
  entry: {
    home: "./home.js",
    about: "./about.js",
  },
};
```
