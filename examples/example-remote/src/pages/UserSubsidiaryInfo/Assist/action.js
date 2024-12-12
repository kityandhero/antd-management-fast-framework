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
    api: 'userSubsidiaryInfo/addBasicInfo',
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
    api: 'userSubsidiaryInfo/setPrimary',
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
    api: 'userSubsidiaryInfo/remove',
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
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

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'userSubsidiaryInfo/refreshCache',
    params: {
      userSubsidiaryInfoId: getValueByKey({
        data: handleData,
        key: fieldData.userSubsidiaryInfoId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
