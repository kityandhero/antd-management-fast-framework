import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/yonYouImportHistory/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/yonYouImportHistory/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const importFileDataApiAddress = '/yonYouImportHistory/importFile';

export async function importFileData(parameters) {
  return request({
    api: importFileDataApiAddress,
    params: parameters,
  });
}

export const setMapConfigDataApiAddress = '/yonYouImportHistory/setMapConfig';

export async function setMapConfigData(parameters) {
  return request({
    api: setMapConfigDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/yonYouImportHistory/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const pageListOperateLogDataApiAddress =
  '/yonYouImportHistory/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
