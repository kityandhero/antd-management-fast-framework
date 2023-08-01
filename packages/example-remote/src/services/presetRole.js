import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/presetRole/pageList',
    params: parameters,
  });
}

export async function listSelectData(parameters) {
  return request({
    api: '/presetRole/listSelect',
    params: parameters,
  });
}

export async function listModuleData(parameters) {
  return request({
    api: '/presetRole/listModule',
    params: parameters,
  });
}

export async function listTreeModuleData(parameters) {
  return request({
    api: '/presetRole/listTreeModule',
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

export async function addModuleData(parameters) {
  return request({
    api: '/presetRole/addModule',
    params: parameters,
  });
}

export async function addMultiModuleData(parameters) {
  return request({
    api: '/presetRole/addMultiModule',
    params: parameters,
  });
}

export async function addAllModuleData(parameters) {
  return request({
    api: '/presetRole/addAllModule',
    params: parameters,
  });
}

export async function updateModuleData(parameters) {
  return request({
    api: '/presetRole/updateModule',
    params: parameters,
  });
}

export async function removeModuleData(parameters) {
  return request({
    api: '/presetRole/removeModule',
    params: parameters,
  });
}

export async function clearModuleData(parameters) {
  return request({
    api: '/presetRole/clearModule',
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

export async function removeData(parameters) {
  return request({
    api: '/presetRole/remove',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/presetRole/refreshCache',
    params: parameters,
  });
}
