import { actionCore } from 'antd-management-fast-common';

export async function listSelectAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'presetRole/listSelect',
    params: {
      channel: 100,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
