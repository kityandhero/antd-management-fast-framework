import copy from 'copy-to-clipboard';

import {
  checkStringIsNullOrWhiteSpace,
  isEqualBySerialize,
  isFunction,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import { getCurrentParameters as getCurrentParameters } from './routeAssist';

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state，
 * @export
 */
export function getDerivedStateFromPropertiesForUrlParametersCore() {
  const parameters = getCurrentParameters();

  return { urlParams: parameters };
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复，则返回null，
 */
export function getDerivedStateFromPropertiesForUrlParameters(
  nextProperties,
  previousState,
  defaultUrlParameters = null,
  parseUrlParametersForSetState = null,
) {
  let stateUrlParameters = getDerivedStateFromPropertiesForUrlParametersCore();

  stateUrlParameters = {
    urlParams: { id: '' },
    ...defaultUrlParameters,
    ...stateUrlParameters,
  };

  const { urlParams: urlParametersPrevious } = previousState;

  const { urlParams } = stateUrlParameters;

  if (isEqualBySerialize({ ...urlParametersPrevious }, { ...urlParams })) {
    return previousState;
  }

  if (isFunction(parseUrlParametersForSetState)) {
    const data = parseUrlParametersForSetState(stateUrlParameters);

    return { ...previousState, ...stateUrlParameters, ...data };
  }

  return { ...previousState, ...stateUrlParameters };
}

/**
 * 复制到剪贴板
 * @param {*} text
 * @param {*} showText
 */
export function copyToClipboard(text, showCopyText = true, otherShowText = '') {
  copy(text);

  if (showCopyText) {
    showSimpleSuccessMessage(`已经将 ${text} 复制到剪贴板！`);
  } else if (checkStringIsNullOrWhiteSpace(otherShowText)) {
    showSimpleSuccessMessage('已经复制到剪贴板！');
  } else {
    showSimpleSuccessMessage(`已经将${otherShowText}复制到剪贴板！`);
  }
}
