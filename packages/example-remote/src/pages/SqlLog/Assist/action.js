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
    api: 'sqlLog/delete',
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

export function deleteMultiAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'sqlLog/deleteMulti',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
