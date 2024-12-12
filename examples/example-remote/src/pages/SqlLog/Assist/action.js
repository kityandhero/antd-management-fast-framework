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
    api: 'sqlLog/remove',
    params: {
      sqlLogId: getValueByKey({
        data: handleData,
        key: fieldData.sqlLogId.name,
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
    api: 'sqlLog/removeMulti',
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
    api: 'sqlLog/removeAll',
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
    api: 'sqlLog/createTestLog',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
