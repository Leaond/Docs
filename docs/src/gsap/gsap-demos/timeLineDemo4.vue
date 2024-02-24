<template>
    <div class="timeline-container">
        <div @click="startGsap" class="box7 green7">click me</div>
        <div class="box7 purple7"></div>
        <div class="box7 orange7"></div>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
const intro = () => {
    let tl = gsap.timeline();
    tl.to('.green7', {
        rotation: 360
    })
    return tl
}
const middle = () => {
    let tl = gsap.timeline();
    tl.to('.purple7', {
        rotation: 360
    })
    return tl
}
const conclusion = () => {
    let tl = gsap.timeline();
    tl.to('.orange7', {
        rotation: 360
    })
    return tl
}
let tl = gsap.timeline();
const startGsap = () => {
    tl.add(intro()).add(middle(), "+=2").add(conclusion(), "-=1")
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

    .box7 {
        display: block;
        width: 75px;
        height: 75px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .green7 {
        background: #28a92b;
        cursor: pointer;
    }

    .purple7 {
        background: #f100cb;

    }

    .orange7 {
        background: #e77614;

    }
}
</style>