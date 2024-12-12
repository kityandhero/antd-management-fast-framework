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
    api: modelTypeCollection.userGeneralDiscourseTypeCollection.singleList,
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
    api: modelTypeCollection.userGeneralDiscourseTypeCollection.setEnable,
    params: {
      userGeneralDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.userGeneralDiscourseId.name,
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
    api: modelTypeCollection.userGeneralDiscourseTypeCollection.setDisable,
    params: {
      userGeneralDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.userGeneralDiscourseId.name,
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
    api: modelTypeCollection.userGeneralDiscourseTypeCollection.remove,
    params: {
      userGeneralDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.userGeneralDiscourseId.name,
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
    api: modelTypeCollection.userGeneralDiscourseTypeCollection.refreshCache,
    params: {
      userGeneralDiscourseId: getValueByKey({
        data: handleData,
        key: fieldData.userGeneralDiscourseId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
