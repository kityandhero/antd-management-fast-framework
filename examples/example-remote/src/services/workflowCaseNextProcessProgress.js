import { request } from 'easy-soft-utility';

export const pageListDataApiAddress =
  '/workflowCaseNextProcessProgress/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress =
  '/workflowCaseNextProcessProgress/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getByFlowCaseIdDataApiAddress =
  '/workflowCaseNextProcessProgress/getByFlowCaseId';

export async function getByFlowCaseIdData(parameters) {
  return request({
    api: getByFlowCaseIdDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/workflowCaseNextProcessProgress/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
