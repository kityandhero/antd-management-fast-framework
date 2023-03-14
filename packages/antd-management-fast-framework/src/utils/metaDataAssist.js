import { getDispatch } from 'easy-soft-dva';
import {
  getApplicationMergeConfig,
  getLocalMetaData,
  isFunction,
  logDebug,
  logExecute,
  logInfo,
  logTrace,
  setLocalMetaData,
} from 'easy-soft-utility';

import { apiRequest } from 'antd-management-fast-common';

import { schedulingControlAssist } from './schedulingControlAssist';

function refreshMetaData({ successCallback = null, failCallback = null }) {
  logExecute('refreshMetaData');

  schedulingControlAssist.setMetaDataRequestProcessing(true);

  apiRequest({
    api: 'schedulingControl/refreshMetaData',
    params: {},
    dispatch: getDispatch(),
    successCallback: ({ remoteData }) => {
      // logTrace(remoteData, 'response original data on refreshMetaData success');

      const { metaData } = {
        metaData: {},
        ...getApplicationMergeConfig(),
      };

      logInfo(
        'applicationConfig.metaData will merge in to final metaData, it value is lower priority, may be covered by dynamic data.',
      );

      const data = {
        ...metaData,
        ...getMetaData(),
        ...remoteData,
      };

      setLocalMetaData(data);

      if (isFunction(successCallback)) {
        successCallback();
      }
    },
    failCallback: ({ remoteOriginal }) => {
      logDebug(
        remoteOriginal,
        'response original data on refreshMetaData fail',
      );

      if (isFunction(failCallback)) {
        logExecute('refreshMetaData', 'failCallback');

        failCallback();
      } else {
        logExecute('refreshMetaData', 'failCallback not set, ignore');
      }
    },
    completeProcess: () => {
      schedulingControlAssist.setMetaDataRequestProcessing(false);
    },
  });
}

export function loadMetaData({ successCallback = null, failCallback = null }) {
  if (schedulingControlAssist.getMetaDataRequestProcessing()) {
    const delayTime = 200;

    logTrace(
      'call loadMetaData high frequency, use recursion delay mode',
      `delay ${delayTime}ms`,
    );

    setTimeout(() => {
      loadMetaData({
        successCallback,
        failCallback,
      });
    }, delayTime);

    return;
  }

  logExecute('loadMetaData');

  const metaDataCatch = getLocalMetaData();

  if ((metaDataCatch || null) != null) {
    logDebug('meta data get from cache success', 'ignore fetch from api');

    if (isFunction(successCallback)) {
      logExecute('loadMetaData', 'successCallback');

      successCallback(metaDataCatch);
    } else {
      logExecute('loadMetaData', 'successCallback not set, ignore');
    }

    return;
  }

  refreshMetaData({
    successCallback,
    failCallback,
  });
}

export function getMetaData() {
  logExecute('getMetaData');

  const metaDataCatch = getLocalMetaData();

  return metaDataCatch;
}
