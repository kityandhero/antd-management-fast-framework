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
    api: 'workflowBranchConditionItem/remove',
    params: {
      workflowBranchConditionItemId: getValueByKey({
        data: handleData,
        key: fieldData.workflowBranchConditionItemId.name,
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
    api: 'workflowBranchConditionItem/refreshCache',
    params: {
      workflowBranchConditionItemId: getValueByKey({
        data: handleData,
        key: fieldData.workflowBranchConditionItemId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
