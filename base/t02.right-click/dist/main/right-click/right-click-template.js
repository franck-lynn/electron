"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rightClickTemplate = void 0;

var rightClickTemplate = function rightClickTemplate(e) {
  return [{
    label: "复制",
    role: "copy",
    // 只需设置菜单role值为如下示之一，Electron便会自动认出并设置成标准菜单
    accelerator: "ctrl+c"
  }, {
    label: "粘贴",
    role: "paste",
    accelerator: "ctrl+v"
  }, {
    label: "剪切"
  }, {
    label: "非标菜单",
    click: function click() {
      // 主进程向客户端发送
      e.sender.send("context-menu-command", "非标菜单");
    }
  }];
};

exports.rightClickTemplate = rightClickTemplate;