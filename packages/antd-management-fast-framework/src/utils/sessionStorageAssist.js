/**
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getStringFromSessionStorage(key) {
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
 * 获取SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function getJsonFromSessionStorage(key) {
  const jsonString = getStringFromSessionStorage(key);

  if (jsonString) {
    return JSON.parse(jsonString || '{}');
  }

  return null;
}

/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveStringToSessionStorage(key, value) {
  const storage = window.sessionStorage;

  if (process.env.NODE_ENV === 'development') {
    storage.setItem(key, value);
  } else {
    storage.setItem(key, encodeBase64(value));
  }
}

/**
 * 存储SessionStorage数据
 * @export
 * @param {*} key
 * @param {*} value
 */
export function saveJsonToSessionStorage(key, json) {
  saveStringToSessionStorage(key, JSON.stringify(json || {}));
}

/**
 * 移除SessionStorage数据
 * @export
 * @param {*} key
 */
export function removeSessionStorage(key) {
  const storage = window.sessionStorage;
  storage.removeItem(key);
}

/**
 * 清空SessionStorage数据
 * @export
 * @param {*} key
 */
export function clearSessionStorage() {
  const storage = window.sessionStorage;
  storage.clear();
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
