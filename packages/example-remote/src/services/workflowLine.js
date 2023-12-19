import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowLine/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/workflowLine/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowLine/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const createLineDataApiAddress = '/workflowLine/createLine';

export async function createLineData(parameters) {
  return request({
    api: createLineDataApiAddress,
    params: parameters,
  });
}

export const updateLineDataApiAddress = '/workflowLine/updateLine';

export async function updateLineData(parameters) {
  return request({
    api: updateLineDataApiAddress,
    params: parameters,
  });
}

export const setBranchConditionIdDataApiAddress =
  '/workflowLine/setBranchConditionId';

export async function setBranchConditionIdData(parameters) {
  return request({
    api: setBranchConditionIdDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/workflowLine/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const removeAllDataApiAddress = '/workflowLine/removeAll';

export async function removeAllData(parameters) {
  return request({
    api: removeAllDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/workflowLine/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowLine/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
