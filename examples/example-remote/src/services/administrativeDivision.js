import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/administrativeDivision/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const singleListDataApiAddress = '/administrativeDivision/singleList';

export async function singleListData(parameters) {
  return request({
    api: singleListDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListWithDefaultProvinceDataApiAddress =
  '/administrativeDivision/singleTreeListWithDefaultProvince';

export async function singleTreeListWithDefaultProvinceData(parameters) {
  return request({
    api: singleTreeListWithDefaultProvinceDataApiAddress,
    params: parameters,
  });
}

export const refreshSingleTreeListWithDefaultProvinceCacheDataApiAddress =
  '/administrativeDivision/refreshSingleTreeListWithDefaultProvinceCache';

export async function refreshSingleTreeListWithDefaultProvinceCacheData(
  parameters,
) {
  return request({
    api: refreshSingleTreeListWithDefaultProvinceCacheDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListWithDefaultCityDataApiAddress =
  '/administrativeDivision/singleTreeListWithDefaultCity';

export async function singleTreeListWithDefaultCityData(parameters) {
  return request({
    api: singleTreeListWithDefaultCityDataApiAddress,
    params: parameters,
  });
}

export const refreshSingleTreeListWithDefaultCityCacheDataApiAddress =
  '/administrativeDivision/refreshSingleTreeListWithDefaultCityCache';

export async function refreshSingleTreeListWithDefaultCityCacheData(
  parameters,
) {
  return request({
    api: refreshSingleTreeListWithDefaultCityCacheDataApiAddress,
    params: parameters,
  });
}

export const singleTreeListWithCrossingLevelDataApiAddress =
  '/administrativeDivision/singleTreeListWithCrossingLevel';

export async function singleTreeListWithCrossingLevelData(parameters) {
  return request({
    api: singleTreeListWithCrossingLevelDataApiAddress,
    params: parameters,
  });
}

export const refreshSingleTreeListWithCrossingLevelCacheDataApiAddress =
  '/administrativeDivision/refreshSingleTreeListWithCrossingLevelCache';

export async function refreshSingleTreeListWithCrossingLevelCacheData(
  parameters,
) {
  return request({
    api: refreshSingleTreeListWithCrossingLevelCacheDataApiAddress,
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

export const pageListOperateLogDataApiAddress =
  '/administrativeDivision/pageListOperateLog';

export async function pageListOperateLogData(parameters) {
  return request({
    api: pageListOperateLogDataApiAddress,
    params: parameters,
  });
}
