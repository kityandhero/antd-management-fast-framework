import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/section/pageList',
    params: parameters,
  });
}

export async function singleTreeListData(parameters) {
  return request({
    api: '/section/singleTreeList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/section/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/section/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/section/updateBasicInfo',
    params: parameters,
  });
}

export async function updateContentInfoData(parameters) {
  return request({
    api: '/section/updateContentInfo',
    params: parameters,
  });
}

export async function updateRenderTypeData(parameters) {
  return request({
    api: '/section/updateRenderType',
    params: parameters,
  });
}

export async function updateSortData(parameters) {
  return request({
    api: '/section/updateSort',
    params: parameters,
  });
}

export async function updateParentIdData(parameters) {
  return request({
    api: '/section/updateParentId',
    params: parameters,
  });
}

export async function toggleRecommendData(parameters) {
  return request({
    api: '/section/toggleRecommend',
    params: parameters,
  });
}

export async function toggleTopData(parameters) {
  return request({
    api: '/section/toggleTop',
    params: parameters,
  });
}

export async function toggleVisibleData(parameters) {
  return request({
    api: '/section/toggleVisible',
    params: parameters,
  });
}

export async function setOnlineData(parameters) {
  return request({
    api: '/section/setOnline',
    params: parameters,
  });
}

export async function setOfflineData(parameters) {
  return request({
    api: '/section/setOffline',
    params: parameters,
  });
}

export async function setReadObtainScoreData(parameters) {
  return request({
    api: '/section/setReadObtainScore',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/section/refreshCache',
    params: parameters,
  });
}

export async function getMediaItemData(parameters) {
  return request({
    api: '/section/getMediaItem',
    params: parameters,
  });
}

export async function addMediaItemData(parameters) {
  return request({
    api: '/section/addMediaItem',
    params: parameters,
  });
}

export async function updateMediaItemData(parameters) {
  return request({
    api: '/section/updateMediaItem',
    params: parameters,
  });
}

export async function setMediaCollectionSortData(parameters) {
  return request({
    api: '/section/setMediaCollectionSort',
    params: parameters,
  });
}

export async function removeMediaItemData(parameters) {
  return request({
    api: '/section/removeMediaItem',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/section/pageListOperateLog',
    params: parameters,
  });
}
