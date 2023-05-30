import { getDispatch } from 'easy-soft-dva';
import {
  buildPromptModuleInfo,
  checkInCollection,
  handleAuthorizationFail,
  isFunction,
  logDebug,
  logDevelop,
  logExecute,
  logTrace,
  mergeTextMessage,
  promptTextBuilder,
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
import { modulePackageName } from './definition';

/**
 * Module Name.
 * @private
 */
const moduleName = 'entranceAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

/**
 * Entrance Configuration
 */
export const entranceAssistConfigure = {
  // eslint-disable-next-line no-unused-vars
  handleSignInDataPretreatment: ({ request, response }) => response,
  signInDataPretreatmentSetComplete: false,
};

/**
 * Set signIn data pretreatment handler
 * @param {Function} handler handle signIn data pretreatment
 */
export function setSignInDataPretreatmentHandler(handler) {
  if (entranceAssistConfigure.signInDataPretreatmentSetComplete) {
    logDevelop(
      'setSignInDataPretreatmentHandler',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isFunction(handler)) {
    logDevelop('setSignInDataPretreatmentHandler', typeof handler);
  } else {
    throw new Error(
      buildPromptModuleInfoText(
        'setSignInDataPretreatmentHandler',
        promptTextBuilder.buildMustFunction({}),
      ),
    );
  }

  entranceAssistConfigure.handleSignInDataPretreatment = handler;
  entranceAssistConfigure.signInDataPretreatmentSetComplete = true;
}

export function pretreatSignInData({ request, response }) {
  const result = entranceAssistConfigure.handleSignInDataPretreatment({
    request,
    response,
  });

  logTrace(
    {
      parameter: {
        request,
        response,
      },
      pretreatResult: result,
    },
    mergeTextMessage(
      'trigger pretreatSignInData which setSignInDataPretreatmentHandler set it',
      'pretreat signIn data',
    ),
  );

  return result;
}

export function signInAction({
  target,
  handleData,
  successCallback = null,
  failCallback = null,
}) {
  logExecute('signInAction');

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

      logDebug(currentAuthority, 'current operator authority collection data');

      setToken(token);

      logDebug({ token }, 'current operator token data');

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
  logExecute('signOutAction');

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
