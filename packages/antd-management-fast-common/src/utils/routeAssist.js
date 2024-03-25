import { matchPath, matchRoutes } from '@umijs/max';

import {
  buildPromptModuleInfo,
  checkStringIsNullOrWhiteSpace,
  checkWhetherDevelopmentEnvironment,
  getCache,
  isNumber,
  isUndefined,
  logExecute,
  logTrace,
  mergeTextMessage,
  saveJsonToLocalStorage,
  setCache,
  toNumber,
} from 'easy-soft-utility';

import { modulePackageName } from './definition';

/**
 * Module Name.
 * @private
 */
const moduleName = 'routeAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

const cacheKeyCollection = {
  routeCollection: 'routeCollection',
  currentLocation: 'currentLocation',
  currentLocationParameters: 'currentLocationParameters',
  currentRoute: 'currentRoute',
};

export function orientRoute({ path }) {
  const routes = getRouteCollection();

  let data = null;

  for (const o of Object.entries(routes)) {
    // eslint-disable-next-line no-unused-vars
    const [k, v] = o;

    const { path: itemPath } = {
      path: '',
      ...v,
    };

    if (itemPath === path) {
      data = v;
    }
  }

  if (data != null) {
    let parentId = '';

    let menu = '';

    const { parentId: p, name: n } = { parentId: '', ...data };

    parentId = p;
    menu = n;

    while (
      !checkStringIsNullOrWhiteSpace(parentId) &&
      isNumber(toNumber(parentId))
    ) {
      const item = routes[parentId];

      if (isUndefined(item)) {
        parentId = '';
      } else {
        const { parentId: pLoop, name: nLoop } = {
          parentId: '',
          ...item,
        };

        if (
          !checkStringIsNullOrWhiteSpace(parentId) &&
          isNumber(toNumber(pLoop))
        ) {
          parentId = pLoop;
          menu = `${nLoop}.${menu}`;
        } else {
          parentId = '';
        }
      }
    }

    return {
      path,
      menu: `menu.${menu}`.replaceAll('..', '.'),
      name: n,
    };
  }

  return null;
}

export function setRouteCollection(routeCollection) {
  logTrace(
    {
      routeCollection: routeCollection,
    },
    buildPromptModuleInfoText('set route collection'),
  );

  setCache({
    key: cacheKeyCollection.routeCollection,
    value: routeCollection || [],
  });

  if (checkWhetherDevelopmentEnvironment()) {
    saveJsonToLocalStorage(
      `amf-${cacheKeyCollection.routeCollection}`,
      routeCollection,
    );
  }
}

export function getRouteCollection() {
  return getCache({ key: cacheKeyCollection.routeCollection }) || {};
}

function setCurrentLocation(location) {
  logTrace(
    {
      parameter: location,
    },
    buildPromptModuleInfoText('set current location'),
  );

  setCache({
    key: cacheKeyCollection.currentLocation,
    value: location || {},
  });

  if (checkWhetherDevelopmentEnvironment()) {
    saveJsonToLocalStorage(
      `amf-${cacheKeyCollection.currentLocation}`,
      location,
    );
  }
}

export function getCurrentLocation() {
  return getCache({ key: cacheKeyCollection.currentLocation }) || {};
}

function setCurrentLocationParameters(parameters) {
  logTrace(
    {
      parameter: parameters,
    },
    buildPromptModuleInfoText('set current location parameters'),
  );

  setCache({
    key: cacheKeyCollection.currentLocationParameters,
    value: parameters || {},
  });

  if (checkWhetherDevelopmentEnvironment()) {
    saveJsonToLocalStorage(
      `amf-${cacheKeyCollection.currentLocationParameters}`,
      parameters,
    );
  }
}

export function getCurrentLocationParameters() {
  return getCache({ key: cacheKeyCollection.currentLocationParameters }) || {};
}

function setCurrentRoute(route) {
  logTrace(
    {
      parameter: route,
    },
    buildPromptModuleInfoText('set current route'),
  );

  setCache({
    key: cacheKeyCollection.currentRoute,
    value: route || {},
  });

  if (checkWhetherDevelopmentEnvironment()) {
    saveJsonToLocalStorage(`amf-${cacheKeyCollection.currentRoute}`, route);
  }
}

export function getCurrentRoute() {
  return getCache({ key: cacheKeyCollection.currentRoute }) || {};
}

export function analysisRoute({
  location,
  clientRoutes,
  routes,
  action,
  basename,
}) {
  logExecute(
    {
      parameter: {
        location,
        clientRoutes,
        routes,
        action,
        basename,
      },
    },
    buildPromptModuleInfoText('analysisRoute'),
  );

  const { pathname } = location;

  const route = matchRoutes(clientRoutes, pathname)?.pop()?.route;

  if (route) {
    const { path } = route;

    const match = matchPath({ path }, pathname);

    const { params } = match;

    if (params) {
      setCurrentLocationParameters(params);
    } else {
      setCurrentLocationParameters({});
    }
  } else {
    setCurrentLocationParameters({});
  }

  setCurrentRoute(route || {});

  setCurrentLocation(location);
}
