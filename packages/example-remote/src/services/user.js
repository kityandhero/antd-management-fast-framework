import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/user/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/user/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/user/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/user/updateBasicInfo',
    params: parameters,
  });
}

export async function updateParentData(parameters) {
  return request({
    api: '/user/updateParent',
    params: parameters,
  });
}

export async function clearParentData(parameters) {
  return request({
    api: '/user/clearParent',
    params: parameters,
  });
}

export async function setSignetData(parameters) {
  return request({
    api: '/user/setSignet',
    params: parameters,
  });
}

export async function openSignetPasswordSwitchData(parameters) {
  return request({
    api: '/user/openSignetPasswordSwitch',
    params: parameters,
  });
}

export async function closeSignetPasswordSwitchData(parameters) {
  return request({
    api: '/user/closeSignetPasswordSwitch',
    params: parameters,
  });
}

export async function toggleSignetPasswordSwitchData(parameters) {
  return request({
    api: '/user/toggleSignetPasswordSwitch',
    params: parameters,
  });
}

export async function resetSignetPasswordData(parameters) {
  return request({
    api: '/user/resetSignetPassword',
    params: parameters,
  });
}

export async function resetPasswordData(parameters) {
  return request({
    api: '/user/resetPassword',
    params: parameters,
  });
}

export async function setEnableData(parameters) {
  return request({
    api: '/user/setEnable',
    params: parameters,
  });
}

export async function setDisableData(parameters) {
  return request({
    api: '/user/setDisable',
    params: parameters,
  });
}

export async function changePermissionData(parameters) {
  return request({
    api: '/masterManager/changePermission',
    params: parameters,
  });
}

export async function removeData(parameters) {
  return request({
    api: '/user/remove',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/user/refreshCache',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/user/pageListOperateLog',
    params: parameters,
  });
}
