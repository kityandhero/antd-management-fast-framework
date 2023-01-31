import {
  apiRequest,
  getDispatch,
  isFunction,
  logDebug,
  logExecute,
  runtimeSettings,
} from 'antd-management-fast-common';

import { getAppListDataCache, setAppListDataCache } from './storageAssist';

export function loadAppListData({ successCallback = null }) {
  logExecute('loadAppListData');

  const appListDataCatch = getAppListDataCache();

  if ((appListDataCatch || null) != null) {
    logDebug('app list data first load success, ignore load');

    return;
  }

  const dispatch = getDispatch();

  const appListDataPath = runtimeSettings.getAppListDataPath();

  const api = checkStringIsNullOrWhiteSpace(appListDataPath)
    ? 'schedulingControl/singleListAppListSimulation'
    : 'schedulingControl/singleListAppList';

  apiRequest({
    api: api,
    params: {},
    dispatch: dispatch,
    successCallback: ({ remoteListData }) => {
      const listData = [
        ...(runtimeSettings.getAppListData() || {}),
        ...remoteListData,
      ];

      setAppListDataCache(listData);

      if (isFunction(successCallback)) {
        successCallback();
      }
    },
  });
}

export function getAppListData() {
  logExecute('getAppListData');

  const appListDataCatch = getAppListDataCache();

  return appListDataCatch;
}
