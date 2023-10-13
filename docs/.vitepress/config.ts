
// import { defineConfig } from 'vitepress'
export default {
  title: "Lancer", // 网站标题
  titleTemplate:'Hi，终于等到你',
  description: "Lancer.", //网站描述
  base: "/LancerDocs/", //  部署时的路径 默认 /  可以使用二级地址 /base/

  // lang: 'en-US', //语言
  // 网页头部配置，引入需要图标，css，js
  head: [
    // 改变网页的title的图标
    ["link",{rel: "icon",href: "/look.svg",},],
    ['meta', { name: 'theme-color', content: '#5f67ee' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en' }],
    ['meta', { name: 'og:site_name', content: 'VitePress' }],
  ],
  // 主题配置
  themeConfig: {
    logo: '/look.svg',//网站的logo
    siteTitle: 'Lancer',//是否显示网站的站点名字
    repo: "vuejs/vitepress", // github 仓库地址，点击网页的右上角图标会跳转
    // 社交链接，配置可现实github图标，点击可跳转
    socialLinks: [{ icon: "github", link: "https://github.com" }],
    // 是否开启全局搜索
    search: {
      provider: 'local'
    },
    // 是否开启编辑链接
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path'
    },
    //   头部导航
    nav: [
      { text: "首页", link: "/" },
      { text: "关于", link: "/Learning/about/about" },
    ],
    //   侧边导航
    sidebar: [{ text: "我的", link: "/Tools/VScode插件" }],
    outlineTitle: 'In hac pagina'
  },
  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2021-present Evan You'
  },
  // lastUpdated: true//是否启用最后编辑时间，将根据github的最后提交时间生成
  appearance: true//是否启用暗黑模式
  
};
