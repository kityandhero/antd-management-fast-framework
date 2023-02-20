import {
  checkStringIsNullOrWhiteSpace,
  getLocalMetaData,
  isFunction,
  logDebug,
  logExecute,
  setLocalMetaData,
} from 'easy-soft-utility';

import {
  apiRequest,
  getDispatch,
  getMetaDataApi,
} from 'antd-management-fast-common';

export function loadMetaData({ successCallback = null }) {
  logExecute('loadMetaData');

  const metaDataCatch = getLocalMetaData();

  if ((metaDataCatch || null) != null) {
    logDebug('meta data first load success, ignore load');

    return;
  }

  const dispatch = getDispatch();

  const metaDataApi = getMetaDataApi();

  const api = checkStringIsNullOrWhiteSpace(metaDataApi)
    ? 'schedulingControl/getMetaDataSimulation'
    : 'schedulingControl/getMetaData';

  apiRequest({
    api: api,
    params: {},
    dispatch: dispatch,
    successCallback: ({ remoteData }) => {
      const data = {
        ...getMetaData(),
        ...remoteData,
      };

      setLocalMetaData(data);

      if (isFunction(successCallback)) {
        successCallback();
      }
    },
  });
}

export function getMetaData() {
  logExecute('getMetaData');

  const metaDataCatch = getLocalMetaData();

  return metaDataCatch;
}
