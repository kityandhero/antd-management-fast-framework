import { getValueByKey } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowNodeApproverTypeCollection.remove,
    params: {
      workflowNodeApproverId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeApproverId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  confirmActionCore({
    title: `移除流程节点审批人`,
    content: `即将流程节点审批人, 确定吗？`,
    api: modelTypeCollection.workflowNodeApproverTypeCollection.remove,
    params: {
      workflowNodeApproverId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeApproverId.name,
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
    api: modelTypeCollection.workflowNodeApproverTypeCollection.refreshCache,
    params: {
      workflowNodeApproverId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeApproverId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
