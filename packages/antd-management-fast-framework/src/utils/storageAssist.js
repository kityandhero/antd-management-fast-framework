import { getToken } from 'antd-management-fast-common/es/utils/globalStorageAssist';
import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'antd-management-fast-common/es/utils/localStorageAssist';
import { logExecute } from 'antd-management-fast-common/es/utils/tools';

const storageKeyCollection = {
  appListData: 'appListData',
  metaData: 'metaData',
  currentOperator: 'currentOperator',
};

/**
 * 获取 appListData 缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getAppListDataCache() {
  logExecute('getAppListDataCache');

  const key = storageKeyCollection.appListData;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  return d;
}

/**
 * 设置 appListData 缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setAppListDataCache(o) {
  logExecute('setAppListDataCache');

  if ((o || null) == null) {
    return;
  }

  const key = storageKeyCollection.appListData;

  return saveJsonToLocalStorage(key, o);
}

/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeAppListDataCache() {
  logExecute('removeAppListDataCache');

  const key = storageKeyCollection.appListData;

  removeLocalStorage(key);
}

/**
 * 获取metaData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getMetaDataCache() {
  logExecute('getMetaDataCache');

  const key = storageKeyCollection.metaData;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  return d;
}

/**
 * 设置metaData缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setMetaDataCache(o) {
  logExecute('setMetaDataCache');

  if ((o || null) == null) {
    return;
  }

  const key = storageKeyCollection.metaData;

  return saveJsonToLocalStorage(key, o);
}

/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeMetaDataCache() {
  logExecute('removeMetaDataCache');

  const key = storageKeyCollection.metaData;

  removeLocalStorage(key);
}

/**
 * 获取缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getCurrentOperatorCache() {
  logExecute('getCurrentOperatorCache');

  const key = storageKeyCollection.currentOperator;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if (d.flag === '' || d.flag !== getToken()) {
    return null;
  }

  return d.data || null;
}

/**
 * 设置metaData缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setCurrentOperatorCache(o) {
  logExecute('setCurrentOperatorCache');

  const key = storageKeyCollection.currentOperator;

  const d = {
    data: o || null,
    flag: getToken() || '',
  };

  return saveJsonToLocalStorage(key, d);
}

/**
 * 移除经纬度信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeCurrentOperatorCache() {
  logExecute('removeCurrentOperatorCache');

  const key = storageKeyCollection.currentOperator;

  removeLocalStorage(key);
}
