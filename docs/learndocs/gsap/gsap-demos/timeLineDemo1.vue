<template>
    <div class="timeline-container">
        <div class="box4 blue1"></div>
        <div class="box4 purple3"></div>
    </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue';
import gsap from 'gsap';
let tl = gsap.timeline();
nextTick(() => {
    tl.to('.blue1', {
        rotation: 360,
    })
    tl.to('.purple3', {
        rotation: 360,
    }, '+=2')
})

</script>

<style scoped lang='scss'>
.timeline-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-height: 20vh;
    margin: 0;
    overflow: hidden;
    position: relative;

    .box4 {
        display: block;
        width: 75px;
        height: 75px;
        border-radius: 12px;
    }

    .blue1 {
        background: #49d2ff;
    }

    .purple3 {
        background: #f582ff;

    }
}
</style>