import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function addAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'internalTester/add',
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
  successMessage = null,
}) {
  actionCore({
    api: 'internalTester/remove',
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
