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
    api: 'sqlEntity/refreshCache',
    params: {
      sqlEntityId: getValueByKey({
        data: handleData,
        key: fieldData.sqlEntityId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
