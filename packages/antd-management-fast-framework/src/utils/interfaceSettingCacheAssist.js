import {
  getJsonFromLocalStorage,
  logDebug,
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
 */
export function setInterfaceSetting(value) {
  const key = storageKeyCollection.interfaceSetting;

  logDebug(value, 'save interface setting');

  return saveJsonToLocalStorage(key, value);
}

/**
 * Remove interfaceSetting catch
 *
 * @param {*} fn
 */
export function removeInterfaceSetting() {
  const key = storageKeyCollection.interfaceSetting;

  return removeLocalStorage(key);
}
