<template>
  <div class="contain">
    <div class="box"> </div>
  </div>
</template>

<script setup lang="ts">
// 思考：1.能否使用插件等盒子在页面中间的时候再触发动画；2.能够使用paly和pause方法控制动画执行；
// 引入gsap
import gsap from 'gsap'
import { nextTick } from 'vue'

nextTick(() => {
  gsap.to('.box', {
    x: '+200',
    background: 'blue',
    rotation: 360,
    repeatDelay: 2,
    repeat: -1,
  })
})

</script>

<style scoped lang='scss'>
.contain {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  min-height: 20vh;
  margin: 0;
  overflow: hidden;
  position: relative;

  .box {
    display: block;
    width: 75px;
    height: 75px;
    background: #28a92b;
    border-radius: 12px;
  }
}
</style>