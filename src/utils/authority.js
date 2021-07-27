import accessWayCollection from '@/customConfig/accessWayCollection';

import { getStringFromLocalStorage, saveJsonToLocalStorage, isArray } from './tools';
// eslint-disable-next-line import/no-cycle
import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return getStringFromLocalStorage('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? getStringFromLocalStorage('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }

  return authority || ['admin'];
}

function getAllAuthorityCore() {
  // return getStringFromLocalStorage('antd-pro-authority') || ['admin', 'user'];
  const authorityString = getStringFromLocalStorage('antd-pro-authority');
  // authorityString could be admin, "admin", ["admin"]
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
  const superAuth = accessWayCollection.super;

  const isSuper = (list || []).find((o) => o === superAuth) || '';

  if (isSuper === superAuth) {
    return true;
  }

  return false;
}

export function checkHasAuthority(auth) {
  const list = getAllAuthorityCore();
  const superAuth = accessWayCollection.super;

  const isSuper = (list || []).find((o) => o === superAuth);

  if (isSuper === superAuth) {
    return true;
  }

  const v = (list || []).find((o) => o === auth);

  return v !== undefined;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  saveJsonToLocalStorage('antd-pro-authority', proAuthority);

  // auto reload
  reloadAuthorized();
}
