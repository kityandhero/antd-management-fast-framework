import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData, statusCollection } from '../Common/data';

export async function singleListAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.generalDiscourseTypeCollection.singleList,
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
    api: modelTypeCollection.generalDiscourseTypeCollection.setEnable,
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
    api: modelTypeCollection.generalDiscourseTypeCollection.setDisable,
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
    api: modelTypeCollection.generalDiscourseTypeCollection.remove,
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
    api: modelTypeCollection.generalDiscourseTypeCollection.refreshCache,
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
