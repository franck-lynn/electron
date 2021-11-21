"use strict";

var _createWindow = require("./main_window/createWindow");

var _electronReloader = _interopRequireDefault(require("electron-reloader"));

var _electron = require("electron");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// electron 用的主入口文件
//! 热加载
(0, _electronReloader["default"])(module); // module 全局对象加载进来就可以进行热加载了?

_electron.app.whenReady().then(_createWindow.createWindow); // 跨平台


_electron.app.on("activate", function () {
  if (_electron.BrowserWindow.getAllWindows().length === 0) (0, _createWindow.createWindow)();
});

_electron.app.on("window-all-closed", function () {
  if (process.platform !== "darwin") _electron.app.quit();
});