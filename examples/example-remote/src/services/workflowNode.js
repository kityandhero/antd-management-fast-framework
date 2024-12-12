import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/workflowNode/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/workflowNode/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/workflowNode/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addStartPointDataApiAddress = '/workflowNode/addStartPoint';

export async function addStartPointData(parameters) {
  return request({
    api: addStartPointDataApiAddress,
    params: parameters,
  });
}

export const addIntermediatePointDataApiAddress =
  '/workflowNode/addIntermediatePoint';

export async function addIntermediatePointData(parameters) {
  return request({
    api: addIntermediatePointDataApiAddress,
    params: parameters,
  });
}

export const addCarbonCopyPointDataApiAddress =
  '/workflowNode/addCarbonCopyPoint';

export async function addCarbonCopyPointData(parameters) {
  return request({
    api: addCarbonCopyPointDataApiAddress,
    params: parameters,
  });
}

export const addEndPointDataApiAddress = '/workflowNode/addEndPoint';

export async function addEndPointData(parameters) {
  return request({
    api: addEndPointDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/workflowNode/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateViewConfigDataApiAddress = '/workflowNode/updateViewConfig';

export async function updateViewConfigData(parameters) {
  return request({
    api: updateViewConfigDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/workflowNode/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/workflowNode/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/workflowNode/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
