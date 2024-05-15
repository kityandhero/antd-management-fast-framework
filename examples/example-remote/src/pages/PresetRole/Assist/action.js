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
    api: 'presetRole/setEnable',
    params: {
      presetRoleId: getValueByKey({
        data: handleData,
        key: fieldData.presetRoleId.name,
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
    api: 'presetRole/setDisable',
    params: {
      presetRoleId: getValueByKey({
        data: handleData,
        key: fieldData.presetRoleId.name,
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
    api: 'presetRole/remove',
    params: {
      presetRoleId: getValueByKey({
        data: handleData,
        key: fieldData.presetRoleId.name,
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
    api: 'presetRole/refreshCache',
    params: {
      presetRoleId: getValueByKey({
        data: handleData,
        key: fieldData.presetRoleId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function addModuleAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'presetRole/addModule',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function addMultiModuleAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'presetRole/addMultiModule',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function addAllModuleAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'presetRole/addAllModule',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeModuleAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'presetRole/removeModule',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
