import { apiRequest } from 'antd-management-fast-common/es/utils/actionAssist';
import { getDispatch } from 'antd-management-fast-common/es/utils/dva';
import { runtimeSettings } from 'antd-management-fast-common/es/utils/dynamicSetting';
import {
  isFunction,
  logDebug,
  logExecute,
} from 'antd-management-fast-common/es/utils/tools';

import { getMetaDataCache, setMetaDataCache } from './storageAssist';

export function loadMetaData({ successCallback = null }) {
  logExecute('loadMetaData');

  const metaDataCatch = getMetaDataCache();

  if ((metaDataCatch || null) != null) {
    logDebug('meta data first load success, ignore load');

    return;
  }

  const dispatch = getDispatch();

  const metaDataPath = runtimeSettings.getMetaDataPath();

  const api = checkStringIsNullOrWhiteSpace(metaDataPath)
    ? 'schedulingControl/getMetaDataSimulation'
    : 'schedulingControl/getMetaData';

  apiRequest({
    api: api,
    params: {},
    dispatch: dispatch,
    successCallback: ({ remoteData }) => {
      const data = {
        ...(runtimeSettings.getMetaData() || {}),
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
  logExecute('getMetaData');

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
