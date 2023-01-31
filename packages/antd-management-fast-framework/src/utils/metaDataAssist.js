import {
  apiRequest,
  getDispatch,
  isFunction,
  logDebug,
  logExecute,
  runtimeSettings,
} from 'antd-management-fast-common';

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
