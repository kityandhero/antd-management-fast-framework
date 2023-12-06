import { getValueByKey, request } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { updateViewConfigDataApiAddress } from '../../../services/workflowNode';
import { fieldData } from '../Common/data';

export function updateViewConfigAction({ handleData }) {
  request({
    api: updateViewConfigDataApiAddress,
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
      viewConfigData: getValueByKey({
        data: handleData,
        key: fieldData.viewConfigData.name,
      }),
    },
  });
}

export function addStartPointAction({
  target,
  handleData,
  beforeProcess,
  completeProcess,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowNode/addStartPoint',
    params: handleData || {},
    target,
    handleData,
    beforeProcess,
    completeProcess,
    successCallback,
    successMessage,
    setProgressingFirst: false,
  });
}

export function addEndPointAction({
  target,
  handleData,
  beforeProcess,
  completeProcess,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowNode/addEndPoint',
    params: handleData || {},
    target,
    handleData,
    beforeProcess,
    completeProcess,
    successCallback,
    successMessage,
    setProgressingFirst: false,
  });
}

export function updateForwardIdAction({
  target,
  handleData,
  beforeProcess,
  completeProcess,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowNode/updateForwardId',
    params: handleData || {},
    target,
    handleData,
    beforeProcess,
    completeProcess,
    successCallback,
    successMessage,
    setProgressingFirst: false,
  });
}

export function clearForwardIdAction({
  target,
  handleData,
  beforeProcess,
  completeProcess,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowNode/clearForwardId',
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
    },
    target,
    handleData,
    beforeProcess,
    completeProcess,
    successCallback,
    successMessage,
    setProgressingFirst: false,
  });
}

export function updateBackwardIdAction({
  target,
  handleData,
  beforeProcess,
  completeProcess,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowNode/updateBackwardId',
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
    },
    target,
    handleData,
    beforeProcess,
    completeProcess,
    successCallback,
    successMessage,
    setProgressingFirst: false,
  });
}

export function clearBackwardIdAction({
  target,
  handleData,
  beforeProcess,
  completeProcess,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowNode/clearBackwardId',
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
    },
    target,
    handleData,
    beforeProcess,
    completeProcess,
    successCallback,
    successMessage,
    setProgressingFirst: false,
  });
}

export function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowNode/setEnable',
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowNode/setDisable',
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
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
    api: 'workflowNode/remove',
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
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
    title: `移除流程节点`,
    content: `即将移除流程线, 注意连结到此节点的流程线吉将同步移除，确定吗？`,
    api: 'workflowNode/remove',
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
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
    api: 'workflowNode/refreshCache',
    params: {
      workflowNodeId: getValueByKey({
        data: handleData,
        key: fieldData.workflowNodeId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
