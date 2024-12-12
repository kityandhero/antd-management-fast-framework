import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'keyValueWorkflow/refreshCache',
    params: {
      keyValueWorkflowId: getValueByKey({
        data: handleData,
        key: fieldData.keyValueWorkflowId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshAllCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'keyValueWorkflow/refreshAllCache',
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
