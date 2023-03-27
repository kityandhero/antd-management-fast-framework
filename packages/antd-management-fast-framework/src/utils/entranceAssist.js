import {
  checkInCollection,
  isFunction,
  logDebug,
  logDevelop,
  logExecute,
  setAuthority,
  setToken,
} from 'easy-soft-utility';

import { actionCore, getTokenName } from 'antd-management-fast-common';

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

      setAuthority(currentAuthority);
      setToken(token);

      // ----------------------------

      loadApplicationInitialData({});
      getCurrentOperator({});

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

export function signOutAction({
  target,
  handleData,
  successCallback = null,
  failCallback = null,
}) {
  actionCore({
    api: 'entrance/signOut',
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

      setAuthority(currentAuthority);
      setToken(token);

      // ----------------------------

      loadApplicationInitialData({});
      getCurrentOperator({});

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
