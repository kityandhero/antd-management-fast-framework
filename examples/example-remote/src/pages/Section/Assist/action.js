import { ellipsis, getValueByKey } from 'easy-soft-utility';

import { actionCore, confirmActionCore } from 'antd-management-fast-common';

import { keyValueItemData } from '../../../customConfig';
import { fieldData } from '../Common/data';

export function singleTreeListAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'section/singleTreeList',
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function toggleRecommendAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'section/toggleRecommend',
    params: {
      sectionId: getValueByKey({
        data: handleData,
        key: fieldData.sectionId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function toggleTopAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'section/toggleTop',
    params: {
      sectionId: getValueByKey({
        data: handleData,
        key: fieldData.sectionId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function toggleVisibleAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'section/toggleVisible',
    params: {
      sectionId: getValueByKey({
        data: handleData,
        key: fieldData.sectionId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setOnlineAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'section/setOnline',
    params: {
      sectionId: getValueByKey({
        data: handleData,
        key: fieldData.sectionId.name,
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
    api: 'section/setOffline',
    params: {
      sectionId: getValueByKey({
        data: handleData,
        key: fieldData.sectionId.name,
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
  successMessage,
}) {
  actionCore({
    api: 'section/refreshCache',
    params: {
      sectionId: getValueByKey({
        data: handleData,
        key: fieldData.sectionId.name,
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
  successMessage = null,
}) {
  const ids = getValueByKey({
    data: handleData,
    key: 'ids',
  });

  actionCore({
    api: 'section/setMediaCollectionSort',
    params: {
      sectionId: getValueByKey({
        data: handleData,
        key: fieldData.sectionId.name,
      }),
      ids,
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
  successMessage = null,
}) {
  const id = getValueByKey({
    data: handleData,
    key: keyValueItemData.id.name,
  });

  actionCore({
    api: 'section/removeMediaItem',
    params: {
      sectionId: getValueByKey({
        data: handleData,
        key: fieldData.sectionId.name,
      }),
      id,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeMediaItemConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  const id = getValueByKey({
    data: handleData,
    key: keyValueItemData.id.name,
  });

  confirmActionCore({
    title: `移除媒体项`,
    content: `即将移除媒体项“${ellipsis(id, 40)}”，确定吗？`,
    target,
    handleData,
    successCallback,
    okAction: ({ target: t, handleData: r, successCallback: sc }) => {
      removeMediaItemAction({
        target: t,
        handleData: r,
        successCallback: sc,
        successMessage,
      });
    },
  });
}
