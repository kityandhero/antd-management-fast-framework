import { request } from 'easy-soft-utility';

export const pageListDataApiAddress = '/keyValueApplication/pageList';

export async function pageListData(parameters) {
  return request({
    api: pageListDataApiAddress,
    params: parameters,
  });
}

export const getDataApiAddress = '/keyValueApplication/get';

export async function getData(parameters) {
  return request({
    api: getDataApiAddress,
    params: parameters,
  });
}

export const removeDataApiAddress = '/keyValueApplication/remove';

export async function removeData(parameters) {
  return request({
    api: removeDataApiAddress,
    params: parameters,
  });
}

export const refreshCacheDataApiAddress = '/keyValueApplication/refreshCache';

export async function refreshCacheData(parameters) {
  return request({
    api: refreshCacheDataApiAddress,
    params: parameters,
  });
}

export const refreshAllCacheDataApiAddress =
  '/keyValueApplication/refreshAllCache';

export async function refreshAllCacheData(parameters) {
  return request({
    api: refreshAllCacheDataApiAddress,
    params: parameters,
  });
}
