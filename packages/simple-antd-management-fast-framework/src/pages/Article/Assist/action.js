import { getValueByKey, recordError } from 'antd-management-fast-framework/es/utils/tools';
import {
  getApiDataCore,
  actionCore,
  confirmActionCore,
} from 'antd-management-fast-framework/es/utils/actionAssist';

import { fieldData, mediaItemData } from '../Common/data';

function getApiData(props) {
  return getApiDataCore({ props, modelName: 'article' });
}

export function setOnlineAction({ target, handleData, successCallback, successMessage }) {
  actionCore({
    api: 'article/setOnline',
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
    },
    getApiData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setOfflineAction({ target, handleData, successCallback, successMessage }) {
  actionCore({
    api: 'article/setOffline',
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
    },
    getApiData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshCacheAction({ target, handleData, successCallback, successMessage }) {
  actionCore({
    api: 'article/refreshCache',
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
    },
    getApiData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setMediaCollectionSortAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'article/setMediaCollectionSort',
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
      ids: getValueByKey({
        data: handleData,
        key: 'ids',
      }),
    },
    getApiData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeMediaItemAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'article/removeMediaItem',
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
      id: getValueByKey({
        data: handleData,
        key: mediaItemData.id.name,
      }),
    },
    getApiData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function addGalleryImageAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'article/addImage',
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
      url: handleData.url || '',
    },
    getApiData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeGalleryImageAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'article/removeImage',
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
    },
    getApiData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeGalleryImageConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  confirmActionCore({
    title: `移除图片`,
    content: `即将移除图片，确定吗？`,
    target,
    handleData,
    successCallback,
    okAction: ({ target: t, handleData: r, successCallback: sc }) => {
      removeGalleryImageAction({ target: t, handleData: r, successCallback: sc, successMessage });
    },
  });
}

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
