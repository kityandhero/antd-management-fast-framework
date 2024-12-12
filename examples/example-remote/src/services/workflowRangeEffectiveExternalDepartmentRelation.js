import { request } from 'easy-soft-utility';

export const pageListDataApiAddress =
  '/workflowRangeEffectiveExternalDepartmentRelation/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress =
  '/workflowRangeEffectiveExternalDepartmentRelation/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress =
  '/workflowRangeEffectiveExternalDepartmentRelation/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addDataApiAddress =
  '/workflowRangeEffectiveExternalDepartmentRelation/add';

export async function addData(parameters) {
  return request({
    api: addDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress =
  '/workflowRangeEffectiveExternalDepartmentRelation/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const removeAllDataApiAddress =
  '/workflowRangeEffectiveExternalDepartmentRelation/removeAll';

export async function removeAllData(parameters) {
  return request({
    api: removeAllDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/workflowRangeEffectiveExternalDepartmentRelation/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowRangeEffectiveExternalDepartmentRelation/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
