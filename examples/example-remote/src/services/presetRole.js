import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/presetRole/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const listModuleDataApiAddress = '/presetRole/listModule';

export async function listModuleData(parameters) {
  return request({
    api: listModuleDataApiAddress,
    params: parameters,
  });
}

export const listTreeModuleDataApiAddress = '/presetRole/listTreeModule';

export async function listTreeModuleData(parameters) {
  return request({
    api: listTreeModuleDataApiAddress,
    params: parameters,
  });
}

export const listSelectDataApiAddress = '/presetRole/listSelect';

export async function listSelectData(parameters) {
  return request({
    api: listSelectDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/presetRole/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/presetRole/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress = '/presetRole/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const addModuleDataApiAddress = '/presetRole/addModule';

export async function addModuleData(parameters) {
  return request({
    api: addModuleDataApiAddress,
    params: parameters,
  });
}

export const addMultiModuleDataApiAddress = '/presetRole/addMultiModule';

export async function addMultiModuleData(parameters) {
  return request({
    api: addMultiModuleDataApiAddress,
    params: parameters,
  });
}

export const addAllModuleDataApiAddress = '/presetRole/addAllModule';

export async function addAllModuleData(parameters) {
  return request({
    api: addAllModuleDataApiAddress,
    params: parameters,
  });
}

export const updateModuleDataApiAddress = '/presetRole/updateModule';

export async function updateModuleData(parameters) {
  return request({
    api: updateModuleDataApiAddress,
    params: parameters,
  });
}

export const removeModuleDataApiAddress = '/presetRole/removeModule';

export async function removeModuleData(parameters) {
  return request({
    api: removeModuleDataApiAddress,
    params: parameters,
  });
}

export const clearModuleDataApiAddress = '/presetRole/clearModule';

export async function clearModuleData(parameters) {
  return request({
    api: clearModuleDataApiAddress,
    params: parameters,
  });
}

export const setEnableDataApiAddress = '/presetRole/setEnable';

export async function setEnableData(parameters) {
  return request({
    api: setEnableDataApiAddress,
    params: parameters,
  });
}

export const setDisableDataApiAddress = '/presetRole/setDisable';

export async function setDisableData(parameters) {
  return request({
    api: setDisableDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/presetRole/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/presetRole/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/presetRole/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
