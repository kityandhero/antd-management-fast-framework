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
    api: 'executeLog/remove',
    params: {
      executeLogId: getValueByKey({
        data: handleData,
        key: fieldData.executeLogId.name,
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
    api: 'executeLog/removeMulti',
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
    api: 'executeLog/removeAll',
    params: { ...handleData },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
