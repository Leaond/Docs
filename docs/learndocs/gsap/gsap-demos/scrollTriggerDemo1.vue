<template>
  <div class="scroll-trigger">
    <div class="box8 green8"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { nextTick } from 'vue'
gsap.registerPlugin(ScrollTrigger)
nextTick(() => {
    gsap.to(".box8", {
        rotation: 7200,
        x:200,
        scrollTrigger:{
            scrub:true,
            trigger:'.box8'
        }
        
    });
})
</script>

<style scoped lang='scss'>
.scroll-trigger{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    min-height: 20vh;
    margin: 0;
    overflow: hidden;
    position: relative;
    // background: #000;

    .box8 {
        width: 75px;
        height: 75px;
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
    }
    .green8 {
        background: #28a92b;
        margin-left: 10vw;
    }
}
</style>