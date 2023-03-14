import { getDispatch } from 'easy-soft-dva';
import { isFunction, logDebug, logExecute, logTrace } from 'easy-soft-utility';

import { apiRequest } from 'antd-management-fast-common';

import {
  getApplicationListDataCache,
  setApplicationListDataCache,
} from './applicationListDataCacheAssist';
import { schedulingControlAssist } from './schedulingControlAssist';

function refreshApplicationListData(
  successCallback = null,
  failCallback = null,
) {
  logExecute('refreshApplicationListData');

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
  logExecute('getApplicationListData');

  const applicationListDataCatch = getApplicationListDataCache();

  return applicationListDataCatch;
}
