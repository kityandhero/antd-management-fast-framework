import RenderAuthorize from '../customComponents/Authorized';
import { storageKeyCollection } from './globalStorageAssist';
import { getStringFromLocalStorage } from './localStorageAssist';
import { isArray } from './typeCheck';

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

let Authorized = RenderAuthorize(getAuthority());

const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};

window.reloadAuthorized = reloadAuthorized;

export { reloadAuthorized };

export default Authorized;
