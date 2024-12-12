import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { fieldData } from '../Common/data';

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: 'smsLog/refreshCache',
    params: {
      smsLogId: getValueByKey({
        data: handleData,
        key: fieldData.smsLogId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
