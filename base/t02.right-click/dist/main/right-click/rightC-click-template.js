"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rightClickTemplate = void 0;
var rightClickTemplate = [{
  label: "复制",
  role: 'copy',
  accelerator: 'ctrl+c',
  click: function click() {
    console.log("右键点击");
  }
}, {
  label: "粘贴",
  role: 'paste',
  accelerator: 'ctrl+v'
}, {
  label: "剪切"
}];
exports.rightClickTemplate = rightClickTemplate;