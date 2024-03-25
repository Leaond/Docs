## 开发模式
开发模式的作用

安装：webpack-dev-server  npm install html-webpack-plugin --save-dev
设置devserver字段，用webpack-dev-server运行

模拟 webpack-dev-server的实现


热更新和强制更新
热更新在不刷新浏览器的情况下更新页面，可以保持页面的当前状态

强制更新 自动刷新页面来更新页面，会重置页面状态

proxy 由我们的webpack-dev-server开启node服务来代替我们请求接口，因为如果后端没有开启cors，我们直接从前端请求就会跨域。我们可以利用proxy让请求从弄的服务发起，


source-map 出现错误，或者输出内容的时候，source-map能够帮助我们定位到他来自那个代码
配置
devtool：{

}
当使用了source-map的时候我们在项目打包后错误就能够定位到打包钱的位置了，而不是打包压缩后的位置。但是我们一般在生产环境是关闭的。
常用的属性是 cheap-source-map

## 实战配置技巧

在实际的开发工作中，webpack是区分环境的
生产环境 需要代码压缩，tree-shaking 不需要详细的source-map，这会降低我们的打包速度 开启开发模式

开发模式 需要详细的source-map 开启开饭模式  不需要压缩 代码混淆等

区分要点

根据不同的环境进行不同的打包，一般在process。env中设置

有的时候需要在js代码中获取环境，我们可以借助插件完成