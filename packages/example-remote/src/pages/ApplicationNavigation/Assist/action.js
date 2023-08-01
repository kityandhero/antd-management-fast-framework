import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData, navigationItemData } from '../Common/data';

export async function removeNavigationItemAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'applicationNavigation/removeNavigationItem',
    params: {
      applicationNavigationId: getValueByKey({
        data: handleData,
        key: navigationItemData.applicationNavigationId.name,
      }),
      id: getValueByKey({
        data: handleData,
        key: navigationItemData.id.name,
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
    api: 'applicationNavigation/refreshCache',
    params: {
      applicationNavigationId: getValueByKey({
        data: handleData,
        key: fieldData.applicationNavigationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
