import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'smsCategory/setEnable',
    params: {
      smsCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.smsCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'smsCategory/setDisable',
    params: {
      smsCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.smsCategoryId.name,
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
    api: 'smsCategory/refreshCache',
    params: {
      smsCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.smsCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
