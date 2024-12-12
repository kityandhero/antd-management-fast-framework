import { getValueByKey, request } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { updateColorDataApiAddress } from '../../../services/tag';
import { fieldData } from '../Common/data';

export function singleTreeListAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'tag/singleTreeList',
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithWorkflowAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'tag/singleTreeListWithWorkflow',
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithQuestionAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'tag/singleTreeListWithQuestion',
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function singleTreeListWithNoticeAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'tag/singleTreeListWithNotice',
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function updateColorAction({ handleData }) {
  request({
    api: updateColorDataApiAddress,
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
        defaultValue: '',
      }),
      color: getValueByKey({
        data: handleData,
        key: fieldData.color.name,
        defaultValue: '',
      }),
    },
  });
}

export async function updateSortAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'tag/updateSort',
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function toggleRecommendAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'tag/toggleRecommend',
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'tag/setEnable',
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'tag/setDisable',
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'tag/remove',
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
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
    api: 'tag/refreshCache',
    params: {
      tagId: getValueByKey({
        data: handleData,
        key: fieldData.tagId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
