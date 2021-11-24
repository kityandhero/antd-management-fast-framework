import {
  removeLocalStorage,
  getJsonFromLocalStorage,
  getStringFromLocalStorage,
  saveJsonToLocalStorage,
  saveStringToLocalStorage,
  clearLocalStorage,
} from './tools';

import { accessWaySpecialCollection } from './constants';

export const storageKeyCollection = {
  token: 'token',
  accessWayCollection: 'accessWayCollection',
  nearestLocalhostNotify: 'nearestLocalhostNotify',
  authorityCollection: 'authorityCollection',
};

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
  const key = storageKeyCollection.accessWayCollection;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return { ...(accessWaySpecialCollection || {}) };
  }

  return { ...(d || null), ...(accessWaySpecialCollection || {}) };
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
export function removeToken(v) {
  const key = storageKeyCollection.token;

  return removeLocalStorage(key, v);
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
