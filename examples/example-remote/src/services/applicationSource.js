import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/applicationSource/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/applicationSource/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const pageListLogDataApiAddress = '/applicationSource/pageListLog';

export async function pageListLogData(parameters) {
  return request({
    api: pageListLogDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/applicationSource/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/applicationSource/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/applicationSource/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setEnableDataApiAddress = '/applicationSource/setEnable';

export async function setEnableData(parameters) {
  return request({
    api: setEnableDataApiAddress,
    params: parameters,
  });
}

export const setDisableDataApiAddress = '/applicationSource/setDisable';

export async function setDisableData(parameters) {
  return request({
    api: setDisableDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/applicationSource/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/applicationSource/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/applicationSource/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
