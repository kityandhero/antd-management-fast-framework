import {
  lowerFirst as lowerFirstLodash,
  replace as replaceLodash,
  trim as trimLodash,
  upperFirst as upperFirstLodash,
} from 'lodash';
import { pathToRegexp } from 'path-to-regexp';
import { parse } from 'qs';
import React from 'react';

import { appInitDefault } from './constants';
import { isArray } from './typeCheck';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathToRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};

export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach((route) => {
    // match prefix
    if (pathToRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
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

export const isComponentClass = (component) => {
  if (!component) return false;
  const proto = Object.getPrototypeOf(component);
  if (proto === React.Component || proto === Function.prototype) return true;
  return isComponentClass(proto);
};

export function getAppInitConfigData() {
  let appInitConfig = appInitDefault;

  if (isBrowser()) {
    if ((window.appInitCustomLocal || null) != null) {
      appInitConfig = { ...appInitConfig, ...window.appInitCustomLocal };
    }

    if ((window.appInitCustomRemote || null) != null) {
      appInitConfig = { ...appInitConfig, ...window.appInitCustomRemote };
    }

    appInitConfig = {
      ...appInitDefault,
      ...((window.appInitCustomLocalCore || null) != null
        ? window.appInitCustomLocalCore
        : {}),
      ...((window.appInitCustomLocalSpecial || null) != null
        ? window.appInitCustomLocalSpecial
        : {}),
      ...((window.appInitCustomRemote || null) != null
        ? window.appInitCustomRemote
        : {}),
    };
  }

  return appInitConfig;
}

export function replace(source, pattern, replacement) {
  return replaceLodash(source, pattern, replacement);
}

export function trim(source) {
  return trimLodash(source);
}

export function upperFirst(source) {
  return upperFirstLodash(source);
}

export function lowerFirst(source) {
  return lowerFirstLodash(source);
}

export function stringIsNullOrWhiteSpace(value) {
  return trim(replace(value || '', ' ', '')) === '';
}

export function isBrowser() {
  return (
    typeof window !== 'undefined' &&
    typeof window.document !== 'undefined' &&
    typeof window.document.createElement !== 'undefined'
  );
}

/**
 * 检测目标是否在数组址之中
 */
export function inCollection(collection, value) {
  let result = false;

  if (!isArray(collection)) {
    return result;
  }

  collection.some((o) => {
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
export function decodeBase64(target) {
  let commonContent = (target || '').replace(/\s/g, '+');

  commonContent = Buffer.from(commonContent, 'base64').toString();

  return commonContent;
}

/**
 * base64编码
 */
export function encodeBase64(target) {
  const base64Content = Buffer.from(target).toString('base64');

  return base64Content;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
