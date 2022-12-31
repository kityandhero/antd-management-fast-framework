import { _ as _objectSpread, c as appInitDefault } from '../constants.js';
import { replace as replace$1, trim as trim$1, upperFirst as upperFirst$1, lowerFirst as lowerFirst$1 } from 'lodash';
import { pathToRegexp } from 'path-to-regexp';
import { parse } from 'qs';
import React from 'react';
import { isArray } from './typeCheck.js';
import '@ant-design/icons';
import './mediaDefault.js';

var getPageQuery = function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
};

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
var getAuthorityFromRouter = function getAuthorityFromRouter() {
  var router = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var pathname = arguments.length > 1 ? arguments[1] : undefined;
  var authority = router.find(function (_ref) {
    var routes = _ref.routes,
      _ref$path = _ref.path,
      path = _ref$path === void 0 ? '/' : _ref$path;
    return path && pathToRegexp(path).exec(pathname) || routes && getAuthorityFromRouter(routes, pathname);
  });
  if (authority) return authority;
  return undefined;
};
var getRouteAuthority = function getRouteAuthority(path, routeData) {
  var authorities;
  routeData.forEach(function (route) {
    // match prefix
    if (pathToRegexp("".concat(route.path, "/(.*)")).test("".concat(path, "/"))) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};
var isComponentClass = function isComponentClass(component) {
  if (!component) return false;
  var proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
};
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
function upperFirst(source) {
  return upperFirst$1(source);
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

/**
 * base64解码
 */
function decodeBase64(target) {
  var commonContent = (target || '').replace(/\s/g, '+');
  commonContent = Buffer.from(commonContent, 'base64').toString();
  return commonContent;
}

/**
 * base64编码
 */
function encodeBase64(target) {
  var base64Content = Buffer.from(target).toString('base64');
  return base64Content;
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

export { decodeBase64, empty, encodeBase64, getAppInitConfigData, getAuthorityFromRouter, getPageQuery, getRouteAuthority, inCollection, isBrowser, isComponentClass, lowerFirst, replace, stringIsNullOrWhiteSpace, trim, upperFirst };
