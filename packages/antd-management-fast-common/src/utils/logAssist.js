import { displayTextMessage } from 'easy-soft-utility';

import { getShowLogInConsole, getShowLogRenderFurther } from './settingAssist';

export function logRenderFurther(componentName) {
  if (!getShowLogInConsole()) {
    return;
  }

  if (!getShowLogRenderFurther()) {
    return;
  }

  displayTextMessage({
    text: 'renderFurther',
    color: '#e3adb9',
    dataDescription: 'renderFurther',
    ancillaryInformation: componentName,
  });
}
