import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'uploadHistory/remove',
    params: {
      uploadHistoryId: getValueByKey({
        data: handleData,
        key: fieldData.uploadHistoryId.name,
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
    api: 'uploadHistory/refreshCache',
    params: {
      uploadHistoryId: getValueByKey({
        data: handleData,
        key: fieldData.uploadHistoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
