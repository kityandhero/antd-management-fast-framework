import { getToken } from 'antd-management-fast-common/es/utils/globalStorageAssist';
import {
  getJsonFromLocalStorage,
  getStringFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
  saveStringToLocalStorage,
} from 'antd-management-fast-common/es/utils/localStorageAssist';

const storageKeyCollection = {
  metaData: 'metaData',
  dataFlag: 'dataFlag',
  currentOperator: 'currentOperator',
};

/**
 * 获取DataFlag键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getDataFlagKeyName() {
  return storageKeyCollection.dataFlag;
}

/**
 * 获取DataFlag
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getDataFlag() {
  const key = storageKeyCollection.dataFlag;

  return getStringFromLocalStorage(key);
}

/**
 * 设置DataFlag
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setDataFlag(v) {
  const key = storageKeyCollection.dataFlag;

  return saveStringToLocalStorage(key, v);
}

/**
 * 移除DataFlag
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeDataFlag(v) {
  const key = storageKeyCollection.dataFlag;

  return removeLocalStorage(key, v);
}

/**
 * 获取metaData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getMetaDataCache() {
  const key = storageKeyCollection.metaData;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  if ((d.dataVersion || '') === '') {
    return null;
  }

  const now = parseInt(new Date().getTime() / 1000 / 60 / 5, 10);

  if (d.dataVersion < now) {
    return null;
  }

  if (d.dataFlag === '' || d.dataFlag !== getDataFlag()) {
    return null;
  }

  return d.metaData || null;
}

/**
 * 设置metaData缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setMetaDataCache(o) {
  const key = storageKeyCollection.metaData;

  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const d = {
    metaData: o || null,
    dataVersion: now,
    dataFlag: getDataFlag() || '',
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
export function removeMetaDataCache() {
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
  const key = storageKeyCollection.currentOperator;
  removeLocalStorage(key);
}
