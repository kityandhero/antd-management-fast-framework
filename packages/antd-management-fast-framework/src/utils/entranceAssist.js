import { getDispatch } from 'easy-soft-dva';
import {
  buildPromptModuleInfo,
  checkInCollection,
  handleAuthorizationFail,
  isFunction,
  logDevelop,
  logExecute,
  logTrace,
  mergeArrowText,
  mergeTextMessage,
  promptTextBuilder,
  setLocalAuthorityCollection,
  setToken,
} from 'easy-soft-utility';

import {
  actionCore,
  apiRequest,
  emptyLogic,
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

function buildPromptModuleInfoText(text, ...messages) {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, mergeArrowText(messages)),
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
    buildPromptModuleInfoText(
      'pretreatSignInData',
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
  logExecute(buildPromptModuleInfoText('signInAction'));

  actionCore({
    api: 'entrance/signIn',
    target,
    params: handleData,
    showProcessing: false,
    successCallback: ({ target, remoteData }) => {
      if (!checkInCollection(Object.keys(remoteData), getTokenName())) {
        logTrace(
          remoteData,
          buildPromptModuleInfoText('signInAction', 'success', 'signIn data'),
        );

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

      logTrace(
        currentAuthority,
        buildPromptModuleInfoText(
          'signInAction',
          'success',
          'current operator authority collection data',
        ),
      );

      setToken(token);

      logTrace(
        {
          token,
        },
        buildPromptModuleInfoText(
          'signInAction',
          'success',
          'current operator token data',
        ),
      );

      // ----------------------------

      loadApplicationInitialData({});
      getCurrentOperator({});

      if (isFunction(successCallback)) {
        logTrace(
          buildPromptModuleInfoText(
            'signInAction',
            'trigger',
            'successCallback',
          ),
        );

        successCallback({ target, remoteData });
      } else {
        logTrace(
          buildPromptModuleInfoText(
            'signInAction',
            'trigger',
            'successCallback',
            emptyLogic,
          ),
        );
      }
    },
    failCallback: ({ remoteOriginal }) => {
      logTrace(
        remoteOriginal,
        buildPromptModuleInfoText(
          'signInAction',
          'fail',
          'response original data',
        ),
      );

      if (isFunction(failCallback)) {
        logTrace(
          buildPromptModuleInfoText('signInAction', 'trigger', 'failCallback'),
        );

        failCallback();
      } else {
        logTrace(
          buildPromptModuleInfoText(
            'signInAction',
            'trigger',
            'failCallback',
            emptyLogic,
          ),
        );
      }
    },
  });
}

export function signOutAction({
  target = null,
  successCallback = null,
  failCallback = null,
}) {
  logExecute(buildPromptModuleInfoText('signOutAction'));

  apiRequest({
    api: 'entrance/signOut',
    params: {},
    dispatch: getDispatch(),
    showProcessing: true,
    successCallback: ({ remoteData }) => {
      if (isFunction(successCallback)) {
        logTrace(
          buildPromptModuleInfoText(
            'signOutAction',
            'trigger',
            'successCallback',
          ),
        );

        successCallback({ target, remoteData });
      } else {
        logTrace(
          buildPromptModuleInfoText(
            'signOutAction',
            'trigger',
            'successCallback',
            emptyLogic,
          ),
        );
      }

      setTimeout(() => {
        handleAuthorizationFail();
      }, 300);
    },
    failCallback: ({ remoteOriginal }) => {
      logTrace(
        remoteOriginal,
        buildPromptModuleInfoText(
          'signOutAction',
          'fail',
          'response original data',
        ),
      );

      if (isFunction(failCallback)) {
        logTrace(
          buildPromptModuleInfoText('signOutAction', 'trigger', 'failCallback'),
        );

        failCallback();
      } else {
        logTrace(
          buildPromptModuleInfoText(
            'signOutAction',
            'trigger',
            'failCallback',
            emptyLogic,
          ),
        );
      }
    },
  });
}
