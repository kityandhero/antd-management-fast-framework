import { decodeBase64, encodeBase64 } from 'easy-soft-utility';

/**
 * 获取LocalStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
function getFromLocalStorage(key) {
  const storage = window.localStorage;
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
function saveToLocalStorage(key, value) {
  const storage = window.localStorage;

  if (process.env.NODE_ENV === 'development') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}

/**
 * 移除LocalStorage数据
 * @export
 * @param {*} key
 */
function removeLocalStorage(key) {
  const storage = window.localStorage;

  storage.removeItem(key);
}

/**
 * 清空LocalStorage数据
 * @export
 * @param {*} key
 */
function flushLocalStorage() {
  const storage = window.localStorage;

  storage.clear();
}

/**
 * 设置 Local Storage 处理器
 */
export function setLocalStorageHandler() {
  setLocalStorageGetter(getFromLocalStorage);
  setLocalStorageSetter(saveToLocalStorage);
  setLocalStorageRemover(removeLocalStorage);
  setLocalStorageFlusher(flushLocalStorage);
}
