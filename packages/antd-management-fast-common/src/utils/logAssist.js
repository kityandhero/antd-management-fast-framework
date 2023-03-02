import { displayTextMessage } from 'easy-soft-utility';

import { getShowLogRenderFurther } from './settingAssist';

export function logRenderFurther(componentName) {
  if (!getShowLogRenderFurther()) {
    return;
  }
  displayTextMessage({
    text: 'renderFurther',
    color: '#e3adb9',
    dataDescription: 'render',
    ancillaryInformation: componentName,
  });
}
