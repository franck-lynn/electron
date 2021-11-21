<script setup lang="ts">
import notification from "./components/notification.vue"
import { onMounted } from "vue"
onMounted(() => {
    console.log("预加载---> ", window.ipcRenderer)
})
</script>
<template>
    <h1>通知</h1>
    <notification></notification>
</template>

<style lang="scss" scoped></style>
