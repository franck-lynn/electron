"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWindow = void 0;

require("core-js/modules/es.array.join.js");

var _path = _interopRequireDefault(require("path"));

var _electron = require("electron");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var mainWindow;

var createWindow = function createWindow() {
  var _screen$getPrimaryDis = _electron.screen.getPrimaryDisplay().workAreaSize,
      width = _screen$getPrimaryDis.width,
      height = _screen$getPrimaryDis.height;

  mainWindow = new _electron.BrowserWindow({
    width: width / 2,
    height: height / 2,
    webPreferences: {
      //! 上下文隔离配置
      nodeIntegration: false,
      // 渲染进程不使用 node api, 改由预加载导出
      nativeWindowOpen: false,
      contextIsolation: true,
      // 上下文隔离设置为 true
      // 预加载文件
      preload: _path["default"].join(__dirname, "../../preload/preload.js")
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
  } // 监听客户端的信息


  _electron.ipcMain.on('ping', function (e, commands) {
    console.log("接收到: ----> ", commands);
  });
};

exports.createWindow = createWindow;