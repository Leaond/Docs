<template>
    <div class="timeline-container">
        <div @click="startGsap" class="box6 green6">click me</div>
        <div class="box6 purple6"></div>
        <div class="box6 orange6"></div>
    </div>
</template>

<script setup lang="ts">
// import { nextTick } from 'vue';
import gsap from 'gsap';
let tl = gsap.timeline({ defaults: { duration: 1 } });
const startGsap = () => {
    tl.to(".green6", { x: 200 })
        .to(".purple6", { x: 200, scale: 0.2 })
        .to(".orange6", { x: 200, scale: 2, y: 20 });
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

    .box6 {
        display: block;
        width: 75px;
        height: 75px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .green6 {
        background: #28a92b;
        cursor: pointer;
    }

    .purple6 {
        background: #f100cb;

    }

    .orange6 {
        background: #e77614;

    }
}
</style>