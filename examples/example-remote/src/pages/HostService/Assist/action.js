import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { changeTypeCollection, fieldData } from '../Common/data';

export async function setStartAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'hostService/change',
    params: {
      hostServiceId: getValueByKey({
        data: handleData,
        key: fieldData.hostServiceId.name,
      }),
      operate: changeTypeCollection.start,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setStopAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'hostService/change',
    params: {
      hostServiceId: getValueByKey({
        data: handleData,
        key: fieldData.hostServiceId.name,
      }),
      operate: changeTypeCollection.stop,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function setRestartAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'hostService/change',
    params: {
      hostServiceId: getValueByKey({
        data: handleData,
        key: fieldData.hostServiceId.name,
      }),
      operate: changeTypeCollection.restart,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshAllStatusAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'hostService/refreshAllStatus',
    params: {},
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
