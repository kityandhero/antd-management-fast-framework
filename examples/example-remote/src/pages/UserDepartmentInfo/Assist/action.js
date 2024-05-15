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
    api: 'userDepartmentInfo/addBasicInfo',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setPrimaryAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'userDepartmentInfo/setPrimary',
    params: handleData,
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
    api: 'userDepartmentInfo/remove',
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
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

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'userDepartmentInfo/refreshCache',
    params: {
      userDepartmentInfoId: getValueByKey({
        data: handleData,
        key: fieldData.userDepartmentInfoId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
