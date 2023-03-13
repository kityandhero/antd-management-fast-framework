import { isFunction, logDebug, logExecute } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { getCurrentOperator } from './currentOperatorAssist';

export function signInAction({
  target,
  handleData,
  successCallback = null,
  failCallback = null,
}) {
  actionCore({
    api: 'entrance/signIn',
    target,
    params: handleData,
    showProcessing: false,
    successCallback: ({ target, remoteData }) => {
      logDebug(remoteData, 'response original data on signIn success');

      getCurrentOperator();

      if (isFunction(successCallback)) {
        logExecute('singIn', 'successCallback');

        successCallback({ target, remoteData });
      } else {
        logExecute('singIn', 'successCallback not set, ignore');
      }
    },
    failCallback: ({ remoteOriginal }) => {
      logDebug(remoteOriginal, 'response original data on signIn fail');

      if (isFunction(failCallback)) {
        logExecute('singIn', 'failCallback');

        failCallback();
      } else {
        logExecute('singIn', 'failCallback not set, ignore');
      }
    },
  });
}
