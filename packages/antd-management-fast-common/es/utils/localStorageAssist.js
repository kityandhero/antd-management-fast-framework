import { decodeBase64, encodeBase64 } from './core.js';
import '../constants.js';
import 'react';
import '@ant-design/icons';
import './mediaDefault.js';
import 'lodash';
import 'path-to-regexp';
import 'qs';
import './typeCheck.js';

/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function getStringFromLocalStorage(key) {
  var storage = window.localStorage;
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
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function getJsonFromLocalStorage(key) {
  var jsonString = getStringFromLocalStorage(key);
  if (jsonString) {
    return JSON.parse(jsonString || '{}');
  }
  return null;
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function saveStringToLocalStorage(key, value) {
  var storage = window.localStorage;
  if (process.env.NODE_ENV === 'development') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function saveJsonToLocalStorage(key, json) {
  saveStringToLocalStorage(key, JSON.stringify(json || {}));
}

/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */
function removeLocalStorage(key) {
  var storage = window.localStorage;
  storage.removeItem(key);
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
function clearLocalStorage() {
  var storage = window.localStorage;
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

export { clearLocalStorage, empty, getJsonFromLocalStorage, getStringFromLocalStorage, removeLocalStorage, saveJsonToLocalStorage, saveStringToLocalStorage };
