import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData, statusCollection } from '../Common/data';

export async function singleListAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'generalDiscourse/singleList',
    params: {
      ...handleData,
      status: statusCollection.enable,
    },
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}

export function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'generalDiscourse/setEnable',
    params: {
      generalDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.generalDiscourseId.name,
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
    api: 'generalDiscourse/setDisable',
    params: {
      generalDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.generalDiscourseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function removeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'generalDiscourse/remove',
    params: {
      generalDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.generalDiscourseId.name,
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
    api: 'generalDiscourse/refreshCache',
    params: {
      generalDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.generalDiscourseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
