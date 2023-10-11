import { getDispatch } from 'easy-soft-dva';
import {
  buildPromptModuleInfo,
  isFunction,
  logDebug,
  logExecute,
  logTrace,
  mergeTextMessage,
} from 'easy-soft-utility';

import { apiRequest } from 'antd-management-fast-common';

import {
  getApplicationListDataCache,
  setApplicationListDataCache,
} from './applicationListDataCacheAssist';
import { modulePackageName } from './definition';
import { schedulingControlAssist } from './schedulingControlAssist';

/**
 * Module Name.
 * @private
 */
const moduleName = 'applicationListDataAssist';

function buildPromptModuleInfoText(text, ancillaryInformation = '') {
  return buildPromptModuleInfo(
    modulePackageName,
    mergeTextMessage(text, ancillaryInformation),
    moduleName,
  );
}

function refreshApplicationListData(
  successCallback = null,
  failCallback = null,
) {
  logExecute({}, buildPromptModuleInfoText('refreshApplicationListData'));

  schedulingControlAssist.setApplicationListDataProcessing(true);

  apiRequest({
    api: 'schedulingControl/refreshApplicationListData',
    params: {},
    dispatch: getDispatch(),
    successCallback: ({ remoteListData }) => {
      const listData = [...(getApplicationListData() || []), ...remoteListData];

      setApplicationListDataCache(listData);

      // logTrace(
      //   remoteListData,
      //   'response original data on refreshApplicationListData success',
      // );

      if (isFunction(successCallback)) {
        logExecute('refreshApplicationListData', 'successCallback');

        successCallback(listData);
      } else {
        logExecute(
          'refreshApplicationListData',
          'successCallback not set, ignore',
        );
      }
    },
    failCallback: ({ remoteOriginal }) => {
      logDebug(
        remoteOriginal,
        'response original data on refreshApplicationListData fail',
      );

      if (isFunction(failCallback)) {
        logExecute('refreshApplicationListData', 'failCallback');

        failCallback();
      } else {
        logExecute(
          'refreshApplicationListData',
          'failCallback not set, ignore',
        );
      }
    },
    completeProcess: () => {
      schedulingControlAssist.setApplicationListDataProcessing(false);
    },
  });
}

export function loadApplicationListData({
  successCallback = null,
  failCallback = null,
}) {
  logExecute({}, buildPromptModuleInfoText('loadApplicationListData'));

  if (schedulingControlAssist.getApplicationListDataProcessing()) {
    const delayTime = 200;

    logTrace(
      'call loadApplicationListData high frequency, use recursion delay mode',
      `delay ${delayTime}ms`,
    );

    setTimeout(() => {
      loadApplicationListData({
        force: false,
        successCallback,
        failCallback,
      });
    }, delayTime);

    return;
  }

  logExecute('loadApplicationListData');

  const applicationListDataCatch = getApplicationListDataCache();

  if ((applicationListDataCatch || null) != null) {
    logDebug('app list data get from cache success', 'ignore fetch from api');

    if (isFunction(successCallback)) {
      logExecute('loadApplicationListData', 'successCallback');

      successCallback(applicationListDataCatch);
    } else {
      logExecute('loadApplicationListData', 'successCallback not set, ignore');
    }

    return;
  }

  refreshApplicationListData({
    successCallback,
    failCallback,
  });
}

export function getApplicationListData() {
  logExecute({}, buildPromptModuleInfoText('getApplicationListData'));

  const applicationListDataCatch = getApplicationListDataCache();

  return applicationListDataCatch;
}
