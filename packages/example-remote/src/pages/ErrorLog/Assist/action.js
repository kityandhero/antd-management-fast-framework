import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function deleteAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'errorLog/delete',
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

export function deleteMultiAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'errorLog/deleteMulti',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
