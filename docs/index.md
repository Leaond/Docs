---
# 提供三种布局，doc、page和home
# 官方文档相关配置：https://vitepress.dev/reference/default-theme-layout
layout: home
home: true

# 官方文档相关配置：https://vitepress.dev/reference/default-theme-home-page
# 网站标题
title: Lancer的窝窝
# 副标题
titleTemplate: Hi，终于等到你
# 编辑链接
editLink: true
# 最近一次更新时间
lastUpdated: true

# 个人信息介绍
hero:
  name: Lancer
  text: Stay foolish, Stay hungry.
  tagline: 钓鱼佬

# 首页右边的图片
  image:
    src: /look.svg
    # 图片的描述
    alt: Lancer
  # 按钮相关
  actions:
    - theme: brand
      text: 进入主页
      link: /learndocs/about
    - theme: alt
      text: 个人成长
      link: /column/Growing/
# 按钮下方的描述
features:
  - icon: 🤹
    title: Web前端
    details: 大厂程序媛，国内某互联网厂搬砖。
    link: /column/views/guide
  - icon: 👩
    title: 喜欢美学
    details: 热爱一切美学，喜欢用各种设计工具造图。
    link: /column/views/guide
  - icon: 🧩
    title: 斜杆青年
    details: 是个平平无奇但是又很热爱学习的斜杆青年。
    link: /column/views/guide
---
<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>
