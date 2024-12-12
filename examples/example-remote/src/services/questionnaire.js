import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/questionnaire/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/questionnaire/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/questionnaire/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/questionnaire/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateContentInfoDataApiAddress =
  '/questionnaire/updateContentInfo';

export async function updateContentInfoData(parameters) {
  return request({
    api: updateContentInfoDataApiAddress,
    params: parameters,
  });
}

export const updateSortDataApiAddress = '/questionnaire/updateSort';

export async function updateSortData(parameters) {
  return request({
    api: updateSortDataApiAddress,
    params: parameters,
  });
}

export const updateBusinessModeDataApiAddress =
  '/questionnaire/updateBusinessMode';

export async function updateBusinessModeData(parameters) {
  return request({
    api: updateBusinessModeDataApiAddress,
    params: parameters,
  });
}

export const updateRenderTypeDataApiAddress = '/questionnaire/updateRenderType';

export async function updateRenderTypeData(parameters) {
  return request({
    api: updateRenderTypeDataApiAddress,
    params: parameters,
  });
}

export const toggleGroupDisplayDataApiAddress =
  '/questionnaire/toggleGroupDisplay';

export async function toggleGroupDisplayData(parameters) {
  return request({
    api: toggleGroupDisplayDataApiAddress,
    params: parameters,
  });
}

export const toggleRandomOrderDataApiAddress =
  '/questionnaire/toggleRandomOrder';

export async function toggleRandomOrderData(parameters) {
  return request({
    api: toggleRandomOrderDataApiAddress,
    params: parameters,
  });
}

export const toggleRecommendDataApiAddress = '/questionnaire/toggleRecommend';

export async function toggleRecommendData(parameters) {
  return request({
    api: toggleRecommendDataApiAddress,
    params: parameters,
  });
}

export const toggleTopDataApiAddress = '/questionnaire/toggleTop';

export async function toggleTopData(parameters) {
  return request({
    api: toggleTopDataApiAddress,
    params: parameters,
  });
}

export const toggleVisibleDataApiAddress = '/questionnaire/toggleVisible';

export async function toggleVisibleData(parameters) {
  return request({
    api: toggleVisibleDataApiAddress,
    params: parameters,
  });
}

export const setOnlineDataApiAddress = '/questionnaire/setOnline';

export async function setOnlineData(parameters) {
  return request({
    api: setOnlineDataApiAddress,
    params: parameters,
  });
}

export const setOfflineDataApiAddress = '/questionnaire/setOffline';

export async function setOfflineData(parameters) {
  return request({
    api: setOfflineDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/questionnaire/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/questionnaire/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const getMediaItemDataApiAddress = '/questionnaire/getMediaItem';

export async function getMediaItemData(parameters) {
  return request({
    api: getMediaItemDataApiAddress,
    params: parameters,
  });
}

export const addMediaItemDataApiAddress = '/questionnaire/addMediaItem';

export async function addMediaItemData(parameters) {
  return request({
    api: addMediaItemDataApiAddress,
    params: parameters,
  });
}

export const updateMediaItemDataApiAddress = '/questionnaire/updateMediaItem';

export async function updateMediaItemData(parameters) {
  return request({
    api: updateMediaItemDataApiAddress,
    params: parameters,
  });
}

export const setMediaCollectionSortDataApiAddress =
  '/questionnaire/setMediaCollectionSort';

export async function setMediaCollectionSortData(parameters) {
  return request({
    api: setMediaCollectionSortDataApiAddress,
    params: parameters,
  });
}

export const removeMediaItemDataApiAddress = '/questionnaire/removeMediaItem';

export async function removeMediaItemData(parameters) {
  return request({
    api: removeMediaItemDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/questionnaire/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}

export const uploadImageDataApiAddress = '/questionnaire/uploadImage';

export async function uploadImageData(parameters) {
  return request({
    api: uploadImageDataApiAddress,
    params: parameters,
  });
}

export const uploadVideoDataApiAddress = '/questionnaire/uploadVideo';

export async function uploadVideoData(parameters) {
  return request({
    api: uploadVideoDataApiAddress,
    params: parameters,
  });
}

export const uploadAudioDataApiAddress = '/questionnaire/uploadAudio';

export async function uploadAudioData(parameters) {
  return request({
    api: uploadAudioDataApiAddress,
    params: parameters,
  });
}

export const uploadFileDataApiAddress = '/questionnaire/uploadFile';

export async function uploadFileData(parameters) {
  return request({
    api: uploadFileDataApiAddress,
    params: parameters,
  });
}

export const uploadFileBase64DataApiAddress = '/questionnaire/uploadFileBase64';

export async function uploadFileBase64Data(parameters) {
  return request({
    api: uploadFileBase64DataApiAddress,
    params: parameters,
  });
}
