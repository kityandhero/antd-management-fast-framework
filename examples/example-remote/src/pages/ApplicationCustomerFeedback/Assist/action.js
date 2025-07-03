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
    api: modelTypeCollection.applicationCustomerFeedbackTypeCollection.repay,
    params: {
      applicationCustomerFeedbackId: getValueByKey({
        data: handleData,
        key: fieldData.applicationCustomerFeedbackId.name,
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
    api: modelTypeCollection.applicationCustomerFeedbackTypeCollection.remove,
    params: {
      applicationCustomerFeedbackId: getValueByKey({
        data: handleData,
        key: fieldData.applicationCustomerFeedbackId.name,
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
    api: modelTypeCollection.applicationCustomerFeedbackTypeCollection
      .refreshCache,
    params: {
      applicationCustomerFeedbackId: getValueByKey({
        data: handleData,
        key: fieldData.applicationCustomerFeedbackId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
