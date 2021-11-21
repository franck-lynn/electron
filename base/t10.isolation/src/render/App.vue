<script setup lang="ts">
// 客户端使用 上下文隔离

// console.log(
//     "渲染端是否有这个属性? 答案是有的", 
//     window.ipcRenderer 
// )

window.ipcRenderer.send("ping", '来自渲染端的数据')

</script>


<template>
    <h1> 上下文隔离 </h1> 
</template>



<style lang="scss">
//! @use "sass:math"; 需要改在 vite.config.ts 配置引入
// scss 是配置的别名
// @import "scss/scss/entries/main";
@import "scss/scss/entries/shared"; // shared.scss 已经引入了 compass
// shared.scss 引入了 compass, 并且已经运行 @include global-reset; 这个函数, 清除所有的默认样式

</style>
