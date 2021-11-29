import {
  getStringFromLocalStorage,
  saveJsonToLocalStorage,
  isArray,
  recordObject,
  isObject,
  isString,
  showErrorMessage,
  recordError,
} from './tools';
import { hasCache, setCache, getCache, flushAllCache } from './cacheAssist';
import {
  storageKeyCollection,
  getAccessWayCollectionCache,
} from './globalStorageAssist';
import { reloadAuthorized } from './Authorized';

const authorityCollectionCache = 'authorityCollectionCache';

function getAllAuthorityCore() {
  let result = [];

  const existCache = hasCache({ key: authorityCollectionCache });

  if (existCache) {
    result = getCache({ key: authorityCollectionCache });

    if (isArray(result)) {
      return result;
    }
  }

  const authorityString = getStringFromLocalStorage(
    storageKeyCollection.authorityCollection,
  );

  let authority;

  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    result.push(authority);
  } else {
    result = isArray(authority) ? authority : [];
  }

  setCache({
    key: authorityCollectionCache,
    value: result,
  });

  return result;
}

export function getAllAuthority() {
  return getAllAuthorityCore();
}

export function checkIsSuper() {
  const list = getAllAuthorityCore();
  const superAuth = getAccessWayCollectionCache().super.permission ?? '';

  const isSuper = (list || []).find((o) => o === superAuth) || '';

  if (isSuper === superAuth) {
    return true;
  }

  return false;
}

export function checkHasAuthorities(authCollection) {
  let result = false;

  if (isArray(authCollection)) {
    authCollection.forEach((auth) => {
      result = checkHasAuthority(auth);

      if (result) {
        return true;
      }
    });

    for (const auth in authCollection) {
      result = checkHasAuthority(auth);

      if (result) {
        break;
      }
    }

    return result;
  }

  if (isString(authCollection)) {
    result = checkHasAuthority(authCollection);

    return result;
  }

  const text = '无效的待验证权限';

  showErrorMessage({
    message: text,
  });

  recordError({ auth });

  return result;
}

export function checkHasAuthority(auth) {
  if (isObject(auth)) {
    console.log({
      auth,
      attachedTargetName:
        (this || null) != null
          ? (this.constructor || null) != null
            ? this.constructor.name
            : ''
          : '',
    });
  }

  let result = '0';

  const existCache = hasCache({ key: auth });

  if (existCache) {
    result = getCache({ key: auth });

    if (result !== undefined) {
      return result !== '0';
    }
  }

  const list = getAllAuthorityCore();

  const accessWayCollection = getAccessWayCollectionCache();
  const superAuth = accessWayCollection.super.permission ?? '';

  const isSuper = (list || []).find((o) => o === superAuth);

  if (isSuper === superAuth) {
    setCache({
      key: auth,
      value: '1',
    });

    return true;
  }

  const v = (list || []).find((o) => o === auth);

  if ((v ?? null) == null) {
    recordObject({
      superAuth,
      checkAuthority: auth,
      listAuthority: list,
      accessWayCollection,
    });
  }

  result = !!(v !== undefined) ? '1' : '0';

  setCache({
    key: auth,
    value: result,
  });

  return result !== '0';
}

/**
 * 缓存用户权限数据体
 * @param {*} authority
 */
export function setAuthority(authority) {
  const authorityCollection =
    typeof authority === 'string' ? [authority] : authority;

  saveJsonToLocalStorage(
    storageKeyCollection.authorityCollection,
    authorityCollection,
  );

  flushAllCache();

  // auto reload
  reloadAuthorized();
}
