"use strict";

require("core-js/modules/es.array.join.js");

var _path = _interopRequireDefault(require("path"));

var _electronReloader = _interopRequireDefault(require("electron-reloader"));

var _electron = require("electron");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// electron 用的主入口文件
//! 热加载
(0, _electronReloader["default"])(module); // module 全局对象加载进来就可以进行热加载了?

var mainWindow;

var createWindow = function createWindow() {
  var _screen$getPrimaryDis = _electron.screen.getPrimaryDisplay().workAreaSize,
      width = _screen$getPrimaryDis.width,
      height = _screen$getPrimaryDis.height;

  mainWindow = new _electron.BrowserWindow({
    width: width / 2,
    height: height / 2,
    webPreferences: {
      // 预加载文件
      preload: _path["default"].join(__dirname, "../preload/preload.js"),
      nodeIntegration: true,
      // 是否继承 nodejs, 开启渲染进程使用node
      nativeWindowOpen: false,
      contextIsolation: false // webviewTag: true, // 支持 webView 自定义标签

    } // frame: false, // 自定义菜单, 首先生成一个无边框的菜单, 原来定义的系统菜单就关闭了, 不显示了

  });
  var childWin; // 主窗口中设置菜单

  var menu = _electron.Menu.buildFromTemplate([{
    label: "新建窗口",
    click: function click() {
      childWin = new _electron.BrowserWindow({
        width: 560,
        height: 300,
        frame: true,
        webPreferences: {
          nodeIntegration: false,
          // 是否继承 nodejs, 开启渲染进程使用node
          // // nativeWindowOpen: false,
          contextIsolation: false,
          // protect against prototype pollution
          preload: _path["default"].join(__dirname, "../preload/preload.js")
        }
      }); // 打开调试模式

      childWin.webContents.openDevTools();
      childWin.loadURL("http://localhost:3000/project.html");
    }
  }]);

  _electron.Menu.setApplicationMenu(menu); // 父窗口接收子窗口的消息


  _electron.ipcMain.on("childMsg", function (e, msg) {
    console.log("接收到子窗口消息", msg);
  });

  _electron.ipcMain.on("close", function () {
    // console.log("子窗口------> ", childWin)
    if (childWin) {
      childWin.close();
      childWin = null;
    }
  }); // 打开调试模式


  mainWindow.webContents.openDevTools();
  var URL = "http://localhost:3000/index.html"; //! 环境变量, 设置为开发模式

  var mode = process.env.Mode || "development";

  if (mode === "development") {
    mainWindow.loadURL(URL);
  } else {
    console.log("获取到的环境变量----> ", mode);
    mainWindow.loadFile(_path["default"].resolve(__dirname, "./index.html"));
  }
};

_electron.app.whenReady().then(createWindow); // 跨平台


_electron.app.on("activate", function () {
  if (_electron.BrowserWindow.getAllWindows().length === 0) createWindow();
});

_electron.app.on("window-all-closed", function () {
  if (process.platform !== "darwin") _electron.app.quit();
});