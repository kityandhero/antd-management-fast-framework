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

export function logRender(text, ancillaryInformation = '') {
  if (!getShowLogInConsole()) {
    return;
  }

  displayTextMessage({
    text: text,
    color: '#7093f4',
    dataDescription: 'render',
    ancillaryInformation: ancillaryInformation,
  });
}
