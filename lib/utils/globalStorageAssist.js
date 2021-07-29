"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNearestLocalhostNotifyCache = getNearestLocalhostNotifyCache;
exports.setNearestLocalhostNotifyCache = setNearestLocalhostNotifyCache;
exports.removeNearestLocalhostNotifyCache = removeNearestLocalhostNotifyCache;

function _react() {
  var data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

var _tools = require("../utils/tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storageKeyCollection = {
  nearestLocalhostNotify: 'nearestLocalhostNotify'
};

function getNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  var d = (0, _tools.getJsonFromLocalStorage)(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}

function setNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  var now = parseInt(new Date().getTime() / 1000, 10);
  var d = {
    nearestTime: now
  };
  return (0, _tools.saveJsonToLocalStorage)(key, d);
}

function removeNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  (0, _tools.removeLocalStorage)(key);
}