import { getValueByKey, whetherNumber } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'channelExecuteLogSwitch/updateKeyValueInfo',
    params: {
      tag: getValueByKey({
        data: handleData,
        key: fieldData.tag.name,
      }),
      value: whetherNumber.yes,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setDisableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'channelExecuteLogSwitch/updateKeyValueInfo',
    params: {
      tag: getValueByKey({
        data: handleData,
        key: fieldData.tag.name,
      }),
      value: whetherNumber.no,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'channelExecuteLogSwitch/refreshCache',
    params: {
      channel: getValueByKey({
        data: handleData,
        key: fieldData.tag.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
