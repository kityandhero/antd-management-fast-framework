import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'subsidiary/setEnable',
    params: {
      subsidiaryId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'subsidiary/setDisable',
    params: {
      subsidiaryId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryId.name,
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
    api: 'subsidiary/refreshCache',
    params: {
      subsidiaryId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
