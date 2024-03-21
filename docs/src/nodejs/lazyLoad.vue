<template>
    <div class="lazy-load">
        <img lazyload="https://t7.baidu.com/it/u=2890568060,2963769521&fm=218&app=126&size=f242,150&n=0&f=PNG?s=21E557227C6A4B1D00F620410300F0BA&sec=1710954000&t=3c0a29e1c94cf4c3b0e000554fdd5f23"
            src="" v-for="(item, index) in 100" :key="index" alt="">
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
const imgList = ref([])
const setImgList = () => {
    // 收集节点
    const ele = document.querySelectorAll("[lazyload]")
    // 创建观察器实例
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const src = entry.target.getAttribute('lazyload')
                entry.target.setAttribute("src", (src as string))
            }
            // 解除观察
            io.unobserve(entry)
        })
    }, {
        rootMargin: `10px 0px 0px 0px`
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
    justify-content: flex-start;
    flex-direction: column;
    overflow-y: scroll;
    gap: 10px;

    img {
        width: 100%;
        height: 90px;
    }
}
</style>