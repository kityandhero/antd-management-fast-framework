import { logExecute } from 'easy-soft-utility';

import { getShowLogRenderFurther } from './settingAssist';

export function logRenderFurther(componentName) {
  if (!getShowLogRenderFurther()) {
    return;
  }

  logExecute('renderFurther', componentName);
}
