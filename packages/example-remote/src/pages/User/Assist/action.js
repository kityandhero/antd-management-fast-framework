import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function toggleSignetPasswordSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'user/toggleSignetPasswordSwitch',
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function openSignetPasswordSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'user/openSignetPasswordSwitch',
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function closeSignetPasswordSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'user/closeSignetPasswordSwitch',
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function clearParentAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'user/clearParent',
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'user/setEnable',
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
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
    api: 'user/setDisable',
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
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
    api: 'user/remove',
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
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
    api: 'user/refreshCache',
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
