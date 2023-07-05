import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

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
