import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/presetRole/pageList',
    params: parameters,
  });
}

export async function listModuleData(parameters) {
  return request({
    api: '/presetRole/listModule',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/presetRole/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/presetRole/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/presetRole/updateBasicInfo',
    params: parameters,
  });
}

export async function setEnableData(parameters) {
  return request({
    api: '/presetRole/setEnable',
    params: parameters,
  });
}

export async function setDisableData(parameters) {
  return request({
    api: '/presetRole/setDisable',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/presetRole/refreshCache',
    params: parameters,
  });
}
