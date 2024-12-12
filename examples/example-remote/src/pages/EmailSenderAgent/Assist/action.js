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
    api: 'emailSenderAgent/setEnable',
    params: {
      emailSenderAgentId: getValueByKey({
        data: handleData,
        key: fieldData.emailSenderAgentId.name,
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
    api: 'emailSenderAgent/setDisable',
    params: {
      emailSenderAgentId: getValueByKey({
        data: handleData,
        key: fieldData.emailSenderAgentId.name,
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
    api: 'emailSenderAgent/refreshCache',
    params: {
      emailSenderAgentId: getValueByKey({
        data: handleData,
        key: fieldData.emailSenderAgentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
