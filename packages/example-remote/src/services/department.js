import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/department/pageList',
    params: parameters,
  });
}

export async function singleListData(parameters) {
  return request({
    api: '/department/singleList',
    params: parameters,
  });
}

export async function singleTreeListData(parameters) {
  return request({
    api: '/department/singleTreeList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/department/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/department/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/department/updateBasicInfo',
    params: parameters,
  });
}

export async function updateSortData(parameters) {
  return request({
    api: '/department/updateSort',
    params: parameters,
  });
}

export async function updateParentIdData(parameters) {
  return request({
    api: '/department/updateParentId',
    params: parameters,
  });
}

export async function updateSubsidiaryIdData(parameters) {
  return request({
    api: '/department/updateSubsidiaryId',
    params: parameters,
  });
}

export async function setNormalData(parameters) {
  return request({
    api: '/department/setNormal',
    params: parameters,
  });
}

export async function setInvalidData(parameters) {
  return request({
    api: '/department/setInvalid',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/department/refreshCache',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/department/pageListOperateLog',
    params: parameters,
  });
}
