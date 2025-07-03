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
    api: modelTypeCollection.subsidiaryComplaintMessageTypeCollection
      .toggleConfirm,
    params: {
      subsidiaryComplaintMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryComplaintMessageId.name,
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
    api: modelTypeCollection.subsidiaryComplaintMessageTypeCollection.repay,
    params: {
      subsidiaryComplaintMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryComplaintMessageId.name,
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
    api: modelTypeCollection.subsidiaryComplaintMessageTypeCollection
      .refreshCache,
    params: {
      subsidiaryComplaintMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryComplaintMessageId.name,
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
    api: modelTypeCollection.subsidiaryComplaintMessageTypeCollection.remove,
    params: {
      subsidiaryComplaintMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryComplaintMessageId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
