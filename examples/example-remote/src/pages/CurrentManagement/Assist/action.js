import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldDataDefaultImage } from '../Common/data';

export async function refreshKeyValueCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'currentManagement/refreshKeyValueCache',
    params: {
      tag: getValueByKey({
        data: handleData,
        key: fieldDataDefaultImage.tag.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function updateFlowDebugUserIdAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'currentManagement/updateFlowDebugUserId',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function toggleQiniuImageSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'currentManagement/toggleQiniuImageSwitch',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function toggleQiniuAudioSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'currentManagement/toggleQiniuAudioSwitch',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function toggleQiniuVideoSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'currentManagement/toggleQiniuVideoSwitch',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function toggleQiniuFileSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'currentManagement/toggleQiniuFileSwitch',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function testSecretKeyAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'currentManagement/testSecretKey',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}
