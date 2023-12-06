import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/section/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListDataApiAddress = '/section/singleTreeList';

export async function singleTreeListData(parameters) {
  return request({
    api: singleTreeListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/section/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/section/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/section/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateContentInfoDataApiAddress = '/section/updateContentInfo';

export async function updateContentInfoData(parameters) {
  return request({
    api: updateContentInfoDataApiAddress,
    params: parameters,
  });
}

export const updateRenderTypeDataApiAddress = '/section/updateRenderType';

export async function updateRenderTypeData(parameters) {
  return request({
    api: updateRenderTypeDataApiAddress,
    params: parameters,
  });
}

export const updateSortDataApiAddress = '/section/updateSort';

export async function updateSortData(parameters) {
  return request({
    api: updateSortDataApiAddress,
    params: parameters,
  });
}

export const updateParentIdDataApiAddress = '/section/updateParentId';

export async function updateParentIdData(parameters) {
  return request({
    api: updateParentIdDataApiAddress,
    params: parameters,
  });
}

export const toggleRecommendDataApiAddress = '/section/toggleRecommend';

export async function toggleRecommendData(parameters) {
  return request({
    api: toggleRecommendDataApiAddress,
    params: parameters,
  });
}

export const toggleTopDataApiAddress = '/section/toggleTop';

export async function toggleTopData(parameters) {
  return request({
    api: toggleTopDataApiAddress,
    params: parameters,
  });
}

export const toggleVisibleDataApiAddress = '/section/toggleVisible';

export async function toggleVisibleData(parameters) {
  return request({
    api: toggleVisibleDataApiAddress,
    params: parameters,
  });
}

export const setOnlineDataApiAddress = '/section/setOnline';

export async function setOnlineData(parameters) {
  return request({
    api: setOnlineDataApiAddress,
    params: parameters,
  });
}

export const setOfflineDataApiAddress = '/section/setOffline';

export async function setOfflineData(parameters) {
  return request({
    api: setOfflineDataApiAddress,
    params: parameters,
  });
}

export const setReadObtainScoreDataApiAddress = '/section/setReadObtainScore';

export async function setReadObtainScoreData(parameters) {
  return request({
    api: setReadObtainScoreDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/section/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const getMediaItemDataApiAddress = '/section/getMediaItem';

export async function getMediaItemData(parameters) {
  return request({
    api: getMediaItemDataApiAddress,
    params: parameters,
  });
}

export const addMediaItemDataApiAddress = '/section/addMediaItem';

export async function addMediaItemData(parameters) {
  return request({
    api: addMediaItemDataApiAddress,
    params: parameters,
  });
}

export const updateMediaItemDataApiAddress = '/section/updateMediaItem';

export async function updateMediaItemData(parameters) {
  return request({
    api: updateMediaItemDataApiAddress,
    params: parameters,
  });
}

export const setMediaCollectionSortDataApiAddress =
  '/section/setMediaCollectionSort';

export async function setMediaCollectionSortData(parameters) {
  return request({
    api: setMediaCollectionSortDataApiAddress,
    params: parameters,
  });
}

export const removeMediaItemDataApiAddress = '/section/removeMediaItem';

export async function removeMediaItemData(parameters) {
  return request({
    api: removeMediaItemDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress = '/section/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
