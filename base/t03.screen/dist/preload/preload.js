"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _electron = require("electron");

// 这里出现警告是因为 window.d.ts 文件没有定义
window.ipcRenderer = _electron.ipcRenderer; //! 去掉安全警告

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; // All of the Node.js APIs are available in the preload process.
// 它拥有与Chrome扩展一样的沙盒。
// window.addEventListener("DOMContentLoaded", () => {
//     const replaceText = (selector: string, text: string) => {
//         const element = document.getElementById(selector)
//         if (element) element.innerText = text
//     }
//     for (const dependency of ["chrome", "node", "electron"]) {
//         replaceText(`${dependency}-version`, process.versions[dependency]!)
//     }
// })