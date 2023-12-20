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
    api: 'workflowBranchCondition/remove',
    params: {
      workflowBranchConditionId: getValueByKey({
        data: handleData,
        key: fieldData.workflowBranchConditionId.name,
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
    api: 'workflowBranchCondition/refreshCache',
    params: {
      workflowBranchConditionId: getValueByKey({
        data: handleData,
        key: fieldData.workflowBranchConditionId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
