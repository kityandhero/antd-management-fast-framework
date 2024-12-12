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
    api: 'qrCode/setOnline',
    params: {
      qrCodeId: getValueByKey({
        data: handleData,
        key: fieldData.qrCodeId.name,
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
    api: 'qrCode/setOffline',
    params: {
      qrCodeId: getValueByKey({
        data: handleData,
        key: fieldData.qrCodeId.name,
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
    api: 'qrCode/remove',
    params: {
      qrCodeId: getValueByKey({
        data: handleData,
        key: fieldData.qrCodeId.name,
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
    api: 'qrCode/refreshCache',
    params: {
      qrCodeId: getValueByKey({
        data: handleData,
        key: fieldData.qrCodeId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
