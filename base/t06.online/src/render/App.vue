<script setup lang="ts">

import checkOnline from "./components/checkOnline.vue"

import { onMounted } from "vue"

onMounted(() => {
    window.ipcRenderer
    // console.log("预加载---> ", window.ipcRenderer)
})

</script>


<template>
    <check-online></check-online>
</template>

<style lang="scss" scoped></style>
