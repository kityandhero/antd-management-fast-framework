import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function singleTreeListAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'businessSet/singleTreeList',
    params: {
      ...handleData,
    },
    target,
    handleData,
    showProcessing: false,
    successCallback,
    successMessage,
  });
}

export function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'businessSet/setEnable',
    params: {
      businessSetId: getValueByKey({
        data: handleData,
        key: fieldData.businessSetId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'businessSet/setDisable',
    params: {
      businessSetId: getValueByKey({
        data: handleData,
        key: fieldData.businessSetId.name,
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
    api: 'businessSet/refreshCache',
    params: {
      businessSetId: getValueByKey({
        data: handleData,
        key: fieldData.businessSetId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
