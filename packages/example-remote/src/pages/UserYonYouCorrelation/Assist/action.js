import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'userYonYouCorrelation/setEnable',
    params: {
      userYonYouCorrelationId: getValueByKey({
        data: handleData,
        key: fieldData.userYonYouCorrelationId.name,
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
    api: 'userYonYouCorrelation/setDisable',
    params: {
      userYonYouCorrelationId: getValueByKey({
        data: handleData,
        key: fieldData.userYonYouCorrelationId.name,
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
    api: 'userYonYouCorrelation/refreshCache',
    params: {
      userYonYouCorrelationId: getValueByKey({
        data: handleData,
        key: fieldData.userYonYouCorrelationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
