<template>
  <div>
    <input type="file" name="file" @change="fileChange">
    <img :src="baseSrc" alt="">
    <button @click="submit">提交</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
const baseSrc = ref('')
let file = ref('')
const fileChange = (e:any)=>{
// 这里的files是new file()的实例对象，我们也可以通过这个new构造函数创建一个文件：new File(['内容',"文件名+后缀"])
    file.value = e.target.files[0]
    // 可以通过new Blob()将file转成blob对象
    let blob = new Blob([file.value])
    // blob身上有一个slice方法可以对文件进行切割
    let _sliceBlob = blob.slice(0,5000)
    // 将切割后的blob对象再转成file对象
    let _sliceFile = new File([_sliceBlob],'text.png')
    console.log("=====>>> ",_sliceFile);
    // 使用fileRead将文件转成base64格式文件
    let fr = new FileReader()
    fr.readAsDataURL(_sliceFile)
    fr.onload = function(){
        baseSrc.value = fr.result as string
        console.log("=====>>> ",fr.result);
    }

}
const submit = ()=>{
    let formdata = new FormData()
    formdata.append("各种信息","asdasff")
    formdata.append("file",file.value)
    // 发请求
    axios.post('XXX',formdata)
}
</script>

<style scoped lang='scss'>
</style>