import { _ as _objectSpread, i as appInitDefault } from './constants.js';
import { isUndefined as isUndefined$1, isNull as isNull$1, isObject as isObject$1, isString as isString$1, isFunction as isFunction$1, isBoolean as isBoolean$1, replace as replace$1, trim as trim$1, lowerFirst as lowerFirst$1 } from 'lodash';
import 'path-to-regexp';
import 'qs';
import 'react';
import '@ant-design/icons';

function isObject(o) {
  return isObject$1(o);
}

/**
 * check value is string
 */
function isString(value) {
  return isString$1(value);
}
function isFunction(value) {
  return isFunction$1(value);
}
function isBoolean(value) {
  return isBoolean$1(value);
}

/**
 * check value is undefined
 */
function isUndefined(value) {
  return isUndefined$1(value);
}

/**
 * check value is null
 */
function isNull(value) {
  return isNull$1(value);
}

/**
 * 判断是否是数字字符串
 *
 * @export
 * @param {*} str
 * @returns
 */
function isNumber(v) {
  var str = "".concat(typeof v === "undefined" ? null : v);
  if (str === "") {
    return false;
  }
  var regular = /^[0-9]*$/;
  var re = new RegExp(regular);
  return re.test(str);
}
function isArray(value) {
  return Array.isArray(value);
}

function getAppInitConfigData() {
  var appInitConfig = appInitDefault;
  if (isBrowser()) {
    if ((window.appInitCustomLocal || null) != null) {
      appInitConfig = _objectSpread(_objectSpread({}, appInitConfig), window.appInitCustomLocal);
    }
    if ((window.appInitCustomRemote || null) != null) {
      appInitConfig = _objectSpread(_objectSpread({}, appInitConfig), window.appInitCustomRemote);
    }
  }
  return appInitConfig;
}
function replace(source, pattern, replacement) {
  return replace$1(source, pattern, replacement);
}
function trim(source) {
  return trim$1(source);
}
function lowerFirst(source) {
  return lowerFirst$1(source);
}
function stringIsNullOrWhiteSpace(value) {
  return trim(replace(value || '', ' ', '')) === '';
}
function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined';
}

/**
 * 检测目标是否在数组址之中
 */
function inCollection(collection, value) {
  var result = false;
  if (!isArray(collection)) {
    return result;
  }
  collection.some(function (o) {
    if (o === value) {
      result = true;
      return true;
    }
    return false;
  });
  return result;
}

export { inCollection as a, isNumber as b, isFunction as c, isArray as d, isObject as e, isBoolean as f, getAppInitConfigData as g, isBrowser as h, isString as i, isNull as j, isUndefined as k, lowerFirst as l, replace as r, stringIsNullOrWhiteSpace as s, trim as t };
