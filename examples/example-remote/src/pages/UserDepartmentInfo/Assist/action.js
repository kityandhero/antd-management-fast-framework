import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function addBasicInfoAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userDepartmentInfoTypeCollection.addBasicInfo,
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
    api: modelTypeCollection.userDepartmentInfoTypeCollection.setPrimary,
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

export async function removePositionAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userDepartmentInfoTypeCollection.removePosition,
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

export async function removePositionGradeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userDepartmentInfoTypeCollection
      .removePositionGrade,
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

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userDepartmentInfoTypeCollection.remove,
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
    api: modelTypeCollection.userDepartmentInfoTypeCollection.refreshCache,
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
