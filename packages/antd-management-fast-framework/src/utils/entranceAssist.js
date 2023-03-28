import { getDispatch } from 'easy-soft-dva';
import {
  checkInCollection,
  handleAuthorizationFail,
  isFunction,
  logDebug,
  logDevelop,
  logExecute,
  setLocalAuthorityCollection,
  setToken,
} from 'easy-soft-utility';

import {
  actionCore,
  apiRequest,
  getTokenName,
} from 'antd-management-fast-common';

import { loadApplicationInitialData } from './bootstrap';
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
      // logTrace(remoteData, 'response original data on signIn success');

      if (!checkInCollection(Object.keys(remoteData), getTokenName())) {
        logDevelop(remoteData, 'signIn data');

        throw new Error(
          `token key name "${getTokenName()}" not exist in signIn data`,
        );
      }

      const { currentAuthority } = {
        currentAuthority: [],
        ...remoteData,
      };

      const token = remoteData[getTokenName()];

      setLocalAuthorityCollection(currentAuthority);
      setToken(token);

      // ----------------------------

      loadApplicationInitialData({});
      getCurrentOperator({});

      if (isFunction(successCallback)) {
        logExecute('signIn', 'successCallback');

        successCallback({ target, remoteData });
      } else {
        logExecute('signIn', 'successCallback not set, ignore');
      }
    },
    failCallback: ({ remoteOriginal }) => {
      logDebug(remoteOriginal, 'response original data on signIn fail');

      if (isFunction(failCallback)) {
        logExecute('signIn', 'failCallback');

        failCallback();
      } else {
        logExecute('signIn', 'failCallback not set, ignore');
      }
    },
  });
}

export function signOutAction({
  target = null,
  successCallback = null,
  failCallback = null,
}) {
  apiRequest({
    api: 'entrance/signOut',
    params: {},
    dispatch: getDispatch(),
    showProcessing: true,
    successCallback: ({ remoteData }) => {
      if (isFunction(successCallback)) {
        logExecute('signOut', 'successCallback');

        successCallback({ target, remoteData });
      } else {
        logExecute('signOut', 'successCallback not set, ignore');
      }

      setTimeout(() => {
        handleAuthorizationFail();
      }, 300);
    },
    failCallback: ({ remoteOriginal }) => {
      logDebug(remoteOriginal, 'response original data on signOut fail');

      if (isFunction(failCallback)) {
        logExecute('signOut', 'failCallback');

        failCallback();
      } else {
        logExecute('signOut', 'failCallback not set, ignore');
      }
    },
  });
}
