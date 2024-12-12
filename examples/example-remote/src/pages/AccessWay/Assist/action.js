import {
  checkStringIsNullOrWhiteSpace,
  getValueByKey,
} from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function testPermissionAction({
  target,
  handleData,
  successCallback,
}) {
  actionCore({
    api: 'accessWay/testPermissionAction',
    params: {},
    target,
    handleData,
    successCallback,
    successMessageBuilder: ({ remoteData }) => {
      const { testDomain } = {
        testDomain: '',
        ...remoteData,
      };

      return `测试域：${
        checkStringIsNullOrWhiteSpace(testDomain) ? '无地址' : testDomain
      }`;
    },
  });
}

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'accessWay/remove',
    params: {
      accessWayId: getValueByKey({
        data: handleData,
        key: fieldData.accessWayId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage: successMessage || `测试已经开始运行`,
  });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'accessWay/refreshCache',
    params: {
      accessWayId: getValueByKey({
        data: handleData,
        key: fieldData.accessWayId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
