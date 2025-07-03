import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function bindRelationAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'questionnaireQuestionRelation/bindRelation',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
      }),
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function unbindRelationAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'questionnaireQuestionRelation/unbindRelation',
    params: {
      questionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireId.name,
      }),
      questionId: getValueByKey({
        data: handleData,
        key: fieldData.questionId.name,
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
    api: 'questionnaireQuestionRelation/refreshCache',
    params: {
      questionnaireQuestionRelationId: getValueByKey({
        data: handleData,
        key: fieldData.questionnaireQuestionRelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
