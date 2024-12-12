import { request } from 'easy-soft-utility';

export const pageListDataApiAddress =
  '/workflowCaseNextProcessNotification/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress =
  '/workflowCaseNextProcessNotification/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowCaseNextProcessNotification/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const sendNotificationDataApiAddress =
  '/workflowCaseNextProcessNotification/sendNotification';

export async function sendNotificationData(parameters) {
  return request({
    api: sendNotificationDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/workflowCaseNextProcessNotification/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
