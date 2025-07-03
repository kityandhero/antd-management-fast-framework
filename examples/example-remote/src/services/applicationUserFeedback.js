import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/applicationUserFeedback/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/applicationUserFeedback/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const repayDataApiAddress = '/applicationUserFeedback/repay';

export async function repayData(parameters) {
  return request({
    api: repayDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/applicationUserFeedback/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/applicationUserFeedback/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/applicationUserFeedback/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
