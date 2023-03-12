import { isFunction, logExecute } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

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
      if (isFunction(successCallback)) {
        logExecute('singIn', 'successCallback');

        successCallback({ target, remoteData });
      } else {
        logExecute('singIn', 'successCallback not set, ignore');
      }
    },
    failCallback: () => {
      if (isFunction(failCallback)) {
        logExecute('singIn', 'failCallback');

        failCallback();
      } else {
        logExecute('singIn', 'failCallback not set, ignore');
      }
    },
  });
}
