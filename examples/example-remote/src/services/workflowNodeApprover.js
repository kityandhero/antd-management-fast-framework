import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowNodeApprover/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/workflowNodeApprover/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowNodeApprover/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addApproverBasicInfoDataApiAddress =
  '/workflowNodeApprover/addApproverBasicInfo';

export async function addApproverBasicInfoData(parameters) {
  return request({
    api: addApproverBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const addPositionGradeBasicInfoDataApiAddress =
  '/workflowNodeApprover/addPositionGradeBasicInfo';

export async function addPositionGradeBasicInfoData(parameters) {
  return request({
    api: addPositionGradeBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/workflowNodeApprover/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/workflowNodeApprover/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowNodeApprover/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
