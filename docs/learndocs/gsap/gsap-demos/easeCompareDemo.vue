<template>
    <div class="ease-container">
        <div class="box1 green1">linear</div>
        <div class="box1 purple1">bounce</div>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { nextTick } from 'vue'
nextTick(() => {
    gsap.to(".green1", {
        rotation: 360,
        duration: 2,
        repeat: -1,
        repeatDelay: 2,
        ease: 'none'
    });
    gsap.to(".purple1", {
        rotation: 360,
        duration: 2,
        repeat: -1,
        repeatDelay: 2,
        ease: 'bounce.out'
    });
})

</script>

<style scoped lang='scss'>
.ease-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-height: 15vh;
    margin: 0;
    overflow: hidden;

    .box1 {
        width: 75px;
        height: 75px;
        display: block;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
    }

    .green1 {
        background: #28a92b;
    }

    .purple1 {
        background: #8d3dae;
    }
}
</style>