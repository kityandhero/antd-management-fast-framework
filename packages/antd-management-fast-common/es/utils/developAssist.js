import { getJsonFromLocalStorage, saveJsonToLocalStorage, removeLocalStorage } from './localStorageAssist.js';
import { isNull } from './typeCheck.js';
import './core.js';
import '../constants.js';
import '@ant-design/icons';
import 'react';
import './mediaDefault.js';
import 'lodash';
import 'path-to-regexp';
import 'qs';

var storageKeyCollection = {
  nearestLocalhostNotify: 'nearestLocalhostNotify'
};
function getNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  var d = getJsonFromLocalStorage(key);
  if (isNull(d)) {
    return null;
  }
  if (isNull(d.nearestTime)) {
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
  return saveJsonToLocalStorage(key, d);
}
function removeNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
function empty() {
  return {};
}

export { empty, getNearestLocalhostNotifyCache, removeNearestLocalhostNotifyCache, setNearestLocalhostNotifyCache };
