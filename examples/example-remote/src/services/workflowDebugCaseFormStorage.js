import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowDebugCaseFormStorage/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress =
  '/workflowDebugCaseFormStorage/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowDebugCaseFormStorage/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const setDataApiAddress = '/workflowDebugCaseFormStorage/set';

export async function setData(parameters) {
  return request({
    api: setDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/workflowDebugCaseFormStorage/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/workflowDebugCaseFormStorage/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowDebugCaseFormStorage/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
