import { getDispatch } from 'easy-soft-dva';
import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  logConfig,
  logDebug,
  logExecute,
} from 'easy-soft-utility';

import {
  apiRequest,
  getApplicationListDataApi,
} from 'antd-management-fast-common';

import {
  getApplicationListDataCache,
  setApplicationListDataCache,
} from './applicationListDataCacheAssist';

export function loadApplicationListData({ successCallback = null }) {
  logExecute('loadApplicationListData');

  const applicationListDataCatch = getApplicationListDataCache();

  if ((applicationListDataCatch || null) != null) {
    logDebug('app list data first load success, ignore load');

    return;
  }

  const dispatch = getDispatch();

  const applicationListDataApi = getApplicationListDataApi();

  let api = '';

  if (checkStringIsNullOrWhiteSpace(applicationListDataApi)) {
    logConfig(
      'getApplicationListDataApi has not set, if need use it by api, please set it in applicationConfig with key "getApplicationListDataApi", it must be like "modelName/effect"',
      'current use simulation mode',
    );

    api = 'schedulingControl/getApplicationListDataSimulation';
  } else {
    api = 'schedulingControl/getApplicationListData';
  }

  apiRequest({
    api: api,
    params: {},
    dispatch: dispatch,
    successCallback: ({ remoteListData }) => {
      const listData = [...(getApplicationListData() || []), ...remoteListData];

      setApplicationListDataCache(listData);

      if (isFunction(successCallback)) {
        successCallback();
      }
    },
  });
}

export function getApplicationListData() {
  logExecute('getApplicationListData');

  const applicationListDataCatch = getApplicationListDataCache();

  return applicationListDataCatch;
}
