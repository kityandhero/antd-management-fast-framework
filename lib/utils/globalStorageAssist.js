"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNearestLocalhostNotifyCache = getNearestLocalhostNotifyCache;
exports.setNearestLocalhostNotifyCache = setNearestLocalhostNotifyCache;
exports.removeNearestLocalhostNotifyCache = removeNearestLocalhostNotifyCache;

function _react() {
  const data = _interopRequireDefault(require("react"));

  _react = function _react() {
    return data;
  };

  return data;
}

function _tools() {
  const data = require("@/utils/tools");

  _tools = function _tools() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storageKeyCollection = {
  nearestLocalhostNotify: 'nearestLocalhostNotify'
};

function getNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  const d = (0, _tools().getJsonFromLocalStorage)(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}

function setNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  const now = parseInt(new Date().getTime() / 1000, 10);
  const d = {
    nearestTime: now
  };
  return (0, _tools().saveJsonToLocalStorage)(key, d);
}

function removeNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  (0, _tools().removeLocalStorage)(key);
}