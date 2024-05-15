import { getValueByKey } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function removeConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  confirmActionCore({
    title: `移除流程线`,
    content: `即将移除流程线，确定吗？`,
    api: 'workflowLine/remove',
    params: {
      workflowLineId: getValueByKey({
        data: handleData,
        key: fieldData.workflowLineId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeAllAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'workflowLine/removeAll',
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldData.workflowId.name,
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
    api: 'workflowLine/refreshCache',
    params: {
      workflowLineId: getValueByKey({
        data: handleData,
        key: fieldData.workflowLineId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
