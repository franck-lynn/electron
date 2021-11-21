<script setup lang="ts">
// const ipcRenderer = window.ipcRenderer
const { ipcRenderer } = window
// import { IpcRendererEvent } from "electron/main"
// import { onMounted } from "vue"
// onMounted(() => {
//     const ipcRenderer = window.ipcRenderer
// }) 
const showNotification = async() => {
    //! 在win10上显示通知, 得要把显示权限打开
    //! 渲染进程中显示通知, 测试可以
    new window.Notification("小二, 来订单了, 出来接客了", { body: "有大官人翻你牌子了" }).onclick = () => {
        console.log("通知被点击了")
    }
    await ipcRenderer.send("notification")
}
</script>

<template>
    <h3>渲染进程中的通知</h3>
    <button @click="showNotification">通知消息</button>
</template>

<style lang="scss" scoped></style>
