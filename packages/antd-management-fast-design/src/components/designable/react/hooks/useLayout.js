import { useContext } from 'react';
import { globalThisPolyfill } from '@designable/shared';

import { DesignerLayoutContext } from '../context';

export const useLayout = () => {
  const context = useContext(DesignerLayoutContext);

  return globalThisPolyfill['__DESIGNABLE_LAYOUT__'] || context;
};
