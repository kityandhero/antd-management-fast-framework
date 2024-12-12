import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function singleListAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowBranchCondition/singleList',
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
        convert: convertCollection.string,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}

export async function removeConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  confirmActionCore({
    title: `移除条件`,
    content: `即将移除条件，确定吗？`,
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
