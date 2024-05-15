import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'userDevice/remove',
    params: {
      userDeviceId: getValueByKey({
        data: handleData,
        key: fieldData.userDeviceId.name,
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
  successMessage,
}) {
  actionCore({
    api: 'userDevice/refreshCache',
    params: {
      userDeviceId: getValueByKey({
        data: handleData,
        key: fieldData.userDeviceId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
