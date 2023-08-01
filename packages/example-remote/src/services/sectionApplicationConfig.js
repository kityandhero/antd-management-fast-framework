import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/sectionApplicationConfig/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/sectionApplicationConfig/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/sectionApplicationConfig/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/sectionApplicationConfig/updateBasicInfo',
    params: parameters,
  });
}

export async function removeData(parameters) {
  return request({
    api: '/sectionApplicationConfig/remove',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/sectionApplicationConfig/refreshCache',
    params: parameters,
  });
}

export async function getConfigItemData(parameters) {
  return request({
    api: '/section/getConfigItem',
    params: parameters,
  });
}

export async function addConfigItemData(parameters) {
  return request({
    api: '/section/addConfigItem',
    params: parameters,
  });
}

export async function updateConfigItemData(parameters) {
  return request({
    api: '/section/updateConfigItem',
    params: parameters,
  });
}

export async function removeConfigItemData(parameters) {
  return request({
    api: '/section/removeConfigItem',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/section/pageListOperateLog',
    params: parameters,
  });
}
