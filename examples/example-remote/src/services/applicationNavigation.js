import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/applicationNavigation/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/applicationNavigation/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/applicationNavigation/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/applicationNavigation/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/applicationNavigation/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/applicationNavigation/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const getNavigationItemDataApiAddress =
  '/applicationNavigation/getNavigationItem';

export async function getNavigationItemData(parameters) {
  return request({
    api: getNavigationItemDataApiAddress,
    params: parameters,
  });
}

export const addNavigationItemDataApiAddress =
  '/applicationNavigation/addNavigationItem';

export async function addNavigationItemData(parameters) {
  return request({
    api: addNavigationItemDataApiAddress,
    params: parameters,
  });
}

export const updateNavigationItemDataApiAddress =
  '/applicationNavigation/updateNavigationItem';

export async function updateNavigationItemData(parameters) {
  return request({
    api: updateNavigationItemDataApiAddress,
    params: parameters,
  });
}

export const setNavigationCollectionSortDataApiAddress =
  '/applicationNavigation/setNavigationCollectionSort';

export async function setNavigationCollectionSortData(parameters) {
  return request({
    api: setNavigationCollectionSortDataApiAddress,
    params: parameters,
  });
}

export const removeNavigationItemDataApiAddress =
  '/applicationNavigation/removeNavigationItem';

export async function removeNavigationItemData(parameters) {
  return request({
    api: removeNavigationItemDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/applicationNavigation/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}

export const uploadVideoDataApiAddress = '/applicationNavigation/uploadVideo';

export async function uploadVideoData(parameters) {
  return request({
    api: uploadVideoDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/applicationNavigation/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
