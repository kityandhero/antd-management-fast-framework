import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/optionPool/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/optionPool/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/optionPool/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/optionPool/updateBasicInfo',
    params: parameters,
  });
}

export async function updateSortData(parameters) {
  return request({
    api: '/optionPool/updateSort',
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
