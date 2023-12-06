import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

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
