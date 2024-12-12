import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function resetAllApproveAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseProcessHistoryTypeCollection
      .resetAllApprove,
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
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
    api: modelTypeCollection.workflowCaseProcessHistoryTypeCollection
      .refreshCache,
    params: {
      workflowCaseProcessHistoryId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseProcessHistoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
