import { getCache, setCache } from 'easy-soft-utility';

const cacheKeyCollection = {
  currentLocation: 'currentLocation',
  currentParams: 'currentParams',
};

export function setCurrentLocation(location) {
  setCache({
    key: cacheKeyCollection.currentLocation,
    value: location || {},
  });
}

export function getCurrentLocation() {
  return getCache({ key: cacheKeyCollection.currentLocation }) || {};
}

export function setCurrentParameters(parameters) {
  setCache({
    key: cacheKeyCollection.currentParams,
    value: parameters || {},
  });
}

export function getCurrentParameters() {
  return getCache({ key: cacheKeyCollection.currentParams }) || {};
}
