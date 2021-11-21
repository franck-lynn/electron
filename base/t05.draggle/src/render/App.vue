<script setup lang="ts">
import draggle from "./components/draggle.vue"
import { onMounted } from "vue"

onMounted(() => {
    window.ipcRenderer
    // console.log("预加载---> ", window.ipcRenderer)
})

</script>


<template>
    <draggle></draggle>
</template>

<style lang="scss" scoped></style>
