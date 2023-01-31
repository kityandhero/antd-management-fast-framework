import {
  decodeBase64,
  encodeBase64,
  setSessionStorageFlusher,
  setSessionStorageGetter,
  setSessionStorageRemover,
  setSessionStorageSetter,
} from 'easy-soft-utility';

/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function getFromSessionStorage(key) {
  const storage = window.sessionStorage;
  const value = storage.getItem(key);

  if (process.env.NODE_ENV === 'development') {
    return value;
  }

  const decode = decodeBase64(value);
  const v = encodeBase64(decode);

  if (value !== v) {
    return null;
  }

  return decode;
}

/**
 * 存储本地数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function saveToSessionStorage(key, value) {
  const storage = window.sessionStorage;

  if (process.env.NODE_ENV === 'development') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}

/**
 * 移除SessionStorage数据
 * @export
 * @param {*} key
 */
function removeSessionStorage(key) {
  const storage = window.sessionStorage;

  storage.removeItem(key);
}

/**
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */
function flushSessionStorage() {
  const storage = window.sessionStorage;

  storage.clear();
}

/**
 * 设置 Session Storage 处理器
 */
export function setSessionStorageHandler() {
  setSessionStorageGetter(getFromSessionStorage);
  setSessionStorageSetter(saveToSessionStorage);
  setSessionStorageRemover(removeSessionStorage);
  setSessionStorageFlusher(flushSessionStorage);
}
