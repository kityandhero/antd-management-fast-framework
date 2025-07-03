import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export function toggleConfirmAction({
  target,
  handleData,
  successCallback,
  successMessage,
}) {
  actionCore({
    api: modelTypeCollection.subsidiaryReportMessageTypeCollection
      .toggleConfirm,
    params: {
      subsidiaryReportMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryReportMessageId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function refreshReplyAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.subsidiaryReportMessageTypeCollection.repay,
    params: {
      subsidiaryReportMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryReportMessageId.name,
      }),
      replyContent: getValueByKey({
        data: handleData,
        key: fieldData.replyContent.name,
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
    api: modelTypeCollection.subsidiaryReportMessageTypeCollection.refreshCache,
    params: {
      subsidiaryReportMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryReportMessageId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.subsidiaryReportMessageTypeCollection.remove,
    params: {
      subsidiaryReportMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryReportMessageId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
