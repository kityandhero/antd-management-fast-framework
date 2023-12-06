import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function updateKeyValueAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'application/updateKeyValueInfo',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setStartAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  const name = getValueByKey({
    data: handleData,
    key: fieldData.name.name,
  });

  actionCore({
    api: 'application/setStart',
    params: {
      applicationId: getValueByKey({
        data: handleData,
        key: fieldData.applicationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage: successMessage || `“${name}” 已经开始运行`,
  });
}

export async function setStopAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  const name = getValueByKey({
    data: handleData,
    key: fieldData.name.name,
  });

  const status = 0;

  actionCore({
    api: 'application/setStop',
    params: {
      applicationId: getValueByKey({
        data: handleData,
        key: fieldData.applicationId.name,
      }),
      status,
    },
    target,
    handleData,
    successCallback,
    successMessage: successMessage || `“${name}” 已经停止运行`,
  });
}

export async function setOwnAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'application/setOwn',
    params: {
      applicationSourceId: getValueByKey({
        data: handleData,
        key: fieldData.applicationSourceId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage: successMessage || `应用已经开通成功，请继续编辑应用信息`,
  });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'application/refreshCache',
    params: {
      applicationId: getValueByKey({
        data: handleData,
        key: fieldData.applicationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function testJiGuangSendDeviceAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  const { applicationId } = {
    applicationId: 0,
    ...handleData,
  };

  actionCore({
    api: 'application/testJiGuangSendDevice',
    params: {
      applicationId: applicationId || 0,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function testSendWechatMessageAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  const { applicationId, userId } = {
    applicationId: 0,
    userId: 0,
    ...handleData,
  };

  actionCore({
    api: 'application/testSendWechatMessage',
    params: {
      applicationId: applicationId || 0,
      userId: userId || 0,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeCustomGlobalDataItemAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'application/removeCustomGlobalDataItem',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
