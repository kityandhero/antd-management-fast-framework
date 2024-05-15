import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function passAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCaseProcessHistory/pass',
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldData.note.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refuseAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCaseProcessHistory/refuse',
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldData.note.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function cancelApproveAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCaseProcessHistory/cancelApprove',
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
      }),
      note: getValueByKey({
        data: handleData,
        key: fieldData.note.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function resetAllApproveAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCaseProcessHistory/resetAllApprove',
    params: {
      flowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.flowCaseId.name,
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
    api: 'workflowDebugCaseProcessHistory/refreshCache',
    params: {
      workflowDebugCaseProcessHistoryId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseProcessHistoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
