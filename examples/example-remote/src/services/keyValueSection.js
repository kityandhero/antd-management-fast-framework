import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/keyValueSection/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/keyValueSection/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/keyValueSection/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/keyValueSection/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const refreshAllCacheDataApiAddress = '/keyValueSection/refreshAllCache';

export async function refreshAllCacheData(parameters) {
  return request({
    api: refreshAllCacheDataApiAddress,
    params: parameters,
  });
}
