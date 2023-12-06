import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/userYonYouCorrelation/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/userYonYouCorrelation/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const addBasicInfoDataApiAddress = '/userYonYouCorrelation/addBasicInfo';

export async function addBasicInfoData(parameters) {
  return request({
    api: addBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const importDataApiAddress = '/userYonYouCorrelation/import';

export async function importData(parameters) {
  return request({
    api: importDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/userYonYouCorrelation/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const setEnableDataApiAddress = '/userYonYouCorrelation/setEnable';

export async function setEnableData(parameters) {
  return request({
    api: setEnableDataApiAddress,
    params: parameters,
  });
}

export const setDisableDataApiAddress = '/userYonYouCorrelation/setDisable';

export async function setDisableData(parameters) {
  return request({
    api: setDisableDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/userYonYouCorrelation/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const testExistDataApiAddress = '/userYonYouCorrelation/testExist';

export async function testExistData(parameters) {
  return request({
    api: testExistDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/userYonYouCorrelation/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
