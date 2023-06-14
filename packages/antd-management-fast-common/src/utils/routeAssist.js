import { matchPath, matchRoutes } from '@umijs/max';

import {
  buildPromptModuleInfo,
  checkWhetherDevelopmentEnvironment,
  getCache,
  logExecute,
  logTrace,
  mergeTextMessage,
  saveJsonToLocalStorage,
  setCache,
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
  currentLocation: 'currentLocation',
  currentLocationParameters: 'currentLocationParameters',
  currentRoute: 'currentRoute',
};

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
