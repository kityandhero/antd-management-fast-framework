import {
  addHour,
  getStringFromLocalStorage,
  getTimeStamp,
  removeLocalStorage,
  saveStringToLocalStorage,
} from 'easy-soft-utility';

const storageKeyCollection = {
  tokenDeadline: 'amf-tokenDeadline',
};

/**
 * Get token deadline
 */
export function getTokenDeadline() {
  const key = storageKeyCollection.tokenDeadline;

  return getStringFromLocalStorage(key);
}

/**
 * Set token deadline
 */
export function setTokenDeadline() {
  const key = storageKeyCollection.tokenDeadline;

  const datelineTime = addHour(new Date(), 8);

  return saveStringToLocalStorage(key, getTimeStamp(datelineTime));
}

/**
 * Remove token deadline
 */
export function removeTokenDeadline() {
  const key = storageKeyCollection.tokenDeadline;

  removeLocalStorage(key);
}
