import { pathToRegexp } from 'path-to-regexp';

import { isArray, isBrowser } from 'easy-soft-utility';

import { appInitDefault } from './constants';

let appConfigureMerge = {};
let appConfigureMergeComplete = false;

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
0;
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
