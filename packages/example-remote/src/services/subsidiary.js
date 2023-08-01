import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/subsidiary/pageList',
    params: parameters,
  });
}

export async function singleListData(parameters) {
  return request({
    api: '/subsidiary/singleList',
    params: parameters,
  });
}

export async function singleTreeListData(parameters) {
  return request({
    api: '/subsidiary/singleTreeList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/subsidiary/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/subsidiary/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/subsidiary/updateBasicInfo',
    params: parameters,
  });
}

export async function updateSortData(parameters) {
  return request({
    api: '/subsidiary/updateSort',
    params: parameters,
  });
}

export async function updateParentData(parameters) {
  return request({
    api: '/subsidiary/updateParent',
    params: parameters,
  });
}

export async function setEnableData(parameters) {
  return request({
    api: '/subsidiary/setEnable',
    params: parameters,
  });
}

export async function setDisableData(parameters) {
  return request({
    api: '/subsidiary/setDisable',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/subsidiary/refreshCache',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/subsidiary/pageListOperateLog',
    params: parameters,
  });
}
