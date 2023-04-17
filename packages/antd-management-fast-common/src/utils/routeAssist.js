import { matchPath, matchRoutes } from '@umijs/max';

import {
  checkWhetherDevelopmentEnvironment,
  getCache,
  saveJsonToLocalStorage,
  setCache,
} from 'easy-soft-utility';

const cacheKeyCollection = {
  currentLocation: 'currentLocation',
  currentParams: 'currentParams',
  currentRoute: 'currentRoute',
};

function setCurrentLocation(location) {
  setCache({
    key: cacheKeyCollection.currentLocation,
    value: location || {},
  });

  if (checkWhetherDevelopmentEnvironment()) {
    saveJsonToLocalStorage(
      `debug-${cacheKeyCollection.currentLocation}`,
      location,
    );
  }
}

export function getCurrentLocation() {
  return getCache({ key: cacheKeyCollection.currentLocation }) || {};
}

function setCurrentParameters(parameters) {
  setCache({
    key: cacheKeyCollection.currentParams,
    value: parameters || {},
  });

  if (checkWhetherDevelopmentEnvironment()) {
    saveJsonToLocalStorage(
      `debug-${cacheKeyCollection.currentParams}`,
      parameters,
    );
  }
}

export function getCurrentParameters() {
  return getCache({ key: cacheKeyCollection.currentParams }) || {};
}

function setCurrentRoute(route) {
  setCache({
    key: cacheKeyCollection.currentRoute,
    value: route || {},
  });

  if (checkWhetherDevelopmentEnvironment()) {
    saveJsonToLocalStorage(`debug-${cacheKeyCollection.currentRoute}`, route);
  }
}

export function getCurrentRoute() {
  return getCache({ key: cacheKeyCollection.currentRoute }) || {};
}

export function analysisRoute({
  location,
  clientRoutes,
  // eslint-disable-next-line no-unused-vars
  routes,
  // eslint-disable-next-line no-unused-vars
  action,
  // eslint-disable-next-line no-unused-vars
  basename,
}) {
  const { pathname } = location;

  const route = matchRoutes(clientRoutes, pathname)?.pop()?.route;

  if (route) {
    const { path } = route;

    const match = matchPath({ path }, pathname);

    const { params } = match;

    if (params) {
      setCurrentParameters(params);
    } else {
      setCurrentParameters({});
    }
  } else {
    setCurrentParameters({});
  }

  setCurrentRoute(route || {});

  setCurrentLocation(location);
}
