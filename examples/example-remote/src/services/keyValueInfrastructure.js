import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/keyValueInfrastructure/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/keyValueInfrastructure/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/keyValueInfrastructure/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress =
  '/keyValueInfrastructure/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const refreshAllCacheDataApiAddress =
  '/keyValueInfrastructure/refreshAllCache';

export async function refreshAllCacheData(parameters) {
  return request({
    api: refreshAllCacheDataApiAddress,
    params: parameters,
  });
}
