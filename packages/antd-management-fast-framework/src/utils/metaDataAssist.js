import { apiRequest } from 'antd-management-fast-common/es/utils/actionAssist';
import { getDispatch } from 'antd-management-fast-common/es/utils/dva';
import { runtimeSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import {
  isFunction,
  recordDebug,
  recordExecute,
  stringIsNullOrWhiteSpace,
} from 'antd-management-fast-common/es/utils/tools';

import { getMetaDataCache, setMetaDataCache } from './storageAssist';

export function loadMetaData({ successCallback = null }) {
  recordExecute('loadMetaData');

  const metaDataCatch = getMetaDataCache();

  if ((metaDataCatch || null) != null) {
    recordDebug('meta data first load success, ignore load');

    return;
  }

  const dispatch = getDispatch();

  const metaDataPath = runtimeSettings.getMetaDataPath();

  const api = stringIsNullOrWhiteSpace(metaDataPath)
    ? 'schedulingControl/getMetaDataSimulation'
    : 'schedulingControl/getMetaData';

  apiRequest({
    api: api,
    params: {},
    dispatch: dispatch,
    successCallback: ({ remoteData }) => {
      const data = {
        ...(runtimeSettings.getMetaDataLocal() || {}),
        ...remoteData,
      };

      setMetaDataCache(data);

      if (isFunction(successCallback)) {
        successCallback();
      }
    },
  });
}

export function getMetaData() {
  const metaDataCatch = getMetaDataCache();

  return metaDataCatch;
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
