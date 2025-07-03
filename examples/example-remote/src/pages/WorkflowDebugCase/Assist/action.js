import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function getChainByWorkflowAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseTypeCollection.getChainByWorkflow,
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

export async function addBasicInfoAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseTypeCollection.addBasicInfo,
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

export async function setSubsidiaryIdAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseTypeCollection.setSubsidiaryId,
    params: {
      workflowDebugCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseId.name,
        defaultValue: '',
      }),
      subsidiaryId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryId.name,
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
    api: modelTypeCollection.workflowDebugCaseTypeCollection.submitApproval,
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
    api: modelTypeCollection.workflowDebugCaseTypeCollection
      .openCancelApproveSwitch,
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
    api: modelTypeCollection.workflowDebugCaseTypeCollection
      .closeCancelApproveSwitch,
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
    api: modelTypeCollection.workflowDebugCaseTypeCollection
      .openResetAllApproveSwitch,
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
    api: modelTypeCollection.workflowDebugCaseTypeCollection
      .closeResetAllApproveSwitch,
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

export async function forceEndAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseTypeCollection.forceEnd,
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

export async function toggleEmergencyAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseTypeCollection.toggleEmergency,
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

export async function archiveAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseTypeCollection.archive,
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

export async function cancelArchiveAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowDebugCaseTypeCollection.cancelArchive,
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
    api: modelTypeCollection.workflowDebugCaseTypeCollection.refreshCache,
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
