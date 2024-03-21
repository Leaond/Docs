<template>
    <div class="lazy-load">
        <div fixtop class="fixed-top">我要吸顶</div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
const imgList = ref([])
const setImgList = () => {
    // 收集节点
    const ele = document.querySelectorAll("[fixtop]")
    // 创建观察器实例
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.cssText = 'position: fixed; top: 0; left: 0'
            }
            // 解除观察
            io.unobserve(entry)
        })
    }, {
        rootMargin: `0px 0px 0px 0px`
    })
    // 观察每一个元素
    ele.forEach(item => {
        io.observe(item)
    })

}
onMounted(() => {
    setImgList()
})
</script>

<style scoped lang='scss'>
.lazy-load {
    width: 400px;
    height: 400px;
    border: 1px solid #D4E5FF;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow-y: scroll;
    gap: 10px;

    .fixed-top {
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-color: #D4E5FF;

    }
}
</style>