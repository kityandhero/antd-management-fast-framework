import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/user/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/user/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoWithLoginInfoDataApiAddress =
  '/user/addBasicInfoWithLoginInfo';

export async function addBasicInfoWithLoginInfoData(parameters) {
  return request({
    api: addBasicInfoWithLoginInfoDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/user/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const addLoginInfoDataApiAddress = '/user/addLoginInfo';

export async function addLoginInfoData(parameters) {
  return request({
    api: addLoginInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/user/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateParentDataApiAddress = '/user/updateParent';

export async function updateParentData(parameters) {
  return request({
    api: updateParentDataApiAddress,
    params: parameters,
  });
}

export const clearParentDataApiAddress = '/user/clearParent';

export async function clearParentData(parameters) {
  return request({
    api: clearParentDataApiAddress,
    params: parameters,
  });
}

export const setSignetDataApiAddress = '/user/setSignet';

export async function setSignetData(parameters) {
  return request({
    api: setSignetDataApiAddress,
    params: parameters,
  });
}

export const openSignetPasswordSwitchDataApiAddress =
  '/user/openSignetPasswordSwitch';

export async function openSignetPasswordSwitchData(parameters) {
  return request({
    api: openSignetPasswordSwitchDataApiAddress,
    params: parameters,
  });
}

export const closeSignetPasswordSwitchDataApiAddress =
  '/user/closeSignetPasswordSwitch';

export async function closeSignetPasswordSwitchData(parameters) {
  return request({
    api: closeSignetPasswordSwitchDataApiAddress,
    params: parameters,
  });
}

export const toggleSignetPasswordSwitchDataApiAddress =
  '/user/toggleSignetPasswordSwitch';

export async function toggleSignetPasswordSwitchData(parameters) {
  return request({
    api: toggleSignetPasswordSwitchDataApiAddress,
    params: parameters,
  });
}

export const setEnableDataApiAddress = '/user/setEnable';

export async function setEnableData(parameters) {
  return request({
    api: setEnableDataApiAddress,
    params: parameters,
  });
}

export const setDisableDataApiAddress = '/user/setDisable';

export async function setDisableData(parameters) {
  return request({
    api: setDisableDataApiAddress,
    params: parameters,
  });
}

export const resetSignetPasswordDataApiAddress = '/user/resetSignetPassword';

export async function resetSignetPasswordData(parameters) {
  return request({
    api: resetSignetPasswordDataApiAddress,
    params: parameters,
  });
}

export const resetPasswordDataApiAddress = '/user/resetPassword';

export async function resetPasswordData(parameters) {
  return request({
    api: resetPasswordDataApiAddress,
    params: parameters,
  });
}

export const changePermissionDataApiAddress = '/user/changePermission';

export async function changePermissionData(parameters) {
  return request({
    api: changePermissionDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/user/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/user/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/user/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress = '/user/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
