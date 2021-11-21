"use strict";

require("core-js/modules/es.array.includes.js");

var _electron = require("electron");

// https://www.wakuwakubank.com/posts/773-electron-ipc/
// https://stackoverflow.com/questions/55164360/with-contextisolation-true-is-it-possible-to-use-ipcrenderer
// https://www.electronjs.org/docs/latest/tutorial/context-isolation#after-context-isolation-enabled
// https://mattallan.me/posts/electron-context-bridge/
// // 这里出现警告是因为 window.d.ts 文件没有定义
// window.ipcRenderer = ipcRenderer
// // 去掉安全警告
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true"; //! 上下文隔离配置

_electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  //! 其实, 这样的导出还是有安全问题的, 需要加一个验证
  // any 类型不报警
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send: function send(channel, args) {
    console.log("send on channel " + channel); // 设置一个白名单

    var validChannels = ['ping'];

    if (validChannels.includes(channel)) {
      _electron.ipcRenderer.send(channel, args);
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  receive: function receive(channel, f) {
    console.log("reveive on channel " + channel);
    var validChannels = ["set-auth-token", "set-window-name", "get-window-name", "send-message-to-one-drive", "update-badge", "is-hidden", "open-google-sign-in"];

    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      _electron.ipcRenderer.on(channel, function (event) {
        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return f.apply(void 0, args);
      });
    }
  }
});