import { request } from 'easy-soft-utility';

export const pageListDataApiAddress =
  '/workflowDebugCaseProcessHistory/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowDebugCaseProcessHistory/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const passDataApiAddress = '/workflowDebugCaseProcessHistory/pass';

export async function passData(parameters) {
  return request({
    api: passDataApiAddress,
    params: parameters,
  });
}

export const refuseDataApiAddress = '/workflowDebugCaseProcessHistory/refuse';

export async function refuseData(parameters) {
  return request({
    api: refuseDataApiAddress,
    params: parameters,
  });
}

export const cancelApproveDataApiAddress =
  '/workflowDebugCaseProcessHistory/cancelApprove';

export async function cancelApproveData(parameters) {
  return request({
    api: cancelApproveDataApiAddress,
    params: parameters,
  });
}

export const resetAllApproveDataApiAddress =
  '/workflowDebugCaseProcessHistory/resetAllApprove';

export async function resetAllApproveData(parameters) {
  return request({
    api: resetAllApproveDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/workflowDebugCaseProcessHistory/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowDebugCaseProcessHistory/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
