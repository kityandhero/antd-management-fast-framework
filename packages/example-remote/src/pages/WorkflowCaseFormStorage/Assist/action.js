import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowCaseFormStorage/refreshCache',
    params: {
      workflowCaseFormStorageId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseFormStorageId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
