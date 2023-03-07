import { matchPath, matchRoutes } from '@umijs/max';

import { getCache, setCache } from 'easy-soft-utility';

const cacheKeyCollection = {
  currentLocation: 'currentLocation',
  currentParams: 'currentParams',
};

function setCurrentLocation(location) {
  setCache({
    key: cacheKeyCollection.currentLocation,
    value: location || {},
  });
}

export function getCurrentLocation() {
  return getCache({ key: cacheKeyCollection.currentLocation }) || {};
}

function setCurrentParameters(parameters) {
  setCache({
    key: cacheKeyCollection.currentParams,
    value: parameters || {},
  });
}

export function getCurrentParameters() {
  return getCache({ key: cacheKeyCollection.currentParams }) || {};
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

  setCurrentLocation(location);
}
