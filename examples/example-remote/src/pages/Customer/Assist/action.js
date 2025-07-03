import { getValueByKey, whetherNumber } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export function togglePhoneVerifyAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.togglePhoneVerify,
    params: {
      customerId: getValueByKey({
        data: handleData,
        key: fieldData.customerId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export function setEnableAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.setEnable,
    params: {
      customerId: getValueByKey({
        data: handleData,
        key: fieldData.customerId.name,
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
    api: modelTypeCollection.customerTypeCollection.setDisable,
    params: {
      customerId: getValueByKey({
        data: handleData,
        key: fieldData.customerId.name,
      }),
      value: whetherNumber.no,
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.customerTypeCollection.refreshCache,
    params: {
      customerId: getValueByKey({
        data: handleData,
        key: fieldData.customerId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
