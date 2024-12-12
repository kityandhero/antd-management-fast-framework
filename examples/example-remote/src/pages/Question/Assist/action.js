import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function setOnlineAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'question/setOnline',
    params: {
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionId.name,
        defaultValue: '',
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
    api: 'question/setOffline',
    params: {
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionId.name,
        defaultValue: '',
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
  successMessage = null,
}) {
  actionCore({
    api: 'question/remove',
    params: {
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionId.name,
        defaultValue: '',
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
    api: 'question/refreshCache',
    params: {
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function practiceAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'question/practice',
    params: {
      ...handleData,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
