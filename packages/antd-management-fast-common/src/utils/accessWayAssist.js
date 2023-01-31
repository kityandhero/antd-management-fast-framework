import {
  getCache,
  getJsonFromLocalStorage,
  hasCache,
  isArray,
  saveJsonToLocalStorage,
  setCache,
} from 'easy-soft-utility';

import { accessWaySpecialCollection } from './constants';

export const storageKeyCollection = {
  accessWayCollection: 'accessWayCollection',
};

export function getAccessWayCollectionCache() {
  let result = {};

  const key = storageKeyCollection.accessWayCollection;

  const existCache = hasCache({ key });

  if (existCache) {
    result = getCache({ key });

    if (isArray(result)) {
      return result;
    }
  }

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return { ...(accessWaySpecialCollection || {}) };
  }

  result = { ...(d || null), ...(accessWaySpecialCollection || {}) };

  setCache({
    key,
    value: result,
  });

  return result;
}

export function setAccessWayCollectionCache(o) {
  const key = storageKeyCollection.accessWayCollection;

  saveJsonToLocalStorage(key, o || {});
}
