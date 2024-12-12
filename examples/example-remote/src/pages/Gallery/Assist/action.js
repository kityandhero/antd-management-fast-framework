import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function setOnlineAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'gallery/setOnline',
    params: {
      galleryId: getValueByKey({
        data: handleData,
        key: fieldData.galleryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setOfflineAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'gallery/setOffline',
    params: {
      galleryId: getValueByKey({
        data: handleData,
        key: fieldData.galleryId.name,
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
    api: 'gallery/remove',
    params: {
      galleryId: getValueByKey({
        data: handleData,
        key: fieldData.galleryId.name,
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
    api: 'gallery/refreshCache',
    params: {
      galleryId: getValueByKey({
        data: handleData,
        key: fieldData.galleryId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
