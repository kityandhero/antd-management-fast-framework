import { GlobalRegistry } from '@designable/core';
import { globalThisPolyfill } from '@designable/shared';

export const useRegistry = () => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry;
};
