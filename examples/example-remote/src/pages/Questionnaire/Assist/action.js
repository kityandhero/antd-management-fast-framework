import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function toggleGroupDisplayAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'questionnaire/toggleGroupDisplay',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function toggleRandomOrderAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'questionnaire/toggleRandomOrder',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
      }),
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
    api: 'questionnaire/toggleRecommend',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
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
    api: 'questionnaire/toggleTop',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
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
    api: 'questionnaire/toggleVisible',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
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
  successMessage = null,
}) {
  actionCore({
    api: 'questionnaire/setOnline',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
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
    api: 'questionnaire/setOffline',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
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
    api: 'questionnaire/remove',
    params: {
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
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
    api: 'questionnaire/refreshCache',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
