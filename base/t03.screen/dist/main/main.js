"use strict";

require("core-js/modules/es.array.join.js");

var _path = _interopRequireDefault(require("path"));

var _electron = require("electron");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// electron 用的主入口文件
// import electronReloader from 'electron-reloader'
var createWindow = function createWindow() {
  var _screen$getPrimaryDis = _electron.screen.getPrimaryDisplay().workAreaSize,
      width = _screen$getPrimaryDis.width,
      height = _screen$getPrimaryDis.height;

  var mainWindow = new _electron.BrowserWindow({
    width: width / 2,
    height: height / 2,
    // 预加载文件
    webPreferences: {
      preload: _path["default"].join(__dirname, '../preload/preload.js'),
      nodeIntegration: true,
      // 是否继承 nodejs
      nativeWindowOpen: false,
      contextIsolation: false
    }
  }); // 打开调试模式

  mainWindow.webContents.openDevTools();
  var URL = "http://localhost:3000"; //! 环境变量, 设置为开发模式

  var mode = process.env.Mode || "development";

  if (mode === 'development') {
    mainWindow.loadURL(URL);
  } else {
    console.log("获取到的环境变量----> ", mode);
    mainWindow.loadFile(_path["default"].resolve(__dirname, './index.html'));
  }
}; // let win
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


_electron.app.whenReady().then(createWindow); // app.whenReady().then(createDisplay)
// 跨平台


_electron.app.on("activate", function () {
  if (_electron.BrowserWindow.getAllWindows().length === 0) createWindow();
});

_electron.app.on("window-all-closed", function () {
  if (process.platform !== "darwin") _electron.app.quit();
});