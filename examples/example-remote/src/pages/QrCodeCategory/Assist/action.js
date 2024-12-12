import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export function singleTreeListAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.qrCodeCategoryTypeCollection.singleTreeList,
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
    api: modelTypeCollection.qrCodeCategoryTypeCollection.setEnable,
    params: {
      qrCodeCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.qrCodeCategoryId.name,
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
    api: modelTypeCollection.qrCodeCategoryTypeCollection.setDisable,
    params: {
      qrCodeCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.qrCodeCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeSingleTreeListCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.qrCodeCategoryTypeCollection
      .removeSingleTreeListCache,
    params: { ...handleData },
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
    api: modelTypeCollection.qrCodeCategoryTypeCollection.refreshCache,
    params: {
      qrCodeCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.qrCodeCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
