import { getValueByKey, recordError } from 'antd-management-fast-framework/es/utils/tools';
import { actionCore } from 'antd-management-fast-framework/es/utils/actionAssist';

import { fieldData, mediaItemData } from '../Common/data';

function getApiData(props) {
  const { article } = props;

  if ((article || null) == null) {
    recordError('getApiData has some undefined error');
  }

  const { data } = article;

  if ((data || null) == null) {
    recordError('data:getApiData has some undefined error');
  }

  return data;
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

/**
 * 占位函数
 *
 * @export
 * @returns
 */
export async function empty() {
  return {};
}
