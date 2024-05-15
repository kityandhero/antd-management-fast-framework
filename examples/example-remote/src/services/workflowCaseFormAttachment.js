import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowCaseFormAttachment/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress =
  '/workflowCaseFormAttachment/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowCaseFormAttachment/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/workflowCaseFormAttachment/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowCaseFormAttachment/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}

export const uploadFileDataApiAddress =
  '/workflowCaseFormAttachment/uploadFile';

export async function uploadFileData(parameters) {
  return request({
    api: uploadFileDataApiAddress,
    params: parameters,
  });
}
