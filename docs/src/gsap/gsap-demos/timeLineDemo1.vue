<template>
    <div class="timeline-container">
        <div @click="startGsap" class="box4 blue1">click me</div>
        <div class="box4 purple3"></div>
    </div>
</template>

<script setup lang="ts">
// import { nextTick } from 'vue';
import gsap from 'gsap';
let tl = gsap.timeline();
const startGsap = () => {
    tl.to('.blue1', {
        rotation: 360,
        duration: 3,
    })
    tl.to('.purple3', {
        rotation: 360,
    }, '+=2')
}

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
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .blue1 {
        background: #49d2ff;
        cursor: pointer;
    }

    .purple3 {
        background: #f582ff;

    }
}
</style>