import { ellipsis, getValueByKey } from 'antd-management-fast-framework/lib/utils/tools';
import {
  actionCore,
  confirmActionCore,
} from 'antd-management-fast-framework/lib/utils/actionAssist';

import { fieldData, mediaItemData } from '../Common/data';

export function setOnlineAction({ target, handleData, successCallback, successMessage }) {
  actionCore({
    api: 'article/setOnline',
    params: {
      articleId: getValueByKey({
        data: handleData,
        key: fieldData.articleId.name,
      }),
    },
    getApiData: (props) => {
      const {
        article: { data },
      } = props;

      return data;
    },
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
    getApiData: (props) => {
      const {
        article: { data },
      } = props;

      return data;
    },
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
    getApiData: (props) => {
      const {
        article: { data },
      } = props;

      return data;
    },
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
    getApiData: (props) => {
      const {
        article: { data },
      } = props;

      return data;
    },
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
    getApiData: (props) => {
      const {
        article: { data },
      } = props;

      return data;
    },
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
