import {
  storageKeyCollection,
  getStringFromLocalStorage,
} from './globalStorageAssist';
import RenderAuthorize from '../customComponents/Authorized';

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

// eslint-disable-next-line import/no-mutable-exports
let Authorized = RenderAuthorize(getAuthority());

const reloadAuthorized = () => {
  Authorized = RenderAuthorize(getAuthority());
};

window.reloadAuthorized = reloadAuthorized;

export { reloadAuthorized };

export default Authorized;
