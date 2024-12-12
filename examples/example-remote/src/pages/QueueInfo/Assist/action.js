import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export function trySendAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'queueInfo/trySend',
    params: {
      name: getValueByKey({
        data: handleData,
        key: fieldData.name.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function tryPurgeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'queueInfo/tryPurge',
    params: {
      name: getValueByKey({
        data: handleData,
        key: fieldData.name.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function tryStartAllAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'queueInfo/tryStartAll',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
