import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/tag/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const pageListWithQuestionDataApiAddress = '/tag/pageListWithQuestion';

export async function pageListWithQuestionData(parameters) {
  return request({
    api: pageListWithQuestionDataApiAddress,
    params: parameters,
  });
}

export const pageListWithNoticeDataApiAddress = '/tag/pageListWithNotice';

export async function pageListWithNoticeData(parameters) {
  return request({
    api: pageListWithNoticeDataApiAddress,
    params: parameters,
  });
}

export const pageListWithWorkflowDataApiAddress = '/tag/pageListWithWorkflow';

export async function pageListWithWorkflowData(parameters) {
  return request({
    api: pageListWithWorkflowDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/tag/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const singleListWithQuestionDataApiAddress =
  '/tag/singleListWithQuestion';

export async function singleListWithQuestionData(parameters) {
  return request({
    api: singleListWithQuestionDataApiAddress,
    params: parameters,
  });
}

export const singleListWithNoticeDataApiAddress = '/tag/singleListWithNotice';

export async function singleListWithNoticeData(parameters) {
  return request({
    api: singleListWithNoticeDataApiAddress,
    params: parameters,
  });
}

export const singleListWithWorkflowDataApiAddress =
  '/tag/singleListWithWorkflow';

export async function singleListWithWorkflowData(parameters) {
  return request({
    api: singleListWithWorkflowDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListDataApiAddress = '/tag/singleTreeList';

export async function singleTreeListData(parameters) {
  return request({
    api: singleTreeListDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListWithQuestionDataApiAddress =
  '/tag/singleTreeListWithQuestion';

export async function singleTreeListWithQuestionData(parameters) {
  return request({
    api: singleTreeListWithQuestionDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListWithNoticeDataApiAddress =
  '/tag/singleTreeListWithNotice';

export async function singleTreeListWithNoticeData(parameters) {
  return request({
    api: singleTreeListWithNoticeDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListWithWorkflowDataApiAddress =
  '/tag/singleTreeListWithWorkflow';

export async function singleTreeListWithWorkflowData(parameters) {
  return request({
    api: singleTreeListWithWorkflowDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/tag/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/tag/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/tag/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateColorDataApiAddress = '/tag/updateColor';

export async function updateColorData(parameters) {
  return request({
    api: updateColorDataApiAddress,
    params: parameters,
  });
}

export const updateTypeDataApiAddress = '/tag/updateType';

export async function updateTypeData(parameters) {
  return request({
    api: updateTypeDataApiAddress,
    params: parameters,
  });
}

export const updateSortDataApiAddress = '/tag/updateSort';

export async function updateSortData(parameters) {
  return request({
    api: updateSortDataApiAddress,
    params: parameters,
  });
}

export const toggleRecommendDataApiAddress = '/tag/toggleRecommend';

export async function toggleRecommendData(parameters) {
  return request({
    api: toggleRecommendDataApiAddress,
    params: parameters,
  });
}

export const setEnableDataApiAddress = '/tag/setEnable';

export async function setEnableData(parameters) {
  return request({
    api: setEnableDataApiAddress,
    params: parameters,
  });
}

export const setDisableDataApiAddress = '/tag/setDisable';

export async function setDisableData(parameters) {
  return request({
    api: setDisableDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/tag/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/tag/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/tag/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress = '/tag/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
