import { checkHasAuthority, isArray, isEmptyArray } from 'easy-soft-utility';

function buildAccessAssist() {
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
}

export default buildAccessAssist;
