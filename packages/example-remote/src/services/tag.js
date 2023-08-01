import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/tag/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/tag/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/tag/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/tag/updateBasicInfo',
    params: parameters,
  });
}

export async function updateSortData(parameters) {
  return request({
    api: '/tag/updateSort',
    params: parameters,
  });
}

export async function toggleRecommendData(parameters) {
  return request({
    api: '/tag/toggleRecommend',
    params: parameters,
  });
}

export async function setEnableData(parameters) {
  return request({
    api: '/tag/setEnable',
    params: parameters,
  });
}

export async function setDisableData(parameters) {
  return request({
    api: '/tag/setDisable',
    params: parameters,
  });
}

export async function removeData(parameters) {
  return request({
    api: '/tag/remove',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/tag/refreshCache',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/tag/pageListOperateLog',
    params: parameters,
  });
}
