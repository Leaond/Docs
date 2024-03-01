# 关于
工程化问题
vue2监听多个数据源
nodejs
webpack
http原理
前端缓存：浏览器缓存、强缓存
gsap
threejs
性能优化
css：mask
js：线程、work 、闭包、BFC、ESO、v8垃圾回收
节流防抖
web socket
文件的分片上传下载、断点续传
复制插件：clipbord2
css布局：flex（https://cssgridgarden.com/）、grid（http://flexboxfroggy.com/），
常见的布局方式： 圣杯布局、双飞翼布局
tcp协议：3次握手、4次挥手、udp协议、http协议、7层网络架构

```vue-html
<div id="app">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
```

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<style scoped>
button {
  font-weight: bold;
}
</style>

<div class="demo">
  <button @click="count++">
    Count is: {{ count }}
  </button>
</div>
