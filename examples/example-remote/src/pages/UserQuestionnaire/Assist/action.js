import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'userQuestionnaire/refreshCache',
    params: {
      userQuestionnaireId: getValueByKey({
        data: handleData,
        key: fieldData.userQuestionnaireId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
