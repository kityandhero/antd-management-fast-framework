import { getDispatch } from 'easy-soft-dva';
import {
  getApplicationMergeConfig,
  getLocalMetaData,
  isFunction,
  logDebug,
  logExecute,
  logInfo,
  setLocalMetaData,
} from 'easy-soft-utility';

import { apiRequest } from 'antd-management-fast-common';

export function loadMetaData({ successCallback = null, failCallback = null }) {
  logExecute('loadMetaData');

  const metaDataCatch = getLocalMetaData();

  if ((metaDataCatch || null) != null) {
    logDebug('meta data first load success, ignore load.');

    return;
  }

  apiRequest({
    api: 'schedulingControl/getMetaData',
    params: {},
    dispatch: getDispatch(),
    successCallback: ({ remoteData }) => {
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
    failCallback,
  });
}

export function getMetaData() {
  logExecute('getMetaData');

  const metaDataCatch = getLocalMetaData();

  return metaDataCatch;
}
