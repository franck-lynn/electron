// electron 用的主入口文件
import path from "path"
//! 热加载
import reloader from "electron-reloader"
reloader(module) // module 全局对象加载进来就可以进行热加载了?

import { createNewWindow } from "./menu/custom-menu"
import { app, BrowserWindow, ipcMain, /*dialog, ipcMain,  IpcMainEvent, */ screen } from "electron"

let mainWindow: BrowserWindow

const createWindow = () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({
        width: width / 2,
        height: height / 2,

        // 预加载文件
        webPreferences: {
            preload: path.join(__dirname, "../preload/preload.js"),
            nodeIntegration: true, // 是否继承 nodejs, 开启渲染进程使用node
            nativeWindowOpen: false,
            contextIsolation: false,
            // webviewTag: true, // 支持 webView 自定义标签
        },
        frame: false, // 自定义菜单, 首先生成一个无边框的菜单, 原来定义的系统菜单就关闭了, 不显示了
    })
    //! 引入菜单
    import("./menu/menu")

    // 打开调试模式
    mainWindow.webContents.openDevTools()
    ipcMain.on("createNewBrowserWindow", () => {
        // 渲染进行发送一个新建窗口的事件
        // console.log("收到了渲染进程发过来的事件")
        createNewWindow()
    })
    const URL = `http://localhost:3000`
    //! 环境变量, 设置为开发模式
    const mode = process.env.Mode || "development"

    if (mode === "development") {
        mainWindow.loadURL(URL)
    } else {
        console.log("获取到的环境变量----> ", mode)
        mainWindow.loadFile(path.resolve(__dirname, "./index.html"))
    }
}

app.whenReady().then(createWindow)

// 跨平台
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})
