import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function setNormalAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'department/setNormal',
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setInvalidAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'department/setInvalid',
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
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
    api: 'department/refreshCache',
    params: {
      departmentId: getValueByKey({
        data: handleData,
        key: fieldData.departmentId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
