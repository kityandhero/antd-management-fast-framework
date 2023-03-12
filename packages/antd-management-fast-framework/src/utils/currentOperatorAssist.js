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
  force = false,
  successCallback = null,
  failCallback = null,
}) {
  if (!force) {
    const currentOperatorCache = getCurrentOperatorCache();

    if ((currentOperatorCache || null) != null) {
      logDebug('current operator first fetch success, ignore fetch from api.');

      if (isFunction(successCallback)) {
        logExecute('getCurrentOperator', 'successCallback');

        successCallback(currentOperatorCache);
      } else {
        logExecute('getCurrentOperator', 'successCallback not set, ignore');
      }

      return;
    }
  }

  const dispatch = getDispatch();

  const currentOperatorApi = getCurrentOperatorApi();

  if (checkStringIsNullOrWhiteSpace(currentOperatorApi)) {
    showSimpleWarnMessage(
      'currentOperatorApi has not set, if need use it by api, please set it in applicationConfig with key "currentOperatorApi", it must be like "modelName/effect".',
      'ignore exec',
    );

    if (isFunction(failCallback)) {
      logExecute('getCurrentOperator', 'failCallback');

      failCallback();
    } else {
      logExecute('getCurrentOperator', 'failCallback not set, ignore');
    }

    return;
  }

  apiRequest({
    api: currentOperatorApi,
    params: {},
    dispatch: dispatch,
    successCallback: ({ remoteData }) => {
      const data = {
        ...remoteData,
      };

      setCurrentOperatorCache(data);

      if (isFunction(successCallback)) {
        logExecute('getCurrentOperator', 'successCallback');

        successCallback(data);
      } else {
        logExecute('getCurrentOperator', 'successCallback not set, ignore');
      }
    },
    failCallback: () => {
      logDebug('getCurrentOperator fail');

      if (isFunction(failCallback)) {
        logExecute('getCurrentOperator', 'failCallback');

        failCallback();
      } else {
        logExecute('getCurrentOperator', 'failCallback not set, ignore');
      }
    },
  });
}
