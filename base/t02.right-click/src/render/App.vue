<script setup lang="ts">
//! 增加右键菜单. 出现 TypeError: path.join is not a function 等等这些错误,
//! 这是因为渲染进程不能直接使用原生的 nodejs

import { IpcMainEvent } from "electron"

import { onMounted } from "vue"
// const { ipcRenderer } = window
const ipcRenderer = window.ipcRenderer

onMounted(() => {
    // contextmenu 是右键事件
    window.addEventListener("contextmenu", (e) => {
        e.preventDefault()
        //! 渲染进程向主进程发送消息, 让主进程显示右键菜单
        ipcRenderer.send("show-context-menu")
    })
})

ipcRenderer.on("context-menu-command", (e: IpcMainEvent, command: string) => {
    // e, command 都是主线程传过来的, command 是label的名称, 是一个字符串
    console.log("接受主线程传过来的信息", e, command)
})
</script>

<template>
    <h1>右键菜单, 复制演示</h1>
    <input type="text" />
</template>

<style lang="scss" scoped></style>
