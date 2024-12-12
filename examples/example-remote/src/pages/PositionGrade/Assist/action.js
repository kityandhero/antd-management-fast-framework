import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export function singleListAction({
  target,
  handleData = {},
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.positionGradeTypeCollection.singleList,
    params: {
      ...handleData,
    },
    target,
    handleData,
    showProcessing: false,
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
    api: modelTypeCollection.positionGradeTypeCollection.refreshCache,
    params: {
      positionGradeId: getValueByKey({
        data: handleData,
        key: fieldData.positionGradeId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
