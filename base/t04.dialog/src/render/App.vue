<script setup lang="ts">
import MyDialog from "./components/dialog.vue"
import { onMounted } from "vue"

onMounted(() => {
    console.log("预加载---> ", window.ipcRenderer)
})

</script>


<template>
    <h1>对话框</h1>
    <my-dialog></my-dialog>
</template>

<style lang="scss" scoped></style>
