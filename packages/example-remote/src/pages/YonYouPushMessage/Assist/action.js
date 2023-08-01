import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: 'yonYouPushMessage/refreshCache',
    params: {
      yonYouPushMessageId: getValueByKey({
        data: handleData,
        key: fieldData.yonYouPushMessageId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
