
# 项目的搭建：
## 初始化项目
  1. 安装pnpm，并且使用pnpm进行项目的创建
  ```js
    npm i -g pnpm
    pnpm create vite
    npm create vite@latest
  ```
  完成上面的步骤就创建了一个标准的基本项目了，然后根据终端的提示，进入项目文件夹，运行项目就也可以在浏览器中进行访问了。
## 项目插件的配置
  下面是插件的安装以及相关的配置
  ### esLint
  安装语法检测工具[eslint](http://eslint.cn/)，并且初始化配置文件
  ```js
  //安装eslint
    pnpm i eslint -D
    // 初始化eslint，执行完下面的语句会生成一个.eslint.cjs的配置文件
    npx eslint --init
  ```
  在上述的步骤完成后，会在项目的根文件夹中多一个eslint的配置文件.eslintrc.cjs，同时也会多一个tsconfig.json的文件
```json
// .eslint.cjs
    module.exports = {
    // eslint的工作环境
    "env": {
        "browser": true,//在浏览器端进行工作
        "es2021": true//校验的是es2021的语法
    },
    // 规则的继承
    "extends": [
        "standard-with-typescript",
        "plugin:vue/vue3-essential"
    ],
    // 为特定的文件指定处理器
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    // 指定解析器选项
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    // 制定其他的插件
    "plugins": [
        "vue"
    ],
    // eslint规则
    "rules": {
    }
}

```
之后再安装vue3环境的代码校验插件，之后对上面的配置文件进行更新：
```json
# 让所有与prettier规则存在冲突的Eslint rules失效，并使用prettier进行代码检查
"eslint-config-prettier": "^8.6.0",
"eslint-plugin-import": "^2.27.5",
"eslint-plugin-node": "^11.1.0",
# 运行更漂亮的Eslint，使prettier规则优先级更高，Eslint优先级低
"eslint-plugin-prettier": "^4.2.1",
# vue.js的Eslint插件（查找vue语法错误，发现错误指令，查找违规风格指南
"eslint-plugin-vue": "^9.9.0",
# 该解析器允许使用Eslint校验所有babel code
"@babel/eslint-parser": "^7.19.1",
```
```js
pnpm install -D eslint-plugin-import eslint-plugin-vue eslint-plugin-node eslint-plugin-prettier eslint-config-prettier eslint-plugin-node @babel/eslint-parser
```

```js
// @see https://eslint.bootcss.com/docs/rules/
//.eslintrc.cjs
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /* 指定如何解析语法 */
  parser: 'vue-eslint-parser',
  /** 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* 继承已有的规则 */
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['vue', '@typescript-eslint'],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/semi': 'off',

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
  },
}
```
在项目的跟文件夹下面创建一个.eslintignore文件，用来设置eslint不进行检测的文件
```js
dist
node_modules

```
package.json新增两个运行脚本
```json
"scripts": {
    "lint": "eslint src",//运行这个命令的时候让eslint去校验src里面的文件是否符合规则
    "fix": "eslint src --fix",//将不符合语法规则的问题进行纠正
}
```
### 配置prettier
eslint针对的是javascript，他是一个检测工具，包含js语法以及少部分格式问题，在eslint看来，语法对了就能保证代码正常运行，格式问题属于其次；
而prettier属于格式化工具，它看不惯格式不统一，所以它就把eslint没干好的事接着干，另外，prettier支持
包含js在内的多种语言。
总结起来，eslint和prettier这俩兄弟一个保证js代码质量，一个保证代码美观。
安装依赖
  ```js
  pnpm install -D eslint-plugin-prettier prettier eslint-config-prettier
  ```
  在根目录下创建.prettierrc.json文件，用来对该插件进行配置
  ```json
  {
    "singleQuote": true,
  "semi": false,
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "ignore",
  "endOfLine": "auto",
  "trailingComma": "all",
  "tabWidth": 2
  }
  
  ```
  创建.prettierignore忽略文件
  ```js
    /dist/*
    /html/*
    .local
    /node_modules/**
    **/*.svg
    **/*.sh
    /public/*
  ```

通过pnpm run lint去检测语法，如果出现不规范格式,通过pnpm run fix 修改
### 配置[stylelint](https://stylelint.bootcss.com/)
stylelint为css的lint工具。可格式化css代码，检查css语法错误与不合理的写法，指定css书写顺序等。
  安装
```js
  pnpm add sass sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```
  .stylelintrc.cjs
```js
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 配置stylelint拓展插件
    'stylelint-config-html/vue', // 配置 vue 中 template 样式格式化
    'stylelint-config-standard-scss', // 配置stylelint scss插件
    'stylelint-config-recommended-vue/scss', // 配置 vue 中 scss 样式格式化
    'stylelint-config-recess-order', // 配置stylelint css属性书写顺序插件,
    'stylelint-config-prettier', // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'],
      customSyntax: 'postcss-scss',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.js',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.ts',
    '**/*.json',
    '**/*.md',
    '**/*.yaml',
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 css 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性(true 为不允许)
    'block-opening-brace-space-before': 'always', //大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭 属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭 属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
}
```

.stylelintignore
```js
  /node_modules/*
/dist/*
/html/*
/public/*
```
1. 新增运行脚本
```json
  "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
```

完成上面的配置之后我们的script会变成这样：
```json
  "scripts": {
    "dev": "vite --open",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src",
    "fix": "eslint src --fix",
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
  },
```


### 配置husky
在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。
要做到这件事情，就需要利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行`pnpm run format`来自动的格式化我们的代码。
1. 安装
  ```js
  pnpm install -D husky
  ```
  2. 执行(在此之前需要将项目与远程仓库进行绑定)
  ```js
  npx husky-init
  ```
  3. 配置

### 配置commitlint
带完善
### 强制使用pnpm包管理器工具
带完善
## 项目集成
  ### 配置[element-plus](https://element-plus.gitee.io/zh-CN/)
  ```js
  pnpm install element-plus @element-plus/icons-vue
  ```
  2. 入口文件main.ts全局安装element-plus,element-plus默认支持语言英语设置为中文
  ```js
  import ElementPlus from 'element-plus';
  import 'element-plus/dist/index.css'
  //@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  app.use(ElementPlus, {
      locale: zhCn
  })
  ```
  3. Element Plus全局组件类型声明
  ```js
   
  ```
  ### src别名的配置
   ```ts
    // vite.config.ts
  import {defineConfig} from 'vite'
  import vue from '@vitejs/plugin-vue'
  import path from 'path'
  export default defineConfig({
      plugins: [vue()],
      resolve: {
          alias: {
              "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
          }
      }
  })
   ```
   ```json
    // tsconfig.json
  {
    "compilerOptions": {
      "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
      "paths": { //路径映射，相对于baseUrl
        "@/*": ["src/*"] 
      }
    }
  }
   ```
### 环境变量的配置
项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。
开发环境（development） 顾名思义，开发使用的环境，每位开发人员在自己的dev分支上干活，开发到一定程度，同事会合并代码，进行联调。
测试环境（testing） 测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试
生产环境（production） 生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境。)
更多的配置可以参考[Vite官方文档](https://cn.vitejs.dev/guide/env-and-mode.html)
注意:一般情况下，一个环境对应一台服务器,也有的公司开发与测试环境是一台服务器！！！
项目根目录分别添加 开发、生产和测试环境的文件!
  ```js
   //.env.development:开发环境
  # 变量必须以 VITE_ 为前缀才能暴露给外部读取
  NODE_ENV = 'development'
  VITE_APP_TITLE = '硅谷甄选运营平台'
  VITE_APP_BASE_API = '/dev-api'
 // .env.production：生产环境
  NODE_ENV = 'production'
  VITE_APP_TITLE = '硅谷甄选运营平台'
  VITE_APP_BASE_API = '/prod-api'
 // .env.test：测试环境
  # 变量必须以 VITE_ 为前缀才能暴露给外部读取
  NODE_ENV = 'test'
  VITE_APP_TITLE = '硅谷甄选运营平台'
  VITE_APP_BASE_API = '/test-api'
  ```

之后再package.json中添加配置文件
  ```json
   "scripts": {
    "dev": "vite --open",
    "build:test": "vue-tsc && vite build --mode test",
    "build:pro": "vue-tsc && vite build --mode production",
    "preview": "vite preview"
  },
  ```
  在项目的任何位置都可以通过通过`import.meta.env`获取环境变量
  ## SVG插件配置
  在开发项目的时候经常会用到svg矢量图,而且我们使用SVG以后，页面上加载的不再是图片资源,这对页面性能来说是个很大的提升，而且我们SVG文件比img要小的很多，放在项目中几乎不占用资源。
  安装依赖
  ```js
  pnpm install vite-plugin-svg-icons -D
  ```
 在`vite.config.ts`中配置插件
 ```ts
 import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
export default () => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  }
}
 ```
 `main.ts`中添加引用
 ```js
 import 'virtual:svg-icons-register'
 ```
 ## 封装SVG的全局组件
 在src/components目录下创建一个SvgIcon文件夹，里面新建一个index.vue组件:
```vue
<!-- index.vue -->
<template>
  <div>
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: '#icon-'
  },
  //svg矢量图的名字
  name: String,
  //svg图标的颜色
  color: {
    type: String,
    default: ""
  },
  //svg宽度
  width: {
    type: String,
    default: '16px'
  },
  //svg高度
  height: {
    type: String,
    default: '16px'
  }

})
</script>
<style scoped></style>
```

在components文件夹目录下创建一个index.ts文件：用于注册components文件夹内部全部全局组件
```ts
import SvgIcon from './SvgIcon/index.vue'
import type { App, Component } from 'vue'
const components: { [name: string]: Component } = { SvgIcon }
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}

```
在main.ts中添加引用
```ts
import gloablComponent from './components/index';
app.use(gloablComponent);
```
## 集成sass
我们目前在组件内部已经可以使用scss样式,因为在配置styleLint工具的时候，项目当中已经安装过sass sass-loader,因此我们再组件内可以使用scss语法！！！需要加上lang="scss"
```vue
<style scoped lang="scss"></style>
```
添加全局的样式
在src/style下面创建index.scss。
引入清楚默认样式
```js
@import reset.scss
```
在main.ts中引入
```ts
import '@/styles'
```
但是你会发现在src/styles/index.scss全局样式文件中没有办法使用变量.因此需要给项目中引入全局变量.
在style/variable.scss创建一个variable.scss文件！
在vite.config.ts文件配置如下:
```ts
export default defineConfig((config) => {
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
    }
}
```
@import "./src/styles/variable.less";后面的;不要忘记，不然会报错!
配置完毕你会发现scss提供这些全局变量可以在组件样式中使用了！！！

## mock数据
安装依赖：[npm地址](https://www.npmjs.com/package/vite-plugin-mock)
```js
pnpm install -D vite-plugin-mock mockjs
```
在 vite.config.js 配置文件启用插件。
```js
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
export default ({ command })=> {
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],
  }
}
```
在根目录创建mock文件夹:去创建我们需要mock数据与接口！！！
在mock文件夹内部创建一个user.ts文件
```ts
// user.ts
//用户信息数据
function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}

export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, data: { message: '账号或者密码不正确' } }
            }
            //如果有返回成功信息
            const { token } = checkUser
            return { code: 200, data: { token } }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            //如果有返回成功信息
            return { code: 200, data: {checkUser} }
        },
    },
]
```
完成上面的配置之后可以通过axios来模拟接口请求数据了。
## Axios的二次封装
在开发项目的时候避免不了与后端进行交互,因此我们需要使用axios插件实现发送网络请求。在开发项目的时候我们经常会把axios进行二次封装。
目的:
1. 使用请求拦截器，可以在请求拦截器中处理一些业务(开始进度条、请求头携带公共参数)
2. 使用响应拦截器，可以在响应拦截器中处理一些业务(进度条结束、简化服务器返回的数据、处理http网络错误)
安装axios
```js
pnpm install axios
```
在根目录下创建utils/request.ts
```ts
import axios from "axios";
import { ElMessage } from "element-plus";
//创建axios实例
let request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000
})
//请求拦截器
request.interceptors.request.use(config => {
    return config;
});
//响应拦截器
request.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    //处理网络错误
    let msg = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";

    }
    ElMessage({
        type: 'error',
        message: msg
    })
    return Promise.reject(error);
});
export default request;
```
## API统一接口管理
在开发项目的时候,接口可能很多需要统一管理。在src目录下去创建api文件夹去统一管理项目的接口；
比如:下面方式
```ts
//统一管理咱们项目用户相关的接口

import request from '@/utils/request'

import type {

 loginFormData,

 loginResponseData,

 userInfoReponseData,

} from './type'

//项目用户相关的请求地址

enum API {

 LOGIN_URL = '/admin/acl/index/login',

 USERINFO_URL = '/admin/acl/index/info',

 LOGOUT_URL = '/admin/acl/index/logout',

}
//登录接口
export const reqLogin = (data: loginFormData) =>
 request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息

export const reqUserInfo = () =>

 request.get<any, userInfoReponseData>(API.USERINFO_URL)

//退出登录

export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
```
项目的源代码地址
贾成豪老师代码仓库地址:https://gitee.com/jch1011/vue3_admin_template-bj1.git
项目在线文档:
服务器域名:http://sph-api.atguigu.cn
swagger文档:
http://139.198.104.58:8209/swagger-ui.html
http://139.198.104.58:8212/swagger-ui.html#/

  