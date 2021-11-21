import path from "path"
import {  BrowserWindow, ipcMain, IpcMainEvent, screen } from "electron"

let mainWindow: BrowserWindow | null

const createWindow = (): void => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({
        width: width / 2,
        height: height / 2,
        webPreferences: {
            //! 上下文隔离配置
            nodeIntegration: false, // 渲染进程不使用 node api, 改由预加载导出
            nativeWindowOpen: false,
            contextIsolation: true, // 上下文隔离设置为 true
            // 预加载文件
            preload: path.join(__dirname, "../../preload/preload.js"),
        },
    })

    // 打开调试模式
    mainWindow.webContents.openDevTools()

    const URL = `http://localhost:3000/index.html`
    //! 环境变量, 设置为开发模式
    const mode = process.env.Mode || "development"

    if (mode === "development") {
        mainWindow.loadURL(URL)
    } else {
        console.log("获取到的环境变量----> ", mode)
        mainWindow.loadFile(path.resolve(__dirname, "./index.html"))
    }
    
    // 监听客户端的信息
    ipcMain.on('ping', (e: IpcMainEvent, commands: string) => {
        console.log("接收到: ----> ", commands)
    })
    
    
}

export {createWindow}