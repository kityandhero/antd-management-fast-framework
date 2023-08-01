import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/applicationSource/pageList',
    params: parameters,
  });
}

export async function singleListData(parameters) {
  return request({
    api: '/applicationSource/singleList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/applicationSource/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/applicationSource/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/applicationSource/updateBasicInfo',
    params: parameters,
  });
}

export async function setEnableData(parameters) {
  return request({
    api: '/applicationSource/setEnable',
    params: parameters,
  });
}

export async function setDisableData(parameters) {
  return request({
    api: '/applicationSource/setDisable',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/applicationSource/refreshCache',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/applicationSource/pageListOperateLog',
    params: parameters,
  });
}
