import { pathToRegexp } from 'path-to-regexp';
import { parse } from 'qs';
import React from 'react';

import { isArray } from 'easy-soft-utility';

import { appInitDefault } from './constants';

let appConfigureMerge = {};
let appConfigureMergeComplete = false;

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
  if (appConfigureMergeComplete) {
    return appConfigureMerge;
  }

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

    appInitConfig.appListData = [
      ...(isArray(appInitDefault.appListData)
        ? appInitDefault.appListData
        : []),
      ...((window.appInitCustomLocalCore || null) != null
        ? isArray(window.appInitCustomLocalCore.appListData)
          ? window.appInitCustomLocalCore.appListData
          : []
        : []),
      ...((window.appInitCustomLocalSpecial || null) != null
        ? isArray(window.appInitCustomLocalSpecial.appListData)
          ? window.appInitCustomLocalSpecial.appListData
          : []
        : []),
      ...((window.appInitCustomRemote || null) != null
        ? isArray(window.appInitCustomRemote.appListData)
          ? window.appInitCustomRemote.appListData
          : []
        : []),
    ];
  }

  appConfigureMerge = appInitConfig;

  appConfigureMergeComplete = true;

  return appConfigureMerge;
}
