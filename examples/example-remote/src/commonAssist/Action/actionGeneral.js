// 此文件将会从模板库自动更新，请勿改动此文件内容。
// 此文件用于存放可复用的远程接口调用函数

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
