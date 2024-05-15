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
    api: 'masterManager/setEnable',
    params: {
      masterManagerId: getValueByKey({
        data: handleData,
        key: fieldData.masterManagerId.name,
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
    api: 'masterManager/setDisable',
    params: {
      masterManagerId: getValueByKey({
        data: handleData,
        key: fieldData.masterManagerId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'masterManager/remove',
    params: {
      masterManagerId: getValueByKey({
        data: handleData,
        key: fieldData.masterManagerId.name,
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
    api: 'masterManager/refreshCache',
    params: {
      masterManagerId: getValueByKey({
        data: handleData,
        key: fieldData.masterManagerId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
