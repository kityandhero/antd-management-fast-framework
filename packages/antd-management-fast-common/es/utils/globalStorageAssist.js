import { _ as _objectSpread, f as accessWaySpecialCollection } from '../constants.js';
import { hasCache, getCache, setCache } from './cacheAssist.js';
import { getJsonFromLocalStorage, saveJsonToLocalStorage, removeLocalStorage, getStringFromLocalStorage, saveStringToLocalStorage, clearLocalStorage } from './localStorageAssist.js';
import { isArray } from './typeCheck.js';
import '@ant-design/icons';
import 'react';
import './mediaDefault.js';
import 'node-cache';
import './core.js';
import 'lodash';
import 'path-to-regexp';
import 'qs';
import './log.js';

var storageKeyCollection = {
  token: 'token',
  accessWayCollection: 'accessWayCollection',
  nearestLocalhostNotify: 'nearestLocalhostNotify',
  authorityCollection: 'authorityCollection'
};

/**
 * getNearestLocalhostNotifyCache
 * @returns
 */
function getNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  var d = getJsonFromLocalStorage(key);
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
  return saveJsonToLocalStorage(key, d);
}
function removeNearestLocalhostNotifyCache() {
  var key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}
function getAccessWayCollectionCache() {
  var result = {};
  var key = storageKeyCollection.accessWayCollection;
  var existCache = hasCache({
    key: key
  });
  if (existCache) {
    result = getCache({
      key: key
    });
    if (isArray(result)) {
      return result;
    }
  }
  var d = getJsonFromLocalStorage(key);
  if ((d || null) == null) {
    return _objectSpread({}, accessWaySpecialCollection || {});
  }
  result = _objectSpread(_objectSpread({}, d || null), accessWaySpecialCollection || {});
  setCache({
    key: key,
    value: result
  });
  return result;
}
function setAccessWayCollectionCache(o) {
  var key = storageKeyCollection.accessWayCollection;
  saveJsonToLocalStorage(key, o || {});
}

/**
 * 获取useParamsData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
function getParamsDataCache(key) {
  var d = getJsonFromLocalStorage(key);
  if ((d || null) == null) {
    removeParamsDataCache(key);
    return null;
  }
  if ((d.dataVersion || '') === '') {
    removeParamsDataCache(key);
    return null;
  }
  var now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);
  if (d.dataVersion < now) {
    removeParamsDataCache(key);
    return null;
  }
  return d.useParamsData || null;
}

/**
 * 设置useParamsData缓存
 *
 * @export
 * @param {o} useParamsData数据
 * @returns
 */
function setParamsDataCache(key, o) {
  var now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);
  var d = {
    useParamsData: o || null,
    dataVersion: now
  };
  return saveJsonToLocalStorage(key, d);
}

/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
function removeParamsDataCache(key) {
  removeLocalStorage(key);
}

/**
 * 获取Token键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
function getTokenKeyName() {
  return storageKeyCollection.token;
}

/**
 * Get Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
function getToken() {
  var key = storageKeyCollection.token;
  return getStringFromLocalStorage(key);
}

/**
 * Set Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
function setToken(v) {
  var key = storageKeyCollection.token;
  return saveStringToLocalStorage(key, v);
}

/**
 * 移除Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
function removeToken() {
  var key = storageKeyCollection.token;
  return removeLocalStorage(key);
}
function getTokenObject() {
  var tokenSetObject = {};
  tokenSetObject["".concat(getTokenKeyName())] = getToken() || '';
  return tokenSetObject;
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
function clearCustomData() {
  clearLocalStorage();
}

export { clearCustomData, getAccessWayCollectionCache, getNearestLocalhostNotifyCache, getParamsDataCache, getToken, getTokenKeyName, getTokenObject, removeNearestLocalhostNotifyCache, removeParamsDataCache, removeToken, setAccessWayCollectionCache, setNearestLocalhostNotifyCache, setParamsDataCache, setToken, storageKeyCollection };
