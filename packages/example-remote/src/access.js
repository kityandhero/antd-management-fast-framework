import { checkHasAuthority, isArray, isEmptyArray } from 'easy-soft-utility';

export default () => {
  return {
    checkAccess: (o) => {
      const { authority } = o;

      if (!isArray(authority)) {
        return true;
      }

      if (isEmptyArray(authority)) {
        return true;
      }

      return checkHasAuthority(authority);
    },
  };
};
