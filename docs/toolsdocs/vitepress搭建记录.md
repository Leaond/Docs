这里记录一下vitepress的搭建流程和相关语法配置。[VitePress官方文档](https://vitepress.dev/)
## 一、起步：初始化项目
1. 需要安装vitepress包，在终端运行：
::: code-group

```sh [npm]
$ npm add -D vitepress
```

```sh [pnpm]
$ pnpm add -D vitepress
```

```sh [yarn]
$ yarn add -D vitepress
```

```sh [bun]
$ bun add -D vitepress
```

:::
2. 初始化项目
::: code-group

```sh [npm]
$ npx vitepress init
```

```sh [pnpm]
$ pnpm dlx vitepress init
```

```sh [bun]
$ bunx vitepress init
```

:::

初始化过程中会让你选择或者填写一些项目的基本配置，可以选择自己填写，也可以一直enter跳过
3. 初始化后的项目目录结构如下：
```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```
docs目录是VitePress网站的项目根目录。.vitepress目录是vitepress的配置文件、开发服务器缓存、构建输出和可选主题自定义代码的保留位置。
4. 启动项目
执行`docs:dev`会在本地开启一个服务来开启项目，并且支持热更新。可以执行下面的代码启动项目：

::: code-group

```sh [npm]
$ npm run docs:dev
```

```sh [pnpm]
$ pnpm run docs:dev
```

```sh [yarn]
$ yarn docs:dev
```

```sh [bun]
$ bun run docs:dev
```

:::
经过上面的步骤，这样就已经搭建了一个标准的个人文档项目了，下面将进行一系列的项目配置。