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

export async function resetPasswordData(parameters) {
  return request({
    api: '/user/resetPassword',
    params: parameters,
  });
}

export async function deleteData(parameters) {
  return request({
    api: '/user/delete',
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
