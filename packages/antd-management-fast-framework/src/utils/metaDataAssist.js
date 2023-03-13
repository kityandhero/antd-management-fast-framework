import { getDispatch } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  getApplicationMergeConfig,
  getLocalMetaData,
  isFunction,
  logConfig,
  logDebug,
  logExecute,
  logInfo,
  setLocalMetaData,
} from 'easy-soft-utility';

import { apiRequest, getMetaDataApi } from 'antd-management-fast-common';

export function loadMetaData({ successCallback = null, failCallback = null }) {
  logExecute('loadMetaData');

  const metaDataCatch = getLocalMetaData();

  if ((metaDataCatch || null) != null) {
    logDebug('meta data first load success, ignore load.');

    return;
  }

  const dispatch = getDispatch();

  const metaDataApi = getMetaDataApi();

  let api = '';

  if (checkStringIsNullOrWhiteSpace(metaDataApi)) {
    logConfig(
      'metaDataApi has not set, if need use it by api, please set it in applicationConfig with key "metaDataApi", it must be like "modelName/effect"',
      'current use simulation request mode',
    );

    api = 'schedulingControl/getMetaDataSimulation';
  } else {
    api = 'schedulingControl/getMetaData';
  }

  apiRequest({
    api: api,
    params: {},
    dispatch: dispatch,
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
