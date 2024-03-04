# webpack

## 为什么需要打包工具
    解决开发与生产的矛盾
1. 开发的时候我们为了方便以及解耦，我们会使用模块化的思想进项开发，但是浏览器自身是无法解析模块化的，所以就需要使用打包工具将我们的在开发阶段的写代码合成一个文件
2. 我们在开发的时候会使用很多的框架vue react 或者新的语法es6之类的，但是浏览器并不认识这些语法，浏览器值认识js，所以就需要打包工具将我们的代码打包成浏览器认识的语法，

## 构建工具帮我们做了什么

编译浏览器无法理解的东西：es6、ts、vue文件等
下面是通过插件或者loader来完成的
代替一些人工操作：文件合并与拆分、图片压缩、资源处理
帮助开发：开发模式

webpack会识别项目里面各个文件的依赖关系，并且根据这些依赖关系将所有的文件打包成一个js文件

新建一个空的项目文件夹，运行npm init -y生成package.json文件

安装webpack
npm install webpack webpack-cli -g

在项目中新建一个文件：webpack.config.js是webpack的打包配置文件，默认打包是根目录下的这个文件
也可以命名为其他的文件。但是打包的时候需要用命令指定配置文件：webpack --config webpack.config1111.js

webpack.config.js的基本配置
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
  resolve:{

  },
  devServer:{

  },
//   压缩相关
  optimization:{},
//   loader的写法：module对象黄总，使用rules数组包裹，里面一个对象就是一个loader
  module:{
    rules:[
        // loader格式，test表示匹配什么文件，loader表示使用那个loader
        {
            test:/\.js$/,
            // loader:"babel-loader",
            // use:[],
            use:{
                loader:"babel-loader",
                options:{
                    // presets:
                }
            }

        },
    ]
  },
//   插件:用数组装，所有的插件都要用new plugins注册
plugins:[
    // new plugins(),
]
};

```

介绍webpack的几个基本配置



preset安装
npm install @babel/preset-env --save-dev


eslint安装
npm insatll eslint eslint-webpack-plugin
引入注册plugin
const eslintplugin = require..
plugins:[
    new eslintplugin()
]

eslint的配置文件可以选择在config文件里面写，但是可能会哟冗余
所以我们新建一个我呢间专门来做eslint的配置文件：eslintrc.js
```js
module.exports = {
    env:{

    },
    extends:[

    ],
    plugions:[

    ],
    parserOptions:{

    },
    rules:{

    }
}
```


## loader的本质
本质是一个方法，该方法接收要处理的资源的内容，处理完后给出内容，作为打包结果