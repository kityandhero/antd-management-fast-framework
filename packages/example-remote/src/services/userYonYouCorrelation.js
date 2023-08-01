import { request } from 'easy-soft-utility';

export async function pageListData(parameters) {
  return request({
    api: '/userYonYouCorrelation/pageList',
    params: parameters,
  });
}

export async function getData(parameters) {
  return request({
    api: '/userYonYouCorrelation/get',
    params: parameters,
  });
}

export async function addBasicInfoData(parameters) {
  return request({
    api: '/userYonYouCorrelation/addBasicInfo',
    params: parameters,
  });
}

export async function updateBasicInfoData(parameters) {
  return request({
    api: '/userYonYouCorrelation/updateBasicInfo',
    params: parameters,
  });
}

export async function setEnableData(parameters) {
  return request({
    api: '/userYonYouCorrelation/setEnable',
    params: parameters,
  });
}

export async function setDisableData(parameters) {
  return request({
    api: '/userYonYouCorrelation/setDisable',
    params: parameters,
  });
}

export async function refreshCacheData(parameters) {
  return request({
    api: '/userYonYouCorrelation/refreshCache',
    params: parameters,
  });
}

export async function pageListOperateLogData(parameters) {
  return request({
    api: '/userYonYouCorrelation/pageListOperateLog',
    params: parameters,
  });
}
