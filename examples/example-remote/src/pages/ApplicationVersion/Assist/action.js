import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'applicationVersion/setEnable',
    params: {
      applicationVersionId: getValueByKey({
        data: handleData,
        key: fieldData.applicationVersionId.name,
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
  successMessage = null,
}) {
  actionCore({
    api: 'applicationVersion/setDisable',
    params: {
      applicationVersionId: getValueByKey({
        data: handleData,
        key: fieldData.applicationVersionId.name,
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
  successMessage = null,
}) {
  actionCore({
    api: 'applicationVersion/remove',
    params: {
      applicationVersionId: getValueByKey({
        data: handleData,
        key: fieldData.applicationVersionId.name,
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
    api: 'applicationVersion/refreshCache',
    params: {
      applicationVersionId: getValueByKey({
        data: handleData,
        key: fieldData.applicationVersionId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
