<template>
    <div class="svg-container">
        <svg id="svg" viewBox="0 0 100 100">
            <rect class="svgBox" fill="#28a92b" x="0" y="35" width="30" height="30" rx="2" />
        </svg>
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { nextTick } from 'vue'
nextTick(() => {
    gsap.to(".svgBox", {
        duration: 2,
        repeatDelay: 2,
        repeat: -1,
        x: 100, // use transform shorthand (this is now using SVG units not px, the SVG viewBox is 100 units wide)
        xPercent: -100,
        // or target SVG attributes
        attr: {
            fill: '#8d3dae',
            rx: 50,
        },
    });
})
</script>

<style scoped lang='scss'>
.svg-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-height: 10vh;
    margin: 0;
    overflow: hidden;
    position: relative;
}

svg {
    height: 30vh;
    max-height: 300px;
    border: solid 2px white;
    overflow: visible;
}
</style>