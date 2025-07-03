import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/subsidiary/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/subsidiary/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListDataApiAddress = '/subsidiary/singleTreeList';

export async function singleTreeListData(parameters) {
  return request({
    api: singleTreeListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/subsidiary/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/subsidiary/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/subsidiary/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateParentIdDataApiAddress = '/subsidiary/updateParentId';

export async function updateParentIdData(parameters) {
  return request({
    api: updateParentIdDataApiAddress,
    params: parameters,
  });
}

export const updateSortDataApiAddress = '/subsidiary/updateSort';

export async function updateSortData(parameters) {
  return request({
    api: updateSortDataApiAddress,
    params: parameters,
  });
}

export const toggleComplaintSwitchDataApiAddress =
  '/subsidiary/toggleComplaintSwitch';

export async function toggleComplaintSwitchData(parameters) {
  return request({
    api: toggleComplaintSwitchDataApiAddress,
    params: parameters,
  });
}

export const toggleReportSwitchDataApiAddress =
  '/subsidiary/toggleReportSwitch';

export async function toggleReportSwitchData(parameters) {
  return request({
    api: toggleReportSwitchDataApiAddress,
    params: parameters,
  });
}

export const toggleFeedbackSwitchDataApiAddress =
  '/subsidiary/toggleFeedbackSwitch';

export async function toggleFeedbackSwitchData(parameters) {
  return request({
    api: toggleFeedbackSwitchDataApiAddress,
    params: parameters,
  });
}

export const setEnableDataApiAddress = '/subsidiary/setEnable';

export async function setEnableData(parameters) {
  return request({
    api: setEnableDataApiAddress,
    params: parameters,
  });
}

export const setDisableDataApiAddress = '/subsidiary/setDisable';

export async function setDisableData(parameters) {
  return request({
    api: setDisableDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/subsidiary/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/subsidiary/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/subsidiary/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
