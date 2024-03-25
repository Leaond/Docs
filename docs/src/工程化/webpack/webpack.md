# webpack

[webpack](https://www.webpackjs.com/) 是一个用于现代 JavaScript 应用程序的 `静态模块打包工具`。当 webpack 处理应用程序时，他会在内部从 一个或多个入口构建 依赖图。然后将你在项目里面所需的每一个模块组合成一个或多个 bundles，他们均是静态资源，用于展示你的内容。

:::tip 依赖图 (dependency graph)
每当一个文件依赖另一个文件时，webpack 都会将文件视为直接存在 依赖关系。这使得 webpack 可以获取非代码资源，如 images 或 web 字体等。并会把他们作为 依赖 提供给应用程序。

当 webpack 处理应用程序时，它会根据 命令行参数中 或 配置文件中 定义的模块列表开始处理。从 入口 开始，webpack 会递归的构建一个 依赖关系图，这个依赖图包含着应用程序中所需的每个模块，然后将所有模块打包为少量的 bundle(通常只有一个),可由浏览器加载。
:::

## 为什么需要打包工具?

解决开发与生产的矛盾

1. 开发的时候为了方便以及解耦或者其他原因，我们会使用模块化的思想进行开发，将代码拆分成一个个模块。但是浏览器自身是无法解析模块化的，所以就需要使用打包工具将我们的在开发阶段的写代码合成一个或多个浏览器能解析的文件。
2. 我们在开发的时候会使用很多的框架 vue、react 或者新的语法(es6 之类的)，但是浏览器并不认识这些语法也不能识别这些后缀的文件，浏览器只能够解析 js 文件，这时候就需要打包工具将我们的代码打包成浏览器认识的语法。

## webpack 的相关概念

下面将对 webpack 的一些核心概念进行梳理。

## 入口(entry)

入口起点(entry point)指示 webpack 应该使用哪个模块，来作为 webpack 构建其内部关系依赖图的开始。进入入口起点后，webpack 会找出有哪些模块或库是入口起点依赖的。

入口起点的默认值是 `./src/index.js`,我们也可以在` webpack configuration` 中配置 entry 属性，来指定一个或多个起点。

### 简写语法

```js
// webpack.config.js
const path = require("path");

module.exports = {
  // 修改入口文件
  entry: "./path/to/my/entry/file.js",

  // 配置多个入口文件
  entry: ["./src/js/index.js", "./src/js/add.js"],

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "my-first-webpack.bundle.js",
  },
};
```

### 对象语法

entry: `{ <entryChunkName> string | [string] } | {}`;

webpack.config.js

```js
module.exports = {
  entry: {
    app: "./src/app.js",
    adminApp: "./src/adminApp.js",
  },
};
```

### 对象语法的配置属性

用于描述入口的对象。你可以使用如下属性：

- `dependOn`: 当前入口所依赖的入口。它们必须在该入口被加载前被加载。

- `filename`: 指定要输出的文件名称。

- `import`: 启动时需加载的模块。

- `library`: 指定 library 选项，为当前 entry 构建一个 library。

- `runtime`: 运行时 chunk 的名字。如果设置了，就会创建一个新的运行时 chunk。在 webpack 5.43.0 之后可将其设为 false 以避免一个新的运行时 chunk。

- `publicPath`: 当该入口的输出文件在浏览器中被引用时，为它们指定一个公共 URL 地址。请查看 output.publicPath。

### 应用场景

我们可以使用多入口配置对象，分离我们应用程序和第三方库的入口，也可以配置多页面应用。

## 输出(output)

output 属性可以告诉 webpack 在哪里输出他所创建的 bundle，以及如何命名这些文件。主要输出文件的默认值是 `./dist/main.js`,其他生成文件默认放置在`./dist`文件夹中。
我们也可以通过配置来指定 output 字段。

可以通过配置 output 选项，告知 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 entry 起点，但只能指定一个 output 配置。

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

上面的代码中，我们通过 output.filename 和 output.path 属性，来告诉 webpack bundle 的名称，以及我们想要 bundle 生成(emit)到哪里。

## loader

webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱自用的自带能力。loader 能够去处理其他类型的文件，并将他们转换为有效 `模块`,即 告诉 webpack 某种类型的文件应该使用什么 loader 转换成什么样子。以提供应用程序使用，以及被添加到依赖图中。

:::tip 模块
在模块化编程中，开发者将程序分解为功能离散的 chunk，并称之为 模块。

每个模块都拥有小于完整程序的体积，使得验证、调试及测试变得轻而易举。 精心编写的 模块 提供了可靠的抽象和封装界限，使得应用程序中每个模块都具备了条理清晰的设计和明确的目的。
:::

loader 用于对模块的源代码进行转换。loader 可以使我们在 import 或 "load(加载)" 模块时 预处理文件。因此，loader 类似于其他构建工具中 任务(task)，并提供了处理前端构建步骤的得力方式。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许我们直接在 JavaScript 模块中 import CSS 文件！

例如：我们需要使用 loader 告诉 webpack 需要加载 css 文件，或者将 TS 转为 JS。

```js
// 1.首先安装相应的loader。
npm install --save-dev css-loader ts-loader

// 2.然后配置，告诉webpack对每个.css文件使用css-loader，对所有的.ts文件使用ts-loader
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
};
```

在 webpack 的配置中，loader 有两个属性：

- `test`:识别出那些文件会被转换
- `use`:定义在进行转换时，应该使用哪个 loader。
- `loader`:loader 和 use 是同一个意思，但是 loader 后面只能跟字符串，而 use 后面可以跟配置对象。

use 属性后面可以跟简单的字符串，也可以跟一个配置对象，进行更多的自定义配置，同时也可以跟一个数组，表示针对某一类文件需要用到多个 loader，多个 loader 的执行顺序是 从右到左，从下到上。

```js
// 官方示例
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

上面的代码中，从 sass-loader 开始执行，然后继续执行 css-loader，最后以 style-loader 为结束。

```js
// webpack.config.js
const path = require("path");

module.exports = {
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  // loader配置
  // 下面对一个单独的module对象定义了 rules 属性，里面包含两个必须属性：test 和 use。
  module: {
    // 这句话的意思是，当碰到 在require或者import语句中被解析为 '.txt'的路径时，在打包之前，先 使用 raw-loader 转换一下。
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
};
```

::: warning
使用正则表达式匹配文件时，你不要为它添加引号。也就是说，/\.txt$/ 与 '/\.txt$/' 或 "/\.txt$/" 不一样。前者指示 webpack 匹配任何以 .txt 结尾的文件，后者指示 webpack 匹配具有绝对路径 '.txt' 的单个文件; 这可能不符合你的意图。
:::

## 插件(plugin)

loader 用于转换某些类型的模块，插件目的在于解决 loader 无法实现的其他事。插件可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量。

如果想要使用一个插件，我们只需要使用`require()`引入，然后把他添加到`plugins`数组中。大多数的插件可以通过选项(option)自定义。我们也可以在一个配置文件中多次使用同一个插件，这个时候就需要使用 `new` 操作符来创建一个插件实例。

```js
// webpack.config.js
// 引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack"); // 用于访问内置插件

module.exports = {
  // 配置loader
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
  // 创建插件实例
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
```

在上面的代码中，html-webpack-plugin 为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中。

## 模式(mode)

通过选择 `development`，`production` 或 `none` 之中的一个，可以来设置 mode 参数，我们可以启用 webpack 内置在相应环境下的优化。默认值是 development。

语法

```js
string = 'production': 'none' | 'development' | 'production'
```

- `development`：会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development. 为模块和 chunk 启用有效的名。
- `development`：会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。为模块和 chunk 启用确定性的混淆名称，FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin 和 TerserPlugin 。
- `none`：不使用任何默认优化选项。

```js
module.exports = {
  mode: "production",
};

// 或者从CLI参数中传递
webpack --mode=development
```

以上就是针对 webpack 的各项基本配置的一个简单介绍。更多详细的配置请参考[webpack 中文网](https://www.webpackjs.com)

## webpack 项目实战

1. 新建一个空的项目文件夹，运行 `npm init -y` 生成 `package.json` 文件

2. 全局安装 webpack 以及 webpack 脚手架 , `npm install webpack webpack-cli -g`.安装完成后我们可以使用 `webpack -v`来查看 webpack 的版本。

3. 在项目中新建一个文件：`webpack.config.js` 作为 webpack 的打包配置文件，默认打包是根目录下的这个文件。我们也可以命名为其他的文件。但是打包的时候需要用命令指定配置文件，如：`webpack --config webpack.config1111.js`

webpack.config.js

```js
// 一定要使用commonjs语法
module.exports = {
  // webpack4之后需要指定开发模式mode:"development" | "production" | "none"
  mode: "development",
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
  module: {},
  //   插件:用数组装，所有的插件都要用new plugins注册
  plugins: [
    // new plugins(),
  ],
};
```

现在在项目里面分别创建几个 js 文件用来做测试

app.js

```js
import b from "./a";
() => {
  let a = 23;
  console.log("=====>>> ", b);
  console.log("=====>>> ", a);
};
```

a.js

```js
let b = 3;
console.log("=====>>> ", b);
export default b + 1;
```

4. 上面对 webpack 进行了简单的配置，包含了 webpack 的主要配置项，配置完成之后我们就可以进行打包了。运行`webpack`命令就能打包成功了。

## babel-loader 的使用

babel-loader 是用来将 ES6 的语法转换成 ES5 的一个 loader，但是其 babel-loader 本身是不会做编译的，它仅仅是相当于一个接口，实际上去调用 `@babel/core` 这个核心进行编译的。

安装：`npm install babel-loader @babel/core --save-dev`

配置

```js
 rules: [
      // loader格式，test表示匹配什么文件，loader|use 表示使用哪个loader处理这种文件
      {
        test: /\.js$/,
        // loader:"babel-loader",
        // use:[],
        use: {
          loader: "babel-loader",
          // loader的配置
          options: {
          },
        },
      },
    ],
```

完成上面的配置之后，我们可以打包测试一下：发现打包结果并没有将 ES6 语法转换成 ES5 的语法。原因是 这个转换的语法规则有很多，然而这个 loader 并不知道使用哪种规范，所以我们还需要指定使用哪一种规范进行转换。

安装 `babel/preset-env`: `npm install @babel/preset-env --save-dev`

配置

```js
    rules: [
      // loader格式，test表示匹配什么文件，loader表示使用那个loader
      {
        test: /\.js$/,
        // loader:"babel-loader",
        // use:[],
        use: {
          loader: "babel-loader",
          // loader的配置
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: [">1%", "last 2 versions", "not ie<=8"],//告诉loader，处理规则： 要支持占有率大于1%的浏览器，支持所有浏览器最近的两个版本，不支持ie8及以下的浏览器
                  },
                },
              ],
            ],
          },
        },
      },
    ],
```

配置完后进行打包，可以发现 我们在 js 里面使用的 箭头函数和 let 语句，已经被打包转成 ES5 的 函数 和 var 了。

在实际项目中，我们不会直接在 webpack.coinfig.js 这个文件里面去写这么多的 loader 配置项，这样会显得很繁琐。通常情况下，我们会在项目的根目录下面新建一个 JSON 格式的文件：`.babelrc`，表示 babel-loader 的配置文件.

.babelrc

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "browsers": [">1%", "last 2 versions", "not ie<=8"] //告诉loader，处理规则： 要支持占有率大于1%的浏览器，支持所有浏览器最近的两个版本，不支持ie8
        }
      }
    ]
  ]
}

```

## Eslint 使用

Eslint 是用来对编码规范的一套准则，在 webapck3、webapck4 中我们需要使用 `Eslint-loader` 进行配置，但是在 webpack5 中这个 loader 已经废弃.我们需要使用 `Eslint-webpack-plugin`这个插件来定义规范。eslint 本身是不做代码规范的，我们需要根据项目里面每个成员的开发习惯做出相应的配置来规范我们的开发规范.比如一些常见的：不准使用 console、换行有几个空格等。

安装：`npm install eslint eslint-webpack-plugin --save-dev`
引入和使用

webpack.comfig.js

```js
// 引入eslint插件
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
...

// 注册插件
plugins: [
    new ESLintWebpackPlugin(),
  ],
```

在注册插件的时候，我们可以在 `new ESLintWebpackPlugin({})`传入一个配置对象对插件进行配置，但是一般的做法是新建一个 `.eslintrc.js` 文件作为 eslint 的配置文件.

.eslintrc.js

```js
module.exports = {
  // 配置环境
  env: {
    // 因为我们的代码实在浏览器上面去运行的，所以需要配置 browser为true，这样我们就可以使用一些浏览器的全局环境，比如:window，document等，
    browser: true,
    node: true, //如果设置为node为true，则表示在node环境下运行，那么我们就不能使用window和等浏览器的全局变量
    es2021: true, //表示当前项目的es环境是一个2021的语法
  },
  // 继承：如果我们不想一条条的写eslint的配置，我们就可以使用继承的方式，使用一些已经配置好了的规则
  extends: [],
  // 插件：
  plugins: [],
  // 语法解析的配置
  parserOptions: {
    ecmaVerson: 6, //ecma的版本是ecma 6
    sourceType: "module", //模块化的语法是module
    // 一些ecma的特性
    ecmaFeature: {
      jsx: true, //如果项目里面使用了jsx语法，则设置为true，那么eslint就会去检查jsx的语法
    },
  },
  // 重中之重，定义eslint的具体检查细节，需要的时候去官网查看规则
  rules: {
    // "no-console": 2,
  },
};
```

上面我们队 eslint 进行了基本的配置，比如我们在 rulues 中配置了`"no-console":2`(项目里面如果使用了 console 语句就会直接抛出错误)， 我们可以使用 `webpack-dev-server` 来打包检查一下。

比较推荐的两个现成的规范：`eslint-config-standard` 和 `eslint-cionfig-airbnb`，我们只需要安装后，继承这两个插件的规范就可以使用这两个插件的规范了。

安装：`npm install eslint-config-standard --save-dev`

.eslintrc.js

```js
  extends: [
    "standard"
  ],
  ...
    rules: {
      // 如果对现成的配置不满意的，我们还可以在rules中重新配置，他会覆盖掉上面插件的同名配置
    },
```

针对 Vue 的语法，可以继承 `eslint-plugin-vue` 这个插件的配置来完成检查。

安装 ：`npm install eslint-plugin-vue --save-dev`

配置

```js
  extends: [
    "standard",
    "plugin:vue/strongly-recommended"
  ],
  plugins: [
"vue"
  ],
```

## CSS 与资源文件处理

### CSS 文件处理

由于 webpack 也不认识 css 类型的文件，这个时候我们首先需要使用 `css-loader` 来让 webpack 识别 css 文件，然后使用 `style-loader`(这种方式是把 css 的内容写入到 js 文件中，然后再在 html 中使用 script 标签插入) 或者 `mini-css-extra-plugin`(将 css 文件作为单独文件进行打包)，这两种方案来处理 css 文件.

例如：我们在项目里面新建一个 css 文件，并引入到 app.js 中，然后打包。这个时候项目会报错：不能识别到 css 格式的文件。

安装 ：`npm install css-loader style-loader mini-css-extract-plugin --save-dev`

webpack.config.js

```js
// 配置 css-loader
{
        test: /\.css/,
        use: ['css-loader']
      }
```

完成上面的配置之后 webpack 能够识别到 css 文件了，因此打包不会报错，也能够将 css 文件进行打包。但是此时我们并没有告诉 webpack 如何去处理 css 文件，，所以打包后的文件里面并没有对 css 文件进行处理。这个时候就需要配置 `style-loader`

```js
{
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      }
```

上面的代码是告诉 webopack 先用 css-loader 识别 css 文件，然后在使用 style-loader 处理 css 文件.这个时候进行打包，webpack 就能够正确识别到 css 文件，并且也能够将 css 文件进行打包处理了，通过对打包后的文件观察可以发现，由于加入了了 css 代码打包后的文件会比之前大了很多。

通常，在项目配置文件中，我们一般会将 css 文件单独打包成 css 文件，而不是向上面这样使用 scrpit 标签注入。所以我们还需要使用 `mini-css-extract-plugin` 这个插件进行配置.

webpack.config.js

```js
// 引入 mini-css-extract-plugin
const minicssplugin = require('mini-css-extract-plugin')

// 注册
plugins: [
  new minicssplugin({
    filename: 'text.bundle.css'
  })
]

// 使用
{
  test: /\.css/,
  use: [minicssplugin.loader, 'css-loader']
}
```

完成上面的配置之后，再进行打包，这个时候的 css 文件就不会使用 scrpit 标签在 html 中引入了，而是打包成了一个单独的 css 文件，叫做 text.bundle.css。

如果我们在项目里面使用的是 css 预处理语言 `less` 和 `sass`，那么根据同样的道理，我们需要使用 less 或者 sass 相关的 loader 将 sass 和 less 文件转成 css 文件，然后在使用上面的 loader 或者插件进行配置。

安装: `npm install less less-loader --save-dev`

使用

```js
{
  test: /\.less/,
  use: [minicssplugin.loader, 'css-loader','less-loader']
}
```

这个时候我们就能够对 less 文件进行打包处理了，但是我们打包后的文件并没有对 css 文件进行压缩，所以这个时候还需要配置压缩插件.

安装: `npm installl css-minimizer-webpack-plugin --save-dev`

注册

```js
plugins: [
  // new plugins(),
  new minimizer(),
  new minicssplugin({
    filename: "text.bundle.css",
  }),
];
```

完成上面的配置后我们再打包这个时候 css 文件就是已经被压缩过后的代码了。

### 资源文件的处理

为了让 webpoak 能够识别到资源文件，如 MP3，MP4，img 等，在 webapck3 和 webapck4 中我们还需要使用 `file-loader` 和 `url-loader` 来进行处理，file-loader 能够识别处理文件，url-loader 是对 file-loader 的继承，他提供了额外的功能，例如:转 base64 或者 hash 等。但是在 webpack 5 中就已经自带了相关的处理方式，我们就不需要再需要单独使用别的 loader 来处理了。

### 使用 loader 插件处理

安装：`npm install file-loader url-loader --save-dev`

配置

```js
// 例如我们配置图片文件
{
  test: /\.(png|gif|svg|jpeg|jpe)$/,
  use: 'url-loader',
  options: {
    limit: 5000,
    name: '[name].[hash].[ext]'
  }
}
```

上面的代码告诉 webpack，遇到上面配置的文件的后缀的时候使用 url-loader 进行处理，同时配置，小于 5000kb 的文件进行转 base64，文件的名字是 文件名+哈希值+后缀。

### webpack5 自带的 loader 处理

```js
{
  test: /\.(png|gif|svg|jpeg|jpe)$/,
  type: 'asset/inline',
}
```

- type: 'asset/inline': 表示所有的图片都打包成 base64
- type: 'asset/resource': 表示所有的静态文件都单独打包成文件

一般为了自定义写法，都会按照下面的方式写

```js
 {
       test: /\.(png|gif|svg|jpeg|jpe)$/,
       type: 'asset',//通用
       parser: {
         dataUrlCondition: {
           maxSize: 5000
         }
       },
       generator: {
         filename: '[name].[hash].[ext]'
       }
     }
```

## loader 的本质

loader 本质是一个方法，该方法接受到需要处理的资源的内容，处理完后返回内容作为打包后的文件。

## html 的处理

## 代码分割

无论是单入口文件还是多入口文件，我们在打包后所有的引入和资源文件都会被打包成一个或者多个文件中。这样会导致打包后的文件体积过大，或者资源重复加载的问题，不仅仅会导致首屏加载的资源过多，导致首屏时间过长，也会导致请求服务器资源重复，增加服务器压力等问题。下面我们将针对 单入口文件 和 多入口文件 分别进行优化。

### 单入口的处理

单入口意味着我们所有的代码(包括业务代码、静态资源、第三方库等)在一个文件里面，这样会导致打包后的代码体积过大，代码冗余。所以我们需要把一些不是首屏马上用到的代码拆分出来，这样可以加快首屏速度。

例如：我们在项目中 将上面的 a.js 采用异步引入的方式

app.js

```js
import "./test.css";
setTimeout(() => {
  // import()导入返回的也是一个Promise值，res就是b里面的内容对象
  import("./a").then((res) => {
    console.log(res);
    console.log(res.default);
  });
}, 3000);
```

通过上面我们使用定时器异步引入文件， 他会在页面加载后的 3s 后才开始加载，并且在加载完之后会执行 then 里面的回调。这里打包之后我们的 a.js 文件会被单独打包成一个文件，比如我在测试的时候名字叫做：a_js.989f.bundle.js.
:::tip
上面的配置，a.js 文件打包后名字除了正常的哈希值之外，在名字后面还有 \_js 这种字符串，我们可以使用 `魔法注释` 来更改打包后的名字。

```js
import "./test.css";
setTimeout(() => {
  import(/* webpackChunkName: "a" */ "./a").then((res) => {
    console.log(res);
    console.log(res.default);
  });
}, 3000);
```

打包后的 a 的名字就会没哟前面的 js 样式了：a.ee2c.bundle.js。
:::

另外一种异步引入的方式是 `require.ensure`

```js
// require.ensure()接收3个参数，第一个参数是后面回调函数中需要的依赖数组，第二个参数是引入后的回调，第三个参数是打包的名字。
  require.ensure([], () => {
    const b = require('./a')
    console.log(b)
    console.log(b.default)
  },"a")
}, 3000)
```

### 多入口处理

多入口的问题主要是重复加载同一段逻辑代码，比如在 app.js 中使用了 b.js，在 app2.js 中也是用了 b.js，那么在打包的时候，两个 app 的文件都会将 b.js 打入自己的文件中，在加载页面的时候，也会请求两次 b.js 资源，这个时候理想的打包方式是 将公共的文件都单独打包出来，这样在 app.js 中第一次加载资源的时候，就会缓存 b.js，app2.js 中就可以直接使用缓存。

app.js

```js
import b from "./a";
import "./test.css";
() => {
  const a = 23;
  console.log("=====>>> ", b);
  console.log("=====>>> ", a);
};
```

app2.js

```js
import b from "./a";
import "./test.css";
() => {
  const a = 23;
  console.log("=====>>> ", b);
  console.log("=====>>> ", a);
};
```

上面的代码进行打包后，两个打包后的入口文件都会引入 a.js，会造成多次引入。

```js
  //   压缩相关
  optimization: {
    splitChunks: {
      chunks: 'all', // chunks表示对什么类型的chunks进行单独打包，all：全部类型，async表示异步的chunks，initial表示初始化的chunks
      minChunks: 2,//出现次数超过2次，就进行单独打包
      minSize: 0,//单独打包的最小大小,这里我们做测试就设置成 0
      name:"a"，//拆分后chunks的名字
    }
  },
```

上面是使用 [splitChunksPlugin](https://www.webpackjs.com/plugins/split-chunks-plugin/) 对拆分的几个基本配置。完成上面的代码之后，a.js 就会被单独打包成一个 chunk，在第一次加载之后就会缓存，第二次使用会直接使用缓存数据，不会再次进行加载。

### 第三方资源(vendor) 和 运行时代码(runtime) 的处理

不论是单文件入口还是多文件入口，在项目中我们经常需要将 第三方库(vendor)和 一些运行时的代码(runtime)，单独打包成 chunk，所以我们还需要设置配置。

分割第三方库和业务代码

```js
 optimization: {
    splitChunks: {
      chunks: 'all', // all,sync,initial
      cacheGroups: {
        // 第三方库的打包规则
        vendor: {
          // 匹配nodemodules下面的文件
          test: /[\\/]node_modules[\\/]/,
          // 打包名字
          filename: 'vendor.js',
          // 打包chunks的类型
          chunks: 'all',
          // 最小出现次数，设置为1次，因为第三方库一般情况下只会引入一次
          minChunks: 1
        },
        // 除了第三方库的业务代码打包规则，比如之前用到的 a.js,c.jsjs都会打包到common.js
        common: {
          filename: 'common.js',
          chunks: 'all',
          minChunks: 2,
          minSize: 0
        }
      }
    }
  },
```

runtime 代码分割

::: tip webpack 相关杂项

###### hash 值的作用

在每次使用 webpack 打包之后，打包后的 chunks 名都会拼接上一个统一的 hash 值，这样的作用是当文件内容更改了之后，打包生成的的 hash 值不一样，名字也就不一样，这样在使用资源的时候，浏览器发现名字不一样就不会使用缓存，而是去重新请求资源。

使用 hash 值的时候，一般是一次打包生成一个 hash 值，每个 chunks 的 hash 值都一样的，这样就会导致一个问题，当只改动了某一个文件的时候，会导致整个打包的 hash 值发生改变，也就会导致所有的 chunks 名字发生了改变，所以所有的文件都会重新加载新的资源，这样会导致资源消耗。这个时候我们就需要使用 chunkhash 了(在 webpack.config.js 中把`[name].[hash:4].js`替换成`[name].[chunkhash:4].js`)，这个 chunkhash 是跟文件绑定的，每个文件都会生成一个 hash 值，只有改变的文件 hash 值才会改变，这样在请求的时候只会请求改变的文件。

###### resolve 的作用

resolve()在项目中常用的配置就是配置路径别名和批量引入。

resolve.alias：创建 import 或 require 的别名，来确保模块引入变得更简单。
```js
resolve: {
    alias: {
      '@': path.resolve('./src'), // 使用 @ 代替 src
    },
},
```

批量引入

require.context 批量引入指定文件夹下的所有文件.例如我们要引入 mode 文件夹下面的所有文件，按照 es6 的语法我们需要一个一个使用 imoirt 引入，但是我们可以用这个方法进行引入

```js
// 第一个参数表示要让引入的文件加名字，第二个参数表示目标文件夹下如果有文件夹是否递归引入，但3个参数表示引入的匹配规则，这里定义的是引入西面的js文件
const r = require.context("./mode", false, /.js/);
r.keys().forEach((item) => {
  console.log(r(item).default);
});
```

有的时候我们希望我们打包后的文件按照文件类型放到不同的文件夹下面(比如将 css 类型文件放到 css 文件夹下面，而不是统一的放到 dist 文件夹下面)，这个时候我们只需要在所有的 filename 后面文件名前面加上文件夹名字就好了，webpack 会自动创建这个文件夹，并且会把对应的文件放到文件夹下面，如：`filename:"./css/[name].[hash].css"`。
:::

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
