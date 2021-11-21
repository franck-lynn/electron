<script setup lang='ts'>

// import { onMounted } from 'vue'
//! 需要注意的是不能直接导入 ipcRenderer, 而是在预加载中获取 ipcRender, 否则 node 在客户端运行不了
 const ipcRenderer = window.ipcRenderer
 
 
// onMounted(() => {
//     window.ipcRenderer
//     // console.log("预加载---> ", window.ipcRenderer)
    
// })

const handleClick = () => {
    console.log("父子窗口通讯")
    ipcRenderer.send('childMsg', "这是来自子窗口的问候")
}

const closeWindow = () => {
    ipcRenderer.send('close')
}

</script>
<template>
     <h1> 父子窗口的通讯 </h1> 
    <button @click="handleClick"> 向父窗口传递信息 </button>
    <button @click="closeWindow"> 关闭子窗口 </button>
</template>
 
 
<style lang="scss" scoped>
    
</style>