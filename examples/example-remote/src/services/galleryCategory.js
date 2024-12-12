import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/galleryCategory/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/galleryCategory/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListDataApiAddress = '/galleryCategory/singleTreeList';

export async function singleTreeListData(parameters) {
  return request({
    api: singleTreeListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/galleryCategory/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/galleryCategory/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/galleryCategory/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateSortDataApiAddress = '/galleryCategory/updateSort';

export async function updateSortData(parameters) {
  return request({
    api: updateSortDataApiAddress,
    params: parameters,
  });
}

export const setEnableDataApiAddress = '/galleryCategory/setEnable';

export async function setEnableData(parameters) {
  return request({
    api: setEnableDataApiAddress,
    params: parameters,
  });
}

export const setDisableDataApiAddress = '/galleryCategory/setDisable';

export async function setDisableData(parameters) {
  return request({
    api: setDisableDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/galleryCategory/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const removeSingleTreeListCacheDataApiAddress =
  '/galleryCategory/removeSingleTreeListCache';

export async function removeSingleTreeListCacheData(parameters) {
  return request({
    api: removeSingleTreeListCacheDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/galleryCategory/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/galleryCategory/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
