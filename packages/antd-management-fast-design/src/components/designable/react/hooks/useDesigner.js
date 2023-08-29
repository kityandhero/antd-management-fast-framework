import { useContext, useEffect } from 'react';
import { globalThisPolyfill, isFn } from '@designable/shared';

import { DesignerEngineContext } from '../context';

export const useDesigner = (effects) => {
  const context = useContext(DesignerEngineContext);

  const designer = globalThisPolyfill['__DESIGNABLE_ENGINE__'] || context;

  useEffect(() => {
    if (isFn(effects)) {
      return effects(designer);
    }
  }, [designer, effects]);

  return designer;
};
