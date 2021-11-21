"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.weak-map.js");

require("core-js/modules/esnext.weak-map.delete-all.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

var _path = _interopRequireDefault(require("path"));

var _electronReloader = _interopRequireDefault(require("electron-reloader"));

var _customMenu = require("./menu/custom-menu");

var _electron = require("electron");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _electronReloader["default"])(module); // module 全局对象加载进来就可以进行热加载了?

var mainWindow;

var createWindow = function createWindow() {
  var _screen$getPrimaryDis = _electron.screen.getPrimaryDisplay().workAreaSize,
      width = _screen$getPrimaryDis.width,
      height = _screen$getPrimaryDis.height;

  mainWindow = new _electron.BrowserWindow({
    width: width / 2,
    height: height / 2,
    // 预加载文件
    webPreferences: {
      preload: _path["default"].join(__dirname, "../preload/preload.js"),
      nodeIntegration: true,
      // 是否继承 nodejs, 开启渲染进程使用node
      nativeWindowOpen: false,
      contextIsolation: false // webviewTag: true, // 支持 webView 自定义标签

    },
    frame: false // 自定义菜单, 首先生成一个无边框的菜单, 原来定义的系统菜单就关闭了, 不显示了

  }); //! 引入菜单

  Promise.resolve().then(function () {
    return _interopRequireWildcard(require("./menu/menu"));
  }); // 打开调试模式

  mainWindow.webContents.openDevTools();

  _electron.ipcMain.on("createNewBrowserWindow", function () {
    // 渲染进行发送一个新建窗口的事件
    // console.log("收到了渲染进程发过来的事件")
    (0, _customMenu.createNewWindow)();
  });

  var URL = "http://localhost:3000"; //! 环境变量, 设置为开发模式

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