// electron 用的主入口文件
import path from 'path'
import {app, BrowserWindow} from 'electron'
// import electronReloader from 'electron-reloader'
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 700,
        // 预加载文件
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            nodeIntegration: true, // 是否继承 nodejs
            nativeWindowOpen: false,
            contextIsolation: false,
        }
    })
    // 打开调试模式
    mainWindow.webContents.openDevTools()
    
    const URL = `http://localhost:3000`
    //! 环境变量, 设置为开发模式
    const mode = process.env.Mode 
    
    if(mode === 'development'){
        mainWindow.loadURL(URL)
    }else{
        console.log("获取到的环境变量----> ", mode)
        mainWindow.loadFile(path.resolve(__dirname, './index.html'))
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