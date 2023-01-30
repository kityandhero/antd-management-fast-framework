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

export function setCurrentParams(params) {
  setCache({
    key: cacheKeyCollection.currentParams,
    value: params || {},
  });
}

export function getCurrentParams() {
  return getCache({ key: cacheKeyCollection.currentParams }) || {};
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
