import { decodeBase64, encodeBase64 } from './core.js';
import '../constants.js';
import '@ant-design/icons';
import 'react';
import './mediaDefault.js';
import 'lodash';
import 'path-to-regexp';
import 'qs';
import './typeCheck.js';

/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function getStringFromSessionStorage(key) {
  var storage = window.sessionStorage;
  var value = storage.getItem(key);
  if (process.env.NODE_ENV === 'development') {
    return value;
  }
  var decode = decodeBase64(value);
  var v = encodeBase64(decode);
  if (value !== v) {
    return null;
  }
  return decode;
}

/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function getJsonFromSessionStorage(key) {
  var jsonString = getStringFromSessionStorage(key);
  if (jsonString) {
    return JSON.parse(jsonString || '{}');
  }
  return null;
}

/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function saveStringToSessionStorage(key, value) {
  var storage = window.sessionStorage;
  if (process.env.NODE_ENV === 'development') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}

/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function saveJsonToSessionStorage(key, json) {
  saveStringToSessionStorage(key, JSON.stringify(json || {}));
}

/**
 * 移除SessionStorage数据
 * @export
 * @param {*} key
 */
function removeSessionStorage(key) {
  var storage = window.sessionStorage;
  storage.removeItem(key);
}

/**
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */
function clearSessionStorage() {
  var storage = window.sessionStorage;
  storage.clear();
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

export { clearSessionStorage, empty, getJsonFromSessionStorage, getStringFromSessionStorage, removeSessionStorage, saveJsonToSessionStorage, saveStringToSessionStorage };
