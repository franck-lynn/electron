// electron 用的主入口文件
import path from 'path'
import {app, BrowserWindow, dialog, ipcMain, /* IpcMainEvent, */ screen} from 'electron'
// import electronReloader from 'electron-reloader'


const createWindow = () => {
    const {width, height} = screen.getPrimaryDisplay().workAreaSize
    const mainWindow = new BrowserWindow({
        width: width / 2, 
        height: height / 2,
        // 预加载文件
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            nodeIntegration: true, // 是否继承 nodejs
            nativeWindowOpen: false,
            contextIsolation: false,
            webviewTag: true, // 支持 webView 自定义标签
        }
    })
    
    // dialog.showOpenDialog(mainWindow, {
    //     properties: ['openFile', "multiSelections"]
    // })
    ipcMain.on('open_dialog', (/* e: IpcMainEvent */) => {
        dialog.showOpenDialog(mainWindow, {
            title: '对话框窗口的标题', 
            properties: ['openFile', "multiSelections"]
        })
    })
    
    // 打开调试模式
    mainWindow.webContents.openDevTools()
    
    const URL = `http://localhost:3000`
    //! 环境变量, 设置为开发模式
    const mode = process.env.Mode || "development"
    
    if(mode === 'development'){
        mainWindow.loadURL(URL)
    }else{
        console.log("获取到的环境变量----> ", mode)
        mainWindow.loadFile(path.resolve(__dirname, './index.html'))
    }
}

// let win
// const createDisplay = () => {
//     const displays = screen.getAllDisplays()
//     const externalDisplay = displays.find((display) => {
//         return display.bounds.x !== 0 || display.bounds.y !== 0
//     })
//     if(externalDisplay){
//         win = new BrowserWindow({
//             x: externalDisplay.bounds.x + 50,
//             y: externalDisplay.bounds.y + 50
//         })
//         win.loadURL('https://www.baidu.com')
//     }
// }



app.whenReady().then(createWindow)
// app.whenReady().then(createDisplay)
// 跨平台
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})



app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})