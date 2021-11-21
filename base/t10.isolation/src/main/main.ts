// electron 用的主入口文件
 
import {createWindow } from './main_window/createWindow'
//! 热加载
import reloader from "electron-reloader"
reloader(module) // module 全局对象加载进来就可以进行热加载了?


import { app, BrowserWindow } from "electron"

app.whenReady().then(createWindow)

// 跨平台
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})
