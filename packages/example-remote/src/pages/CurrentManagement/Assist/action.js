import { actionCore } from 'antd-management-fast-common';

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
