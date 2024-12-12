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
    api: 'workflowCaseLatestApprove/refreshCache',
    params: {
      workflowCaseLatestApproveId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseLatestApproveId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
