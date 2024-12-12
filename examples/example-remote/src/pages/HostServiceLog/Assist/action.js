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
    api: 'hostServiceLog/refreshCache',
    params: {
      hostServiceLogId: getValueByKey({
        data: handleData,
        key: fieldData.hostServiceLogId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
