<template>
    <div class="stagger-container">
        <div @click="startStagger" class="box2 green2"></div>
        <div @click="startStagger" class="box2 purple2"></div>
        <div @click="startStagger" class="box2 orange2"></div>
        <div @click="startStagger" class="box2 purple2"></div>
        <div @click="startStagger" class="box2 green2"></div>
        <h3 >Click a box to transition out</h3>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { nextTick } from 'vue'
nextTick(() => {
    gsap.to(".box2", {
        duration: 1,
        rotation: 360,
        opacity: 1,
        delay: 0.5,
        stagger: 0.2,
        ease: "sine.out",
        force3D: true
    });
})
const startStagger = ()=>{
    gsap.to(".box2", {
      duration: 1, 
      opacity: 0, 
      y: -100, 
      stagger: 0.5,
      ease: "back.in"
    });
}
</script>

<style scoped lang='scss'>
.stagger-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-height: 25vh;
    margin: 0;
    overflow: hidden;
    position: relative;
    h3{
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
    }

    .box2 {
        width: 75px;
        height: 75px;
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
    }

    .green2 {
        background: #28a92b;
    }

    .purple2 {
        background: #8d3dae;
    }

    .orange2 {
        background: #e77614;
    }
}
</style>