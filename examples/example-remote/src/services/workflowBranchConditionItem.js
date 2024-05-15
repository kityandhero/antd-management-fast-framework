import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowBranchConditionItem/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowBranchConditionItem/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addFormFieldBasicInfoDataApiAddress =
  '/workflowBranchConditionItem/addFormFieldBasicInfo';

export async function addFormFieldBasicInfoData(parameters) {
  return request({
    api: addFormFieldBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const addRemoteCallBasicInfoDataApiAddress =
  '/workflowBranchConditionItem/addRemoteCallBasicInfo';

export async function addRemoteCallBasicInfoData(parameters) {
  return request({
    api: addRemoteCallBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/workflowBranchConditionItem/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setRemoteCallUrlDataApiAddress =
  '/workflowBranchConditionItem/setRemoteCallUrl';

export async function setRemoteCallUrlData(parameters) {
  return request({
    api: setRemoteCallUrlDataApiAddress,
    params: parameters,
  });
}

export const setRemoteCallParametersDataApiAddress =
  '/workflowBranchConditionItem/setRemoteCallParameters';

export async function setRemoteCallParametersData(parameters) {
  return request({
    api: setRemoteCallParametersDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/workflowBranchConditionItem/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/workflowBranchConditionItem/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowBranchConditionItem/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
