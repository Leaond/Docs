<template>
    <div class="timeline-container">
        <div @click="startGsap" class="box5 blue2">click me</div>
        <div class="box5 purple4"></div>
    </div>
</template>

<script setup lang="ts">
// import { nextTick } from 'vue';
import gsap from 'gsap';
let tl = gsap.timeline();
const startGsap = () => {
    tl.to('.blue2', {
        rotation: 360,
        duration: 3,
        repeat:2,
    })
    tl.to('.purple4', {
        rotation: 360,
    }, '.blue2')
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

    .box5 {
        display: block;
        width: 75px;
        height: 75px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .blue2 {
        background: #49d2ff;
        cursor: pointer;
    }

    .purple4 {
        background: #f582ff;

    }
}
</style>