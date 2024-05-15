import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function addAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'workflowRangeEffectiveExternalDepartmentRelation/add',
    params: {
      workflowId: getValueByKey({
        data: handleData,
        key: fieldData.workflowId.name,
        defaultValue: '',
      }),
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
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
  successMessage = null,
}) {
  actionCore({
    api: 'workflowRangeEffectiveExternalDepartmentRelation/remove',
    params: {
      workflowRangeEffectiveExternalDepartmentRelationId: getValueByKey({
        data: handleData,
        key: fieldData.workflowRangeEffectiveExternalDepartmentRelationId.name,
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
    api: 'workflowRangeEffectiveExternalDepartmentRelation/removeAll',
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
    api: 'workflowRangeEffectiveExternalDepartmentRelation/refreshCache',
    params: {
      workflowRangeEffectiveExternalDepartmentRelationId: getValueByKey({
        data: handleData,
        key: fieldData.workflowRangeEffectiveExternalDepartmentRelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
