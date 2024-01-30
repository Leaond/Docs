<template>
    <div class="scroll-trigger">
      <div class="box9 green9"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/all';
  import { nextTick } from 'vue'
  gsap.registerPlugin(ScrollTrigger)
  nextTick(() => {
      gsap.to(".box9", {
          rotation: 7200,
          x:200,
          scrollTrigger:{
              scrub:5,
              trigger:'.box9'
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
  
      .box9 {
          width: 75px;
          height: 75px;
          display: block;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
      }
      .green9 {
          background: #28a92b;
          margin-left: 10vw;
      }
  }
  </style>