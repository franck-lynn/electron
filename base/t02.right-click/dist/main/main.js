"use strict";

require("core-js/modules/es.array.join.js");

var _path = _interopRequireDefault(require("path"));

var _electron = require("electron");

var _rightClickTemplate = require("./right-click/right-click-template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// electron 用的主入口文件
// import electronReloader from 'electron-reloader'
var createWindow = function createWindow() {
  var mainWindow = new _electron.BrowserWindow({
    width: 800,
    height: 700,
    // 预加载文件
    webPreferences: {
      preload: _path["default"].join(__dirname, '../preload/preload.js'),
      nodeIntegration: true,
      // 是否继承 nodejs
      nativeWindowOpen: false,
      contextIsolation: false
    }
  }); // 打开调试模式

  mainWindow.webContents.openDevTools(); // 右键菜单, 监听是把 e 传进去

  _electron.ipcMain.on("show-context-menu", function (e) {
    var menu = _electron.Menu.buildFromTemplate((0, _rightClickTemplate.rightClickTemplate)(e)); // 在什么位置弹出右键菜单


    menu.popup(_electron.BrowserWindow.fromWebContents(e.sender));
  });

  var URL = "http://localhost:3000"; //! 环境变量, 设置为开发模式

  var mode = process.env.Mode || "development";

  if (mode === 'development') {
    mainWindow.loadURL(URL);
  } else {
    console.log("获取到的环境变量----> ", mode);
    mainWindow.loadFile(_path["default"].resolve(__dirname, './index.html'));
  }
};

_electron.app.whenReady().then(createWindow); // 跨平台


_electron.app.on("activate", function () {
  if (_electron.BrowserWindow.getAllWindows().length === 0) createWindow();
});

_electron.app.on("window-all-closed", function () {
  if (process.platform !== "darwin") _electron.app.quit();
});