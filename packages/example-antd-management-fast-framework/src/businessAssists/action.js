import { getValueByKey } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { fieldData, mediaItemData } from '../businessData/data';

export function singleListTreeAction({
  target,
  handleData = {},
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'simple/singleListTree',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
    showProcessing: false,
  });
}

export function setOnlineAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'simple/setOnline',
    params: {
      simpleId: getValueByKey({
        data: handleData,
        key: fieldData.simpleId.name,
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
  successMessage = null,
}) {
  actionCore({
    api: 'simple/setOffline',
    params: {
      simpleId: getValueByKey({
        data: handleData,
        key: fieldData.simpleId.name,
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
    api: 'simple/refreshCache',
    params: {
      simpleId: getValueByKey({
        data: handleData,
        key: fieldData.simpleId.name,
      }),
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
    api: 'simple/setMediaCollectionSort',
    params: {
      simpleId: getValueByKey({
        data: handleData,
        key: fieldData.simpleId.name,
      }),
      ids: getValueByKey({
        data: handleData,
        key: 'ids',
      }),
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
    api: 'simple/removeMediaItem',
    params: {
      simpleId: getValueByKey({
        data: handleData,
        key: fieldData.simpleId.name,
      }),
      id: getValueByKey({
        data: handleData,
        key: mediaItemData.id.name,
      }),
    },
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
    api: 'simple/addImage',
    params: {
      simpleId: getValueByKey({
        data: handleData,
        key: fieldData.simpleId.name,
      }),
      url: handleData.url || '',
    },
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
    api: 'simple/removeImage',
    params: {
      simpleId: getValueByKey({
        data: handleData,
        key: fieldData.simpleId.name,
      }),
    },
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
      removeGalleryImageAction({
        target: t,
        handleData: r,
        successCallback: sc,
        successMessage,
      });
    },
  });
}

export async function setDataSchemaAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'formDesign/setDataSchema',
    params: {
      dataSchema: handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function getFormAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'formDesign/getForm',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function saveFormAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'formDesign/saveForm',
    params: handleData,
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
