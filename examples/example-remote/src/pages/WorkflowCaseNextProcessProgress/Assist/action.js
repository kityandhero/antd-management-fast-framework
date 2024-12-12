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
    api: modelTypeCollection.workflowCaseNextProcessProgressTypeCollection
      .refreshCache,
    params: {
      workflowCaseNextProcessProgressId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseNextProcessProgressId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
