import { getDispatch } from 'easy-soft-dva';
import {
  buildPromptModuleInfo,
  getCurrentOperatorCache,
  isFunction,
  logDebug,
  logDevelop,
  logExecute,
  logTrace,
  mergeTextMessage,
  promptTextBuilder,
  setCurrentOperatorCache,
} from 'easy-soft-utility';

import { apiRequest } from 'antd-management-fast-common';

import { modulePackageName } from './definition';
import { schedulingControlAssist } from './schedulingControlAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'currentOperatorAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

/**
 * Simulation Configuration
 */
export const currentOperatorAssistConfigure = {
  handleTransferLayoutAvatar: ({ currentOperator }) => currentOperator,
  transferLayoutAvatarSetComplete: false,
};

/**
 * Set transfer layout avatar handler
 * @param {Function} handler handle transfer layout avatar
 */
export function setTransferLayoutAvatarHandler(handler) {
  if (currentOperatorAssistConfigure.transferLayoutAvatarSetComplete) {
    logDevelop(
      'setTransferLayoutAvatarHandler',
      'reset is not allowed, it can be set only once',
    );

    return;
  }

  if (isFunction(handler)) {
    logDevelop('setTransferLayoutAvatarHandler', typeof handler);
  } else {
    throw new Error(
      buildPromptModuleInfoText(
        'setTransferLayoutAvatarHandler',
        promptTextBuilder.buildMustFunction({}),
      ),
    );
  }

  currentOperatorAssistConfigure.handleTransferLayoutAvatar = handler;
  currentOperatorAssistConfigure.transferLayoutAvatarSetComplete = true;
}

export function transferLayoutAvatar({ currentOperator }) {
  const layoutAvatar =
    currentOperatorAssistConfigure.handleTransferLayoutAvatar({
      currentOperator,
    });

  logTrace(
    {
      currentOperator,
      layoutAvatar,
    },
    mergeTextMessage(
      'trigger transferLayoutAvatar which setTransferLayoutAvatarHandler set it',
      'currentOperator to layoutAvatar',
    ),
  );

  return layoutAvatar;
}

function refreshCurrentOperator({
  successCallback = null,
  failCallback = null,
}) {
  logExecute('refreshCurrentOperator');

  schedulingControlAssist.setCurrentOperatorRequestProcessing(true);

  apiRequest({
    api: 'currentOperator/refreshCurrentOperator',
    params: {},
    dispatch: getDispatch(),
    successCallback: ({ remoteData }) => {
      const data = {
        ...remoteData,
      };

      // logTrace(
      //   remoteData,
      //   'response original data on refreshCurrentOperator success',
      // );

      setCurrentOperatorCache(data);

      if (isFunction(successCallback)) {
        logExecute('refreshCurrentOperator', 'successCallback');

        successCallback(data);
      } else {
        logExecute('refreshCurrentOperator', 'successCallback not set, ignore');
      }
    },
    failCallback: ({ remoteOriginal }) => {
      logDebug(
        remoteOriginal,
        'response original data on refreshCurrentOperator fail',
      );

      if (isFunction(failCallback)) {
        logExecute('refreshCurrentOperator', 'failCallback');

        failCallback();
      } else {
        logExecute('refreshCurrentOperator', 'failCallback not set, ignore');
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
    const delayTime = 200;

    logTrace(
      'call getCurrentOperator high frequency, use recursion delay mode',
      `delay ${delayTime}ms`,
    );

    setTimeout(() => {
      getCurrentOperator({
        force: false,
        successCallback,
        failCallback,
      });
    }, delayTime);

    return;
  }

  logExecute('getCurrentOperator');

  if (!force) {
    const currentOperatorCache = getCurrentOperatorCache();

    if ((currentOperatorCache || null) != null) {
      logDebug(
        'current operator get from cache success',
        'ignore fetch from api',
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
