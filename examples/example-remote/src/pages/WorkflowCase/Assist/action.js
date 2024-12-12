import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function getChainAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.getChain,
    params: {
      workflowCaseId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}

export async function openCancelApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.openCancelApproveSwitch,
    params: {
      workflowCaseId: getValueByKey({
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

export async function closeCancelApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection
      .closeCancelApproveSwitch,
    params: {
      workflowCaseId: getValueByKey({
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

export async function openResetAllApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection
      .openResetAllApproveSwitch,
    params: {
      workflowCaseId: getValueByKey({
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

export async function closeResetAllApproveSwitchAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection
      .closeResetAllApproveSwitch,
    params: {
      workflowCaseId: getValueByKey({
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

export async function forceEndAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.forceEnd,
    params: {
      workflowCaseId: getValueByKey({
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

export async function hideAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.hide,
    params: {
      workflowCaseId: getValueByKey({
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

export async function repairSubsidiaryAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseTypeCollection.repairSubsidiary,
    params: {
      workflowCaseId: getValueByKey({
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
    api: modelTypeCollection.workflowCaseTypeCollection.refreshCache,
    params: {
      workflowCaseId: getValueByKey({
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
