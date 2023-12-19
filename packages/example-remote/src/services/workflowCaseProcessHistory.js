import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowCaseProcessHistory/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowCaseProcessHistory/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const resetAllApproveDataApiAddress =
  '/workflowCaseProcessHistory/resetAllApprove';

export async function resetAllApproveData(parameters) {
  return request({
    api: resetAllApproveDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/workflowCaseProcessHistory/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowCaseProcessHistory/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
