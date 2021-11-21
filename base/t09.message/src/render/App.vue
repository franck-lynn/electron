<script setup lang="ts">

// import { onMounted } from "vue"
// const ipcRenderer = window.ipcRenderer

// onMounted(() => {
//     window.ipcRenderer
//     // console.log("预加载---> ", window.ipcRenderer)
    
// })
const closeWindow = () => {
    window.ipcRenderer.send('close')
}


</script>


<template>
    <h1> 父窗口 </h1> 
    <button @click="closeWindow"> 父窗口关闭子窗口 </button>
</template>

<style lang="scss">
//! @use "sass:math"; 需要改在 vite.config.ts 配置引入
// scss 是配置的别名
// @import "scss/scss/entries/main";
@import "scss/scss/entries/shared"; // shared.scss 已经引入了 compass
// shared.scss 引入了 compass, 并且已经运行 @include global-reset; 这个函数, 清除所有的默认样式
// 全局设置 placeholder

.custom-menu{
    width: 100%;
    height: 40px;
    background: pink;
    -webkit-app-region: drag; // 支持顶部菜单拖拽
    ul{
        list-style: none;
        li{
            float: left;
            width: 80px;
            line-height: 50px;
            text-align: center;
            margin-left: 10px;
             -webkit-app-region: no-drag; // 支持顶部菜单点击
        }
    }
}
</style>
