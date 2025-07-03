import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function refreshCacheAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.customerLoginLogTypeCollection.refreshCache,
    params: {
      customerLoginLogId: getValueByKey({
        data: handleData,
        key: fieldData.customerLoginLogId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
