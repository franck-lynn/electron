<script setup lang="ts">
// import { IpcMainEvent } from 'electron'

import { onMounted } from "vue"
const ipcRenderer = window.ipcRenderer

onMounted(() => {
    window.ipcRenderer
    // console.log("预加载---> ", window.ipcRenderer)
})

// ipcRenderer.on('ready-to-show', (e: IpcMainEvent, command: string) => {
//     console.log("主线程传过来的事件---> ", e)
//     console.log("主线程传过来的命令---> ", command)
// })
const handleClick = () => {
    // 一旦在 css 中开启顶部菜单拖拽, 点击事件就不起作用了, 要在 scss li 标签中再禁用掉
    // 点击创建一个新的窗口
    ipcRenderer.send('createNewBrowserWindow')
}

</script>


<template>
    <div class="custom-menu">
        <ul>
            <li @click="handleClick"> 新建窗口 </li>
            
            <li> <a href="https://www.baidu.com"> 关于我们 </a>  </li>
        </ul>
    </div>
    <h1> 自定义菜单 </h1> 
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
