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
    api: modelTypeCollection.userWechatApplicationInfoTypeCollection.remove,
    params: {
      userId: getValueByKey({
        data: handleData,
        key: fieldData.userId.name,
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
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.userWechatApplicationInfoTypeCollection
      .refreshCache,
    params: {
      userWechatApplicationInfoId: getValueByKey({
        data: handleData,
        key: fieldData.userWechatApplicationInfoId.name,
        defaultValue: '',
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
