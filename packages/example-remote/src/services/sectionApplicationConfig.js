import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/sectionApplicationConfig/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/sectionApplicationConfig/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress =
  '/sectionApplicationConfig/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/sectionApplicationConfig/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/sectionApplicationConfig/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/sectionApplicationConfig/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const getConfigItemDataApiAddress =
  '/sectionApplicationConfig/getConfigItem';

export async function getConfigItemData(parameters) {
  return request({
    api: getConfigItemDataApiAddress,
    params: parameters,
  });
}

export const addConfigItemDataApiAddress =
  '/sectionApplicationConfig/addConfigItem';

export async function addConfigItemData(parameters) {
  return request({
    api: addConfigItemDataApiAddress,
    params: parameters,
  });
}

export const updateConfigItemDataApiAddress =
  '/sectionApplicationConfig/updateConfigItem';

export async function updateConfigItemData(parameters) {
  return request({
    api: updateConfigItemDataApiAddress,
    params: parameters,
  });
}

export const removeConfigItemDataApiAddress =
  '/sectionApplicationConfig/removeConfigItem';

export async function removeConfigItemData(parameters) {
  return request({
    api: removeConfigItemDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/sectionApplicationConfig/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
