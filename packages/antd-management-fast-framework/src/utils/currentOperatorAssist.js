import { getDispatch } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  getCurrentOperatorCache,
  isFunction,
  logDebug,
  logExecute,
  setCurrentOperatorCache,
  showSimpleWarnMessage,
} from 'easy-soft-utility';

import { apiRequest, getCurrentOperatorApi } from 'antd-management-fast-common';

export function getCurrentOperator({
  force = true,
  successCallback = null,
  failCallback = null,
}) {
  logExecute('getCurrentOperator');

  if (!force) {
    const currentOperatorCache = getCurrentOperatorCache();

    if ((currentOperatorCache || null) != null) {
      logDebug('current operator first fetch success, ignore fetch from api.');

      return;
    }

    if (isFunction(successCallback)) {
      successCallback(currentOperatorCache);
    }
  }

  const dispatch = getDispatch();

  const currentOperatorDispatchType = getCurrentOperatorApi();

  if (checkStringIsNullOrWhiteSpace(currentOperatorDispatchType)) {
    showSimpleWarnMessage(
      'currentOperatorDispatchType has not set, if need use it by api, please set it in applicationConfig with key "currentOperatorDispatchType", it must be like "modelName/effect".',
      'ignore exec',
    );

    if (isFunction(failCallback)) {
      failCallback();
    }

    return;
  }

  apiRequest({
    api: currentOperatorDispatchType,
    params: {},
    dispatch: dispatch,
    successCallback: ({ remoteData }) => {
      const data = {
        ...remoteData,
      };

      setCurrentOperatorCache(data);

      if (isFunction(successCallback)) {
        successCallback(data);
      }
    },
    failCallback: failCallback,
  });
}
