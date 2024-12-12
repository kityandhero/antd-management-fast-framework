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
    api: modelTypeCollection.galleryCategoryTypeCollection.singleTreeList,
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
    api: modelTypeCollection.galleryCategoryTypeCollection.setEnable,
    params: {
      galleryCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.galleryCategoryId.name,
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
    api: modelTypeCollection.galleryCategoryTypeCollection.setDisable,
    params: {
      galleryCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.galleryCategoryId.name,
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
    api: modelTypeCollection.galleryCategoryTypeCollection
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
    api: modelTypeCollection.galleryCategoryTypeCollection.refreshCache,
    params: {
      galleryCategoryId: getValueByKey({
        data: handleData,
        key: fieldData.galleryCategoryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
