import nodeCache from 'node-cache';

/**
 * 获取缓存池
 * @export
 */
export function getCachePool() {
  if ((window.localRunningCache || null) == null) {
    window.localRunningCache = new nodeCache();
  }

  return window.localRunningCache;
}

/**
 * Returns boolean indicating if the key is cached
 * @param {*} key
 * @returns
 */
export function hasCache({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.has(key);
}

/**
 * Sets a key value pair. It is possible to define a ttl (in seconds). Returns true on success
 * @param {*} key
 * @param {*} value
 * @param {*} expiration
 */
export function setCache({ key, value, expiration = 0 }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.set(key, value, expiration);
}

/**
 * Gets a saved value from the cache. Returns a undefined if not found or expired. If the value was found it returns the value
 * @param {*} key
 * @returns
 */
export function getCache({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.get(key);
}

/**
 * get the cached value and remove the key from the cache.
 * @param {*} key
 * @returns
 */
export function takeCache({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.take(key);
}

/**
 * delete a key. Returns the number of deleted entries. A delete will never fail.
 * @param {*} key
 * @returns
 */
export function deleteCache({ key }) {
  const cachePool = getCachePool();

  if (cachePool == null) {
    throw new Error('cache pool not exist');
  }

  return cachePool.del(key);
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export function emptyExport() {
  return {};
}
