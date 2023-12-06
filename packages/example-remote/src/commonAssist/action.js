import { actionCore } from 'antd-management-fast-common';

export async function listSelectAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'presetRole/listSelect',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
