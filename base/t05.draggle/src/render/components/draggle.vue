<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs")
// import fs from 'fs'
import { ref } from "vue"
// const ipcRenderer = window.ipcRenderer
// const { ipcRenderer } = window
const isContext = ref(false)
const context = ref("")
const filename = ref("")



const handleDrop =  (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    // console.log(Array.from(e.dataTransfer!.files))
    // 类数组对象转成数组
    for (const file of Array.from(e.dataTransfer!.files)) {
        console.log("文件路径---> ", file.path)
        fs.readFile(file.path, "utf-8", (err: Error, data: Buffer[]) => {
            if (err) console.log(err)
            else {
                filename.value = file.path
                isContext.value = true
                context.value = data.toString()
            }
        })
    }
}

const handleDragover = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
}
</script>

<template>
    <div id="holder" @drop="handleDrop" @dragover="handleDragover">
        <h3>拖拽文件</h3>
    </div>
    <div id="readList">
        <h1>读取的文件内容</h1>
        <div v-if="isContext">
            <h3>{{ filename }}</h3>
            <pre> {{ context }} </pre>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#holder {
    width: 400px;
    height: 200px;
    background-color: #878080;
    h1 {
        font-size: 30px;
    }
}
</style>
