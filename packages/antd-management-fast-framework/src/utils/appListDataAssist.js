import { apiRequest } from 'antd-management-fast-common/es/utils/actionAssist';
import { getDispatch } from 'antd-management-fast-common/es/utils/dva';
import { runtimeSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import {
  isFunction,
  recordDebug,
  recordExecute,
  stringIsNullOrWhiteSpace,
} from 'antd-management-fast-common/es/utils/tools';

import { getAppListDataCache, setAppListDataCache } from './storageAssist';

export function loadAppListData({ successCallback = null }) {
  recordExecute('loadAppListData');

  const appListDataCatch = getAppListDataCache();

  if ((appListDataCatch || null) != null) {
    recordDebug('app list data first load success, ignore load');

    return;
  }

  const dispatch = getDispatch();

  const appListDataPath = runtimeSettings.getAppListDataPath();

  const api = stringIsNullOrWhiteSpace(appListDataPath)
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
  recordExecute('getAppListData');

  const appListDataCatch = getAppListDataCache();

  return appListDataCatch;
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
