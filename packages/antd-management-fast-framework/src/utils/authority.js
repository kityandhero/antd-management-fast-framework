import {
  getStringFromLocalStorage,
  saveJsonToLocalStorage,
  isArray,
  recordObject,
} from './tools';
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
  const list = getAllAuthorityCore();

  const accessWayCollection = getAccessWayCollectionCache();
  const superAuth = accessWayCollection.super.permission ?? '';

  const isSuper = (list || []).find((o) => o === superAuth);

  if (isSuper === superAuth) {
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

  return v !== undefined;
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
