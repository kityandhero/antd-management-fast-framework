import {
  getStringFromLocalStorage,
  saveJsonToLocalStorage,
  isArray,
  recordObject,
  isObject,
} from './tools';
import { hasCache, setCache, getCache } from './cacheAssist';
import {
  storageKeyCollection,
  getAccessWayCollectionCache,
} from './globalStorageAssist';
import { reloadAuthorized } from './Authorized';

function getAllAuthorityCore() {
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
    return [authority];
  }

  return isArray(authority) ? authority : [];
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

export function checkHasAuthority(auth) {
  if (isObject(auth)) {
    console.log({
      auth,
      attachedTargetName:
        (this.constructor || null) != null ? this.constructor.name : '',
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

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  saveJsonToLocalStorage(
    storageKeyCollection.authorityCollection,
    proAuthority,
  );

  // auto reload
  reloadAuthorized();
}
