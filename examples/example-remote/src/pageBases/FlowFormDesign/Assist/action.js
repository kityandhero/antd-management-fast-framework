import { convertCollection, getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldDataFlowFormDesign } from '../../../customConfig';

export async function getByWorkflowAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowFormDesign/getByWorkflow',
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldDataFlowFormDesign.workflowId.name,
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

export async function updateDocumentSchemaAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowFormDesign/updateDocumentSchema',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function updateRemarkSchemaAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'workflowFormDesign/updateRemarkSchema',
    params: handleData,
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
      workflowFormDesignId: getValueByKey({
        data: handleData,
        key: fieldDataFlowFormDesign.workflowFormDesignId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
