// 站点配置
import { defineConfig } from "vitepress";
export default defineConfig({
  lang: "zh",
  title: "Docs",
  description: "Vite & Vue powered static site generator.",
  base: "/",
  // base:"/LancerDocs/docs",
  themeConfig: {
    logo: "/docs/public/look.svg",
    // 导航链接
    // nav: [
    //   { text: '导航', link: '/guide' },
    //   { text: '配置', link: '/config' },
    //   { text: '更新日志', link: 'https://github.com/...' },
    //   {
    //     text: 'Dropdown Menu',
    //     items: [
    //       {
    //         // 也可以省略标题
    //         items: [
    //           { text: 'Section A Item A', link: '...' },
    //           { text: 'Section B Item B', link: '...' }
    //         ]
    //       }
    //     ]
    //   }
    // ],
    // 搜索
    search: {
      // provider: 'algolia',
      provider: "local",
      options: {
        // appId: '',
        // apiKey: '',
        // indexName: ''
      },
    },
    // 社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/Leaond/LancerDocs" },
      // { icon: 'twitter', link: '...' },
    ],
    // 侧边栏
    sidebar: [
      {
        text: "算法",
        collapsed: false,
        items: [
          { text: "动态规划", link: "/src/算法/动态规划.md" },
          { text: "双指针", link: "/src/算法/双指针.md" },
        ],
      },
      {
        text: "网络",
        collapsed: false,
        items: [
          { text: "AJAX", link: "/src/网络/AJAX.md" },
          { text: "Axios", link: "/src/网络/Axios.md" },
          { text: "Promise", link: "/src/网络/Promise.md" },
          { text: "实现axios", link: "/src/DIY/Axios.md" },
          { text: "实现Promise", link: "/src/DIY/Promise.md" },
        ],
      },
      {
        text: "node",
        collapsed: false,
        items: [
          { text: "Buffer", link: "/src/nodejs/Buffer/buffer.md" },
          { text: "fileSystem", link: "/src/nodejs/fs/fs.md" },
          { text: "path", link: "/src/nodejs/path/path.md" },
          { text: "HTTP", link: "/src/nodejs/http/http.md" },
          { text: "express", link: "/src/nodejs/express/express.md" },
        ],
      },
      {
        text: "浏览器",
        collapsed: false,
        items: [
          { text: "文件上传", link: "/src/浏览器/文件上传.md" },
          { text: "浏览器", link: "/src/浏览器/浏览器.md" },
          { text: "Web缓存", link: "/src/浏览器/web缓存.md" },
        ],
      },

      {
        text: "工程化",
        collapsed: false,
        items: [
          { text: "Webpack", link: "/src/工程化/webpack/webpack.md" },
          { text: "Vite", link: "/src/工程化/vite/vite.md" },
        ],
      },
      {
        text: "TypeScript",
        collapsed: false,
        items: [
          { text: "TypeScript", link: "/src/TypeScript/TypeScript.md" },
          { text: "JavaScript", link: "/src/TypeScript/JS.md" },
        ],
      },
      {
        text: "项目及文档搭建",
        collapsed: false,
        items: [
          { text: "VitePress搭建", link: "/src/项目搭建/vitepress搭建记录.md" },
          { text: "vue3项目搭建", link: "/src/项目搭建/vue3项目搭建.md" },
          { text: "路由", link: "/src/项目搭建/路由.md" },
        ],
      },
      {
        text: "css",
        collapsed: true,
        items: [
          { text: "Introduction", link: "/introduction" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
      {
        text: "gsap",
        collapsed: true,
        items: [
          { text: "概述", link: "/src/gsap/gsap.md" },
          { text: "Tween", link: "/src/gsap/tween.md" },
          { text: "Timeline", link: "/src/gsap/timeline.md" },
          { text: "Easing", link: "/src/gsap/ease.md" },
          { text: "Plugins", link: "/src/gsap/scrolltrigger.md" },
        ],
      },
    ],

    // footer: {
    //   message: 'Released under the MIT License.',
    //   copyright: 'Copyright © 2019-present Evan You'
    // },
    editLink: {
      pattern: "https://github.com/vuejs/vitepress/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    lastUpdated: {
      text: "Last Updated",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
  },
});
