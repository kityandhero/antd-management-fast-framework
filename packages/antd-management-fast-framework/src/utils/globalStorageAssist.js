import { getCache, hasCache, setCache } from './cacheAssist';
import { accessWaySpecialCollection } from './constants';
import {
  clearLocalStorage,
  getJsonFromLocalStorage,
  getStringFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
  saveStringToLocalStorage,
} from './localStorageAssist';
import { isArray } from './typeCheck';

export const storageKeyCollection = {
  token: 'token',
  accessWayCollection: 'accessWayCollection',
  nearestLocalhostNotify: 'nearestLocalhostNotify',
  authorityCollection: 'authorityCollection',
};

/**
 * getNearestLocalhostNotifyCache
 * @returns
 */
export function getNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.nearestTime || null) == null) {
    return null;
  }

  return d || null;
}

export function setNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const now = parseInt(new Date().getTime() / 1000, 10);

  const d = {
    nearestTime: now,
  };

  return saveJsonToLocalStorage(key, d);
}

export function removeNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;
  removeLocalStorage(key);
}

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

/**
 * 获取useParamsData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getParamsDataCache(key) {
  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    removeParamsDataCache(key);
    return null;
  }

  if ((d.dataVersion || '') === '') {
    removeParamsDataCache(key);
    return null;
  }

  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  if (d.dataVersion < now) {
    removeParamsDataCache(key);
    return null;
  }

  return d.useParamsData || null;
}

/**
 * 设置useParamsData缓存
 *
 * @export
 * @param {o} useParamsData数据
 * @returns
 */
export function setParamsDataCache(key, o) {
  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const d = {
    useParamsData: o || null,
    dataVersion: now,
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeParamsDataCache(key) {
  removeLocalStorage(key);
}

/**
 * 获取Token键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getTokenKeyName() {
  return storageKeyCollection.token;
}

/**
 * Get Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getToken() {
  const key = storageKeyCollection.token;

  return getStringFromLocalStorage(key);
}

/**
 * Set Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setToken(v) {
  const key = storageKeyCollection.token;

  return saveStringToLocalStorage(key, v);
}

/**
 * 移除Token
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeToken() {
  const key = storageKeyCollection.token;

  return removeLocalStorage(key);
}

export function getTokenObject() {
  const tokenSetObject = {};
  tokenSetObject[`${getTokenKeyName()}`] = getToken() || '';

  return tokenSetObject;
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearCustomData() {
  clearLocalStorage();
}
