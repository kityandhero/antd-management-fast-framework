import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/masterManager/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/masterManager/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/masterManager/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/masterManager/updateBasicInfo',
    params: parameters,
  });
}

export async function resetPasswordData(parameters) {
  return request({
    api: '/masterManager/resetPassword',
    params: parameters,
  });
}

export async function setEnableData(parameters) {
  return request({
    api: '/masterManager/setEnable',
    params: parameters,
  });
}

export async function setDisableData(parameters) {
  return request({
    api: '/masterManager/setDisable',
    params: parameters,
  });
}

export async function removeData(parameters) {
  return request({
    api: '/masterManager/remove',
    params: parameters,
  });
}

export async function changePermissionData(parameters) {
  return request({
    api: '/masterManager/changePermission',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/masterManager/refreshCache',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/masterManager/pageListOperateLog',
    params: parameters,
  });
}
