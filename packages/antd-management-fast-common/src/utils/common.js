import copy from 'copy-to-clipboard';

import {
  checkStringIsNullOrWhiteSpace,
  isEqualBySerialize,
  isFunction,
  showSimpleSuccessMessage,
} from 'easy-soft-utility';

import { getCurrentLocationParameters } from './routeAssist';

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state.
 * @function
 * @param {Object} nextProperties next properties.
 * @param {Object} previousState previous state.
 * @returns {Object} result object data.
 */
export function getDerivedStateFromPropertiesForUrlParametersCore(
  // eslint-disable-next-line no-unused-vars
  nextProperties,
  // eslint-disable-next-line no-unused-vars
  previousState,
) {
  const parameters = getCurrentLocationParameters();

  return { urlParams: parameters };
}

/**
 * Reacts生命周期getDerivedStateFromProps 辅助函数用于将url参数解析到返回值中用于设定state,如果值重复，则返回null.
 * @function
 * @param {Object} nextProperties next properties.
 * @param {Object} previousState previous state.
 * @param {Object} [defaultUrlParameters=null] default url parameters.
 * @param {Function} [parseUrlParametersForSetState=null] parse url parameters for set state.
 * @returns {Object} result object data.
 */
export function getDerivedStateFromPropertiesForUrlParameters(
  nextProperties,
  previousState,
  defaultUrlParameters = null,
  parseUrlParametersForSetState = null,
) {
  let stateUrlParameters = getDerivedStateFromPropertiesForUrlParametersCore(
    nextProperties,
    previousState,
  );

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
 * copy text to clipboard and show prompt.
 * @function
 * @param {string} text text will copy.
 * @param {boolean} [showCopyText = true] show copy text.
 * @param {string} [otherShowText = ''] show other info text when showCopyText is false and otherShowText is not empty.
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
