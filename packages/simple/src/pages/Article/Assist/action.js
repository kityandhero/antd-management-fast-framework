import { getPathValue, ellipsis } from 'antd-management-fast-framework/lib/utils/tools';
import {
  actionCore,
  confirmActionCore,
} from 'antd-management-fast-framework/lib/utils/actionAssist';

import { fieldData, mediaItemData } from '../Common/data';

export function setOnlineAction({ target, record, successCallback, successMessage }) {
  actionCore({
    api: 'article/setOnline',
    params: {
      articleId: getPathValue(record, fieldData.articleId.name),
    },
    getApiData: (props) => {
      const {
        article: { data },
      } = props;

      return data;
    },
    target,
    record,
    successCallback,
    successMessage,
  });
}

export async function setOnlineConfirmAction({ target, record, successCallback, successMessage }) {
  confirmActionCore({
    title: `设置为正在上线状态`,
    content: `将要设为正在上线状态，确定吗？`,
    target,
    record,
    successCallback,
    okAction: ({ target: t, record: r, successCallback: sc }) => {
      setOnlineAction({ target: t, record: r, successCallback: sc, successMessage });
    },
  });
}

export function setOfflineAction({ target, record, successCallback, successMessage }) {
  actionCore({
    api: 'article/setOffline',
    params: {
      articleId: getPathValue(record, fieldData.articleId.name),
    },
    getApiData: (props) => {
      const {
        article: { data },
      } = props;

      return data;
    },
    target,
    record,
    successCallback,
    successMessage,
  });
}

export async function setOfflineConfirmAction({ target, record, successCallback, successMessage }) {
  confirmActionCore({
    title: `设置为下线状态`,
    content: `将要设为下线状态，确定吗？`,
    target,
    record,
    successCallback,
    okAction: ({ target: t, record: r, successCallback: sc }) => {
      setOfflineAction({ target: t, record: r, successCallback: sc, successMessage });
    },
  });
}

export async function refreshCacheAction({ target, record, successCallback, successMessage }) {
  actionCore({
    api: 'article/refreshCache',
    params: {
      articleId: getPathValue(record, fieldData.articleId.name),
    },
    getApiData: (props) => {
      const {
        article: { data },
      } = props;

      return data;
    },
    target,
    record,
    successCallback,
    successMessage,
  });
}

export async function refreshCacheConfirmAction({
  target,
  record,
  successCallback,
  successMessage,
}) {
  confirmActionCore({
    title: `刷新缓存`,
    content: `即将刷新“${ellipsis(
      getPathValue(record, fieldData.title.name),
      40,
    )}”的缓存，确定吗？`,
    target,
    record,
    successCallback,
    okAction: ({ target: t, record: r, successCallback: sc }) => {
      refreshCacheAction({ target: t, record: r, successCallback: sc, successMessage });
    },
  });
}

export function setMediaCollectionSortAction({ target, record, successCallback, successMessage }) {
  actionCore({
    api: 'article/setMediaCollectionSort',
    params: {
      articleId: getPathValue(record, fieldData.articleId.name),
      ids: getPathValue(record, 'ids'),
    },
    getApiData: (props) => {
      const {
        article: { data },
      } = props;

      return data;
    },
    target,
    record,
    successCallback,
    successMessage,
  });
}

export async function removeMediaItemAction({ target, record, successCallback, successMessage }) {
  actionCore({
    api: 'article/removeMediaItem',
    params: {
      articleId: getPathValue(record, fieldData.articleId.name),
      id: getPathValue(record, mediaItemData.id.name),
    },
    getApiData: (props) => {
      const {
        article: { data },
      } = props;

      return data;
    },
    target,
    record,
    successCallback,
    successMessage,
  });
}

export async function removeMediaItemConfirmAction({
  target,
  record,
  successCallback,
  successMessage,
}) {
  confirmActionCore({
    title: `移除媒体项`,
    content: `即将移除媒体项“${ellipsis(
      getPathValue(record, mediaItemData.id.name),
      40,
    )}”，确定吗？`,
    target,
    record,
    successCallback,
    okAction: ({ target: t, record: r, successCallback: sc }) => {
      removeMediaItemAction({ target: t, record: r, successCallback: sc, successMessage });
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
