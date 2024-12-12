import { request } from 'easy-soft-utility';

export const pageListDataApiAddress =
  '/workflowDebugCaseNextProcessNotification/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress =
  '/workflowDebugCaseNextProcessNotification/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress =
  '/workflowDebugCaseNextProcessNotification/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const sendNotificationDataApiAddress =
  '/workflowDebugCaseNextProcessNotification/sendNotification';

export async function sendNotificationData(parameters) {
  return request({
    api: sendNotificationDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/workflowDebugCaseNextProcessNotification/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
