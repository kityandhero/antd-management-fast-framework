import {
  getJsonFromLocalStorage,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

import { getLayoutSetting } from 'antd-management-fast-common';

const storageKeyCollection = {
  interfaceSetting: 'amf-interfaceSetting',
};

/**
 * Get interfaceSetting catch
 */
export function getInterfaceSetting() {
  const key = storageKeyCollection.interfaceSetting;

  return {
    ...getLayoutSetting(),
    ...getJsonFromLocalStorage(key),
  };
}

/**
 * Set interfaceSetting catch
 * @param {String} value
 * @returns
 */
export function setInterfaceSetting(value) {
  const key = storageKeyCollection.interfaceSetting;

  return saveJsonToLocalStorage(key, value);
}

/**
 * Remove interfaceSetting catch
 *
 * @export
 * @param {*} fn
 * @returns
 */
export function removeInterfaceSetting() {
  const key = storageKeyCollection.interfaceSetting;

  return removeLocalStorage(key);
}
