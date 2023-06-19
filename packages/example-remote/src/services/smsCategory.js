import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/smsCategory/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/smsCategory/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/smsCategory/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/smsCategory/updateBasicInfo',
    params: parameters,
  });
}

export async function setEnableData(parameters) {
  return request({
    api: '/smsCategory/setEnable',
    params: parameters,
  });
}

export async function setDisableData(parameters) {
  return request({
    api: '/smsCategory/setDisable',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/smsCategory/refreshCache',
    params: parameters,
  });
}
