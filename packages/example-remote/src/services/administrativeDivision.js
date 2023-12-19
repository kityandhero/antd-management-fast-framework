import { request } from 'easy-soft-utility';

export const singleListDataApiAddress = '/administrativeDivision/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const pageListDataApiAddress = '/administrativeDivision/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/administrativeDivision/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const updateBasicInfoDataApiAddress =
  '/administrativeDivision/updateBasicInfo';

export async function updateBasicInfoData(parameters) {
  return request({
    api: updateBasicInfoDataApiAddress,
    params: parameters,
  });
}

export const updateLocationInfoDataApiAddress =
  '/administrativeDivision/updateLocationInfo';

export async function updateLocationInfoData(parameters) {
  return request({
    api: updateLocationInfoDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/administrativeDivision/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}
