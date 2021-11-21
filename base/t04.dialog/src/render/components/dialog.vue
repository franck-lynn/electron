<script setup lang="ts">
// const ipcRenderer = window.ipcRenderer
const { ipcRenderer } = window

const openDialog = async() => {
    await ipcRenderer.send("open_dialog")
}
</script>

<template>
    <h3> 对话框 dialog </h3>
    <button @click="openDialog"> 打开对话框 </button>
</template>

<style lang="scss" scoped></style>
