import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function removeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'generalLog/remove',
    params: {
      generalLogId: getValueByKey({
        data: handleData,
        key: fieldData.generalLogId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function removeMultiAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'generalLog/removeMulti',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function removeAllAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'generalLog/removeAll',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function createTestLogAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'generalLog/createTestLog',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
