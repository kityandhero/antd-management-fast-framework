import { getDispatch } from 'easy-soft-dva';
import {
  getCurrentOperatorCache,
  isFunction,
  logDebug,
  logExecute,
  setCurrentOperatorCache,
} from 'easy-soft-utility';

import { apiRequest } from 'antd-management-fast-common';

import { schedulingControlAssist } from './schedulingControlAssist';

function refreshCurrentOperator({
  successCallback = null,
  failCallback = null,
}) {
  logExecute('refreshCurrentOperator');

  schedulingControlAssist.setCurrentOperatorRequestProcessing(true);

  apiRequest({
    api: 'currentOperator/getCurrentOperator',
    params: {},
    dispatch: getDispatch(),
    successCallback: ({ remoteData }) => {
      const data = {
        ...remoteData,
      };

      logDebug(
        remoteData,
        'response original data on getCurrentOperator success',
      );

      setCurrentOperatorCache(data);

      if (isFunction(successCallback)) {
        logExecute('getCurrentOperator', 'successCallback');

        successCallback(data);
      } else {
        logExecute('getCurrentOperator', 'successCallback not set, ignore');
      }
    },
    failCallback: ({ remoteOriginal }) => {
      logDebug(
        remoteOriginal,
        'response original data on getCurrentOperator fail',
      );

      if (isFunction(failCallback)) {
        logExecute('getCurrentOperator', 'failCallback');

        failCallback();
      } else {
        logExecute('getCurrentOperator', 'failCallback not set, ignore');
      }
    },
    completeProcess: () => {
      schedulingControlAssist.setCurrentOperatorRequestProcessing(false);
    },
  });
}

export function getCurrentOperator({
  force = false,
  successCallback = null,
  failCallback = null,
}) {
  if (schedulingControlAssist.getCurrentOperatorRequestProcessing()) {
    setTimeout(() => {
      getCurrentOperator({
        force: false,
        successCallback,
        failCallback,
      });
    }, 200);

    return;
  }

  logExecute('getCurrentOperator');

  if (!force) {
    const currentOperatorCache = getCurrentOperatorCache();

    if ((currentOperatorCache || null) != null) {
      logDebug(
        currentOperatorCache,
        'current operator get from cache success, ignore fetch from api.',
      );

      if (isFunction(successCallback)) {
        logExecute('getCurrentOperator', 'successCallback');

        successCallback(currentOperatorCache);
      } else {
        logExecute('getCurrentOperator', 'successCallback not set, ignore');
      }

      return;
    }
  }

  refreshCurrentOperator({
    successCallback,
    failCallback,
  });
}
