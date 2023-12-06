import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function addBasicInfoAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCase/addBasicInfo',
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldData.workflowId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function submitApprovalAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCase/submitApproval',
    params: {
      workflowDebugCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function openCancelApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCase/openCancelApproveSwitch',
    params: {
      workflowDebugCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function closeCancelApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCase/closeCancelApproveSwitch',
    params: {
      workflowDebugCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function openResetAllApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCase/openResetAllApproveSwitch',
    params: {
      workflowDebugCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function closeResetAllApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCase/closeResetAllApproveSwitch',
    params: {
      workflowDebugCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowDebugCase/remove',
    params: {
      workflowDebugCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseId.name,
        defaultValue: '',
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
    api: 'workflowDebugCase/refreshCache',
    params: {
      workflowDebugCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
