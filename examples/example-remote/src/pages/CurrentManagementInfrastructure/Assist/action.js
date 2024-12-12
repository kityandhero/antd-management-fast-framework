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
    api: 'currentManagementInfrastructure/refreshKeyValueCache',
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
    api: 'currentManagementInfrastructure/updateFlowDebugUserId',
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
    api: 'currentManagementInfrastructure/toggleQiniuImageSwitch',
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
    api: 'currentManagementInfrastructure/toggleQiniuAudioSwitch',
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
    api: 'currentManagementInfrastructure/toggleQiniuVideoSwitch',
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
    api: 'currentManagementInfrastructure/toggleQiniuFileSwitch',
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
    api: 'currentManagementInfrastructure/testSecretKey',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function testDiskSpaceMonitoringConfigAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'currentManagementInfrastructure/testDiskSpaceMonitoringConfig',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}

export async function testDiskSpaceMonitoringEmailAction({
  target,
  handleData,
  successCallback,
  successMessage,
  failCallback = null,
}) {
  actionCore({
    api: 'currentManagementInfrastructure/testDiskSpaceMonitoringEmail',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    failCallback,
  });
}
