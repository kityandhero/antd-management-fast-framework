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
    api: modelTypeCollection.subsidiaryFeedbackMessageTypeCollection
      .toggleConfirm,
    params: {
      subsidiaryFeedbackMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryFeedbackMessageId.name,
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
    api: modelTypeCollection.subsidiaryFeedbackMessageTypeCollection.repay,
    params: {
      subsidiaryFeedbackMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryFeedbackMessageId.name,
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
    api: modelTypeCollection.subsidiaryFeedbackMessageTypeCollection
      .refreshCache,
    params: {
      subsidiaryFeedbackMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryFeedbackMessageId.name,
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
    api: modelTypeCollection.subsidiaryFeedbackMessageTypeCollection.remove,
    params: {
      subsidiaryFeedbackMessageId: getValueByKey({
        data: handleData,
        key: fieldData.subsidiaryFeedbackMessageId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
