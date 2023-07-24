import {
  checkStringIsNullOrWhiteSpace,
  decodeBase64,
  encodeBase64,
  setLocalStorageFlusher,
  setLocalStorageGetter,
  setLocalStorageRemover,
  setLocalStorageSetter,
  toString,
} from 'easy-soft-utility';

import { getLocalStorageSecretSwitch } from './settingAssist';

/**
 * 获取LocalStorage数据
 * @param {*} key
 */
function getFromLocalStorage(key) {
  const storage = window.localStorage;
  const value = storage.getItem(key) || '';

  const secretSwitch = getLocalStorageSecretSwitch();

  if (!secretSwitch) {
    return value;
  }

  let decode = '';
  let v = '';

  if (!checkStringIsNullOrWhiteSpace(value)) {
    decode = decodeBase64(value);
    v = encodeBase64(decode);
  }

  if (value !== v) {
    return null;
  }

  return decode;
}

/**
 * 存储本地数据
 * @param {*} key key
 * @param {*} value value
 */
function saveToLocalStorage(key, value) {
  const storage = window.localStorage;

  const valueAdjust = toString(value);

  const secretSwitch = getLocalStorageSecretSwitch();

  if (secretSwitch) {
    if (checkStringIsNullOrWhiteSpace(valueAdjust)) {
      storage.setItem(key, valueAdjust);
    } else {
      storage.setItem(key, encodeBase64(valueAdjust));
    }
  } else {
    storage.setItem(key, value);
  }
}

/**
 * 移除LocalStorage数据
 * @param {*} key
 */
function removeLocalStorage(key) {
  const storage = window.localStorage;

  storage.removeItem(key);
}

/**
 * 清空LocalStorage数据
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
