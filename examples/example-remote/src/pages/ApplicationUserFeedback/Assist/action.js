import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function replyAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.applicationUserFeedbackTypeCollection.repay,
    params: {
      applicationUserFeedbackId: getValueByKey({
        data: handleData,
        key: fieldData.applicationUserFeedbackId.name,
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

export async function removeAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.applicationUserFeedbackTypeCollection.remove,
    params: {
      applicationUserFeedbackId: getValueByKey({
        data: handleData,
        key: fieldData.applicationUserFeedbackId.name,
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
    api: modelTypeCollection.applicationUserFeedbackTypeCollection.refreshCache,
    params: {
      applicationUserFeedbackId: getValueByKey({
        data: handleData,
        key: fieldData.applicationUserFeedbackId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
