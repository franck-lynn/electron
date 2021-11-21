"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNewWindow = void 0;

var _electron = require("electron");

var createNewWindow = function createNewWindow() {
  new _electron.BrowserWindow({
    width: 300,
    height: 200
  });
};

exports.createNewWindow = createNewWindow;