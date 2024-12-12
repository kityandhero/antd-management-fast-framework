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
    api: 'errorLog/remove',
    params: {
      errorLogId: getValueByKey({
        data: handleData,
        key: fieldData.errorLogId.name,
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
    api: 'errorLog/removeMulti',
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
    api: 'errorLog/removeAll',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function createTestExceptionAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'errorLog/createTestException',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
