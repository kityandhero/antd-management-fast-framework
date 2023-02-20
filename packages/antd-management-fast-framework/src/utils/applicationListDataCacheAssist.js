import {
  getJsonFromLocalStorage,
  logExecute,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

const storageKeyCollection = {
  applicationListData: 'applicationListData',
};

/**
 * 获取 applicationListData 缓存
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function getApplicationListDataCache() {
  logExecute('getApplicationListDataCache');

  const key = storageKeyCollection.applicationListData;

  const d = getJsonFromLocalStorage(key);

  if ((d || null) == null) {
    return null;
  }

  return d;
}

/**
 * 设置 applicationListData 缓存
 *
 * @export
 * @param {o} metaData数据
 * @returns
 */
export function setApplicationListDataCache(o) {
  logExecute('setApplicationListDataCache');

  if ((o || null) == null) {
    return;
  }

  const key = storageKeyCollection.applicationListData;

  return saveJsonToLocalStorage(key, o);
}

/**
 * 移除信息
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeApplicationListDataCache() {
  logExecute('removeApplicationListDataCache');

  const key = storageKeyCollection.applicationListData;

  removeLocalStorage(key);
}
