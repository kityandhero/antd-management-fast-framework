import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function setOnlineAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'callCenter/setOnline',
    params: {
      callCenterId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setOfflineAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'callCenter/setOffline',
    params: {
      callCenterId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function removeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'callCenter/remove',
    params: {
      callCenterId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'callCenter/refreshCache',
    params: {
      callCenterId: getValueByKey({
        data: handleData,
        key: fieldData.callCenterId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
