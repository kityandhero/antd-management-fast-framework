import { getValueByKey } from 'easy-soft-utility';

import { actionCore } from 'antd-management-fast-common';

import { modelTypeCollection } from '../../../modelBuilders';
import { fieldData } from '../Common/data';

export async function sendNextProcessNotificationAction({
  target,
  handleData,
  successCallback,
  successMessage = null,
}) {
  actionCore({
    api: modelTypeCollection.workflowCaseNextProcessNotificationTypeCollection
      .sendNotification,
    params: {
      workflowDebugCaseNextProcessNotificationId: getValueByKey({
        data: handleData,
        key: fieldData.workflowDebugCaseNextProcessNotificationId.name,
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
    api: modelTypeCollection.workflowCaseNextProcessNotificationTypeCollection
      .refreshCache,
    params: {
      workflowCaseNextProcessNotificationId: getValueByKey({
        data: handleData,
        key: fieldData.workflowCaseNextProcessNotificationId.name,
      }),
    },
    target,
    handleData,
    successCallback,
    successMessage,
  });
}
