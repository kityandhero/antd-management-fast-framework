import {
  checkStringIsNullOrWhiteSpace,
  isFunction,
  logDebug,
  logExecute,
} from 'easy-soft-utility';

import {
  apiRequest,
  getApplicationListDataApi,
  getDispatch,
} from 'antd-management-fast-common';

import {
  getApplicationListDataCache,
  setApplicationListDataCache,
} from './applicationListDataCacheAssist';

export function loadApplicationListData({ successCallback = null }) {
  logExecute('loadapplicationListData');

  const applicationListDataCatch = getApplicationListDataCache();

  if ((applicationListDataCatch || null) != null) {
    logDebug('app list data first load success, ignore load');

    return;
  }

  const dispatch = getDispatch();

  const applicationListDataApi = getApplicationListDataApi();

  const api = checkStringIsNullOrWhiteSpace(applicationListDataApi)
    ? 'schedulingControl/singleListApplicationListSimulation'
    : 'schedulingControl/singleListApplicationList';

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
