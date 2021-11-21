<script setup lang="ts">

import parent from "./components/parent.vue"

import { onMounted } from "vue"

onMounted(() => {
    window.ipcRenderer
    // console.log("预加载---> ", window.ipcRenderer)
})

</script>


<template>
    <parent></parent>
</template>

<style lang="scss" scoped></style>
