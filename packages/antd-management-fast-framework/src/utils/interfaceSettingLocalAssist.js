import {
  getJsonFromLocalStorage,
  logExecute,
  removeLocalStorage,
  saveJsonToLocalStorage,
} from 'easy-soft-utility';

const storageKeyCollection = {
  localInterfaceSetting: 'amf-localInterfaceSetting',
};

/**
 * Get local interface setting
 */
export function getLocalInterfaceSetting() {
  const key = storageKeyCollection.localInterfaceSetting;

  return {
    ...getJsonFromLocalStorage(key),
  };
}

/**
 * Set local interface setting
 * @param {string} value
 */
export function setLocalInterfaceSetting(value) {
  logExecute('setLocalInterfaceSetting');

  const key = storageKeyCollection.localInterfaceSetting;

  return saveJsonToLocalStorage(key, value);
}

/**
 * Remove local interface setting
 */
export function removeLocalInterfaceSetting() {
  const key = storageKeyCollection.localInterfaceSetting;

  return removeLocalStorage(key);
}
