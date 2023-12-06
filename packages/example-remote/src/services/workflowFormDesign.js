import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowFormDesign/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowFormDesign/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const getByWorkflowDataApiAddress = '/workflowFormDesign/getByWorkflow';

export async function getByWorkflowData(parameters) {
  return request({
    api: getByWorkflowDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/workflowFormDesign/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/workflowFormDesign/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateDocumentSchemaDataApiAddress =
  '/workflowFormDesign/updateDocumentSchema';

export async function updateDocumentSchemaData(parameters) {
  return request({
    api: updateDocumentSchemaDataApiAddress,
    params: parameters,
  });
}

export const updateRemarkSchemaDataApiAddress =
  '/workflowFormDesign/updateRemarkSchema';

export async function updateRemarkSchemaData(parameters) {
  return request({
    api: updateRemarkSchemaDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/workflowFormDesign/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowFormDesign/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
