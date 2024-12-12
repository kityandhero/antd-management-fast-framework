import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { configItemData, fieldData } from '../Common/data';

export async function removeConfigItemAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'sectionApplicationConfig/removeConfigItem',
    params: {
      sectionApplicationConfigId: getValueByKey({
        data: handleData,
        key: configItemData.sectionApplicationConfigId.name,
      }),
      id: getValueByKey({
        data: handleData,
        key: configItemData.id.name,
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
  successMessage = null,
}) {
  actionCore({
    api: 'sectionApplicationConfig/refreshCache',
    params: {
      sectionApplicationConfigId: getValueByKey({
        data: handleData,
        key: fieldData.sectionApplicationConfigId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
