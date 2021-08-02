import {
  saveStringToLocalStorage,
  getStringFromLocalStorage,
  removeLocalStorage,
  getJsonFromLocalStorage,
  saveJsonToLocalStorage,
} from '../../src/utils/tools';

const storageKeyCollection = {
  metaData: 'metaData',
  token: 'token',
  supplierFlag: 'supplierFlag',
  currentOperator: 'currentOperator',
};

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
 * 获取Token
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
 * 设置Token
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

/**
 * 获取SupplierFlag键名
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSupplierFlagKeyName() {
  return storageKeyCollection.supplierFlag;
}

/**
 * 获取SupplierFlag
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getSupplierFlag() {
  const key = storageKeyCollection.supplierFlag;

  return getStringFromLocalStorage(key);
}

/**
 * 设置SupplierFlag
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function setSupplierFlag(v) {
  const key = storageKeyCollection.supplierFlag;

  return saveStringToLocalStorage(key, v);
}

/**
 * 移除SupplierFlag
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeSupplierFlag(v) {
  const key = storageKeyCollection.supplierFlag;

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

  if (d.supplierFlag === '' || d.supplierFlag !== getSupplierFlag()) {
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
    supplierFlag: getSupplierFlag() || '',
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

/**
 * 获取useParamsData缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getUseParamsDataCache(key) {
  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    removeUseParamsDataCache(key);
    return null;
  }

  if ((d.dataVersion || '') === '') {
    removeUseParamsDataCache(key);
    return null;
  }

  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  if (d.dataVersion < now) {
    removeUseParamsDataCache(key);
    return null;
  }

  if (d.supplierFlag === '' || d.supplierFlag !== getSupplierFlag()) {
    removeUseParamsDataCache(key);
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
export function setUseParamsDataCache(key, o) {
  const now = parseInt(new Date().getTime() / 1000 / 60 / 30, 10);

  const d = {
    useParamsData: o || null,
    dataVersion: now,
    supplierFlag: getSupplierFlag() || '',
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
export function removeUseParamsDataCache(key) {
  removeLocalStorage(key);
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
export function clearCustomData() {
  removeMetaDataCache();
  removeCurrentOperatorCache();
  removeToken();
  removeSupplierFlag();
}
