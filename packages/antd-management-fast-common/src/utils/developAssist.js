import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';
import { isNull } from './typeCheck';

const storageKeyCollection = {
  nearestLocalhostNotify: 'nearestLocalhostNotify',
};

/**
 * 显示开发辅助信息, 仅 develop 模式下有效
 * @returns
 */
export function showDevelopData() {
  if (process.env.NODE_ENV === 'development') {
    return;
  }
}

export function getNearestLocalhostNotifyCache() {
  const key = storageKeyCollection.nearestLocalhostNotify;

  const d = getJsonFromLocalStorage(key);

  if (isNull(d)) {
    return null;
  }

  if (isNull(d.nearestTime)) {
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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function empty() {
  return {};
}
