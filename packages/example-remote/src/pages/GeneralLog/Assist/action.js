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
    api: 'generalLog/delete',
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

export function deleteMultiAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'generalLog/deleteMulti',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
