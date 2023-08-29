import { useLayout } from './useLayout';

export const usePrefix = (after = '') => {
  console.log(useLayout());

  return useLayout()?.prefixCls + after;
};
