import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.customerWechatApplicationInfoTypeCollection.remove,
    params: {
      customerId: getValueByKey({
        data: handleData,
        key: fieldData.customerId.name,
        defaultValue: '',
      }),
      applicationId: getValueByKey({
        data: handleData,
        key: fieldData.applicationId.name,
        defaultValue: '',
      }),
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
    api: modelTypeCollection.customerWechatApplicationInfoTypeCollection
      .refreshCache,
    params: {
      customerWechatApplicationInfoId: getValueByKey({
        data: handleData,
        key: fieldData.customerWechatApplicationInfoId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
