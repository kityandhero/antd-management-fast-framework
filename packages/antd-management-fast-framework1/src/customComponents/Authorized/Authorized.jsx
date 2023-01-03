import { Result } from 'antd';

import { flushAllCache } from './cacheAssist';
import check from './CheckPermissions';
import { storageKeyCollection } from './globalStorageAssist';
import {
  getStringFromLocalStorage,
  saveJsonToLocalStorage,
} from './localStorageAssist';
import { isArray } from './typeCheck';

const Authorized = ({
  children,
  authority,
  noMatch = (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
    />
  ),
}) => {
  const childrenRender = typeof children === 'undefined' ? null : children;
  const dom = check(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

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

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined'
      ? getStringFromLocalStorage(storageKeyCollection.authorityCollection)
      : str;

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

  if (isArray(authority)) {
    return authority;
  }

  return [];
}

// let Authorized = Authorized(getAuthority());

const reloadAuthorized = () => {
  Authorized = Authorized(getAuthority());
};

window.reloadAuthorized = reloadAuthorized;

export { reloadAuthorized };

// export default Authorized;